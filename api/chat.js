export default async function handler(req, res) {
  return res.status(200).json({
    reply: "Ciao! Sono l'assistente della ASD Centese Calcio."
  });
}