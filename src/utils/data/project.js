let projectList =
  [
    {pj_id: '0', code: '1231', cls: ['分类一', '分类二', '分类三'], name: '默认项目'},
    {pj_id: '1', code: '1232', cls: ['分类一', '分类二', '分类三'], name: 'default'},
    {pj_id: '2', code: '1233', cls: ['分类一', '分类二', '分类三'], name: '测试项目'},
    {pj_id: '3', code: '1234', cls: ['分类一', '分类二', '分类三'], name: '大雄项目'},
    {pj_id: '4', code: '1235', cls: ['分类一', '分类二', '分类三'], name: 'test'}
  ];

function updateProject(pjid, name, code) {
  return new Promise((resolve, reject) => {
    try {
      projectList = projectList.map(item => {
        if (item.pj_id === pjid) {
          item.name = name;
          item.code = code;
        }
        return item;
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function deleteProject(pjid) {
  return new Promise((resolve, reject) => {
    try {
      projectList = projectList.filter(item => item.pj_id !== pjid);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function addProject(name, code) {
  return new Promise((resolve, reject) => {
    try {
      const pjId = String(projectList.length);
      projectList.splice(0, 0, {
        pj_id: pjId,
        code: code,
        cls: ['分类一', '分类二', '分类三'],
        name: name
      });
      resolve(pjId);
    } catch (err) {
      throw new Error(err);
      reject(err);
    }
  });
}

function getProjectList() {
  return new Promise((resolve, reject) => {
    try {
      const res = JSON.parse(JSON.stringify(projectList));
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export {
  projectList,
  addProject,
  updateProject,
  deleteProject,
  getProjectList
};
