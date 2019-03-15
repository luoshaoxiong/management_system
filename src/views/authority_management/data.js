const users = {
  senior: [
    {email: 'luodaxiong@youxiang.com', code: 6666, name: '罗大雄'},
    {email: 'luoxiaoxiong@youxiang.com', code: 8888, name: '罗小雄'}
  ],
  ordinary: []
};

const allUsers = [
  {email: 'luodaxiong@youxiang.com', code: 6666, name: '罗大雄', deptname: '总裁部'},
  {email: 'luoxiaoxiong@youxiang.com', code: 8888, name: '罗小雄', deptname: '人事部'},
  {email: 'xiongda@youxiang.com', code: 9999, name: '熊大', deptname: '财务部'},
  {email: 'xionger@youxiang.com', code: 1111, name: '熊二', deptname: '技术部'},
  {email: 'zhangsan@youxiang.com', code: 2222, name: '张三', deptname: '行政部'},
  {email: 'lisi@youxiang.com', code: 3333, name: '李四', deptname: '公关部'},
  {email: 'wangwu@youxiang.com', code: 4444, name: '王五', deptname: '运维部'},
  {email: 'zhaoliu@youxiang.com', code: 5555, name: '赵六', deptname: '运营部'}
];

function save (usersBeProcessing, type) {
  users[type] = users[type].concat(usersBeProcessing.addedUsers);
  users[type] = users[type].filter(user => {
    for (let i = 0; i < usersBeProcessing.deletedUsers.length; i++) {
      if (user.email === usersBeProcessing.deletedUsers[i].email) {
        return false;
      }
    }
    return true;
  });
}

function saveUsers (senior, ordinary) {
  save(senior, 'senior');
  save(ordinary, 'ordinary');
}

function searchUser (content) {
  return allUsers.filter(user => String(user.code).indexOf(content) > -1 || user.name.indexOf(content) > -1);
}

export {users, allUsers, saveUsers, searchUser};
