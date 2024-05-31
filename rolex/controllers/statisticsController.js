const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const matchQuery = month
    ? { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } }
    : {};

  try {
    const transactions = await Transaction.aggregate([
      { $match: matchQuery }
    ]);

    const totalSaleAmount = transactions.reduce((sum, item) => sum + item.price, 0);
    const totalSoldItems = transactions.filter(item => item.sold).length;
    const totalNotSoldItems = transactions.filter(item => !item.sold).length;

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).send('Error fetching statistics');
  }
};
