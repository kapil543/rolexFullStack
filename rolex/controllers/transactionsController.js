const Transaction = require('../models/Transaction');
const axios = require('axios');

exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(process.env.THIRD_PARTY_API_URL);
    const transactions = response.data;
    // console.log(transactions);
    // console.log("res"+response);
    
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);
    
    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

exports.listTransactions = async (req, res) => {
   
  const { month, search, page , perPage = 10 } = req.query;
  const searchQuery = search
    ? {
        $or: [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { price: new RegExp(search, 'i') }
        ]
      }
    : {};

  const matchQuery = month
    ? { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } }
    : {};

  try {
    const transactions = await Transaction.aggregate([
      { $match: { ...searchQuery, ...matchQuery } },
      { $skip: (page - 1) * perPage },
      { $limit: Number(perPage) }
    ]);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
};
