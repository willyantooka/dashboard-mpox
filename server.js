import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.use("/api", async (req, res) => {
  try {
    const destino =
      `https://apidadosabertos.saude.gov.br${req.originalUrl.replace(/^\/api/, "")}`;

    const resposta = await fetch(destino);
    const dados = await resposta.text();

    res.status(resposta.status);
    res.set(
      "Content-Type",
      resposta.headers.get("content-type") || "application/json"
    );

    res.send(dados);
  } catch (erro) {
    console.error("Erro ao consultar API:", erro);

    res.status(500).json({
      erro: "Falha ao consultar a API do Ministério da Saúde."
    });
  }
});

app.use(express.static("dist"));

app.get(/.*/, (req, res) => {
  res.sendFile("index.html", { root: "dist" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});