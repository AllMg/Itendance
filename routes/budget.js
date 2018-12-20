const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/budgetTopic',function(req,res){
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

router.post('/getCptbyGroupe',function(req,res){
  const datas = req.body.data;
  const topicLogReq = "getCptbyGroupeReq";
  const topicLogRes = "getCptbyGroupeRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(datas), function(err,data){
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

router.post('/getServiceDirection',function(req,res){
  const datas = req.body.data;
  const topicLogReq = "getServiceDirectionReq";
  const topicLogRes = "getServiceDirectionRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, datas, function(err,data){
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

router.post('/findByValideAndRefuseAndAnneeTefAprro',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "findByValideAndRefuseAndAnneeTefAprroReq";
  const topicLogRes = "findByValideAndRefuseAndAnneeTefAprroRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(argument), function(err,data){
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

router.post('/findByValideAndAnneeTefAprro',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "findByValideAndAnneeTefAprroReq";
  const topicLogRes = "findByValideAndAnneeTefAprroRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(argument), function(err,data){
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

module.exports = router;