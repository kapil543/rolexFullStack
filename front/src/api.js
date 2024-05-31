 

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchTransactions = async (month, page, search) => {
  //for seed database
  await axios.get(`${API_BASE_URL}/initialize`);
  const response = await axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, page, search },
  });
  return response.data;
};

export const fetchStatistics = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/statistics`, { params: { month } });
  return response.data;
};

export const fetchBarChartData = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/barchart`, { params: { month } });
  return response.data;
};

export const fetchPieChartData = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/piechart`, { params: { month } });
  return response.data;
};

export const fetchCombinedData = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/combined`, { params: { month } });
  return response.data;
};
