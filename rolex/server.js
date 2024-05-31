const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors');
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/api', require('./routes/index.js'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 