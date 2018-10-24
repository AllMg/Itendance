const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/liste_demande_rfa',function(req,res){
  const msg = req.body.data;
  console.log("demande rfa ",msg);
  var topicLogReq = "";
  var topicLogRes = "";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info rfa Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/sme_rfa',function(req,res){
  const msg = req.body.data;
  console.log("sem rfa ",msg);
  var topicLogReq = "findSmeByDateAndRegimeReq";
  var topicLogRes = "findSmeByDateAndRegimeRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info rfa Service, sem : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/droitRfa',function(req,res){
  const msg = req.body.data;
  console.log("droit rfa ",msg);
  var topicLogReq = "droitByIdDemandereq";
  var topicLogRes = "droitByIdDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info rfa Service, rfa : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/detailsRfa',function(req,res){
  const msg = req.body.data;
  console.log("sem rfa ",msg);
  var topicLogReq = "detailRfareq";
  var topicLogRes = "detailRfares";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info rfa Service, details rfa : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/validerSME',function(req,res){
  const msg = req.body.data;
  console.log("Validation SME ",msg);
  var topicLogReq = "updateRfaOrdDetreq";
  var topicLogRes = "updateRfaOrdDetres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info rfa Service, sem : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/updateRfa', function (req, res) {
  const msg = req.body.data;
  console.log("update rfa: data = ", msg);
  var topicLogReq = "majTecInfoRecuListreq";
  var topicLogRes = "majTecInfoRecuListres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Rfa Service, fiche rfa: " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});


module.exports = router;