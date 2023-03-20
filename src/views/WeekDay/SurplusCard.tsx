import { Col, Row, Statistic } from "antd";
import { WeekDayModel } from "../../model/WeekDay";

interface MyProps {
  data: WeekDayModel;
}

const SurplusCard = (props: MyProps) => {
  return (
    <div>
      <Row gutter={[16, 24]}>
        <Col span={8}>
          <Statistic
            title="本月剩余天数(含今日)"
            value={props.data.thisMonthSurplusDay}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="本月剩余工作日"
            value={props.data.thisMonthSurplusWeekDay}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="本月剩余休息日"
            value={props.data.thisMonthSurplusHolidayDay}
          />
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col span={8}>
          <Statistic
            title="本年剩余天数(含今日)"
            value={props.data.thisYearSurplusDay}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="本年剩余工作日"
            value={props.data.thisYearSurplusWeekDay}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="本年剩余休息日"
            value={props.data.thisYearSurplusHolidayDay}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SurplusCard;
