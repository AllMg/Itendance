const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/demandeam1',function(req,res){
  const msg = req.body.data;
  console.log("demande am1 ",msg);
  var topicLogReq = "demandeIJreq";
  var topicLogRes = "traitement412res";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info am1 Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demandeam2',function(req,res){
  const msg = req.body.data;
  console.log("demande am2 ",msg);
  var topicLogReq = "demandeIJreq";
  var topicLogRes = "traitement413res";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info am2 Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/listeEnfantAm2',function(req,res){
  const msg = req.body.data;
  console.log("liste enfant am2 service ",msg);
  var topicLogReq = "listeEnfantByIdDemandereq";
  var topicLogRes = "listeEnfantByIdDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info am2 Service, iddemande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/getdemandeam1',function(req,res){
  const msg = req.body.data;
  console.log("demande am2 ",msg);
  var topicLogReq = "";
  var topicLogRes = "";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info am2 Service, iddemande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/traitementAM1',function(req,res){
    const msg = req.body.data;
    console.log("traitement ",msg);
    var topicLogReq = "traitement412req";
    var topicLogRes = "traitement412res";
    kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
      if(err){
        res.json({sucess:!err,msg:"Info AP Service, demande AP : "+data})
      }else {
        res.json({success:!err,msg:data});
      }
    });
  });

  router.post('/traitementAM2',function(req,res){
    const msg = req.body.data;
    console.log("traitement ",msg);
    var topicLogReq = "traitement413req";
    var topicLogRes = "traitement413res";
    kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
      if(err){
        res.json({sucess:!err,msg:"Info AP Service, demande AP : "+data})
      }else {
        res.json({success:!err,msg:data});
      }
    });
  });

  router.post('/updateAm1', function (req, res) {
    const msg = req.body.data;
    console.log("update ij: data = ", msg);
    var topicLogReq = "majTecInfoRecuListreq";
    var topicLogRes = "traitement412res";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
      if (err) {
        res.json({ sucess: !err, msg: "Info Am1 Service, fiche Am1: " + data })
      } else {
        res.json({ success: !err, msg: data });
      }
    });
  });

  router.post('/updateAm2', function (req, res) {
    const msg = req.body.data;
    console.log("update ij: data = ", msg);
    var topicLogReq = "majTecInfoRecuListreq";
    var topicLogRes = "traitement413res";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
      if (err) {
        res.json({ sucess: !err, msg: "Info Am2 Service, fiche Am2: " + data })
      } else {
        res.json({ success: !err, msg: data });
      }
    });
  });

module.exports = router;