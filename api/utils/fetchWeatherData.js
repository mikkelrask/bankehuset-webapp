/**
* Fecth weather data from Open Weather Map
 */

import fetch from 'node-fetch';

import dotenv from 'dotenv';
dotenv.config();

const LAT = '55.4872076';
const LNG = '9.9081157';

const fetchWeatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LNG}&units=metric&APPID=${process.env.WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error('Failed to fetch weather data', e);
    return null;
  }
}

export default fetchWeatherData;