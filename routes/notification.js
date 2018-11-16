const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/sendSMS', function (req, res) {
  const notif = {
    numero: req.body.numero,
    message: req.body.message
  };
  var topicLogReq = "envoiSmsreq";
  var topicLogRes = "envoiSmsres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(notif), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "SMS Service : " + data })
    } else {
      res.json({ success: !err, msg: "SMS envoyé avec succès" });
    }

  })
});

router.post('/sendEmail', function (req, res) {
  const data = {
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  };
  var topicLogReq = "envoiEmailreq";
  var topicLogRes = "envoiEmailres";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Email Service : " + data })
    } else {
      res.json({ success: !err, msg: "Email envoyé avec succès" });
    }

  })
});


router.post('/ajoutNotif', function (req, res) {
  const data = {
    expediteur: req.body.expediteur,
    destinataire: req.body.destinataire,
    referenceNotif: req.body.referenceNotif,
    titre: req.body.titre,
    message: req.body.message,
    typeNotif: req.body.typeNotif,
    dateEnvoi: req.body.dateEnvoi
  };
  var topicLogReq = "ajoutnotifReq";
  var topicLogRes = "ajoutnotifRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data), function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Ajout notification Service : " + data })
    } else {
      res.json({ success: !err, msg: "Ajout succès" });
    }

  })
});


router.post('/listNotif', function (req, res) {
  const data = req.body.data;
  var topicLogReq = "listenotifReq";
  var topicLogRes = "listenotifRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, data, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Notification Service : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }

  })
});


router.post('/detailsNotif', function (req, res) {
  const data = req.body.data;
  var topicLogReq = "findOneByIdnotifreq";
  var topicLogRes = "findOneByIdnotifRes";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, data, function (err, data) {
    if (err) {
      res.json({ sucess: !err, msg: "Notification Service : " + data })
    } else {
      res.json({ success: !err, msg: data });
    }

  })
});

module.exports = router;
