const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/demandePen',function(req,res){
  const msg = req.body.data;
  console.log("demandeij ",msg);
  var topicLogReq = "PendemandeIJreq";
  var topicLogRes = "PendemandeIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/refPen',function(req,res){
  const msg = req.body.data;
  console.log("refij",msg);
  var topicLogReq = "PenreferenceIJreq";
  var topicLogRes = "PenreferenceIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, reference : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/listeTecInfoReqLibelle',function(req,res){
  const msg = req.body.data;
  console.log("list libelle",msg);
  var topicLogReq = "PenlisteTecInfoReqLibellereq";
  var topicLogRes = "PenlisteTecInfoReqLibelleres";
  console.log(msg);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, list libelle : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.post('/listedemandeij',function(req,res){
  const msg = req.body.data;
  console.log("list dmd ij: ij = ",msg);
  var topicLogReq = "PenlisteDemandereq";
  var topicLogRes = "PenlisteDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, list demande ij : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/piecesrequis',function(req,res){
  const msg = req.body.data;
  console.log("pieces requises ij: data = ",msg);
  var topicLogReq = "PenlisteTecPcsReqLibellereq";
  var topicLogRes = "PenlisteTecPcsReqLibelleres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, pieces requise : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/champRequisVal',function(req,res){
  const msg = req.body.data;
  console.log("fiche dmd ij: id dmd ij = ",msg);
  var topicLogReq = "PenlisteTecInfoRecuParDemandereq";
  var topicLogRes = "PenlisteTecInfoRecuParDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, fiche ij list champ val : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/getDemandePen',function(req,res){
  const msg = req.body.data;
  console.log("fiche dmd ij: id dmd ij = ",msg);
  var topicLogReq = "PenfindbyidAccueilreq";
  var topicLogRes = "PenfindbyidAccueilres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, fiche ij demande ij val : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.post('/changeEtatDemandeIj',function(req,res){
  const msg = req.body.data;
  console.log("save op in ij: data = ",msg);
  var topicLogReq = "PenchangerEtatDemandereq";
  var topicLogRes = "PenchangerEtatDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, fiche ij demande ij val : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.get('/listeEtatDemandeIJ',function(req,res){
  console.log("listeEtatDemandeIJ ij ");
  var topicLogReq = "PenlisteRefEtatTypreq";
  var topicLogRes = "PenlisteRefEtatTypres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,"",function(err,data){
    if(err){
      res.json({success:!err,msg:"Ij Service, liste Etat demande Ij PF : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/pagecountbyetat',function(req,res){
  const msg = req.body.etat;
  console.log("pagecounbytetat ij: etat => ",msg);
  var topicLogReq = "PennombrePageParEtatreq";
  var topicLogRes = "PennombrePageParEtatres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({success:!err,msg:"Ij Service, liste Etat demande Ij PF : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demandeij1byindivbyprestation',function(req,res){
  const msg = req.body.data;
  console.log("DemandeIj1 ij: id_indiv et prestation => ",msg);
  var topicLogReq = "PenreferenceDemandeByPrestationAndIndividureq";
  var topicLogRes = "PenreferenceDemandeByPrestationAndIndividures";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({success:!err,msg:"Ij Service, verification si dmd Ij1 : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demandePen',function(req,res){
  const msg = req.body.data;
  console.log("demandeij ",msg);
  var topicLogReq = "PendemandeIJreq";
  var topicLogRes = "PendemandeIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, demande : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});


router.post('/listeTecPcsRefLibellePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PenlisteTecPcsRefLibellereq";
  var topicLogRes = "PenlisteTecPcsRefLibelleres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      console.log("OK :",msg);
      res.json({sucess:!err,msg:"Info Piece Pen, list libelle : "+data});
    }else {
      console.log("Eurrer: "+err);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/listePcsLibellePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PenlistePcsLibellePenreq";
  var topicLogRes = "PenlistePcsLibellePenres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Piece Pen, list libelle : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/ajoutAyant',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PenajoutTecIndivAccreq";
  var topicLogRes = "PenajoutTecIndivAccres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log(err);
      res.json({sucess:!err,msg:"Info Ajout demande : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/listDemPen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PenAllDemandePrestreq";
  var topicLogRes = "PenAllDemandePrestres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("ok",err,msg);
      res.json({sucess:!err,msg:"Info liste Demande : "+data});
    }else {
      console.log("NON",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/listDemTabPen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "AllDemandePrestTabreq";
  var topicLogRes = "listeDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Info liste Demande : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/detailDemandePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PenDetailDemandeByIdreq";
  var topicLogRes = "PenDetailDemandeByIdres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      console.log(err);
      res.json({sucess:!err,msg:"Info Détail demande : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/pageDemandePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PennombrePageParPrestationEtatreq";
  var topicLogRes = "PennombrePageParPrestationEtatres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log(err);
      res.json({sucess:!err,msg:"Info Pagination : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/valideDemandePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "changerEtatDemandePenreq";
  var topicLogRes = "changerEtatIndivPenres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log(err);
      res.json({sucess:!err,msg:"Info valider demande : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/typeDemande',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "findbyidRefTecDmdPenreq";
  var topicLogRes = "findbyidRefTecDmdPenres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      console.log(err);
      res.json({sucess:!err,msg:"Info Type demande : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/getLibellePcsPen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PensionfindbyidTecPcsreq";
  var topicLogRes = "PenfindbyidTecPcsres";
  console.log("getLibelePcs =>"+msg);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Libelle pice : "+data});
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/nombrePage',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PennombrePageParPrestationEtatTabreq";
  var topicLogRes = "PennombrePageParPrestationEtatTabres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Info liste Demande : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/findAllStatusPage',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "getallstatuindivreq";
  var topicLogRes = "getallstatuindivres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/saveDLPRreqPage',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "saveDLPRreq";
  var topicLogRes = "saveDLPRres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/etatDossierDemande',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PenlisteRefEtatTypreq";
  var topicLogRes = "PenlisteRefEtatTypres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,msg,function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/findIsDemandeIndividu',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "DemandesPrestByIndivreq";
  var topicLogRes = "PenDetailDemandeByIdres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/changerEtatDemandePension',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "changerEtatDemandePensionreq";
  var topicLogRes = "changerEtatDemandePensionres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON etat demande",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK etat demande",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demandeTestDok',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "PendemandeIJreq";
  var topicLogRes = "traitementAsvtres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demandeTestBeta',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "saveDLPRreq";
  var topicLogRes = "saveDLPRres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/infoDemandePen',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "calculDroitAsvtreq";
  var topicLogRes = "calculDroitAsvtres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON Calcul",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK Calcul",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/verifierSiPensionExist',function(req,res){
  const msg = req.body.data;
  var topicLogReq = "nombreDroitAsvtreq";
  var topicLogRes = "nombreDroitAsvtres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      console.log("NON Calcul",err,msg);
      res.json({sucess:!err,msg:"Statu service : "+data});
    }else {
      console.log("OK Calcul",err,msg);
      res.json({success:!err,msg:data});
    }
  });
});

module.exports = router;
