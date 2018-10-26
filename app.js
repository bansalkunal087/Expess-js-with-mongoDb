var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var name = require('./routes/myname');
var searchUser = require('./routes/find-user');
var loginUser = require('./routes/login-user');

var app = express();

// var db = require('./index');
var db = require('./db-connection.js');

// console.log(sqlDb.connection);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})



app.use('/name', name)
app.use('/', index);
app.use('/users', users);
app.use('/user', loginUser);
app.use('/searchUser', searchUser);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
  });


// db.connect('mongodb://localhost:27017/admin', function (err) {
//     if (err) {
//         console.log('Unable to connect to Mongo.')
//         process.exit(1)
//     } else {
//         // app.listen(3000, function () {
//         //     console.log('Listening on port 3000...')
//         // })
//     }
// })

module.exports = app;
