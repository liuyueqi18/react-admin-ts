/**
 * 登陆
 */
export type LoginInfoModel = {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 邮箱 */
  email: string;
  /** 登陆/注册 */
  loginType: "login" | "register";
  /** 密码框是否可见 */
  passType: "password" | "text";
  /** 是否Loading */
  loading: boolean;
};

/** 用户信息 */
export type UserInfoModel = {
  /** 生日 */
  birthTime: string;
  /** 邮箱 */
  email: string;
  /** 是否验证过邮箱 */
  emailVerified: boolean;
  /** 性别 */
  gender: number;
  /** 手机号 */
  mobilePhoneNumber: string;
  /** 是否验证过手机号 */
  mobilePhoneVerified: boolean;
  /** 用户姓名 */
  username: string;
};

/** 登录接口返回 */
export type LoginUserInfoModel = {
  /** 用户信息 */
  attributes: UserInfoModel;
  /** Id */
  id: string;
};
