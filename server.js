const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const winston = require('winston');
const cons = require('consolidate');

const PORT = 8081;
const HOST = '0.0.0.0';

winston.loggers.add({
  console: {
    level: 'info',
    colorize: true,
    label: 'accessible log'
  },
  file: {
    filename: 'logs/someLog'
  }
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  winston.log('info', 'Sending index.');
  res.render('lebron');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, HOST, () => console.log(`Listening on http://${HOST}:${PORT}`));
