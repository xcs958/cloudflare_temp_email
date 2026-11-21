export async function onRequestPost({ request }) {
  const { name, domain } = await request.json();
  const res = await fetch("https://" + "api." + "buletide.uk/admin/new_address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-auth": "xcs729638172"
    },
    body: JSON.stringify({ enablePrefix: false, name, domain })
  });
  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" }
  });
}
