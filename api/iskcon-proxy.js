// api/iskcon-proxy.js
export default async function handler(req, res) {
  try {
    // ISKCON ekadashi endpoint (public read)
    const iskcon = "https://calendar-api.iskcondesiretree.com/api/v1/ekadasi?place=kolkata";

    // fetch ISKCON
    const r = await fetch(iskcon, { method: "GET" });
    if (!r.ok) {
      const text = await r.text();
      return res.status(502).json({ error: "Upstream fetch failed", status: r.status, body: text });
    }
    const data = await r.json();

    // CORS allow for any origin (safe for public API read)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ error: "Proxy exception", message: String(err) });
  }
}
