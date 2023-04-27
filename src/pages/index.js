import React, { useState } from "react";
import { Button } from "@mantine/core";
import { useGetEntriesQuery } from "../services/entries";
import Logo from "../components/Logo";
import "../styles/style.css";
import LatestWeather from "../components/LatestWeather";
import EntriesList from "../components/EntriesList";
import LineChartComponent from "../components/LineChartComponent";
import { Link } from "gatsby";

const Home = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(250);
  const [showEntriesList, setShowEntriesList] = useState(false);

  const { data, isLoading } = useGetEntriesQuery(
    {
      page,
      perPage,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl text-white font-bold animate-pulse opacity-20">
          Indlæser . . .
        </h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl text-white font-bold animate-pulse opacity-20">
          Ingen data fundet . . .
        </h1>
        <p>
          Følg anvisningen i{" "}
          <Link to="https://docs.bankehuset.info" target="_blank">
            dokumentationen
          </Link>
        </p>
      </div>
    );
  }

  const waterTempData = data.data.map((entry) => ({
    timestamp: entry.timestamp,
    value: entry.temperature,
  }));

  const tempData = data.data.map((entry) => ({
    timestamp: entry.timestamp,
    value: entry.data.main.temp,
  }));

  const windSpeedData = data.data.map((entry) => ({
    timestamp: entry.timestamp,
    value: entry.data.wind.speed,
  }));

  const humidityData = data.data.map((entry) => ({
    timestamp: entry.timestamp,
    value: entry.data.main.humidity,
  }));

  return (
    <>
      <div class="lg:container lg:mx-auto">
        <Logo />
      </div>
      <div class="p-16 w-full flex flex-wrap gap-4 justify-between lg:container lg:mx-auto">
        <LatestWeather data={data.data ?? []} />
        <LineChartComponent
          data={waterTempData}
          type="Badevand (seneste 12 timer)"
          readings={64}
          className="w-full md:w-1/2-4 lg:w-1/3-4"
          unit="C°"
        />
        <LineChartComponent
          data={tempData}
          type="Temperatur"
          readings={64}
          className="w-full md:w-1/2-4 lg:w-1/3-4"
          unit="C°"
        />
        <LineChartComponent
          data={windSpeedData}
          type="Vind"
          readings={64}
          className="w-full md:w-1/2-4 lg:w-1/3-4"
          unit="m/s"
        />
        <LineChartComponent
          data={humidityData}
          type="Luftfugtighed"
          readings={64}
          className="w-full md:w-1/2-4 lg:w-1/3-4"
          unit="%"
        />
      </div>
      <div class="p-16">
        <Button onClick={() => setShowEntriesList((prev) => !prev)}>
          {showEntriesList ? "Skjul entries" : "Vis entries"}
        </Button>
        {showEntriesList && <EntriesList data={data.data ?? []} />}
        <br />
        <br />
        {page > 1 ? (
          <Button onClick={() => setPage((curr) => curr - 1)}>Nyere</Button>
        ) : null}{" "}
        {data.data.length >= perPage ? (
          <Button onClick={() => setPage((curr) => curr + 1)}>Ældre</Button>
        ) : null}
      </div>
    </>
  );
};

export default Home;
