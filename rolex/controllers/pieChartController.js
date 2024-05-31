const Transaction = require('../models/Transaction');

exports.getPieChartData = async (req, res) => {
  const { month } = req.query;
  const matchQuery = month
    ? { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } }
    : {};

  try {
    const transactions = await Transaction.aggregate([
      { $match: matchQuery }
    ]);

    const categoryCounts = {};

    transactions.forEach(item => {
      if (categoryCounts[item.category]) {
        categoryCounts[item.category]++;
      } else {
        categoryCounts[item.category] = 1;
      }
    });

    res.status(200).json(categoryCounts);
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
};
