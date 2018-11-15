const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');
router.post('/indicateur',function(req, res){
  var topicReq = "listedsvanneereq";
  var topicRes = "listedsvanneeres";
  const debut = req.body.debut;
  const fin = req.body.fin;
  var data={
    debut:debut,
    fin:fin
  }
  kafkaConfig.kafkaConnector(topicReq,topicRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Indicateur Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/histogramme',function(req, res){
  const annee = req.body.annee;
  var topicReq = "listedsvperiodereq";
  var topicRes = "listedsvperioderes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,annee,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Indicateur Hist Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/solde/annee/debut/:debut/fin/:fin',function(req,res){
  const debut = req.params.debut;
  const fin = req.params.fin;
  var topicReq = "listetauxsoldeanneereq";
  var topicres = "listetauxsoldeanneeres";
  var dataSend={
    debut:debut,
    fin:fin
  };


  kafkaConfig.kafkaConnector(topicReq,topicres,JSON.stringify(dataSend),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Indicateur Solde par année Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/solde/debut/:debut/fin/:fin',function(req,res){
  const debut = req.params.debut;
  const fin = req.params.fin;
  var topicReq = "listetauxreq";
  var topicres = "listetauxres";
  var dataSend={
    debut:debut,
    fin:fin
  };
  kafkaConfig.kafkaConnector(topicReq,topicres,JSON.stringify(dataSend),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Indicateur Solde Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/solde/periode/debut/:debut/fin/:fin',function(req,res){
  const debut = req.params.debut;
  const fin = req.params.fin;
  var topicReq = "listetauxsoldeperiodereq";
  var topicres = "listetauxsoldeperioderes";
  var dataSend={
    debut:debut,
    fin:fin
  };
  kafkaConfig.kafkaConnector(topicReq,topicres,JSON.stringify(dataSend),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Indicateur Solde Periode Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


module.exports = router;
