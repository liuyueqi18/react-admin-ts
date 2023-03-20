export type WeekDayItemModel = {
  date: number; // 20231231
  date_cn: string; // "2023年12月31日";
  holiday: number; // 10
  holiday_cn: string; // "非节假日";
  holiday_legal: number; // 2;
  holiday_legal_cn: string; // "非法定节假日";
  holiday_or: number; // 10;
  holiday_or_cn: string; // "非节假日";
  holiday_overtime: number; // 10;
  holiday_overtime_cn: string; // "非节假日调休";
  holiday_recess: number; // 2;
  holiday_recess_cn: string; // "非假期节假日";
  holiday_today: number; // 2;
  holiday_today_cn: string; // "非节日当天";
  lunar_date: number; // 20231119;
  lunar_date_cn: string; // "二零二三年冬月十九";
  lunar_month: number; // 202311;
  lunar_month_cn: string; // "二零二三年冬月";
  lunar_year: number; // 2023;
  lunar_year_cn: string; // "二零二三年";
  lunar_yearday: number; // 344;
  lunar_yearday_cn: string; // "2023年第344天";
  month: number; // 202312;
  month_cn: string; // "2023年12月";
  week: number; // 7;
  week_cn: string; // "星期日";
  weekend: number; // 1;
  weekend_cn: string; // "周末";
  workday: number; // 2;
  workday_cn: string; // "非工作日";
  year: number; // 2023;
  year_cn: string; // "2023年";
  yearday: number; // 365;
  yearday_cn: string; // "2023年第365天";
  yearweek: number; // 202352;
  yearweek_cn: string; // "2023年第52周";
};

export type WeekDayModel = {
  thisMonthSurplusDay: string; // 本月剩余天数
  thisMonthSurplusWeekDay: string; // 本月剩余工作日
  thisMonthSurplusHolidayDay: string; // 本月剩余休息日
  thisYearSurplusDay: string; // 本年剩余天数
  thisYearSurplusWeekDay: string; // 本年剩余工作日
  thisYearSurplusHolidayDay: string; // 本年剩余休息日
};
