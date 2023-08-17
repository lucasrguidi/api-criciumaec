const axios = require('axios');
const cheerio = require('cheerio');

async function getNextMatchesData() {
  const url = 'https://www.placardefutebol.com.br/time/criciuma/proximos-jogos';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const nextMatchesData = [];

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

      let data = $(element)
        .find('.match__lg_card--info .match__lg_card--datetime')
        .contents()
        .filter(function () {
          return this.nodeType === 3;
        })
        .eq(0)
        .text()
        .trim()
        .replace(', ', ' - ');
      const parts = data.split(' - ');
      const [dayAbbrev, dayMonth] = parts;
      data = `${dayMonth} - ${dayAbbrev}`;

      const horario = $(element)
        .find('.match__lg_card--info .match__lg_card--datetime')
        .contents()
        .filter(function () {
          return this.nodeType === 3;
        })
        .eq(1)
        .text()
        .trim();

      const estadio = getEstadios(i);

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
        estadio: estadio,
      };

      nextMatchesData.push(matchesData);
    });

    return nextMatchesData;
  } catch (error) {
    throw new Error('Um erro ocorreu.');
  }
}

async function getEstadios() {
  const url = 'https://www.criciuma.com.br/m/competicoes';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let estadios = [];

    $('.data-estadio span').each(async (i, element) => {
      if (i >= 1 && i <= 5) {
        const estadio = $(element).text();
        estadios.push(estadio);
      }
    });
    return estadios;
  } catch (error) {
    throw new Error('Um erro ocorreu.');
  }
}
getEstadios();

module.exports = {
  getNextMatchesData,
  getEstadios,
};
