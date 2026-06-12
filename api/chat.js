export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      reply: "Assistente Centese attivo. Invia una domanda via POST."
    });
  }

  const { message } = req.body;

  const contesto = `
Sei l'assistente ufficiale della ASD Centese Calcio.
Rispondi in italiano.
Tono cordiale, sportivo e chiaro.
Rispondi solo su: risultati, calendario, classifica, squadre, iscrizioni, sponsor, storia e contatti.
Non inventare mai risultati, date, classifiche o nomi.
Se non hai l'informazione, rispondi che non è disponibile e invita a consultare il sito ufficiale.

Informazioni base:
Sito ufficiale: www.asdcentesecalcio.com
Società: ASD Centese Calcio
Colori sociali: bianco e azzurro.
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${contesto}

Domanda utente:
${message}`
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Mi dispiace, al momento non riesco a rispondere.";

  return res.status(200).json({ reply });
}
