import AV from "leancloud-storage";
import { SZLeisureCardData } from "../model/SZLeisureCard";

AV.init({
  appId: "Q8A65T5W8qkMkbWI17g7vAu0-gzGzoHsz",
  appKey: "JXUCxIYpDrIF87LVpYlK9egD",
  serverURL: "https://server.lyq168.cn",
});

/**
 * 获取苏州休闲卡地址数据
 * @returns
 */
export function getSZLeisureCardData() {
  return new Promise<SZLeisureCardData[]>((resolve, reject) => {
    const query = new AV.Query("SZ_Leisure");
    query.descending("createdAt");
    query.limit(500);
    query.find().then(
      (
        res: {
          attributes: SZLeisureCardData;
        }[]
      ) => {
        resolve(res.map((i) => i.attributes));
      }
    );
  });
}
