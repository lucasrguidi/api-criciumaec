const express = require('express');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
const tableController = require('./controllers/tableController');
const nextMatchesController = require('./controllers/nextMatchesController');
const lastMatchesController = require('./controllers/lastMatchesController');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.get('/api/table', async (req, res) => {
  try {
    const tableData = await tableController.getTableData();
    res.json(tableData);
  } catch (error) {
    res.status(500).json({ error: 'Um erro ocorreu.' });
  }
});

app.get('/api/next-matches', async (req, res) => {
  try {
    const nextMatchesData = await nextMatchesController.getNextMatchesData();
    const stadiumsData = await nextMatchesController.getEstadios();

    const updatedMatchesData = nextMatchesData.map((match, index) => ({
      ...match,
      estadio: stadiumsData[index],
    }));

    res.json(updatedMatchesData);
  } catch (error) {
    res.status(500).json({ error: 'Um erro ocorreu.' });
  }
});

app.get('/api/last-matches', async (req, res) => {
  try {
    const lastMatchesData = await lastMatchesController.getLastMatchesData();
    res.json(lastMatchesData);
  } catch (error) {
    res.status(500).json({ error: 'Um erro ocorreu.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
