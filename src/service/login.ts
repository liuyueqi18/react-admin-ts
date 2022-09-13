import AV from "leancloud-storage";
import { message } from "antd";
import { LoginUserInfoModel } from "../model/Login";

AV.init({
  appId: "Q8A65T5W8qkMkbWI17g7vAu0-gzGzoHsz",
  appKey: "JXUCxIYpDrIF87LVpYlK9egD",
  serverURL: "https://server.lyq168.cn",
});

// leancloud 无法带ts类型

/**
 * 登录
 * @param {*} username
 * @param {*} password
 * @returns
 */
export function userLogin(username: string, password: string) {
  return new Promise<LoginUserInfoModel>((resolve, reject) => {
    AV.User.logIn(username, password)
      .then((res: LoginUserInfoModel) => {
        resolve(res);
      })
      .catch((error: { rawMessage: string }) => {
        reject(error);
        message.error(error.rawMessage || "登录失败");
      });
  });
}

/**
 * 注册
 * @param {*} username
 * @param {*} email
 * @param {*} password
 * @returns
 */
export function userRegister(
  username: string,
  email: string,
  password: string
) {
  const user = new AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.setEmail(email);
  return new Promise<LoginUserInfoModel>((resolve, reject) => {
    user
      .signUp()
      .then((res: LoginUserInfoModel) => {
        resolve(res);
      })
      .catch((error: { rawMessage: string }) => {
        reject(error);
        message.error(error.rawMessage || "注册失败");
      });
  });
}
