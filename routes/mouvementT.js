const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/listhisttrav',function(req,res){
  const identifiant = req.body.identifiant;
  var topicLogReq = "listhisttravvreq";
  var topicLogRes = "listhisttravvres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Mouvement Travailleur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.post('/listtrav',function(req,res){
  const identifiant = req.body.identifiant;
  var topicLogReq = "listtravemplvreq";
  var topicLogRes = "listtravemplvres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Mouvement Travailleur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.post('/ajoutTravailleur',function(req,res){
  var topicLogReq = "ajoutemploisreq";
  var topicLogRes = "ajoutemploisres";
  const data = req.body.data;
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes, JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Mouvement Travailleur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  });

  /*kafkaConfig.kafkaConnector(topicLog1Req,topicLog1Res, JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Mouvement Travailleur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })*/
});


router.post('/newIndivSansMatricule',function(req,res){

  var topicReq = "ajouttravailleurreq";
  var topicRes = "ajoutemploisres";
  const data = req.body.temp;
  console.log(data);
  kafkaConfig.kafkaConnector(topicReq,topicRes,JSON.stringify(data),function(err,data){
  //  console.log(data);
    if(err){
      res.json({sucess:!err,msg:"Individu service : "+data})
    }else {
      res.json({success:!err,msg:"Nouvelle individu enregistré"});
    }
  });
});


module.exports = router;
