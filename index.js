require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./utils/db');
const mongoose = require('mongoose');

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
// TODO - Refractor Logic
app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    // * Mongo validation error
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    if (errors.length > 1) {
      const formattedErrors = errors.join(' ');
      res.status(400).json({ message: formattedErrors, details: fields });
    } else {
      res.status(400).json({ message: errors, details: fields });
    }
  } else {
    res.status((res.statusCode === 200 ? 500 : res.statusCode) || 500).json({
      message: err.message || 'Something went wrong.Please try again later',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
