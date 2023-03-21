import { Col, DatePicker, DatePickerProps, Divider, Row } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect } from "react";

import { useSyncState } from "../../hocks";
import {
  WeekDayItemModel,
  WeekDayListModel,
  WeekDayModel,
} from "../../model/WeekDay";
import { getYearWeekDay } from "../../service/weekday";

import styles from "../../styles/WeekDay/list.module.css";

import SurplusCard from "./SurplusCard";

// 只能选择本年
// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return (
    current &&
    (current < dayjs().month(0).startOf("month") ||
      current > dayjs().month(11).endOf("month"))
  );
};

export default function WeekDay() {
  const [weekDayList, setWeekDayList] = useSyncState<WeekDayItemModel[]>([]);
  const [chooseMonthState, setChooseMonthState] =
    useSyncState<WeekDayListModel>({
      chooseMonth: "",
      chooseMonthList: [],
      chooseMonthDay: 0,
      chooseMonthWeekDay: 0,
      chooseMonthHolidayDay: 0,
    });

  const getYearList = () => {
    getYearWeekDay().then((res) => {
      setWeekDayList([...res], () => {
        //
      });
    });
  };

  const onChangeMonth: DatePickerProps["onChange"] = (_, dateString) => {
    // 无值默认本月
    let month = dateString ? dateString : dayjs().format("YYYY-MM");
    const chooseMonthList = weekDayList.filter(
      (i) => i.month.toString() === dayjs(month).format("YYYYMM")
    );
    setChooseMonthState(
      {
        ...chooseMonthState,
        chooseMonth: month,
        chooseMonthList: chooseMonthList,
        chooseMonthDay: chooseMonthList.length,
        chooseMonthWeekDay: chooseMonthList.filter((i) => i.workday === 1)
          .length,
        chooseMonthHolidayDay: chooseMonthList.filter((i) => i.workday === 2)
          .length,
      },
      () => {
        //
      }
    );
  };

  useEffect(() => {
    getYearList();
    return () => {
      //
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onChangeMonth(moment(), moment().format("YYYYMM"));
    return () => {
      //
    };
    // eslint-disable-next-line
  }, [weekDayList]);

  return (
    <div>
      <SurplusCard list={weekDayList}></SurplusCard>
      <div style={{ height: "12px" }}></div>
      <span>本月天数:{chooseMonthState.chooseMonthDay}天</span>{" "}
      <Divider type="vertical" />
      <span>本月工作日:{chooseMonthState.chooseMonthWeekDay}天</span>{" "}
      <Divider type="vertical" />
      <span>本月休息日:{chooseMonthState.chooseMonthHolidayDay}天</span>{" "}
      <Divider type="vertical" />
      &nbsp;&nbsp;
      <DatePicker
        onChange={onChangeMonth}
        disabledDate={disabledDate}
        defaultValue={moment()}
        picker="month"
        allowClear={false}
      ></DatePicker>
    </div>
  );
}
