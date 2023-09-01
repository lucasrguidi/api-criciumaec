const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const tableController = require("./controllers/tableController");
const nextMatchesController = require("./controllers/nextMatchesController");
const lastMatchesController = require("./controllers/lastMatchesController");

const app = express();
const port = 4000;

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.json("Hello world");
});

app.get("/api/table", async (req, res) => {
  try {
    // let tableData = await tableController.getTableData();
    let tableData = [
      {
        posicao: "1",
        pontos: "48",
        time: {
          nome: "EC Vitória",
          escudo:
            "https://cdn.footystats.org/img/teams/brazil-ec-vitoria_thumb.png",
        },
        jogos: "25",
        vitorias: "15",
        empates: "3",
        derrotas: "7",
        saldo_gols: "+17",
      },
      {
        posicao: "2",
        pontos: "45",
        time: {
          nome: "Grêmio Novorizontino",
          escudo:
            "https://cdn.footystats.org/img/teams/brazil-gremio-novorizontino_thumb.png",
        },
        jogos: "26",
        vitorias: "14",
        empates: "3",
        derrotas: "9",
        saldo_gols: "+14",
      },
    ];
    res.json(tableData);
  } catch (error) {
    res.status(500).json({ error: "Um erro ocorreu." });
  }
});

app.get("/api/next-matches", async (req, res) => {
  try {
    const nextMatchesData = await nextMatchesController.getNextMatchesData();
    const stadiumsData = await nextMatchesController.getEstadios();

    const updatedMatchesData = nextMatchesData.map((match, index) => ({
      ...match,
      estadio: stadiumsData[index],
    }));

    res.json(updatedMatchesData);
  } catch (error) {
    res.status(500).json({ error: "Um erro ocorreu." });
  }
});

app.get("/api/last-matches", async (req, res) => {
  try {
    const lastMatchesData = await lastMatchesController.getLastMatchesData();
    res.json(lastMatchesData);
  } catch (error) {
    res.status(500).json({ error: "Um erro ocorreu." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
