const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/affiche-solde',function(req, res){
  const id_empl = req.body.id;
  var topicLogReq = "findSoldeOneByEmplReq";
  var topicLogRes = "findSoldeOneByEmplRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,id_empl,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Solde Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
