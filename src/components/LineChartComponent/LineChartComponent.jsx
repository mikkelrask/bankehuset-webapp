import React, { useRef, useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts';

const LineChartComponent = ({ data, type, readings, className, unit }) => {
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const chartContainer = chartRef.current;
    const chartContainerPadding = 16;

    const handleResize = () => {
      const chartContainerWidth = chartContainer.offsetWidth - chartContainerPadding * 2;
      const chartContainerHeight = chartContainerWidth / 2;

      setChartSize({ width: chartContainerWidth, height: chartContainerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reversedData = [...data].reverse();

  return (
    <div className={`bg-white rounded-xl p-4 chart-container ${className}`} ref={chartRef}>
      <h2 className="text-lg font-semibold">{type}</h2>
      <LineChart width={chartSize.width} height={chartSize.height} data={reversedData.slice(0, readings)}>
        <XAxis dataKey="" />
        <YAxis unit={unit} />
        <CartesianGrid stroke="#fff" />
        <Line type="monotone" dataKey="value" strokeWidth={3} stroke="#0084d8" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
