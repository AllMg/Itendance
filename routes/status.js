const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.get('/employeur',function(req, res){
  var topicLogReq = "listSigstatutempl";
  var topicLogRes = "liststatutempl";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,"",function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Status Employeur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
