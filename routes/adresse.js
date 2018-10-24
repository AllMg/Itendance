const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/adresseEmpl',function(req,res){
  const data = req.body.identifiant;
  var topicLogReq = "getadressebyemplreq";
  var topicLogRes = "getadressebyemplres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Adresse Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.get('/nationalite/:page',function(req,res) {
  const page = req.params.page;
  var topicLogReq = "listesignatreq";
  var topicLogRes = "listesignatres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,page,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Nationalité Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});

router.get('/firaisana/name/:name',function(req,res) {
  const name = req.params.name;
  var topicLogReq = "getbynomrefsigfirreq";
  var topicLogRes = "getbynomrefsigfirres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,name,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Firaisana Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  })
});
router.get('/fokontany/name/:name', function (req, res) {
  const name = req.params.name;
  var topicReq = "getbynomrefsigfktreq";
  var topicRes = "getbynomrefsigfktres";
  kafkaConfig.kafkaConnector(topicReq, topicRes, name, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
});

router.get("/type",function(req,res) {
  var topicLogReq = "getallsigadrtypereq";
  var topicLogRes = "getallsigadrtyperes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, "", function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse Type Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  })
});


router.get("/travailleur/:id/type/:type",function(req,res){
  var topicReq = "getadressebyindivandtypereq";
  var topicRes = "getadressebyindivandtyperes";
  const id = req.params.id;
  const type = req.params.type;
  const dataSend = {
    id_individu: id,
    id_type: {
      id_type:type
    }
  }
  kafkaConfig.kafkaConnector(topicReq, topicRes,JSON.stringify(dataSend), function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse Individu Type Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  })
});

router.get("/employeur/:id/type/:type",function(req,res){
  var topicReq = "getadressebyemplandtypereq";
  var topicRes = "getadressebyemplandtyperes";
  const id = req.params.id;
  const type = req.params.type;
  const dataSend = {
    id_empl: id,
    id_type: {
      id_type:type
    }
  }
  kafkaConfig.kafkaConnector(topicReq, topicRes,JSON.stringify(dataSend), function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse Individu Type Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  })
});

module.exports = router;
