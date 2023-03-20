import { Card, Col, Row, Statistic } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { WeekDayItemModel, WeekDayModel } from "../../model/WeekDay";

interface MyProps {
  list: WeekDayItemModel[];
}

const SurplusCard = (props: MyProps) => {
  const [state, setState] = useState<WeekDayModel>({
    thisMonthSurplusDay: "", // 本月剩余天数
    thisMonthSurplusWeekDay: "", // 本月剩余工作日
    thisMonthSurplusHolidayDay: "", // 本月剩余休息日
    thisYearSurplusDay: "", // 本年剩余天数
    thisYearSurplusWeekDay: "", // 本年剩余工作日
    thisYearSurplusHolidayDay: "", // 本年剩余休息日
  }); //

  const getDataByList = () => {
    if (props.list.length === 0) {
      return;
    }
    // 本月数据
    const thisMonth = props.list.filter(
      (i) => i.month.toString() === dayjs().format("YYYYMM")
    );
    let thisMonthSurplusDay = thisMonth.filter((i) =>
      dayjs().isBefore(dayjs(i.date.toString()))
    );
    // 加上今日
    thisMonthSurplusDay.unshift(
      thisMonth.find((i) => i.date.toString() === dayjs().format("YYYYMMDD"))!
    );
    let thisYearSurplusDay = props.list.filter((i) =>
      dayjs().isBefore(dayjs(i.date.toString()))
    );
    thisYearSurplusDay.unshift(
      thisMonth.find((i) => i.date.toString() === dayjs().format("YYYYMMDD"))!
    );
    setState({
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
    });
  };

  useEffect(() => {
    getDataByList();
    return () => {
      //
    };
    // eslint-disable-next-line
  }, [props.list]);
  return (
    <div>
      <Card>
        <Row gutter={[16, 24]}>
          <Col span={8}>
            <Statistic
              title="本月剩余天数(含今日)"
              value={state.thisMonthSurplusDay}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="本月剩余工作日"
              value={state.thisMonthSurplusWeekDay}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="本月剩余休息日"
              value={state.thisMonthSurplusHolidayDay}
            />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={8}>
            <Statistic
              title="本年剩余天数(含今日)"
              value={state.thisYearSurplusDay}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="本年剩余工作日"
              value={state.thisYearSurplusWeekDay}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="本年剩余休息日"
              value={state.thisYearSurplusHolidayDay}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SurplusCard;
