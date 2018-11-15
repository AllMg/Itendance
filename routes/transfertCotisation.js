const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

//Référence de la demande idacc
router.get('/refDemande', function (req, res) {
    var topicLogReq = "refDemandeReq";
    var topicLogRes = "refDemandeRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, "", function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Référence demande transfert Service : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});
//Liste des informations requises
router.get('/listeTransfertlibelle', function (req, res) {
    var topicLogReq = "listeTransfertlibelleReq";
    var topicLogRes = "listeTransfertlibelleRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, "", function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Info transfert Service, list libelle : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});
//Liste des pièces requises
router.get('/listeTransfertPiecesRequis', function (req, res) {
    var topicLogReq = "listeTransfertPiecesReq";
    var topicLogRes = "listeTransfertPiecesRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, "", function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Info transfert Service, pieces requise : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});
//Ajout nouvelle demande
router.post('/newDemandeTransfertCotisation', function (req, res) {
    const data = req.body.data;
    var topicLogReq = "demandeTransfertCotisationReq";
    var topicLogRes = "demandeTransfertCotisationRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data), function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Ajout demande transfert cotisation Service : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});
//Liste état demande
router.get('/listeEtatDemande', function (req, res) {
    var topicLogReq = "listeEtatReq";
    var topicLogRes = "listeEtatRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, "", function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Liste état demande transfert Service : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});
//Liste des demandes - Etat : Ok
router.post('/listeDemandeTransfertCotisation', function (req, res) {
    const data = req.body.data;
    var topicLogReq = "listeTransfertCotisationReq";
    var topicLogRes = "listeDemanderes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data), function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Liste demande transfert cotisation Service : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    })
});
//Liste des demandes sans état
router.post('/listeDemandeTransfertCotisationTous', function (req, res) {
    const data = req.body.data;
    var topicLogReq = "listeTransfertCotisationSansEtatReq";
    var topicLogRes = "listeDemanderes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data), function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Liste demande transfert cotisation Service tous : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    })
});
//Changer état demande
router.post('/changeEtatDemandeTransfert', function (req, res) {
    const msg = req.body.data;
    var topicLogReq = "changerEtatDemandeTransfertreq";
    var topicLogRes = "changerEtatDemandeTransfertres";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(msg), function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Changement état demande transfert : " + data })
        } else {
            res.json({ success: !err, msg: data });
        }
    });
});
//Détail d 'une demande
router.get('/detailDemandeTransfertCotisation/:idacc', function (req, res) {
    const msg = req.params.idacc;
    var topicLogReq = "detaildemandeReq";
    var topicLogRes = "detaildemandeRes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data, key) {
        if (err) {
            res.json({ sucess: !err, msg: "Détail transfert cotisation Service : " + data });
        } else {
            res.json({ success: !err, msg: data, key: key });
        }
    })
});
//Détail liste DN
router.get('/detailDemandeTransfertCotisationDN/:key', function (req, res) {
    var kay = req.params.key;
    var topicLogRes = "dnDetailTransfertres";
    kafkaConfig.kafkaListener(topicLogRes, kay, function (err, data) {
        if (err) {
            res.json({ sucess: !err, msg: "Détail transfert cotisation DN Service : " + data });
        } else {
            res.json({ success: !err, msg: data });
        }
    })
});
//Controle demande
router.get('/controleDemande/:matricule', function (req, res) {
    const msg = req.params.matricule;
    var topicLogReq = "controledemandereq";
    var topicLogRes = "controledemanderes";
    kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, msg, function (err, data, key) {
        if (err) {
            res.json({ sucess: !err, msg: "Controle transfert cotisation Service : " + data });
        } else {
            res.json({ success: !err, msg: data, key: key });
        }
    })
});

module.exports = router;
