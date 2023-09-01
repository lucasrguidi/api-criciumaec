const axios = require("axios");
const cheerio = require("cheerio");

async function getTableData() {
  const url = "footystats.org/brazil/serie-b";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const tableData = [];

    $(".full-league-table tbody tr").each((i, element) => {
      const posicao = $(element).find(".position span").text();
      const escudo = $(element).find(".crest img").attr("src");
      const nome = $(element).find(".team a").first().text();
      const pontos = $(element).find(".points").text();
      const jogos = $(element).find(".mp").text();
      const vitorias = $(element).find(".win").first().text();
      const empates = $(element).find(".draw").first().text();
      const derrotas = $(element).find(".loss").first().text();
      const saldoGols = $(element).find(".gd").text();

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

    return { nome: "Lucas", sobrenome: "Puto" };
  } catch {
    throw new Error("Um erro ocorreu.");
  }
}

module.exports = {
  getTableData,
};
