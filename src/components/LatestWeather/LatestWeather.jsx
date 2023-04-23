import React from 'react';
import { format } from 'date-fns';
import translations from '../../services/translations.json';
import '../../services/translate'
import { getWindDirection } from '../../services/windDirection';
import clearDayIcon from '../../icons/icon01d.svg';
import fewCloudsDayIcon from '../../icons/icon02d.svg';
import scatteredCloudsDayIcon from '../../icons/icon03d.svg';
import brokenCloudsDayIcon from '../../icons/icon04d.svg';
import showerRainDayIcon from '../../icons/icon09d.svg';
import rainDayIcon from '../../icons/icon10d.svg';
import thunderstormDayIcon from '../../icons/icon11d.svg';
import snowDayIcon from '../../icons/icon13d.svg';

const WeatherInfo = ({ label, value, unit }) => (
  <div className="flex items-center justify-between">
    <strong className="font-semibold text-lg">{label}</strong>
    <span className="text-lg">
      {value} {unit}
    </span>
  </div>
);

const getIcon = (iconName) => {
  switch (iconName) {
    case '01d':
      return clearDayIcon;
    case '02d':
      return fewCloudsDayIcon;
    case '03d':
      return scatteredCloudsDayIcon;
    case '04d':
      return brokenCloudsDayIcon;
    case '09d':
      return showerRainDayIcon;
    case '10d':
      return rainDayIcon;
    case '11d':
      return thunderstormDayIcon;
    case '13d':
      return snowDayIcon;
    default:
      return clearDayIcon;
  }
};

const LatestWeather = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Ingen tilgængelig vejrdata.</div>;
  }

  const latestEntry = data[0];
  const weather = latestEntry.data;
  const { main, wind, weather: weatherArray } = weather;
  const { icon, description } = weatherArray[0];
  const IconComponent = getIcon(icon);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-lg shadow-md w-full md:w-2/3-4 ">
      <div className="flex justify-center items-center mb-4">
      <div className="w-32 h-32">
        <IconComponent alt={description} style={{ width: '32px', height: '32px', transform: 'scale(4)' }} className=" object-contain object-center" />
      </div>
        <span className="text-2xl font-semibold ml-4 capitalize">{translations[main]}</span> <br />
        <span className="text-xl font-semibold ml-4 capitalize">{`/ ${translations[description]}`}</span>
      </div>
      <WeatherInfo label="Udendørs temperatur" value={main.temp} unit="°C" />
      <WeatherInfo label="Badevand" value={latestEntry.temperature} unit="°C" />
      <WeatherInfo label="Luftfugtighed" value={main.humidity} unit="%" />
      <WeatherInfo label="Vind" value={wind.speed} unit="m/s" />
      <WeatherInfo label="Vindretning" value={getWindDirection(wind.deg)} unit="" />
      <WeatherInfo label="Seneste måling" value={format(new Date(latestEntry.createdAt), 'HH:mm')} unit="" />
    </div>
  );
};

export default LatestWeather;
