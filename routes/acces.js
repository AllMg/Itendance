const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/new', function (req, res) {
  const data = req.body.data;
  var topicLogReq = "ajoutaccesreq";
  var topicLogRes = "ajoutaccesres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Acces Service : " + data })
    } else {
      res.json({ success: !err, msg: "Ajout Acces Réussi" });
    }
  });
});
module.exports = router;
