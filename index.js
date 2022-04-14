import 'dotenv/config';

import { connectDB } from './utils/db';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

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
app.get('/', (req, res) => {
  res.send('Welcome to Examily');
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
