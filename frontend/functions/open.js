export async function onRequestPost({ request, env }) {
  try {
    const { name, domain } = await request.json();
    const address = `${name}@${domain}`;
    const headers = { "Content-Type": "application/json", "x-admin-auth": "xcs729638172" };
    await env.BACKEND.fetch("https://internal/admin/new_address", {
      method: "POST", headers, body: JSON.stringify({ enablePrefix: false, name, domain })
    });
    const r2 = await env.BACKEND.fetch(`https://internal/admin/mails?limit=20&offset=0&address=${encodeURIComponent(address)}`, {
      headers
    });
    const d2 = await r2.json();
    return new Response(JSON.stringify({ jwt: "ok", results: d2.results || [] }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
