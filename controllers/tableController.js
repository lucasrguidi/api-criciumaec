const axios = require("axios");
const cheerio = require("cheerio");

async function getTableData() {
  const url =
    "https://www.goal.com/br/s%C3%A9rie-b/tabela-de-classifica%C3%A7%C3%A3o/5zr0b05eyx25km7z1k03ca9jx";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const tableData = [];

    $(".widget-match-standings__table tbody tr").each((i, element) => {
      const posicao = $(element).find("td").first().text().trim();
      const nome = $(element)
        .find(".widget-match-standings__team--full-name")
        .text()
        .trim();
      const escudo = $(element)
        .find(".widget-match-standings__crest")
        .attr("src");
      const jogos = $(element)
        .find(".widget-match-standings__matches-played")
        .text()
        .trim();
      const vitorias = $(element)
        .find(".widget-match-standings__matches-won")
        .text()
        .trim();
      const empates = $(element)
        .find(".widget-match-standings__matches-drawn")
        .text()
        .trim();
      const derrotas = $(element)
        .find(".widget-match-standings__matches-lost")
        .text()
        .trim();
      const saldoGols = $(element)
        .find(".widget-match-standings__goals-diff")
        .text()
        .trim();
      const pontos = $(element).find(".widget-match-standings__pts").text();

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
    throw new Error("Um erro ocorreu.");
  }
}
module.exports = {
  getTableData,
};
