var express = require('express');
var router = express.Router();
var Library = require('../models/library');
var uuid = require('uuid/v4');
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

router.post('/getQueList', function (req, res, next) {
  let body = req.body;
  let status = body.status;
  let cls = body.cls;
  let pjId = body.pj_id;
  // let searchWord = body.search_word;
  // let searchType = body.search_type;
  let sortType = body.sort_type;
  let reverse = body.reverse;
  let currentPage = body.page_number;
  let pageSize = body.per_page;
  let now = Date.now();
  let params = {};

  if (status) { // 生效中则采用下面时间搜索
    params = {
      'pj_id': pjId,
      'cls': cls,
      'start': {
        $gte: now
      },
      'end': {
        $lte: now
      }
    }
  } else {
    params = {
      'pj_id': pjId,
      'cls': cls,
      $or: [
        {'start': {$lte: now}},
        {'end': {$gte: now}}
      ]
    }
  }

  let libraryModel = Library.find(params).skip((currentPage - 1) * pageSize).limit(pageSize);
  if (sortType !== 0) {
    libraryModel = libraryModel.sort({[sortType]: reverse});
  }

  libraryModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        message: err.message
      });
    } else if (doc) {
      res.json({
        status: 0,
        message: 'success',
        result: doc
      });
    }
  });
});

router.post('/addQuestion', function (req, res, next) {
  let body = req.body;
  let now = Date.now();
  let start = body.start;
  let end = body.end;
  let status = (start <= now) && (end >= now);
  let params = {
    'pj_id': body.pj_id,
    'qid': uuid(), // 问题id
    'time': now,
    'question': body.question,
    'answer': body.answer,
    'cls': body.cls,
    'collection_num': 0,
    'approval_num': 0,
    'start': start, // 开始时间
    'end': end, // 失效时间
    'status': status, // 生效状态
    'answer_num': 0
  };
  Library.insert(params, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        message: err.message
      });
    } else if (doc) {
      res.json({
        status: 0,
        message: 'success',
        result: doc
      });
    }
  });
});

router.post('/updateQuestion', function (req, res, next) {
  let body = req.body;
  let now = Date.now();
  let start = body.start;
  let end = body.end;
  let status = (start <= now) && (end >= now);

  Library.updateOne({
    'pj_id': body.pj_id,
    'qid': body.qid // 问题id
  }, {
    'time': now,
    'question': body.question,
    'answer': body.answer,
    'cls': body.cls,
    'start': start, // 开始时间
    'end': end, // 失效时间
    'status': status // 生效状态
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        message: err.message
      });
    } else if (doc) {
      res.json({
        status: 0,
        message: 'success',
        result: doc
      });
    }
  });
});

router.post('/deleteQuestion', function (req, res, next) {
  let body = req.body;
  Library.remove({'pj_id': body.pj_id, 'qid': body.qid}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        message: err.message
      });
    } else if (doc) {
      res.json({
        status: 0,
        message: 'success',
        result: doc
      });
    }
  });
});

module.exports = router;
