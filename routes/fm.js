const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/demandefm',function(req,res){
  const msg = req.body.data;
  console.log("demande fm ",msg);
  var topicLogReq = "demandeIJreq";
  var topicLogRes = "traitement430res";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info FM Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

module.exports = router;