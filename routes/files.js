const express = require('express');
const router = express.Router();
const FileUpload = require('../models/fileUploads');


router.post('/upload', function(req,res){
  const newFile = req.body.data;
  const file = new FileUpload({
    id_files: newFile.id_files,
    file: newFile.file,
    serviceName: newFile.serviceName,
    name: newFile.name,
    matricule: newFile.matricule,
    idType: newFile.idType
  });

  FileUpload.addFile(file, function(err,msg){
    if (err) {
      res.json({success: false, msg: 'Server de Fichier Service : Impossible de sauvegarder le ficher'});
    } else {
      res.json({success: true});
    }
  });
});
router.get('/readByIdFile/:idFile', function(req,res) {
  const idFile = req.params.idFile;

  FileUpload.getByIdFile(idFile, function(err,file){
    if (err) {
      res.json({success: false, msg: 'Server de Fichier Service : Impossible de trouver le fichier '+idFile});
    } else {
      res.json({success: true, msg:file});
    }
  });
});
router.post('/readFile',function(req,res){
  const fileQuery = req.body.data;
  FileUpload.getFile(fileQuery, (err,file) => {
    if (err) {
      res.json({success: false, msg: 'Server de Fichier Service : Impossible de trouver le(s) fichier(s)'});
    } else {
      res.json({success: true, msg:file});
    }
  });
});
router.put('/update', function (req,res) {
  const condition = req.body.condition;
  const set = req.body.set;
  FileUpload.updadteFile(condition,set, (err) => {
    if (err) {
      res.json({success: false, msg: 'Server de Fichier Service : Impossible de mettre à jour le(s) fichier(s) cause : '+err});
    } else {
      res.json({success: true, msg: 'La mise à jour a été effectué avec succes'});
    }
  });
});

module.exports = router;
