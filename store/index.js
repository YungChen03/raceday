//state
export const state = () => ({
  authenticated: false,
  userDisplayName: "",
  userDocName: ""
});

//actions
export const actions = {
  handleIsLogin({ commit }, bool) {
    commit("handleIsLogin", bool);
  },
  pushUserDocName({ commit }, value) {
    commit("pushUserDocName", value);
  },
  pushuserDisplayName({ commit }, value) {
    commit("pushuserDisplayName", value);
  }
};

//mutations
export const mutations = {
  handleIsLogin(state, bool) {
    state.authenticated = bool;
  },

  pushUserDocName(state, value) {
    state.userDocName = value;
  },
  pushuserDisplayName(state, value) {
    state.userDisplayName = value;
  }
};
//getters
export const getters = {
  loginStatus: state => state.authenticated,

  userDocNameValue: state => state.userDocName,
  userDisplayName: state => state.userDisplayName
};
