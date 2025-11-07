export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/acmosertl/Madhavam-Surya-Siddhanto-Panjika-/refs/heads/main/ekadashi.json"
    );

    if (!response.ok) {
      throw new Error("GitHub data fetch failed");
    }

    const data = await response.json();

    // ✅ Allow everyone to access (so Blogger/iframe load হবে)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Ekadashi data:", error);
    res.status(500).json({ error: "Failed to fetch Ekadashi data" });
  }
}
