const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/listeDemandeAp', function (req, res) {
    const data = req.body.identifiant;
    var topicLogReq = "get_liste_demande_ap_req";
    var topicLogRes = "get_liste_demande_ap_res";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, data, function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "AP Service : " + data })
        } else {
            res.json({ success: !err, msg: data });
        }
    })
});

router.post('/detailsAp', function (req, res) {
    const data = req.body.identifiant;
    var topicLogReq = "get_details_ap_req";
    var topicLogRes = "get_details_ap_res";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, data, function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "AP Service : " + data })
        } else {
            res.json({ success: !err, msg: data });
        }
    })
});
router.post('/demandeap',function(req,res){
  const msg = req.body.data;
  console.log("demande ap ",msg);
  var topicLogReq = "demandeIJreq";
  var topicLogRes = "traitement411res";
  kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,JSON.stringify(msg),function(err,data){
    if(err){
      res.json({sucess:!err,msg:"Info ap Service, demande : "+data})
    }else {
      res.json({success:!err,msg:data});
    }
  });
});

router.get('/traitementAP',function(req,res){
    const msg = req.body.data;
    console.log("traitement ",msg);
    var topicLogReq = "traitement411req";
    var topicLogRes = "traitement411res";
    kafkaConfig.kafkaConnector(topicLogReq,topicLogRes,"",function(err,data){
      if(err){
        res.json({sucess:!err,msg:"Info AP Service, demande AP : "+data})
      }else {
        res.json({success:!err,msg:data});
      }
    });
  });

  router.post('/updateAp', function (req, res) {
    const msg = req.body.data;
    console.log("update ij: data = ", msg);
    var topicLogReq = "majTecInfoRecuListreq";
    var topicLogRes = "traitement411res";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
      if (err) {
        res.json({ sucess: !err, msg: "Info Am1 Service, fiche Am1 : " + data })
      } else {
        res.json({ success: !err, msg: data });
      }
    });
  });

module.exports = router;
