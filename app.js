const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const menuRouter = require('./routers/menuRouter');
const reviewRouter = require('./routers/reviewRoute');
const authRouter = require('./routers/authRouter');
const cartRouter = require('./routers/cartRouter');
const paymentRouter = require('./routers/paymentRouter');
const statsRouter = require('./routers/statsRouter');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://bisto-boss-frontend.vercel.app'], // Allow local dev and deployed frontend
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    // credentials: true // If using cookies or authentication
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', menuRouter);
app.use('/api', reviewRouter);
app.use('/api', authRouter);
app.use('/api', cartRouter);
app.use('/api', paymentRouter);
app.use('/api', statsRouter);

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: 'Welcome to Bisto Boss Restaurant' });
});

module.exports = app;
