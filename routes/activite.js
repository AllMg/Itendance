const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.get('/name/:name',function(req, res){
  const name = req.params.name;
  var topicLogReq = "findactivitebynamereq";
  var topicLogRes = "findactivitebynameres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,name,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Activite Employeur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
