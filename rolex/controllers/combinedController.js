
const axios = require('axios'); 

exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    // Fetch statistics data
    const statisticsResponse = await axios.get(`http://localhost:8000/api/statistics`, {
      params: { month }
    });
    const statistics = statisticsResponse.data;

    // Fetch bar chart data
    const barChartResponse = await axios.get(`http://localhost:8000/api/barchart`, {
      params: { month }
    });
    const barChart = barChartResponse.data;

    // Fetch pie chart data
    const pieChartResponse = await axios.get(`http://localhost:8000/api/piechart`, {
      params: { month }
    });
    const pieChart = pieChartResponse.data;

    // Combine data into a single response
    res.status(200).json({
      statistics,
      barChart,
      pieChart
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching combined dataaS');
  }
};
