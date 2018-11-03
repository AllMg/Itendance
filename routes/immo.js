const express = require('express');
const router = express.Router();
const kafkaConfig = require('../config/kafkaConfig');

router.post('/immoTopic',function(req,res){
  const data = req.body.data;
  const topicLogReq = data.fonction+"req";
  const topicLogRes = data.fonction+"res";
  kafkaConfig.kafkaConnector(topicLogReq, topicLogRes, JSON.stringify(data.argument), function(err,data){
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