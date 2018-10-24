const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/demandeij', function (req, res) {
  const msg = req.body.data;
  console.log("demandeij ", msg);
  var topicLogReq = "demandeIJreq";
  var topicLogRes = "calculedroitIJres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, demande : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/demandeij2', function (req, res) {
  const msg = req.body.data;
  console.log("demandeij2 ",msg);
  var topicLogReq = "demandeIJreq";
  var topicLogRes = "traitement422res";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, demande ij2 : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/refij', function (req, res) {
  const msg = req.body.data;
  console.log("refij", msg);
  var topicLogReq = "referenceIJreq";
  var topicLogRes = "referenceIJres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, reference : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/listeTecInfoReqLibelle', function (req, res) {
  const msg = req.body.data;
  console.log("list libelle", msg);
  var topicLogReq = "listeTecInfoReqLibellereq";
  var topicLogRes = "listeTecInfoReqLibelleres";
  console.log(msg);
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, list libelle : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/listeEmployeur', function (req, res) {
  const msg = req.body.data;
  console.log("list employeur: id individu = ", msg);
  var topicLogReq = "listtravemplreq";
  var topicLogRes = "listInfoemploiId";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, list employeur : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/listedemandeij', function (req, res) {
  const msg = req.body.data;
  console.log("list dmd ij: ij = ", msg);
  var topicLogReq = "listeDemandereq";
  var topicLogRes = "listeDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, list demande ij : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/piecesrequis', function (req, res) {
  const msg = req.body.data;
  console.log("pieces requises ij: data = ", msg);
  var topicLogReq = "listeTecPcsReqLibellereq";
  var topicLogRes = "listeTecPcsReqLibelleres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, pieces requise : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/champRequisVal', function (req, res) {
  const msg = req.body.data;
  console.log("champRequisVal : id dmd ij = ", msg);
  var topicLogReq = "listeTecInfoRecuParDemandereq";
  var topicLogRes = "listeTecInfoRecuParDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, fiche ij list champ val : " + data });

    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/detailsDemande', function (req, res) {
  const msg = req.body.data;
  console.log("fiche dmd ij: id dmd ij = ", msg);
  var topicLogReq = "detailDemandereq";
  var topicLogRes = "detailDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info détails demande Service, fiche détails demande list champ val : " + data });

    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/getDemandeIj', function (req, res) {
  const msg = req.body.data;
  console.log("fiche dmd ij: id dmd ij = ", msg);
  var topicLogReq = "findbyidAccueilreq";
  var topicLogRes = "findbyidAccueilres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/updateIj', function (req, res) {
  const msg = req.body.data;
  console.log("update ij: data = ", msg);
  var topicLogReq = "majTecInfoRecuListreq";
  var topicLogRes = "calculedroitIJres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/updateIj2', function (req, res) {
  const msg = req.body.data;
  console.log("update ij2: data = ", msg);
  var topicLogReq = "majTecInfoRecuListreq";
  var topicLogRes = "traitement422res";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/saveop', function (req, res) {
  const msg = req.body.data;
  console.log("save op in ij: data = ", msg);
  var topicLogReq = "ajoutTecopReq";
  var topicLogRes = "ajoutTecopRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/saveopforij', function (req, res) {
  const msg = req.body.data;
  console.log("saveopforIJ in ij: data = ", msg);
  var topicLogReq = "insertIdOPreq";
  var topicLogRes = "insertIdOPres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/changeEtatDemandeIj', function (req, res) {
  const msg = req.body.data;
  console.log("save op in ij: data = ", msg);
  var topicLogReq = "changerEtatDemandereq";
  var topicLogRes = "changerEtatDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Info Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/getDroitDemandeIj', function (req, res) {
  const msg = req.body.identifiant;
  console.log("getDroitDemandeIj: data = ", msg);
  var topicLogReq = "calculedroitIJreq";
  var topicLogRes = "calculedroitIJres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/controleIJ', function (req, res) {
  const msg = req.body.identifiant;
  console.log("controle ij: data = ", msg);
  var topicLogReq = "controleIJreq";
  var topicLogRes = "controleIJres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ success: !err, msg: "Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/decompteij', function (req, res) {
  const msg = req.body.data;
  console.log("decompte ij: data = ", msg);
  var topicLogReq = "decompteIJreq";
  var topicLogRes = "decompteIJres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ success: !err, msg: "Ij Service, fiche ij demande ij val : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/decompteij2',function(req,res){
  const msg = req.body.data;
  console.log("decompte ij2: data = ",msg);
  var topicLogReq = "decompteIJ2req";
  var topicLogRes = "decompteIJ2res";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({success:!err,msg:"Ij Service, decompte ij2 : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/etatdmd',function(req,res){
  const msg = req.body.data;
  console.log("etat dossier: data = ",msg);
  var topicLogReq = "etatDossierreq";
  var topicLogRes = "etatDossierres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({success:!err,msg:"Ij Service, decompte ij2 : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.get('/listeEtatDemandeIJ',function(req,res){
  console.log("listeEtatDemandeIJ ij ");
  var topicLogReq = "listeRefEtatTypreq";
  var topicLogRes = "listeRefEtatTypres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, "", function (err, data) {
    if (err) {
      res.json({ success: !err, msg: "Ij Service, liste Etat demande Ij PF : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/pagecount',function(req,res){
  const msg = req.body.data;
  console.log("page count: ij = ",msg);
  var topicLogReq = "nombrePageParEtatReq";
  var topicLogRes = "nombrePageParEtatRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, count : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demandeij1byindivbyprestation', function (req, res) {
  const msg = req.body.data;
  console.log("DemandeIj1 ij: id_indiv et prestation => ", msg);
  var topicLogReq = "referenceDemandeByPrestationAndIndividureq";
  var topicLogRes = "referenceDemandeByPrestationAndIndividures";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
    if (err) {
      res.json({ success: !err, msg: "Ij Service, verification si dmd Ij1 : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/demandePen',function(req,res){
  const msg = req.body.data;
  console.log("demandeij ",msg);
  var topicLogReq = "demandeIJreq";
  var topicLogRes = "demandeIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/nombrejourij1', function (req, res) {
  const msg = req.body.data;
  console.log("nombrejourij1 ij: iddemande => ", msg);
  var topicLogReq = "nombrejourij1req";
  var topicLogRes = "nombrejourij1res";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
    if (err) {
      res.json({ success: !err, msg: "Ij Service, nombrejourij1req Ij2 : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }
  });
});

router.post('/listeTecPcsRefLibellePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "listeTecPcsRefLibellePenreq";
  var topicLogRes = "listeTecPcsRefLibellePenres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Piece Pen, list libelle : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/listePcsLibellePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "listePcsLibellePenreq";
  var topicLogRes = "listePcsLibellePenres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Piece Pen, list libelle : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
module.exports = router;
