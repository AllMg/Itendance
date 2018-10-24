const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/infoAgent',function(req,res){
  const data = req.body.identifiant;
  const topicLogReq = "getServiceDirectionReq";
  const topicLogRes = "getServiceDirectionRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Direction Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

module.exports = router;
