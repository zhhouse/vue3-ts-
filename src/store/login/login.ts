import { Module } from 'vuex'
import { accountLoginRequest, requestInfoById,requestUserMenuByRoleId } from "@/service/login/login";

import localCache from '@/utils/cache'
import router from '@/router'

import { mapMenusToRoutes } from "@/utils/map-menus";

import { ILoginState,IRootState } from './types'
import { IAccount } from '@/service/login/types'

const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: {},
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus;

      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(route=>{
        router.addRoute("main", route);
      })
    },
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult;
      commit("changeToken", token);
      localCache.setCache("token", token);
      //2.请求用户信息
      const userInfoResult = await requestInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      //3.请求用户菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      router.push("/main");
    },
    loadLocalLogin({commit}){
      const token = localCache.getCache('token');
      if(token) {
        commit('changeToken',token)
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
  },
};
export default login;
