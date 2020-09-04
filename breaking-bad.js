'use strict';

const fetch = require('node-fetch');

async function getAllEpisodes() {
  return fetch('https://www.breakingbadapi.com/api/episodes').then(res => res.json());
}

function isIncludeCharacters(names = [], characters = []) {
  return names.every(name => characters.includes(name));
}

function normilizeNumbers(param) {
  const numeral = Number(param);
  return numeral < 10 ? `0${numeral}` : String(numeral);
}

function getEpisodes(names, episodes = []) {
  return episodes.reduce((result, {characters, season, episode, title}) => {
    if (isIncludeCharacters(names, characters)) {
      result.push(`S${normilizeNumbers(season)}${normilizeNumbers(episode)} - ${title}`);
    }
    return result;
  }, []);
}

/**
 *
 * @param {string | string[]} name
 * @returns {Promise<string[]>}
 */
module.exports = async function (inputNames) {
  if (!inputNames) return [];

  const names = Array.isArray(inputNames) ? inputNames : [inputNames];
  const episodes = await getAllEpisodes();

  return getEpisodes(names, episodes);
};
