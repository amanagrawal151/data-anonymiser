// Notification route
const notificationRouter = require('./routes/notification');

// Load environment variables first
require('dotenv').config();


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');


var app = express();
// Enable CORS for all routes
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const connectDB = require('./models/db');
connectDB();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
// ...existing routes...
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// S3 route
const s3Router = require('./routes/s3');
app.use('/api/s3', s3Router);


// User route
const userRouter = require('./routes/user');

// File route
const fileRouter = require('./routes/file');
app.use('/api/files', fileRouter);
app.use('/api/users', userRouter);


// Stats route
const statsRouter = require('./routes/stats');
app.use('/api/stats', statsRouter);

// Crypt route
const cryptRouter = require('./routes/crypt');
app.use('/api/crypt', cryptRouter);

// Upload route
const uploadRouter = require('./routes/upload');
app.use('/api/upload', uploadRouter);
app.use('/api/notifications', notificationRouter);
// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Data Anonymiser API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
