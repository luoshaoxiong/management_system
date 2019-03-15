import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state = {
  currentProject: {},
  projectList: []
};

const getters = {
  getCurrentProject: (state) => state.currentProject,
  getProjectList: (state) => state.projectList
};

const mutations = {
  SWITCH_PROJECT (state, project) {
    state.currentProject = project;
  },
  SET_PROJECT_LIST (state, projectList) {
    state.projectList = projectList;
  }
};

const actions = {
  switchProject: ({commit}, project) => {
    commit('SWITCH_PROJECT', project);
  },
  setProjectList: ({commit}, projectList) => {
    commit('SET_PROJECT_LIST', projectList);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
