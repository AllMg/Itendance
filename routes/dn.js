const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

// router.get('/:id_empl',function(req,res){
//   const identifiant = req.params.id_empl;
//   var topicLogReq = "calculdnprerempliReq";
//   var topicLogRes = "calculdnprerempliRes";
//   console.log("ici");
//   kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
//     if(err){
//       res.json({sucess:!err,msg:"Info Dn Employeur: "+data})
//     }else {
//       res.json({success:!err,msg:data});
//     }
//   })
// });

router.get('/:id_empl/:periode',function(req,res){
  const alefa = {
    id_empl : req.params.id_empl,
    periode : req.params.periode
  };
  var topicLogReq = "calculdnpreremplieReq";
  var topicLogRes = "calculdnpreremplieRes";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(alefa),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info Dn Employeur: "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.get('/historique/:id_empl/:max/:page',function(req,res){
  const alefa = {
    id : req.params.id_empl,
    max : req.params.max,
    page : req.params.page
  };
  var topicLogReq = "historiquereq";
  var topicLogRes = "historiqueres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(alefa),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Historique Dn: "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

router.post('/',function(req,res){
  const msg = req.body;
  var topicLogReq = "declarationDNreq";
  var topicLogRes = "declarationDNres";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Save Dn error : "+data })
    }else {
      res.json({success:!err,msg:data});
    }
  })
});

// router.post('/file',function(req,res){
//   const msg = req.body;
//   var topicLogReq = "uploadDnReq";
//   var topicLogRes = "uploadDnRes";
//   kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
//     if(err){
//       res.json({sucess:!err,msg:"Save Dn error : "+data })
//     }else {
//       res.json({success:!err,msg:"Data saved"});
//     }
//   })
// });

// router.get('responsableEmpl',function(req,res){
//   var topicLogReq = "findResponsableEmpl";
//   var topicLogRes = "findResp";
//   kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
//     if(err){
//       res.json({sucess:!err,msg:"Info Employeur Responsable Service : "+data})
//     }else {
//       res.json({success:!err,msg:data});
//     }
//   })
// });

// router.get('/responsableEmpl/:id_access',function(req,res){
//   const identifiant = req.params.id_access;
//   var topicLogReq = "findResponsableEmpl";
//   var topicLogRes = "findResp";
//   kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,identifiant,function(err,data){
//     if(err){
//       res.json({sucess:!err,msg:"Info Employeur Responsable Service : "+data})
//     }else {
//       res.json({success:!err,msg:data});
//     }
//   })
// });

// router.put('/responsableEmpl',function(req,res){
//   const data = req.body.data;
//   var topicLogReq = "updateResponsable";
//   var topicLogRes = "updateResp";
//   kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(data),function(err,data){
//     if(err){
//       res.json({sucess:!err,msg:"Info Employeur Responsable Service : "+data})
//     }else {
//       res.json({success:!err,msg:"Mise à jour réussi"});
//     }
//   });
// });



module.exports = router;
