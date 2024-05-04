require('dotenv').config();

const axios = require('axios');
const express = require('express');
const router = express.Router();
const { parseString } = require('xml2js');


const initInsertAgenda = require('../database/logic/agenda-insert-init')

const OPEN_API_KEY = 'c1742df8878448aabb0724fa1931a485'; // 국회 OPEN_API_KEY

const maria = require('../database/connect/maria'); //maria.js 경로 입력
const commonQuery = require('../database/query/common'); // 공통 쿼리 



function isAdmin( req , res, next){
  // 여기에서 관리자인지를 확인하는 로직을 구현합니다.
  // 예를 들어 세션을 사용하여 관리자인지를 확인하거나, 토큰을 사용하여 권한을 확인할 수 있습니다.
  // 이 예시에서는 isAdmin 함수가 항상 true를 반환한다고 가정합니다.
  const isAdmin = true;

  // 관리자가 아닌 경우 403 Forbidden 에러를 응답합니다.
  if (!isAdmin) {
    return res.status(403).json({ error: '접근 권한이 없습니다.' });
  }

  // 관리자인 경우 다음 미들웨어로 이동합니다.
  next();
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/proposed-legislation', function(req, res, next) {
  res.render('proposed-legislation/list', { title: '발의 법륜안' });
});


/**
 * 본회의 처리안건 Database init Insert 로직
 */
router.get('/database/init/insert/agenda', isAdmin, function(req, res, next) {

  initInsertAgenda();

  // 적절한 응답 전송
  res.json({ message: '본회의 처리안건 데이터베이스 삽입 완료' });

});



/**
 * 본회의 처리안건 메뉴
 */
router.get('/agenda', function(req, res, next) {

  // API 요청을 보낼 주소
  const apiUrl = 'https://open.assembly.go.kr/portal/openapi/nwbpacrgavhjryiph';
  
  axios.get( apiUrl, {
    params : {
      KEY : OPEN_API_KEY,
      AGE : 21
    }
  })
  .then( function (response){
    // XML 데이터를 JSON으로 변환
    parseString(response.data, { explicitArray: false }, function (err, result) {
      if (err) {
        console.error('XML 파싱 중 오류 발생:', err);
        // 오류 발생 시 적절한 응답 전송
        res.status(500).json({ error: '서버에서 데이터를 파싱하는 중 오류가 발생했습니다.' });
        return;
      }
      // JSON 형식으로 변환된 데이터를 클라이언트에게 전달
      console.log( result );
      //console.log( result.nwbpacrgavhjryiph.head[0].list_total_count[0]);
      //console.log( result.nwbpacrgavhjryiph.head );
      //console.log( result.nwbpacrgavhjryiph.row.length );
      //res.render('agenda/list', { title: '본회의 처리안건' , dataList : result  });
      res.json(result);
    });


    
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  


  
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
