import HXRequest from "../index";
import { IAccount,IDataType,ILoginResult } from "./types";

enum LoginAPI {
  AccountLogin = '/login'
}
export function accountLoginRequest(account:IAccount){
  return HXRequest.post({
    url:LoginAPI.AccountLogin,
    data:account
  })
}

export function requestInfoById(id:number) {
  return HXRequest.get({
    url:'/users/' + id
  })
}
export function requestUserMenuByRoleId(id:number){
  return HXRequest.get({
    url: `/role/${id}/menu`
  });
}
