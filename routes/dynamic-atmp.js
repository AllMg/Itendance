const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.get('/reference',function(req,res){
  let dr = req.query.dr;
  let prestation = req.query.prestation;
  var topicLogReq = "referenceAtmpReq";
  var topicLogRes = "referenceAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify({dr:dr, prestation: prestation}),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, reference : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demande', function(req,res){
  var data = req.body.data;
  var topicLogReq = "demandeAtmpReq";
  var topicLogRes = "demandeAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/input/libelle/:id',function(req,res){
  const idDAT = req.params.id;
  var topicLogReq = "listeTecInfoReqLibelleAtmpReq";
  var topicLogRes = "listeTecInfoReqLibelleAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,idDAT,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, list libelle : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.get('/piece/libelle/:id',function(req,res){
  const idDAT = req.params.id;
  var topicLogReq = "listeTecPcsReqLibelleAtmpReq";
  var topicLogRes = "listeTecPcsReqLibelleAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,idDAT,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, list libelle pièce: "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.get('/piece/info/:id',function (req,res) {
  const idDAT = req.params.id;
  var topicLogReq = "findByidPieceRefPcsInfoRequiseAtmpReq";
  var topicLogRes = "findByidPieceRefPcsInfoRequiseAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,idDAT,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, list piece info libelle pièce: "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.get('/piece/recu/info/:id',function (req,res) {
  const idDAT = req.params.id;
  var topicLogReq = "findByIdAccTecPcsInfoRecueAtmpReq";
  var topicLogRes = "findByIdAccTecPcsInfoRecueAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,idDAT,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, list piece info libelle pièce: "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.get('/demandes',function(req,res){
  const data = {
    type_etat : req.query.etat,
    pagination : req.query.pagination,
    prestation : req.query.prestation,
    size : req.query.size
  }
  console.log(data);
  var topicLogReq = "listeDemandeByEtatAndPrestationAtmpReq";
  var topicLogRes = "listeDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, list demande : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.get('/demande/:id',function(req,res){
  const id = req.params.id;
  var topicLogReq = "findByReferenceAtmpReq";
  var topicLogRes = "findByReferenceAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, extration d'une demande : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});

router.get('/demandes/count',function(req,res){
  const data = {
    type_etat : req.query.etat,
    pagination : req.query.pagination,
    prestation : req.query.prestation,
    size : req.query.size
  }

  var topicLogReq = "nombrePageParEtatAtmpReq";
  var topicLogRes = "nombrePageParEtatAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande ATMP Service, pagination : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.get('/types',function(req,res){
  var topicLogReq = "listeRefEtatTypAtmpReq";
  var topicLogRes = "listeRefEtatTypAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,'',function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Type ATMP Service, list type : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});

router.put('/etat',function(req,res){
  const msg = req.body.data;
  console.log("save op in ij: data = ",msg);
  var topicLogReq = "changerEtatDemandeAtmpReq";
  var topicLogRes = "changerEtatDemandeAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Ij Service, fiche ij demande ij val : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.get('/libelle/:reference', function(req,res){

  var topicLogReq = "listeTecInfoRecuParDemandeAtmpReq";
  var topicLogRes = "listeTecInfoRecuParDemandeAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,req.params.reference,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, donnée reçue : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.post('/referentielle', function(req,res){
  var data = req.body.data;
  var topicLogReq = "saveTecRelDmdAtmpReq";
  var topicLogRes = "saveTecRelDmdAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, Save Reférence : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});

router.post('/prestation', function(req,res){
  const data = req.body.data;
  var topicLogReq = "saveTecRelDmdAtmpReq";
  var topicLogRes = "saveTecRelDmdAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, donnée reçue : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});

router.put('/etat',function(req,res){
  const data = req.body.data;
  var topicLogReq = "changerEtatDemandeAtmpReq";
  var topicLogRes = "changerEtatDemandeAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, donnée reçue : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.get('/getinfo/:idacc',function(req,res){
  const data = req.params.idacc;
  var topicLogReq = "findByIdAccTecPcsInfoRecueAtmpReq";
  var topicLogRes = "findByIdAccTecPcsInfoRecueAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, donnée reçue : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.get('/getEntite/:idacces',function(req,res){
  const data = req.params.idacces;
  var topicLogReq = "findbyidaccesreq";
  var topicLogRes = "findbyidaccesres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, donnée reçue : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.get('/prestation/:id', function(req,res){
  var topicLogReq = "findbyidRefTecDmdAtmpReq";
  var topicLogRes = "findbyidRefTecDmdAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,req.params.id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, donnée reçue : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.get('/demande/exist/:id', function(req,res){
  var topicLogReq = "testReferenceAtmpReq";
  var topicLogRes = "testReferenceAtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,req.params.id,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, donnée reçue : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.post('/fm/mere', function (req,res){
  var data = req.body.data;
  var topicLogReq = "saveMereReq";
  var topicLogRes = "saveMereRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, Insertion FM Mère : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.post('/fm/fille', function (req,res){
  var data = req.body.data;
  console.log(data);
  var topicLogReq = "saveListeFilleReq";
  var topicLogRes = "saveListeFilleRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, Insertion FM Mère : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.post('/sme',function(req,res){
  const name =req.body.data;
  var topicLogReq = "findSmeByDateAndRegimeReq";
  var topicLogRes = "findSmeByDateAndRegimeRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(name),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Liste des demandes : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.post('/saveIJ',function(req,res){
  const name = req.body.data;
  var topicLogReq = "iJDatAtmpReq";
  var topicLogRes = "iJDatAtmpRes";
  console.log(name);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(name),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Liste des demandes : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.post('/ValidateFF',function(req,res){
  const name = req.body.data;
  var topicLogReq = "fd3AtmpReq";
  var topicLogRes = "fd3AtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(name),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ VlidateFF : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.get('/getMother/:idaccfils',function(req,res){
  const name = req.params.idaccfils;
  var topicLogReq = "demandeMereAtmpReq";
  var topicLogRes = "demandeMereAtmpRes";
  console.log(name);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,name,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Liste get mother : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.post('/getDNindiv',function(req,res){
  const name = req.body.data;;
  var topicLogReq = "findDnIndivByIdIndivAndDateDnReq";
  var topicLogRes = "findDnIndivByIdIndivAndDateDnRes";
  console.log(name);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(name),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Liste get mother : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.post('/saverente1',function(req,res){
  const name = req.body.data;
  var topicLogReq = "saverentemortelleReq";
  var topicLogRes = "saverentemortelleRes";
  console.log(name);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(name),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Sauvegarde Rente1 : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.post('/saverente2',function(req,res){
  const name = req.body.data;
  var topicLogReq = "saveMortelleReq";
  var topicLogRes = "saveMortelleRes";
  console.log(name);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(name),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Sauvegarde Famille  : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.post('/SafeFD1', function (req,res){
  var data = req.body.data;
  console.log('tena tonga');
  console.log(data);
  var topicLogReq = "fd1AtmpReq";
  var topicLogRes = "fd1AtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service, Insertion FD1   : "+data})
    }else {
      res.json({success: !err, msg: data});
    }

  });
});
router.post('/ipp',function(req,res){
  const name = req.body.data;
  var topicLogReq = "saveRenteIppReq";
  var topicLogRes = "saveRenteIppRes";
  console.log(name);
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(name),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Sauvegarde Rente IPP  : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.get('/medicaments/:reference', function(req,res){
  const reference = req.params.reference;
  var topicLogReq = "getMereFilleReq";
  var topicLogRes = "getMereFilleRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,reference,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ VlidateFF : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.put('/medicaments',function(req,res){
  const filles = req.body.data;
  var topicLogReq = "updatevalideListeReq";
  var topicLogRes = "updatevalideListeRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(filles),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ VlidateFF : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.put('/medicaments/mere',function(req,res){
  const filles = req.body.data;
  var topicLogReq = "updateisvalidemereReq";
  var topicLogRes = "updateisvalidemereRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(filles),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ VlidateFF : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.put('/medicaments/montant',function(req,res){
  const filles = req.body.data;
  var topicLogReq = "updatemontantsemReq";
  var topicLogRes = "updatemontantsemRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(filles),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Prix SEM : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.post('/FM', function(req, res){
  const data = req.body.data;
  var topicLogReq = "fmAtmpReq";
  var topicLogRes = "fmAtmpRes";
  console.log(JSON.stringify(data));
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Prix SEM : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
router.post('/FP', function(req, res){
  const data = req.body.data;
  var topicLogReq = "fd2AtmpReq";
  var topicLogRes = "fd2AtmpRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Prix SEM : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.get('/protheses/:libelle', function (req, res) {
  const data = req.params.libelle;
  var topicLogReq = "findProthesebyLibelleReq";
  var topicLogRes = "findProthesebyLibelleRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Prothèse List : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.get('/prothese/:id', function(req, res){
  const data = req.params.id;
  var topicLogReq = "findProthesebyIdReq";
  var topicLogRes = "findProthesebyIdRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"ATMP Service/ Prothèse List: "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});
module.exports = router;
