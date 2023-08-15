const axios = require('axios');
const cheerio = require('cheerio');

async function getLastMatchesData() {
  const url = 'https://www.placardefutebol.com.br/time/criciuma/ultimos-jogos';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const lastMatchesData = [];

    $('#main a').each((i, element) => {
      const campeonato = $(element)
        .find('.match__lg_card .match__lg_card--league')
        .text();

      const mandante = $(element)
        .find('.match__lg_card .match__lg_card--ht-name')
        .text();

      const visitante = $(element).find('.match__lg_card--at-name').text();

      const escudoMandante = $(element)
        .find('.match__lg_card--ht-logo img')
        .attr('src');

      const escudoVisitante = $(element)
        .find('.match__lg_card--at-logo img')
        .attr('src');

      const data = $(element)
        .find('.match__lg_card--info .match__lg_card--date')
        .text();

      const placar = $(element)
        .find('.match__lg_card--info .match__lg_card--scoreboard')
        .text()
        .trim()
        .replace(/\s+/g, '');

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
        placar: placar,
      };

      lastMatchesData.push(matchesData);
    });

    return lastMatchesData;
  } catch (error) {
    throw new Error('Um erro ocorreu.');
  }
}

module.exports = {
  getLastMatchesData,
};
