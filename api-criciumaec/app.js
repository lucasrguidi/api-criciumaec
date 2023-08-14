const express = require("express");
const nextMatchesController = require("./controllers/nextMatchesController");
const tableController = require("./controllers/tableController");

const app = express();
const port = 3000;

app.get("/next-matches", async (req, res) => {
  try {
    const nextMatchesData = await nextMatchesController.getNextMatchesData();
    res.json(nextMatchesData);
  } catch (error) {
    res.status(500).json({ error: "Um erro ocorreu." });
  }
});

app.get("/table", async (req, res) => {
  try {
    const tableData = await tableController.getTableData();
    res.json(tableData);
  } catch (error) {
    res.status(500).json({ error: "Um erro ocorreu." });
  }
});

app.listen(port, () => {
  console.log("Server running...");
});
