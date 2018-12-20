const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/immoTopic',function(req,res){
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

/*router.post('/listeTypeEntrBatInt',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "listeTypeEntrBatIntreq";
  const topicLogRes = "listeTypeEntrBatIntres";
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

router.post('/listeCaractEntrBatInt',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "listeCaractEntrBatIntreq";
  const topicLogRes = "listeCaractEntrBatIntres";
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

router.post('/listeEnumEntrBatInt',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "listeEnumEntrBatIntreq";
  const topicLogRes = "listeEnumEntrBatIntres";
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

router.post('/listeEtatDmdMobInt',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "listeEtatDmdMobIntreq";
  const topicLogRes = "listeEtatDmdMobIntres";
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

router.post('/listeUtilesDmdBatInt',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "listeUtilesDmdBatIntreq";
  const topicLogRes = "listeUtilesDmdBatIntres";
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

router.post('/rechercheArticleInt',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "rechercheArticleIntreq";
  const topicLogRes = "rechercheArticleIntres";
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

router.post('/referenceDmdArticleInt',function(req,res){
  const argument = JSON.stringify(req.body.data);
  const topicLogReq = "referenceDmdArticleIntreq";
  const topicLogRes = "referenceDmdArticleIntres";
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

router.post('/listeArticleInt',function(req,res){
  const argument = JSON.stringify(req.body.data);
  const topicLogReq = "listeArticleIntreq";
  const topicLogRes = "listeArticleIntres";
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
});*/

router.post('/getAllRefDrhService',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "getAllRefDrhServiceReq";
  const topicLogRes = "getAllRefDrhServiceRes";
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

router.post('/getByIdRefDrhService',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "getByIdRefDrhServiceReq";
  const topicLogRes = "getByIdRefDrhServiceRes";
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

router.post('/ajouttravailleur',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "ajouttravailleurreq";
  const topicLogRes = "ajouttravailleurres";
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

router.post('/findByNumTefEntreeDetailsAprro',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "findByNumTefEntreeDetailsAprroReq";
  const topicLogRes = "findByNumTefEntreeDetailsAprroRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, argument, function(err,data){
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

router.post('/findByNumTefTefAprro',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "findByNumTefTefAprroReq";
  const topicLogRes = "findByNumTefTefAprroRes";
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

router.post('/findtiersbytrcnaps',function(req,res){
  const argument = req.body.data;
  const topicLogReq = "findtiersbytrcnapsReq";
  const topicLogRes = "findtiersbytrcnapsRes";
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

module.exports = router;