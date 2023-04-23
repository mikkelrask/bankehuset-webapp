import React, { useState } from 'react';
import { Button } from '@mantine/core';
import  { useGetEntriesQuery } from "../services/entries";
import Logo from "../components/Logo";
import '../styles/style.css';
import LatestWeather from "../components/LatestWeather";
import EntriesList from "../components/EntriesList";
import LineChartComponent from '../components/LineChartComponent';

const Home = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(250);
  const [showEntriesList, setShowEntriesList] = useState(false);

  const {
    data,
    isLoading
  } = useGetEntriesQuery({
    page,
    perPage,
  }, {
    refetchOnMountOrArgChange: true
  });

  if (isLoading) {
    return <div>Indlæser...</div>;
  }

  if (!data) {
    return <div>Ingen data fundet.</div>
  }

  const waterTempData = data.data.map(entry => ({
    timestamp: entry.timestamp,
    value: entry.temperature,
  }));

  const tempData = data.data.map(entry => ({
    timestamp: entry.timestamp,
    value: entry.data.main.temp,
  }));

  const windSpeedData = data.data.map(entry => ({
    timestamp: entry.timestamp,
    value: entry.data.wind.speed,
  }));

  const humidityData = data.data.map(entry => ({
    timestamp: entry.timestamp,
    value: entry.data.main.humidity,
  }));

  return (
    <>
      <Logo />
      <div class="p-16 w-full flex flex-wrap gap-4 justify-between">
        <LatestWeather data={data.data ?? []} />
        <LineChartComponent data={waterTempData} type="Badevand" readings={12} className="w-1/2-4 lg:w-1/3-4" unit="C°" />
        <LineChartComponent data={tempData} type="Temperatur" readings={12} className="w-1/2-4 lg:w-1/3-4" unit="C°" />
        <LineChartComponent data={windSpeedData} type="Vind" readings={12} className="w-1/2-4 lg:w-1/3-4" unit="m/s"/>
        <LineChartComponent data={humidityData} type="Luftfugtighed" readings={12} className="w-1/2-4 lg:w-1/3-4" unit="%" />
      </div>
      <div class="p-16">
        <Button onClick={() => setShowEntriesList(prev => !prev)}>
          {showEntriesList ? 'Skjul entries' : 'Vis entries'}
        </Button>
        {showEntriesList && <EntriesList data={data.data ?? []} />}
        <br /><br />
        {page > 1 ? <Button onClick={() => setPage(curr => curr - 1)}>Nyere</Button> : null}{' '}
        {data.data.length >= perPage ? <Button onClick={() => setPage(curr => curr + 1)}>Ældre</Button> : null}
      </div>
    </>
  )
}

export default Home;
