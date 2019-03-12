var mongoose = require('mongoose');

var librarySchema = new mongoose.Schema({
  'pj_id': String,
  'qid': String, // 问题id
  'time': Number,
  'question': String,
  'answer': String,
  'cls': Number,
  'collection_num': Number,
  'approval_num': Number,
  'start': Number, // 开始时间
  'end': Number, // 失效时间
  'status': Boolean, // 生效状态
  'answer_num': Number
});

module.exports = mongoose.model('Library', librarySchema, 'library'); // 记得第三个参数写上集合名字，否则默认是加s的
