import translations from './translations.json';

export function translate(weather){
  return translations[weather] || weather
}
