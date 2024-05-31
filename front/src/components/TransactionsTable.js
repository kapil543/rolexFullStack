

import React, { useState, useEffect} from 'react';
import { fetchTransactions } from '../api';
import MonthDropdown from './MonthDropdown';

import './TransactionsTable.css';

const TransactionsTable = ({ selectedMonth, searchQuery, onSearchChange,setSelectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions(selectedMonth, page, searchQuery);
      setTransactions(data);
    };
    getTransactions();
  }, [selectedMonth, page, searchQuery]);

  return (
    <div className="transactions-table">
      <div className='querydiv'>
        
       
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
       <MonthDropdown
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      /></div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
