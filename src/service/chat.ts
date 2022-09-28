import AV from "leancloud-storage";
import { message } from "antd";
import { LoginUserInfoModel } from "../model/Login";
import { ChatContentModel } from "../model/Chat";

AV.init({
  appId: "Q8A65T5W8qkMkbWI17g7vAu0-gzGzoHsz",
  appKey: "JXUCxIYpDrIF87LVpYlK9egD",
  serverURL: "https://server.lyq168.cn",
});

// leancloud 无法带ts类型

/**
 * 发送消息
 * @param params
 * @returns
 */
export function pushMessage(params: {
  content: string;
  time: string;
  userId: string;
  userName: string;
}) {
  return new Promise((resolve, reject) => {
    const ChatMoon = AV.Object.extend("Chat_Moon");
    const chatMoon = new ChatMoon();
    chatMoon.set("content", params.content);
    chatMoon.set("time", params.time);
    chatMoon.set("userId", params.userId);
    chatMoon.set("userName", params.userName);
    chatMoon.save().then((res: unknown) => {
      resolve(res);
    });
  });
}

export function getMessageApi() {
  return new Promise<ChatContentModel[]>((resolve, reject) => {
    const query = new AV.Query("Chat_Moon");
    query.descending("createdAt");
    query.find().then(
      (
        res: {
          attributes: {
            content: string;
            time: string;
            userId: string;
            userName: string;
          };
        }[]
      ) => {
        resolve(res.map((i) => i.attributes).reverse());
      }
    );
  });
}
