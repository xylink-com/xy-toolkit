import { LocaleType } from "./index.type";

// 默认语言版本
export const defaultLocale: LocaleType = "zh_CN";
// 默认使用的周的 locale 类型
export const defaultDayMapType = "default";
// 默认使用的上下午的 locale 类型
export const defaultShortDayType = "default";
// 默认使用的月份的 locale 类型
export const defaultMonthType = "default";
// 默认使用的保护字符，用来在替换模板字符串时防止引入新的模板字符，如需在模板串中使用'!!'
export const protectChar = "!";

// week map
export const localeDayMaps = {
  zh_CN: {
    default: {
      0: "周日",
      1: "周一",
      2: "周二",
      3: "周三",
      4: "周四",
      5: "周五",
      6: "周六",
    },
    west: {
      0: "礼拜天",
      1: "礼拜一",
      2: "礼拜二",
      3: "礼拜三",
      4: "礼拜四",
      5: "礼拜五",
      6: "礼拜六",
    },
    basic: {
      0: "星期天",
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六",
    },
  },
  zh_TW: {
    default: {
      0: "周日",
      1: "周一",
      2: "周二",
      3: "周三",
      4: "周四",
      5: "周五",
      6: "周六",
    },
    west: {
      0: "禮拜天",
      1: "禮拜一",
      2: "禮拜二",
      3: "禮拜三",
      4: "禮拜四",
      5: "禮拜五",
      6: "禮拜六",
    },
    basic: {
      0: "星期天",
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六",
    },
  },
  en_US: {
    default: {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    },
    simple: {
      0: "Sun",
      1: "Mon",
      2: "Tues",
      3: "Wed",
      4: "Thur",
      5: "Fri",
      6: "Sat",
    },
  },
};

export const localeShortDayMaps = {
  zh_CN: {
    default: {
      0: "上午",
      1: "下午",
    },
  },
  zh_TW: {
    default: {
      0: "上午",
      1: "下午",
    },
  },
  en_US: {
    default: {
      0: "AM",
      1: "PM",
    },
    lower: {
      0: "am",
      1: "pm",
    },
  },
};

export const localeMonthMaps = {
  zh_CN: {
    default: {
      1: "1月",
      2: "2月",
      3: "3月",
      4: "4月",
      5: "5月",
      6: "6月",
      7: "7月",
      8: "8月",
      9: "9月",
      10: "10月",
      11: "11月",
      12: "12月",
    },
    formal: {
      1: "一月",
      2: "二月",
      3: "三月",
      4: "四月",
      5: "五月",
      6: "六月",
      7: "七月",
      8: "八月",
      9: "九月",
      10: "十月",
      11: "十一月",
      12: "十二月",
    },
  },
  zh_TW: {
    default: {
      1: "1月",
      2: "2月",
      3: "3月",
      4: "4月",
      5: "5月",
      6: "6月",
      7: "7月",
      8: "8月",
      9: "9月",
      10: "10月",
      11: "11月",
      12: "12月",
    },
    formal: {
      1: "一月",
      2: "二月",
      3: "三月",
      4: "四月",
      5: "五月",
      6: "六月",
      7: "七月",
      8: "八月",
      9: "九月",
      10: "十月",
      11: "十一月",
      12: "十二月",
    },
  },
  en_US: {
    default: {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    },
    formal: {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    },
  },
};

export const daysOfMonthMap = {
  day30: [4, 6, 9, 11],
  day31: [1, 3, 5, 7, 8, 10, 12],
};
