const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/affiche-cie',function(req, res){
  const id_empl = req.body.id;
  var topicLogReq = "findCieOneByEmplReq";
  var topicLogRes = "findCieOneByEmplRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,id_empl,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Compte Individu Employeur Service : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/affiche-cie-periode',function(req, res){
  const obj = {
	employeur: req.body.employeur,
	item: req.body.item
  };
  var topicLogReq = "findCieByEmplByAnneeReq";
  var topicLogRes = "findCieByEmplByAnneeRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(obj),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Compte Individu Employeur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/affiche-allcie-page/:page',function(req, res){
  const page = req.params.page;
  var topicLogReq = "listeCieReq";
  var topicLogRes = "listeCieRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,page,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Compte Individu Employeur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/affiche-periode',function(req, res){
  const obj = {
    employeur: req.body.employeur,
    item: req.body.item
  };
  console.log(req.body.item);
  var topicLogReq = "findCieByPeriodeReq";
  var topicLogRes = "findCieByPeriodeRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(obj),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Compte Individu Employeur Service Per : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
