let library = [
  {
    qid: '0',
    time: +new Date(),
    question: '测试',
    answer: '答案',
    cls: 2,
    favorite_num: 180,
    upvoted_num: 80,
    status: true,
    start: +new Date() - 1,
    end: +new Date() + 60 * 60 * 24
  },
  {
    qid: '1',
    time: +new Date(),
    question: '这是一个问题',
    answer: '这是一个答案',
    cls: 1,
    favorite_num: 100,
    upvoted_num: 100,
    status: true,
    start: +new Date() - 1,
    end: +new Date() + 60 * 60 * 24
  }
];

function addQuestion(cls, question, answer, start, end) {
  const now = Date.now();
  library.splice(0, 0, {
    qid: library.length,
    time: +new Date(),
    question: question,
    answer: answer,
    cls: cls,
    favorite_num: 0,
    upvoted_num: 0,
    status: start <= now && end >= now,
    start: start,
    end: end
  });
}
function updateQuestion(qid, cls, question, answer, start, end) {
  const now = Date.now();
  library = library.map(item => {
    if (item.qid === qid) {
      item.cls = cls;
      item.question = question;
      item.answer = answer;
      item.start = start;
      item.end = end;
      item.status = start <= now && end >= now;
    }
    return item;
  });
}

function deleteQuestion(qid) {
  return new Promise((resolve, reject) => {
    try {
      library = library.filter(item => item.qid !== qid);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function getQuestionList(cls, status) {
  return new Promise((resolve, reject) => {
    try {
      const res = library.filter(item => {
        // status为-1则全选和cls为-1则全选ll
        if (status === -1) {
          if (cls === -1) {
            return true;
          } else {
            return cls === item.cls;
          }
        } else {
          if (cls === -1) {
            return item.status === Boolean(status);
          } else {
            return item.status === Boolean(status) && item.cls === cls;
          }
        }
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionList
};
