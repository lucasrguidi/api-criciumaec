const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.placardefutebol.com.br/time/criciuma/proximos-jogos";

async function getNextMatches() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const nextMatchesData = [];

  $("#main a").each((i, element) => {
    const campeonato = $(element)
      .find(".match__lg_card .match__lg_card--league")
      .text();

    const mandante = $(element)
      .find(".match__lg_card .match__lg_card--ht-name")
      .text();

    const visitante = $(element).find(".match__lg_card--at-name").text();

    const escudoMandante = $(element)
      .find(".match__lg_card--ht-logo img")
      .attr("src");

    const escudoVisitante = $(element)
      .find(".match__lg_card--at-logo img")
      .attr("src");

    const data = $(element)
      .find(".match__lg_card--info .match__lg_card--datetime")
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .eq(0)
      .text()
      .trim();

    const horario = $(element)
      .find(".match__lg_card--info .match__lg_card--datetime")
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .eq(1)
      .text()
      .trim();

    const matchesData = {
      campeonato: campeonato,
      time_mandante: {
        nome: mandante,
        escudo: escudoMandante,
      },
      time_visitante: {
        nome: visitante,
        escudo: escudoVisitante,
      },
      data: data,
      horario: horario,
    };

    nextMatchesData.push(matchesData);
  });

  console.log(nextMatchesData);
}

getNextMatches();
