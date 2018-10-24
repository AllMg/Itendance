const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/affiche-mr',function(req, res){
  const id_empl = req.body.id;
  var topicLogReq = "findmrOneByEmplReq";
  var topicLogRes = "findmrOneByEmplRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,id_empl,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Majoration de retard Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/affiche-mr-periode',function(req, res){
  const obj = {
    employeur: req.body.employeur,
    item: req.body.item
  };
  var topicLogReq = "findMrByEmplByAnneeReq";
  var topicLogRes = "findMrByEmplByAnneeRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(obj),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Majoration de retard Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

module.exports = router;
