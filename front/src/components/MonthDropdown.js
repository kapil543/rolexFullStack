import React from 'react';
import './MonthDropdown.css';

const MonthDropdown = ({ selectedMonth, onMonthChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="month-dropdown">
      <select value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
      <option value="" >Select a month</option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthDropdown;

