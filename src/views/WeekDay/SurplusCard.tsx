import { Card, Col, Row, Statistic } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { WeekDayItemModel, WeekDayModel } from "../../model/WeekDay";

interface MyProps {
  list: WeekDayItemModel[];
}

const SurplusCard = (props: MyProps) => {
  const [state, setState] = useState<WeekDayModel>({
    thisMonthWeekDay: 0,
    thisMonthHolidayDay: 0,
    thisMonthSurplusDay: 0,
    thisMonthSurplusWeekDay: 0,
    thisMonthSurplusHolidayDay: 0,
    thisYearWeekDay: 0,
    thisYearHolidayDay: 0,
    thisYearSurplusDay: 0,
    thisYearSurplusWeekDay: 0,
    thisYearSurplusHolidayDay: 0,
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
      thisMonthWeekDay: thisMonth.filter((i) => i.workday === 1).length,
      thisMonthHolidayDay: thisMonth.filter((i) => i.workday === 2).length,
      thisMonthSurplusDay: thisMonthSurplusDay.length,
      thisMonthSurplusWeekDay: thisMonthSurplusDay.filter(
        (i) => i.workday === 1
      ).length,
      thisMonthSurplusHolidayDay: thisMonthSurplusDay.filter(
        (i) => i.workday === 2
      ).length,
      thisYearWeekDay: props.list.filter((i) => i.workday === 1).length,
      thisYearHolidayDay: props.list.filter((i) => i.workday === 2).length,
      thisYearSurplusDay: thisYearSurplusDay.length,
      thisYearSurplusWeekDay: thisYearSurplusDay.filter((i) => i.workday === 1)
        .length,
      thisYearSurplusHolidayDay: thisYearSurplusDay.filter(
        (i) => i.workday === 2
      ).length,
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
          <Col span={4}>
            <Statistic title="本月工作日" value={state.thisMonthWeekDay} />
          </Col>
          <Col span={4}>
            <Statistic title="本月休息日" value={state.thisMonthHolidayDay} />
          </Col>
          <Col span={6}>
            <Statistic
              title="本月剩余天数(含今日)"
              value={state.thisMonthSurplusDay}
            />
          </Col>
          <Col span={5}>
            <Statistic
              title="本月剩余工作日"
              value={state.thisMonthSurplusWeekDay}
            />
          </Col>
          <Col span={5}>
            <Statistic
              title="本月剩余休息日"
              value={state.thisMonthSurplusHolidayDay}
            />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={4}>
            <Statistic title="本年工作日" value={state.thisYearWeekDay} />
          </Col>
          <Col span={4}>
            <Statistic title="本年休息日" value={state.thisYearHolidayDay} />
          </Col>
          <Col span={6}>
            <Statistic
              title="本年剩余天数(含今日)"
              value={state.thisYearSurplusDay}
            />
          </Col>
          <Col span={5}>
            <Statistic
              title="本年剩余工作日"
              value={state.thisYearSurplusWeekDay}
            />
          </Col>
          <Col span={5}>
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
