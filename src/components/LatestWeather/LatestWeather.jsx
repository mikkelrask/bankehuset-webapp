import React from 'react';
import WeatherIcon from '../WeatherIcon'
import { format } from 'date-fns';
import translations from '../../services/translations.json';

const WeatherInfo = ({ label, value, unit }) => (
  <div className="flex items-center justify-between">
    <strong className="font-semibold text-lg">{label}</strong>
    <span className="text-lg">
      {value} {unit}
    </span>
  </div>
);

const LatestWeather = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Ingen tilgængelig vejrdata.</div>;
  }

  const latestEntry = data[0];
  const weather = latestEntry.data;
  const { main, wind, weather: weatherArray } = weather;
  const { icon, description } = weatherArray[0];

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-lg shadow-md sm:w 1/1 md:w-1/2 ">
      <div className="flex justify-center items-center mb-4">
        <WeatherIcon iconName={icon} />
        <span className="text-xl font-semibold ml-4 capitalize">{translations[description]}</span>
      </div>
      <WeatherInfo label="Udendørs temperatur" value={main.temp} unit="°C" />
      <WeatherInfo label="Badevand" value={latestEntry.temperature} unit="°C" />
      <WeatherInfo label="Luftfugtighed" value={main.humidity} unit="%" />
      <WeatherInfo label="Vind" value={wind.speed} unit="m/s" />
      <WeatherInfo label="Seneste måling" value={format(new Date(latestEntry.createdAt), 'HH:mm')} unit="" />
    </div>
  );
};

export default LatestWeather;
