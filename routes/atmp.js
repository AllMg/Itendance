const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/demande',function(req,res){
  const data = req.body.data;
  console.log(data);
  var topicLogReq = "datReq";
  var topicLogRes = "datRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service / Nouvelle demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.get('/demande/pec/:pec',function(req,res){
  const name = req.params.pec;
  let page = req.query.page;
  let size = req.query.size;
  if (size==undefined) {
    size = 100
  }

  if (page==undefined) {
    page = 1
  }

  const data = {
    param: name,
    page: page,
    size: size
  }
  console.log(data);
  var topicLogReq = "findDatByPecReq";
  var topicLogRes = "findDatByPecRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Liste des demandes : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.get('/demande/identifiant/:id',function(req,res){
  const name = req.params.id;
  var topicLogReq = "findDatByidDatReq";
  var topicLogRes = "findDatByidDatRes";
  console.log(name);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,name,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Liste des demandes : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

 
module.exports = router;
