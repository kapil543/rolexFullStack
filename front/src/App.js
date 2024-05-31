import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './App.css'; // Add general styles for the app if needed

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("Select a month"); // Default to March
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <h1 className='heading'>Transactions Dashboard</h1>
       
       
      <TransactionsTable
        selectedMonth={selectedMonth}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        setSelectedMonth={setSelectedMonth}
      />  
      <Statistics selectedMonth={selectedMonth} />
      <BarChart selectedMonth={selectedMonth} />
      <PieChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;

