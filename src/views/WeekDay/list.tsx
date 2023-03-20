import React, { useEffect } from "react";

import { useSyncState } from "../../hocks";
import { WeekDayItemModel, WeekDayModel } from "../../model/WeekDay";
import { getYearWeekDay } from "../../service/weekday";

import styles from "../../styles/WeekDay/list.module.css";

import SurplusCard from "./SurplusCard";

export default function WeekDay() {
  const [weekDayList, setWeekDayList] = useSyncState<WeekDayItemModel[]>([]);

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
        //
      });
    });
  };

  return (
    <div>
      <SurplusCard list={weekDayList}></SurplusCard>
    </div>
  );
}
