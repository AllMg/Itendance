const express = require('express');
const request = require('request');
const router = express.Router();
const jwt = require('jsonwebtoken');
const kafka = require('kafka-node');
const kafkaConfig = require('../config/kafkaConfig');
const kafkaHost = kafkaConfig.ip;

router.post('/connexionKafka',function(req,res){
  console.log(kafkaHost);
  const matricule = req.body.matricule;
  const password = req.body.pass;
  const agent = req.body.agent;
  var data={
    id_acces:matricule,
    mdp:password
  }
  var Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient({kafkaHost: kafkaHost});
  var topicLogReq = "loginreq";
  var topicLogRes = "loginres";
    producer = new Producer(client);
    var key = Date.now() + Math.random();
    var payloads = [
      { topic: topicLogReq, messages:JSON.stringify(data),key:key, partition: 0 }
    ];
  producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
      console.log("send "+payloads[0].key);
      var Consumer = kafka.Consumer;
      try{
        var consumer = new Consumer(
          client,
          [
            { topic: topicLogRes, partition: 0,}
          ],
          [
            {
              autoCommit: false
            },
            options =
              {
                fromOffset: 'latest'
              }
          ]
        );
        consumer.on('error', function (err) {
          console.log(err);
          res.json({success:false, msg:"Problème de réseau"})
        });
        consumer.on('message', function (message) {
          if(message.key== key){
            consumer.close(true,function(err,data){
              if(message.value=="null"){
                res.json({success:false, msg:"login/mot de passe incorrecte"});
              }else{
                let json;
                try{
                  json =  JSON.parse(message.value);
                  let jsonString = message.value;
                  if(json.type_entite==="P" || json.type_entite==="A" || json.type_entite==="O")
                  {
                    if(agent!=undefined)
                    {
                      var token = jwt.sign(json,"Stack",{
                        expiresIn: 604809
                      });
                      res.json({success: true,token: 'JWT '+token, data: jsonString});
                    }
                    else
                    {
                      res.json({success: false, msg: "Vous êtes un agent CNaPS"});
                    }
                  }
                  else
                  {
                    if(agent==undefined)
                    {
                      var token = jwt.sign(json,"Stack",{
                        expiresIn: 604809
                      });
                      res.json({success: true,token: 'JWT '+token, data: jsonString});
                    }
                    else
                    {
                      res.json({success: false, msg: "Vous n'êtes pas un agent CNaPS"});
                    }
                  }
                }catch(Error){
                  console.log(Error);
                  res.json({success:false, msg:"Erreur Interne : Problème de réseaux"})
                }


              }

            })
          }

        });
      }catch(error){
        res.json({sucess:false,msg:"Problème de reseau"})
      }

    });
  });
  producer.on('error', function (err) {
    res.json({success:false,msg:JSON.stringify(err)});
  })
});



module.exports = router;
