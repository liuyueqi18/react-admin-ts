import React, { useEffect } from "react";

import { useState } from "react";
import styles from "../../styles/WeekDay/list.module.css";
import { useSyncState } from "../../hocks";
import { WeekDayItemModel, WeekDayModel } from "../../model/WeekDay";
import { getYearWeekDay } from "../../service/weekday";
import dayjs from "dayjs";

import SurplusCard from "./SurplusCard";

export default function WeekDay() {
  const [weekDayList, setWeekDayList] = useSyncState<WeekDayItemModel[]>([]);
  const [state, setState] = useSyncState<WeekDayModel>({
    thisMonthSurplusDay: "", // 本月剩余日子
    thisMonthSurplusWeekDay: "", // 本月剩余工作日
    thisMonthSurplusHolidayDay: "", // 本月剩余休息日
    thisYearSurplusDay: "", // 本年剩余日子
    thisYearSurplusWeekDay: "", // 本年剩余工作日
    thisYearSurplusHolidayDay: "", // 本年剩余休息日
  }); //

  useEffect(() => {
    getYearList();
    return () => {
      //
    };
    // eslint-disable-next-line
  }, []);

  const getYearList = () => {
    getYearWeekDay().then((res) => {
      const list = [...res];
      setWeekDayList(list, () => {
        // 本月数据
        const thisMonth = list.filter(
          (i) => i.month.toString() === dayjs().format("YYYYMM")
        );
        let thisMonthSurplusDay = thisMonth.filter((i) =>
          dayjs().isBefore(dayjs(i.date.toString()))
        );
        // 加上今日
        thisMonthSurplusDay.unshift(
          thisMonth.find(
            (i) => i.date.toString() === dayjs().format("YYYYMMDD")
          )!
        );
        let thisYearSurplusDay = list.filter((i) =>
          dayjs().isBefore(dayjs(i.date.toString()))
        );
        thisYearSurplusDay.unshift(
          thisMonth.find(
            (i) => i.date.toString() === dayjs().format("YYYYMMDD")
          )!
        );
        setState(
          {
            ...state,
            thisMonthSurplusDay: thisMonthSurplusDay.length.toString(),
            thisMonthSurplusWeekDay: thisMonthSurplusDay
              .filter((i) => i.workday === 1)
              .length.toString(),
            thisMonthSurplusHolidayDay: thisMonthSurplusDay
              .filter((i) => i.workday === 2)
              .length.toString(),
            thisYearSurplusDay: thisYearSurplusDay.length.toString(),
            thisYearSurplusWeekDay: thisYearSurplusDay
              .filter((i) => i.workday === 1)
              .length.toString(),
            thisYearSurplusHolidayDay: thisYearSurplusDay
              .filter((i) => i.workday === 2)
              .length.toString(),
          },
          () => {
            //
          }
        );
      });
    });
  };

  return (
    <div>
      <SurplusCard data={state}></SurplusCard>
    </div>
  );
}
