const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/refDemande', function (req, res) {
   const msg = req.body.data;
  console.log("demande DLPR ",msg);
  var topicLogReq = "referenceIJreq";
  var topicLogRes = "referenceIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/SaveDlpr', function (req, res) {
  
   const msg = req.body.data.data;
  var topicLogReq = "PendemandeIJreq";
  var topicLogRes = "PendemandeIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Dlpr service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/listeChampReq',function(req,res){
  const msg = req.body.data;
  console.log("list libelle",msg);
  var topicLogReq = "PenlisteTecInfoReqLibellereq";
  var topicLogRes = "PenlisteTecInfoReqLibelleres";
  console.log(msg);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, list libelle : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.post('/piecesrequis',function(req,res){
  const msg = req.body.data;
  console.log("pieces requises ij: data = ",msg);
  var topicLogReq = "PenlisteTecPcsReqLibellereq";
  var topicLogRes = "PenlisteTecPcsReqLibelleres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, pieces requise : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.post('/validdlpr',function(req,res){
  const msg = req.body.data;
  console.log("list  DLPR ",msg);
  var topicLogReq = "saveDroitReq";
  var topicLogRes = "saveDroitRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info DLPR Service,   : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

module.exports = router;