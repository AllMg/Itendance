const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');


router.get('/flag/:flag/:page',function(req, res){
  const flag = req.params.flag;
  const page = req.params.page;
  const data = {
    page: page,
    flagValide: flag
  }
  var topicReq= "getallbyflagValideReq";
  var topicRes = "getallbyflagValideRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.get('/count/:flag',function(req, res){
  const flag = req.params.flag;
  var topicReq= "getnbPageReq";
  var topicRes = "getnbPageRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,flag,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Count Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/flag/:flag/op/:op',function(req, res){
  const flag = req.params.flag;
  const op = req.params.op;
  const send = op +','+flag;
  var topicReq= "getallbyIdopflagvalideReq";
  var topicRes = "getallbyIdopflagvalideRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,send,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/id/:id',function(req, res){
  const id = req.params.id;
  var topicReq= "listTecopByIdReq";
  var topicRes = "listTecopByIdRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/reglement',function(req, res){
  const data = req.body.data;
  var topicReq= "ajoutOpregleReq";
  var topicRes = "ajoutOpregleRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Reglement Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/reglementDetail',function(req, res){
  const data = req.body.data;
  var topicReq= "ajoutDetailsReglementOpReq";
  var topicRes = "ajoutDetailsReglementOpRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Reglement Detail Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.put('',function(req,res) {
  const data = req.body.data;
  var topicReq= "updateTecopReq";
  var topicRes = "updateTecopRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Reglement Detail Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/convertion/:number',function(req,res) {
  const number = req.params.number;
  var topicReq= "ConvertionLettreReq";
  var topicRes = "ConvertionLettreRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,number,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"OP Convertion Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
