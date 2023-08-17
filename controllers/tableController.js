const axios = require('axios');
const cheerio = require('cheerio');

async function getTableData() {
  const url = 'https://www.gazetaesportiva.com/campeonatos/brasileiro-serie-b/';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const tableData = [];

    $('table tbody tr').each((i, element) => {
      const posicao = $(element).find('.table__position').text().trim();
      const escudo = $(element).find('.table__shield img ').attr('src');
      const nome = $(element).find('.table__team a').text();
      const pontos = $(element).find('.table__stats').first().text();
      const jogos = $(element).find('.table__stats:eq(1)').text();
      const vitorias = $(element).find('.table__stats:eq(2)').text();
      const empates = $(element).find('.table__stats:eq(3)').text();
      const derrotas = $(element).find('.table__stats:eq(4)').text();
      const saldoGols = $(element).find('.table__stats:eq(7)').text();

      const rowData = {
        posicao: posicao,
        pontos: pontos,
        time: {
          nome: nome,
          escudo: escudo,
        },
        jogos: jogos,
        vitorias: vitorias,
        empates: empates,
        derrotas: derrotas,
        saldo_gols: saldoGols,
      };

      tableData.push(rowData);
    });

    return tableData;
  } catch {
    throw new Error('Um erro ocorreu.');
  }
}

module.exports = {
  getTableData,
};
