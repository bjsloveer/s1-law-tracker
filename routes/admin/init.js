require('dotenv').config();

const axios = require('axios');
const { parseString } = require('xml2js');
const express = require('express');
const router = express.Router();


const initInsertAgenda = require('../../database/logic/agenda-insert-init')


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

/**
 * @author : admin 
 * 본회의 처리안건 Database init Insert 로직
 * /admin/
 */
router.get('/database/insert/agenda', isAdmin, function(req, res, next) {

    initInsertAgenda();
  
    // 적절한 응답 전송
    res.json({ message: '본회의 처리안건 데이터베이스 삽입 완료' });
  
  });
  module.exports = router;