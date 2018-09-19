import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    Login({commit}, userInfo) {
      let username = userInfo.username.trim();
      return new Promise(((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          if(data.token){
            setToken(data.token);
            commit('SET_TOKEN', data.token);
            resolve();
          }else{
            reject('用户名或密码错误!')
          }

        }).catch(error => {
          reject(error);
        })
      }))
    },
    GetInfo({commit, state}) {
      return new Promise(((resolve, reject) => {
        getInfo(state.token).then(res => {
          let data = res.data;
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_ROLES', data.roles);
          resolve(data);
        }).catch(error => {
            reject(error);
            console.log(error);
          }
        )
      }))
    },
    LogOut({commit, state}) {
      return new Promise(((resolve, reject) => {
        logout(state.token).then(() => {
          removeToken();
          commit('SET_NAME', '');
          commit('SET_AVATAR', '');
          commit('SET_ROLES', []);
          commit('SET_TOKEN', '');
          resolve();
        }).catch(error => {
          reject(error);
        })
      }))
    },
    FedLogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })

    }
  }


}
export  default user;
