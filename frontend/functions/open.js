export async function onRequestPost({ request, env }) {
  try {
    const { name, domain } = await request.json();
    const headers = { "Content-Type": "application/json", "x-admin-auth": "xcs729638172" };
    const r1 = await env.BACKEND.fetch("https://internal/admin/new_address", {
      method: "POST", headers, body: JSON.stringify({ enablePrefix: false, name, domain })
    });
    const d1 = await r1.json();
    if (!d1.jwt) return new Response(JSON.stringify(d1), { status: r1.status, headers: { "Content-Type": "application/json" } });
    const r2 = await env.BACKEND.fetch("https://internal/api/mails?limit=20&offset=0", {
      headers: { "Authorization": `Bearer ${d1.jwt}` }
    });
    const d2 = await r2.json();
    return new Response(JSON.stringify({ jwt: d1.jwt, results: d2.results || [] }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
