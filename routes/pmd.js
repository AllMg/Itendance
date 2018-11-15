const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

//Données pmd-mail 
router.get('/listePmdMail', function (req, res) {
    var topicLogReq = "refPmdMailReq";
    var topicLogRes = "refPmdMailRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, "", function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Données pmd-mail : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});
//Données pmd-mail by id_empl
router.get('/listePmdMailByIdEmpl/:EMPLOYEUR_MATRICULE', function (req, res) {
    const msg = req.params.EMPLOYEUR_MATRICULE;
    var topicLogReq = "refPmdMailByIdEmplReq";
    var topicLogRes = "refPmdMailByIdEmplRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Données pmd-mail by id_empl : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});

module.exports = router;