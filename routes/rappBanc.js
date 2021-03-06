const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/rappBancTopic',function(req,res){
  const datas = req.body.data;
  const topicLogReq = datas.fonction+"req";
  const topicLogRes = datas.fonction+"res";
  var argument = null;
  if(datas.enJSON == true){
    argument = JSON.stringify(datas.argument);
  }
  else{
    argument = datas.argument;
  }
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, argument, function(err,data){
    if(err){
      res.json({
        sucess: !err,
        msg: data
      });
    }
    else {
      res.json({
        success: !err,
        msg: data
      });
    }
  });
});

router.post('/getGrandlivre',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "getGrandlivrereq";
  const topicLogRes = "getGrandlivreres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(argument), function(err,data){
    if(err){
      res.json({
        success: !err,
        msg: data
      });
    }
    else {
      res.json({
        success: !err,
        msg: data
      });
    }
  });
});

router.post('/getGLDR',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "getGLDRreq";
  const topicLogRes = "getGLDrres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(argument), function(err,data){
    if(err){
      res.json({
        success: !err,
        msg: data
      });
    }
    else {
      res.json({
        success: !err,
        msg: data
      });
    }
  });
});

router.post('/getBanqueByAbrevCF', function (req, res) {
  const msg = req.body.data;
  var topicLogReq = "getBanqueByAbrevCFreq";
  var topicLogRes = "getBanqueByAbrevres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      console.log(err);
      res.json({ sucess: !err, msg: "Import relevé banquaire: " + data });
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/listeRecette', function (req, res) {
  const msg = req.body.data;
  var topicLogReq = "listeRecettereq";
  var topicLogRes = "listeRecetteres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      console.log(err);
      res.json({ sucess: !err, msg: "Lecture relevé banquaire: " + data });
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});


module.exports = router;