import { message } from "antd";
import AV from "leancloud-storage";
import {
  nickHeader,
  nickFoot,
  femaleNameItems,
  maleNameItems,
  surnameItems,
} from "./dictionary";

AV.init({
  appId: "Q8A65T5W8qkMkbWI17g7vAu0-gzGzoHsz",
  appKey: "JXUCxIYpDrIF87LVpYlK9egD",
  serverURL: "https://server.lyq168.cn",
});

/**
 * 随机数
 * @param {*} minNum
 * @param {*} maxNum
 * @returns
 */
export const randomNum = (minNum: any, maxNum: any) => {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
};

/**
 * 私有属性#报错 先增加_以示区分
 */
class RandomName {
  static readme = "";

  _getNickHeader() {
    return nickHeader[randomNum(0, nickHeader.length)];
  }
  _getNickFoot() {
    return nickFoot[randomNum(0, nickFoot.length)];
  }
  getNickName() {
    return this._getNickHeader() + this._getNickFoot();
  }
  getMaleName() {
    return (
      surnameItems[randomNum(0, surnameItems.length)] +
      maleNameItems[randomNum(0, maleNameItems.length)]
    );
  }
  getFemaleNameName() {
    return (
      surnameItems[randomNum(0, surnameItems.length)] +
      femaleNameItems[randomNum(0, femaleNameItems.length)]
    );
  }
  getRandomName() {
    return (
      surnameItems[randomNum(0, surnameItems.length)] +
      [...femaleNameItems, ...maleNameItems][
        randomNum(0, [...femaleNameItems, ...maleNameItems].length)
      ]
    );
  }
}

export let randomName = new RandomName();

/**
 * 获取随机手机号
 * @returns
 */
export function getRandomMoble() {
  return `1${randomNum(5, 9)}${parseInt(
    (Math.random() * 1000000000).toString()
  )}`.padEnd(11, randomNum(0, 9).toString());
}

/**
 * 默认传-1 获取省份
 * 获取市/区/县 code 传 parentCode
 * @param {*} code
 * @returns
 */
export const queryRegion = (code = "-1") => {
  return new Promise((resolve, reject) => {
    const REGIONVO = new AV.Query("REGION");
    REGIONVO.equalTo("parentCode", code);
    REGIONVO.find()
      .then((res: any[]) => {
        const list = res.map((item: { get: (arg0: string) => any }) => {
          return {
            center: item.get("center"),
            code: item.get("code"),
            level: item.get("level"),
            name: item.get("name"),
            parentCode: item.get("parentCode"),
          };
        });
        resolve(list);
      })
      .catch((error: { rawMessage: any }) => {
        reject(error);
        message.error(error.rawMessage || "错误");
      });
  });
};

/**
 * 获取用户信息
 * @param {*} userId
 * @returns
 */
export const getUserInfoById = (userId: any) => {
  const user = new AV.Query("User");
  return new Promise((resolve, reject) => {
    user
      .get(userId)
      .then((res: unknown) => {
        resolve(res);
      })
      .catch((error: { rawMessage: any }) => {
        reject(error);
        message.error(error.rawMessage || "错误");
      });
  });
};

/**
 * 验证用户名
 * @param {*} username
 * @returns
 */
export const CheckUserName = (username: string) => {
  const str = username;
  if (!str || str.length > 10 || str.length < 2) {
    return false;
  }
  const reg = new RegExp(/[\u4e00-\u9fa5]/gm);
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
};

/**
 * 验证密码
 * @param {*} password
 * @returns
 */
export const CheckPassWord = (password: string) => {
  const str = password;
  if (!str) {
    return false;
  } else {
    return true;
  }
};

/**
 * 验证邮箱
 * @param {*} email
 * @returns
 */
export const CheckEmail = (email: string) => {
  const str = email;
  if (str === "") {
    return false;
  }
  const reg = new RegExp(
    "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
  );
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
};
