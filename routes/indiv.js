const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

// var Adresse = require('../src/app/models/Adresse');
router.post('/infoIndividu', function (req, res) {
  const identifiant = req.body.identifiant;
  var topicLogReq = "findbyidrefsigindividusreq";
  var topicLogRes = "findbyidrefsigindividusres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Info Individu Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  })
});

router.post('/infoITCIT', function (req, res) {
  const identifiant = req.body.identifiant;
  const data = {
    travailleur_matricule: identifiant
  }
  var topicLogReq = "getbytravailleurcitreq";
  var topicLogRes = "getbytravailleurcitres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data), function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "CIT Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
});
 
router.get('/getActivity/:id', function (req, res) {
  const identifiant = req.params.id;
  var topicLogReq = "findactiviteReq";
  var topicLogRes = "findactiviteRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "CIT Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
}); 
//maka employeur

router.get('/getEmployeur/:matr_empl', function (req, res) {
  const identifiant = req.params.matr_empl;
  var topicLogReq = "findLastEmplByIndivReq";
  var topicLogRes = "findLastEmplByIndivRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "CIT Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
}); 

router.post('/infoBanque', function (req, res) {
  const identifiant = req.body.identifiant;
  var topicReq = "listBanqueCompteByIdIndividu";
  var topicRes = "listBqCompteIdIndividu";
  kafkaConfig.kafkaConnector(topicReq, topicRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Banque Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
});

router.post('/infoAdresse', function (req, res) {
  const identifiant = req.body.identifiant;
  var topicReq = "getbyindividusigadressereq";
  var topicRes = "getbyindividusigadresseres";
  kafkaConfig.kafkaConnector(topicReq, topicRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
});

router.post('/listeFokontany', function (req, res) {
  const identifiant = req.body.libelle;
  var topicReq = "getbynomrefsigfktreq";
  var topicRes = "getbynomrefsigfktres";
  kafkaConfig.kafkaConnector(topicReq, topicRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse Service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
});

router.post('/ajoutAdresse', function (req, res) {
  var topicReq = "savesigadrreq";
  var topicRes = "savesigadrres";
  kafkaConfig.kafkaConnector(topicReq, topicRes, JSON.stringify(req.body.data), function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse Service : " + data})
    } else {
      res.json({success: !err, msg: "Mise à jour de l'adresse réussi"});
    }
  });
});

router.post('/infoAdr', function (req, res) {
  const identifiant = req.body.identifiant;
  var topicReq = "getbyindividusigadrreq";
  var topicRes = "getbyindividusigadrres";
  
  kafkaConfig.kafkaConnector(topicReq, topicRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Adresse ADR service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }
  });
});
router.post('/infoFamille', function (req, res) {
  const identifiant = req.body.identifiant;
  var topicReq = "famillereq";
  var topicRes = "familleres";
  kafkaConfig.kafkaConnector(topicReq, topicRes, identifiant, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Famille service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }
  });
});
router.post('/infoPays', function (req, res) {
  const id = req.body.id;
  var topicReq = "getbyidrefsigpaysreq";
  var topicRes = "getbyidrefsigpaysres";
  kafkaConfig.kafkaConnector(topicReq, topicRes, id, function (err, data) {
    if (err) {
      res.json({sucess: !err, msg: "Pays service : " + data})
    } else {
      res.json({success: !err, msg: data});
    }

  });
});

router.post('/infoFiraisana',function(req,res){
  const id = req.body.id;
  var topicReq = "getbyidrefsigfirreq";
  var topicRes = "getbyidrefsigfirres";
  kafkaConfig.kafkaConnector(topicReq,topicRes,id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Firaisana service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  });
});
router.post('/new',function(req,res){

  var topicReq = "ajoutrefsigindividusreq";
  var topicRes = "ajoutrefsigindividusres";
  const data = req.body.data;
  kafkaConfig.kafkaConnector(topicReq,topicRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Individu service : "+data})
    }else {
      res.json({success:!err,msg:"Nouvelle individu enregistré"});
    }
  });
});




router.get('/sexe',function(req,res){
  var topicReq = "listerefsexereq";
  var topicRes = "listerefsexeres";
  kafkaConfig.kafkaConnector(topicReq,topicRes,"",function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Individu Sexe service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.get('/statu/:entity',function(req,res) {
  const name = req.params.entity;
  var topicLogReq = "findbyabrevreq";
  var topicLogRes = "findbyabrevres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,name,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Individu Status Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.get('/histDroits/:id_acces',function(req,res){
  const id = req.params.id_acces;
  var topicReq = "listetrsordliquibybeneficiaireReq";
  var topicRes = "listebybeneficiairetrsordliquiRes";
  kafkaConfig.kafkaConnector(topicReq,topicRes,id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Hisorique droit service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  });
});

router.post('/histDetailsDroits',function(req,res){
  const id = req.body.id;
  var topicReq = "findOneByIdtrsordliquireq";
  var topicRes = "findOneByIdtrsordliquires";
  kafkaConfig.kafkaConnector(topicReq,topicRes,id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Hisorique droit service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  });
});


router.post('/detailsPrestation',function(req,res){
  const id = req.body.id;
  var topicReq = "findbyidRefTecDmdreq";
  var topicRes = "findbyidRefTecDmdres";
  kafkaConfig.kafkaConnector(topicReq,topicRes,id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Hisorique droit service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }

  });
});

module.exports = router;
