// GET ?ids=a,b,c -> [{id,status,url,error}]
const API = "https://api.replicate.com/v1";
exports.handler = async (event) => {
  const token = process.env.REPLICATE_API_TOKEN;
  const ids = (event.queryStringParameters?.ids || "").split(",").filter(Boolean);
  const out = await Promise.all(ids.map(async (id) => {
    const r = await fetch(`${API}/predictions/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    const o = Array.isArray(j.output) ? j.output[0] : j.output;
    return { id, status: j.status, url: typeof o === "string" ? o : null, error: j.error || null };
  }));
  return { statusCode: 200, body: JSON.stringify(out) };
};
