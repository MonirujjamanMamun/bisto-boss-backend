const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const menuRouter = require('./routers/menuRouter');
const reviewRouter = require('./routers/reviewRoute');
const authRouter = require('./routers/authRouter');
const cartRouter = require('./routers/cartRouter');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', menuRouter);
app.use('/api', reviewRouter);
app.use('/api', authRouter);
app.use('/api', cartRouter);

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: 'Welcome to Bisto Boss Restaurant' });
});

module.exports = app;
