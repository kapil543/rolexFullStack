import React, { useEffect, useState } from 'react';
import { fetchBarChartData } from '../api';
import './BarChart.css';

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    const getBarChartData = async () => {
      const data = await fetchBarChartData(month);
      setBarChartData(data);
    };

    getBarChartData();
  }, [month]);

  if (!barChartData) return <div>Loading...</div>;

  return (
    <div className="bar-chart">
      <h2>Bar Chart</h2>
      <div className='bardiv'>
        
      
      {Object.entries(barChartData).map(([range, count]) => (
        <div key={range} className="bar">
          <span>{range}</span>
          <div className="bar-inner" style={{ width: `${count * 10}px` }} />
          <span>{count}</span>
        </div>
          
      ))} </div>
    </div>
  );
};

export default BarChart;

