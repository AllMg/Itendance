const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/reference',function(req,res){
  let data = req.body.data;
  var topicLogReq = "PenreferenceIJreq";
  var topicLogRes = "PenreferenceIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, reference : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demande', function(req,res){
  var data = req.body.data;
  var topicLogReq = "PendemandeIJreq";
  var topicLogRes = "PendemandeIJres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/input/libelle',function(req,res){
  let data = req.body.data;
  var topicLogReq = "PenlisteTecInfoReqLibellereq";
  var topicLogRes = "PenlisteTecInfoReqLibelleres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, list libelle : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});
router.post('/piece/libelle',function(req,res){
  let data = req.body.data;
  var topicLogReq = "PenlisteTecPcsReqLibellereq";
  var topicLogRes = "PenlisteTecPcsReqLibelleres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, list piece : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/demande-libelle',function(req,res){
  let data = req.body.data;
  var topicLogReq = "findbyidRefTecDmdPenreq";
  var topicLogRes = "findbyidRefTecDmdPenres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, list piece : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/liste',function(req,res){
  let data = req.body.data;
  var topicLogReq = "AllDemandePrestTabreq";
  var topicLogRes = "listeDemanderes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, list piece : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.get('/detail/:id',function(req,res){
  let data = req.params.id;
  var topicLogReq = "PenDetailDemandeByIdreq";
  var topicLogRes = "PenDetailDemandeByIdres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,data,function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, list piece : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/changer',function(req,res){
  let data = req.body.data;
  var topicLogReq = "changerEtatDemandePenreq";
  var topicLogRes = "changerEtatDemandePenres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, list piece : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/valide-conjoint',function(req,res){
  let data = req.body.data;
  var topicLogReq = "validationMajConjReq";
  var topicLogRes = "validationMajConjRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, list piece : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/ajout-enfant',function(req,res){
  let data = req.body.data;
  var topicLogReq = "ajoutTierReq";
  var topicLogRes = "ajoutTierRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, reference : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/nombre-page',function(req,res){
  let data = req.body.data;
  var topicLogReq = "PennombrePageParPrestationEtatTabreq";
  var topicLogRes = "PennombrePageParPrestationEtatTabres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, reference : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.post('/liste-etat',function(req,res){
  let data = req.body.data;
  var topicLogReq = "PenlisteRefEtatTypreq";
  var topicLogRes = "PenlisteRefEtatTypres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Demande PEN Service, reference : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

module.exports = router;
