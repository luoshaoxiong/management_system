import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.status === 200) {
      if (response.data && response.data.code === 0) {
        response.data.Result = 1;
      }
      if (response.data.Result === 1) {
        return response;
      } else {
        if (response.data.Result === 2) {
          setTimeout(() => {
            location.href = 'loginIndex';
          }, 2200)
        }
        response.ok = false;
      }
    } else {
      response.ok = false;
    }
  })
});
