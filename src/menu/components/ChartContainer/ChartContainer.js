import React, { useState, useEffect } from 'react';
import ViolationChart from './ViolationChart';
import ViolationList from './ViolationList';
import ButtonGroup from './ButtonGroup';
import './ChartContainer.css';
import { parseViolationData } from '../../utils';

const ChartContainer = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState('chart');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/cctv_violation_data_20231115_to_20251115_dataset_1.csv');
        const csvText = await response.text();
        const parsedData = parseViolationData(csvText);
        setData(parsedData);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = Object.entries(data).map(([date, violationCount]) => ({
    date,
    violationCount,
  }));

  return (
    <div className="container">
      <ButtonGroup setView={setView} />
      <div className="content-wrapper">
        {view === 'chart' ? (
          <div className="chart-section">
            <ViolationChart data={chartData} />
          </div>
        ) : (
          <div className="list-section">
            <ViolationList />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartContainer;