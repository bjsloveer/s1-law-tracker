require('dotenv').config();

var express = require('express');
var router = express.Router();


const maria = require('../database/connect/maria'); //maria.js 경로 입력
const commonQuery = require('../database/query/common'); // 공통 쿼리 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/proposed-legislation', function(req, res, next) {
  res.render('proposed-legislation/list', { title: '발의 법륜안' });
});


router.get('/select', function(req, res, next) { // /select 부분 추가
  maria.query( commonQuery.selectNow , function(err, rows, fields) {
    if(!err){
      console.log("succ");
      res.send(rows);
    }
    else {
      console.log("err : ", err);
    }
  });
});


module.exports = router;
