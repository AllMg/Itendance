const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/infoBanqueEmpl',function(req,res){
  const identifiant = req.body.identifiant;
  var topicLogReq = "listBanqueCompteByIdEmpl";
  var topicLogRes = "listBqCompteIdEmpl";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Banque Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.get('/listBanque',function(req,res){
  const identifiant = req.body.identifiant;
  var topicLogReq = "listBanque";
  var topicLogRes = "listBq";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Banque Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.post('/listLieuAgence',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "listBanqueAgence";
  var topicLogRes = "listBqAgence";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Banque Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.get('/listPays',function(req,res){
  const identifiant = "";
  var topicLogReq = "getallpaysreq";
  var topicLogRes = "getallpaysres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Banque Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.post('/modifCompteBancaire',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "updateBanqueCompte";
  var topicLogRes = "updateBqCompte";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Banque Service API : "+data })
    }else {
      res.json({success:!err,msg:"Data saved"});
    }
  })
});

router.post('/listAgenceByBanque',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "listBanqueAgenceByBanque";
  var topicLogRes = "listAgenceByBanque";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Banque Service /listAgenceByBanque : "+data })
    }else {
      res.json({success:!err,msg:data});
    }
  })
});


router.post('/compte', function(req, res) {
  const data = req.body.data;
  var topicLogReq = "ajoutBanqueCompte";
  var topicLogRes = "ajoutBqCompte";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Banque Service : "+data })
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
module.exports = router;
