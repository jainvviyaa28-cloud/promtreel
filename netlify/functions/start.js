// POST {prompt, shots:[...]} -> starts one Replicate prediction per shot, returns ids.
const API = "https://api.replicate.com/v1";
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return { statusCode: 500, body: JSON.stringify({ error: "REPLICATE_API_TOKEN is not set" }) };
  const model = process.env.REPLICATE_MODEL || "google/veo-3-fast";
  let extra = {};
  try { extra = JSON.parse(process.env.REPLICATE_EXTRA_INPUT || "{}"); } catch {}
  const { shots } = JSON.parse(event.body || "{}");
  if (!Array.isArray(shots) || !shots.length) return { statusCode: 400, body: JSON.stringify({ error: "No shots" }) };
  const ids = [];
  for (const prompt of shots) {
    const r = await fetch(`${API}/models/${model}/predictions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ input: { prompt, ...extra } }),
    });
    const j = await r.json();
    if (!r.ok) return { statusCode: r.status, body: JSON.stringify({ error: j.detail || j.title || "Replicate error", ids }) };
    ids.push(j.id);
  }
  return { statusCode: 200, body: JSON.stringify({ ids }) };
};
