const Transaction = require("../models/Transaction");

exports.getBarChartData = async (req, res) => {
  const { month } = req.query;
  const matchQuery = month
    ? { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } }
    : {};

  try {
    const transactions = await Transaction.aggregate([{ $match: matchQuery }]);
    console.log(transactions);
    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    transactions.forEach((item) => {
      if (item.price <= 100) priceRanges["0-100"]++;
      else if (item.price <= 200) priceRanges["101-200"]++;
      else if (item.price <= 300) priceRanges["201-300"]++;
      else if (item.price <= 400) priceRanges["301-400"]++;
      else if (item.price <= 500) priceRanges["401-500"]++;
      else if (item.price <= 600) priceRanges["501-600"]++;
      else if (item.price <= 700) priceRanges["601-700"]++;
      else if (item.price <= 800) priceRanges["701-800"]++;
      else if (item.price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).send("Error fetching bar chart data");
  }
};
