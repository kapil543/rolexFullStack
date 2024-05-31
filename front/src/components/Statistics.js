import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api';
import './Statistics.css';
const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  useEffect(() => {
    const getStatistics = async () => {
      const data = await fetchStatistics(selectedMonth);
      setStatistics(data);
    };
    getStatistics();
  }, [selectedMonth]);

  return (
    <div className='statistics'>
      <h3>Statistics - {months[selectedMonth-1]}</h3>
      <div>
        
       
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;
