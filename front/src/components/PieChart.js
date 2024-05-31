 
import React, { useEffect, useState } from 'react';
import { fetchPieChartData } from '../api';
import './PieChart.css';

const PieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const getPieChartData = async () => {
      const data = await fetchPieChartData(month);
      setPieChartData(data);
    };

    getPieChartData();
  }, [month]);

  if (!pieChartData) return <div>Loading...</div>;

  return (
    <div className="pie-chart">
      <h2>Pie Chart</h2>
      {Object.entries(pieChartData).map(([category, count]) => (
        <div key={category} className="pie-item">
          <span>{category}</span>
          <span>{count}</span>
        </div>
      ))}
    </div>
  );
};

export default PieChart;



