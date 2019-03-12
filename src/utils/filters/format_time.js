function formatTime (time) {
  let date = new Date(+new Date(time) + 8 * 60 * 60); // 参数是格林尼治时间，要加八小时
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);
  let hour = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  return `${year}-${month}-${day} ${hour}:${minutes}`; // 2019-03-09 11:29
}

export default formatTime;
