import dayjs from "dayjs";
import AV from "leancloud-storage";
import { WeekDayItemModel } from "../model/WeekDay";

AV.init({
  appId: "Q8A65T5W8qkMkbWI17g7vAu0-gzGzoHsz",
  appKey: "JXUCxIYpDrIF87LVpYlK9egD",
  serverURL: "https://server.lyq168.cn",
});

/**
 * 获取本年工作日
 * @returns
 */
export function getYearWeekDay() {
  return new Promise<WeekDayItemModel[]>((resolve, reject) => {
    const query = new AV.Query("CN_WeekDay");
    query.descending("createdAt");
    query.greaterThanOrEqualTo("date", Number(`${dayjs().format("YYYY")}0101`));
    query.lessThanOrEqualTo(
      "date",
      Number(`${Number(dayjs().format("YYYY"))}1231`)
    );
    query.limit(400);
    query.find().then(
      (
        res: {
          attributes: WeekDayItemModel;
        }[]
      ) => {
        resolve(res.map((i) => i.attributes));
      }
    );
  });
}
