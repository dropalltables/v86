export async function onRequest(context) {
    const url = new URL(context.request.url);
    const upstream = "https://i.copy.sh" + url.pathname.replace(/^\/images/, "") + url.search;

    const response = await fetch(upstream, {
        method: context.request.method,
        headers: {
            "User-Agent": "Mozilla/5.0",
            ...(context.request.headers.get("Range") ? { "Range": context.request.headers.get("Range") } : {}),
        },
    });

    const headers = new Headers(response.headers);
    headers.set("Cross-Origin-Resource-Policy", "cross-origin");
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
        status: response.status,
        headers,
    });
}
