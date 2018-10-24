const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/affiche-crg',function(req, res){
  const id_empl = req.body.id;
  var topicLogReq = "findCrgOneByEmplReq";
  var topicLogRes = "findCrgOneByEmplRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,id_empl,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Commission Remise Gracieuse Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/affiche-crg-periode',function(req, res){
  const obj = {
    employeur: req.body.employeur,
    item: req.body.item
  };
  var topicLogReq = "findCrgByEmplByAnneeReq";
  var topicLogRes = "findCrgByEmplByAnneeRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(obj),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Commission Remise Gracieuse Service annnee : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

module.exports = router;
