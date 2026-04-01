const express = require('express')
const app = express();
const morgan = require('morgan');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())

app.use('/api/auth', authRouter)

module.exports = app