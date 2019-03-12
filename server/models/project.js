var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  'code': String,
  'name': String,
  'pj_id': String,
  'cls': Array
});

module.exports = mongoose.model('Project', projectSchema, 'project'); // 记得第三个参数写上集合名字，否则默认是加s的
