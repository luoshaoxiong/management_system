var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var Project = require('../models/project');
var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/managementSystem', {useNewUrlParser: true});

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success');
});

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail');
});

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected');
});

router.get('/getProjectList', function (req, res, next) {
  Project.find({}, function (err, doc) {
    if (err) {
      res.json({
        code: 1,
        result: err.message
      });
    } else if (doc) {
      res.json({
        code: 0,
        result: doc
      });
    }
  });
});

router.post('/createProject', function (req, res, next) {
  let body = req.body;
  let params = {
    code: body.code,
    name: body.name,
    pj_id: uuid(),
    cls: ['分类一', '分类二', '分类三']
  };
  Project.insert(params, function (err, doc) {
    if (err) {
      res.json({
        code: 1,
        result: err.message
      });
    } else if (doc) {
      res.json({
        code: 0,
        result: doc
      });
    }
  });
});

router.post('/updateProject', function (req, res, next) {
  let body = req.body;
  Project.updateOne({
    pj_id: body.pj_id
  }, {
    code: body.code,
    name: body.name
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 1,
        result: err.message
      });
    } else if (doc) {
      res.json({
        code: 0,
        result: doc
      });
    }
  });
});

router.post('/deleteProject', function (req, res, next) {
  let body = req.body;
  Project.remove({pj_id: body.pj_id}, function (err, doc) {
    if (err) {
      res.json({
        code: 1,
        result: err.message
      });
    } else if (doc) {
      res.json({
        code: 0,
        result: doc
      });
    }
  });
});

module.exports = router;
