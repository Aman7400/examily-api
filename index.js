require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./utils/db');

const port = process.env.PORT;

const app = express();

// * Connect Database
connectDB();

// * Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Routes
app.use(require('./routes'));
// * Error Handler
app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
