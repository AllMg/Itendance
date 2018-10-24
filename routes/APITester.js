const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');


router.post('/test',function(req, res){
  const data = req.body.message;
  var topicReq = req.body.topicReq;
  var topicRes = req.body.topicRes;
  kafkaConfig.kafkaAPI(topicReq,topicRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Test Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/testObject',function(req, res){
  const data = req.body.message;
  var topicReq = req.body.topicReq;
  var topicRes = req.body.topicRes;
  kafkaConfig.kafkaAPI(topicReq,topicRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Test Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
