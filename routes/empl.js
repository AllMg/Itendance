const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/infoEmployeur',function(req,res){
  const identifiant = req.body.identifiant;
  console.log("info employeur", identifiant)
  var topicLogReq = "listRefsigemplById";
  var topicLogRes = "listsigemplId";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Employeur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.get('responsableEmpl',function(req,res){
  var topicLogReq = "findResponsableEmpl";
  var topicLogRes = "findResp";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Employeur Responsable Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.get('/responsableEmpl/:id_access',function(req,res){
  const identifiant = req.params.id_access;
  var topicLogReq = "findResponsableEmpl";
  var topicLogRes = "findResp";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Employeur Responsable Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.put('/responsableEmpl',function(req,res){
  const data = req.body.data;
  var topicLogReq = "updateResponsable";
  var topicLogRes = "updateResp";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Employeur Responsable Service : "+data})
    }else {
      res.json({success:!err,msg:"Mise à jour réussi"});
    }
  });
});

router.post('/new',function(req, res){
  const data = req.body.data;
  var topicLogReq = "ajoutRefsigempl";
  var topicLogRes = "ajoutsigempl";
  console.log(data);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Nouveau Employeur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
