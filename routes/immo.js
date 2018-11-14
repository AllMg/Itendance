const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/immoTopic',function(req,res){
  const data = req.body.data;
  const topicLogReq = data.fonction+"req";
  const topicLogRes = data.fonction+"res";
  var argument = null;
  if(data.enJSON == true){
    argument = JSON.stringify(data.argument);
  }
  else{
    argument = data.argument;
  }
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, argument, function(err,data){
    if(err){
      res.json({
        sucess: !err,
        msg: data
      });
    }
    else {
      res.json({
        success: !err,
        msg: data
      });
    }
  });
});

module.exports = router;