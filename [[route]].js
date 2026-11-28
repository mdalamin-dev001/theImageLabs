// Cloudflare Pages Function: handles every /api/* request.
// D1 binding required: DB  (database "tils-db").
// Tables are created automatically on first use.
//
//   POST /api/hit      public   +1 for today (1 row write)
//   GET  /api/status   public   { setup, authed, exp }
//   POST /api/setup    public   first-time access key (only works once)
//   POST /api/login    public   { key } -> 7-day cookie
//   POST /api/logout
//   GET  /api/stats    private  dashboard numbers
//   POST /api/change   private  { old, key } -> new access key

const TZ = 6 * 36e5;                 // Asia/Dhaka (UTC+6) day boundaries
const SESSION_S = 7 * 24 * 3600;     // fixed 7 days, never refreshed
const ITERS = 20000, MAX_FAILS = 5, LOCK_MS = 15 * 60e3;
const enc = new TextEncoder();
const SCHEMA = [
  'CREATE TABLE IF NOT EXISTS daily(day TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0) WITHOUT ROWID',
  'CREATE TABLE IF NOT EXISTS meta(k TEXT PRIMARY KEY, v TEXT NOT NULL) WITHOUT ROWID',
];

const b64 = u => btoa(String.fromCharCode(...new Uint8Array(u)));
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const hex = u => [...new Uint8Array(u)].map(b => b.toString(16).padStart(2, '0')).join('');
const unhex = s => Uint8Array.from(s.match(/../g) || [], h => parseInt(h, 16));
const dhakaDay = () => new Date(Date.now() + TZ).toISOString().slice(0, 10);
const addDay = (d, k) => new Date(Date.parse(d + 'T00:00:00Z') + k * 864e5).toISOString().slice(0, 10);

async function derive(key, salt) {
  const k = await crypto.subtle.importKey('raw', enc.encode(key), 'PBKDF2', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERS }, k, 256));
}
function same(a, b) { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i]; return d === 0; }
const hmacKey = secret => crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
async function mint(secret) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_S;
  return exp + '.' + hex(await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(String(exp))));
}
async function check(token, secret) {
  if (!token) return 0;
  const [e, s] = token.split('.'), exp = +e;
  if (!exp || exp < Date.now() / 1000 || !/^[0-9a-f]+$/.test(s || '')) return 0;
  return (await crypto.subtle.verify('HMAC', await hmacKey(secret), unhex(s), enc.encode(e))) ? exp : 0;
}
const cookie = v => `tl_s=${v}; Path=/api; Max-Age=${v ? SESSION_S : 0}; HttpOnly; Secure; SameSite=Strict`;

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const route = url.pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');
  const send = (o, s = 200, h = {}) => new Response(JSON.stringify(o), {
    status: s, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...h } });
  if (!env.DB) return send({ error: 'D1 binding "DB" is missing. Add it in Pages > Settings > Bindings.' }, 500);

  const post = request.method === 'POST';
  if (post) {
    const o = request.headers.get('Origin');
    if (o && new URL(o).host !== url.host) return send({ error: 'forbidden' }, 403);
  }
  // run a D1 call; create tables once if they do not exist yet
  const db = async fn => {
    try { return await fn(); }
    catch (e) {
      if (!/no such table/i.test(String(e && e.message || e))) throw e;
      await env.DB.batch(SCHEMA.map(s => env.DB.prepare(s)));
      return fn();
    }
  };
  const metaRows = keys => db(async () => {
    const r = await env.DB.prepare(`SELECT k,v FROM meta WHERE k IN (${keys.map(() => '?').join(',')})`).bind(...keys).all();
    return Object.fromEntries(r.results.map(x => [x.k, JSON.parse(x.v)]));
  });
  const token = (request.headers.get('Cookie') || '').match(/(?:^|;\s*)tl_s=([^;]+)/)?.[1];
  const body = post ? await request.json().catch(() => ({})) : {};
  const keyOk = k => typeof k === 'string' && k.length >= 10 && k.length <= 200;

  try {
    if (route === 'hit' && post) {
      await db(() => env.DB.prepare('INSERT INTO daily(day,n) VALUES(?,1) ON CONFLICT(day) DO UPDATE SET n=n+1').bind(dhakaDay()).run());
      return send({ ok: true });
    }

    if (route === 'status') {
      const { auth } = await metaRows(['auth']);
      const exp = auth ? await check(token, auth.s + auth.h) : 0;
      return send({ setup: !!auth, authed: !!exp, exp });
    }

    if (route === 'setup' && post) {
      if (!keyOk(body.key)) return send({ error: 'Use at least 10 characters.' }, 400);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const auth = { s: b64(salt), h: b64(await derive(body.key, salt)), t: Date.now() };
      const r = await db(() => env.DB.prepare("INSERT OR IGNORE INTO meta(k,v) VALUES('auth',?)").bind(JSON.stringify(auth)).run());
      if (!r.meta.changes) return send({ error: 'An access key is already set.' }, 409);
      return send({ ok: true }, 200, { 'Set-Cookie': cookie(await mint(auth.s + auth.h)) });
    }

    if (route === 'login' && post) {
      const { auth, lock } = await metaRows(['auth', 'lock']);
      if (!auth) return send({ error: 'No access key yet.' }, 409);
      if (lock && lock.u > Date.now()) return send({ error: 'Too many attempts. Try again later.', retry: Math.ceil((lock.u - Date.now()) / 1000) }, 429);
      const good = typeof body.key === 'string' && same(await derive(body.key, unb64(auth.s)), unb64(auth.h));
      if (!good) {
        let c = (lock ? lock.c : 0) + 1, u = 0;
        if (c >= MAX_FAILS) { u = Date.now() + LOCK_MS; c = 0; }
        await db(() => env.DB.prepare("INSERT INTO meta(k,v) VALUES('lock',?) ON CONFLICT(k) DO UPDATE SET v=excluded.v").bind(JSON.stringify({ c, u })).run());
        return send({ error: 'Wrong key.' }, 401);
      }
      if (lock) await db(() => env.DB.prepare("DELETE FROM meta WHERE k='lock'").run());
      return send({ ok: true }, 200, { 'Set-Cookie': cookie(await mint(auth.s + auth.h)) });
    }

    if (route === 'logout' && post) return send({ ok: true }, 200, { 'Set-Cookie': cookie('') });

    // everything below needs a valid 7-day session
    const { auth } = await metaRows(['auth']);
    const exp = auth ? await check(token, auth.s + auth.h) : 0;
    if (!exp) return send({ error: 'login required' }, 401);

    if (route === 'change' && post) {
      if (!keyOk(body.key)) return send({ error: 'Use at least 10 characters.' }, 400);
      if (!same(await derive(String(body.old || ''), unb64(auth.s)), unb64(auth.h))) return send({ error: 'Current key is wrong.' }, 401);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const n = { s: b64(salt), h: b64(await derive(body.key, salt)), t: Date.now() };
      await db(() => env.DB.prepare("UPDATE meta SET v=? WHERE k='auth'").bind(JSON.stringify(n)).run());
      return send({ ok: true }, 200, { 'Set-Cookie': cookie(await mint(n.s + n.h)) });
    }

    if (route === 'stats') {
      const [rec, agg] = await db(() => env.DB.batch([
        env.DB.prepare('SELECT day,n FROM daily ORDER BY day DESC LIMIT 120'),
        env.DB.prepare('SELECT COALESCE(SUM(n),0) AS total, COUNT(*) AS days, MAX(n) AS best, (SELECT day FROM daily ORDER BY n DESC, day DESC LIMIT 1) AS bestDay FROM daily'),
      ]));
      const today = dhakaDay(), map = Object.fromEntries(rec.results.map(r => [r.day, r.n]));
      const at = i => map[addDay(today, -i)] || 0;
      const sum = (a, b) => { let t = 0; for (let i = a; i < b; i++) t += at(i); return t; };
      const a = agg.results[0];
      return send({
        today: at(0), yesterday: at(1),
        last7: sum(0, 7), prev7: sum(7, 14), last30: sum(0, 30), prev30: sum(30, 60),
        month: sum(0, +today.slice(8, 10)),
        total: a.total, days: a.days, best: a.best || 0, bestDay: a.bestDay || null,
        date: today, exp,
        series: Array.from({ length: 30 }, (_, i) => ({ d: addDay(today, i - 29), n: at(29 - i) })),
      });
    }
    return send({ error: 'not found' }, 404);
  } catch (e) {
    return send({ error: 'server error', detail: String(e && e.message || e) }, 500);
  }
}
