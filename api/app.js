const express       = require('express');
var path            = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const cors          = require('cors');

const indexRouter   = require('./routes/index');
const usersRouter = require('./routes/users');
const mongodb       = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

app.use(cors({
    exposedHeaders: ["Authorization"],
    origin : '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
