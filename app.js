
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const expressLayouts = require('express-ejs-layouts');



var indexRouter = require('./routes/index');


// Member 메뉴
var usersRouter = require('./routes/member/users');

// express 패키지를 호출해 app 변수 객체를 만든다.
var app = express();  

// Database 연결
const maria = require('./database/connect/maria');
maria.connect();

// view engine setup
// app.set()으로 익스프레스 앱을 설정한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 레이아웃 적용
app.use(expressLayouts);
app.set('layout', 'layout/main' ); // 기본 레이아웃 
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);



app.use(logger('dev')); // app.use는 미들웨어를 연결하는 부분이다. (미들웨어는 반드시 next()를 호출해야 다음 미들웨어로 넘어감
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/member/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app; //app 객체를 모듈로 만든다.
