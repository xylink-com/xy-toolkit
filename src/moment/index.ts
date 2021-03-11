import { LocaleType, dateType } from "./index.type";
import {
  defaultLocale,
  localeDayMaps,
  defaultDayMapType,
  defaultShortDayType,
  localeShortDayMaps,
  defaultMonthType,
  localeMonthMaps,
  daysOfMonthMap,
  protectChar,
} from "./index.config";
import { isNaN, padDigit, range, getCharFromRepeat } from "./index.util";

export class Moment {
  // ---------- PROPERTY ---------- //
  private currentLocale: LocaleType;
  public now: Date;

  constructor() {
    this.currentLocale = defaultLocale;
    this.now = this.current();
  }

  public locale(l?: LocaleType) {
    if (!l) return this.currentLocale;
    else this.currentLocale = l;
  }

  public current() {
    return new Date();
  }

  // 将传入的 date 转化为标准类型
  private _handleDate(d: dateType) {
    if (typeof d === "string" && isNaN(d)) {
      d = new Date(d);
    }
    if ((typeof d === "string" && !isNaN(d)) || typeof d === "number") {
      d = new Date(Number(d));
    }
    return d as Date;
  }

  // 拦截器：如果未传入 date 则使用当前的时间
  private _dateWrapper(date?: dateType) {
    return !!date ? this._handleDate(date) : this.now;
  }

  public year(date?: dateType): number {
    return this._dateWrapper(date).getFullYear();
  }

  public shortYear(date?: dateType): number {
    return Number(`${this.year(date)}`.slice(-2));
  }

  public month(date?: dateType): number {
    return this._dateWrapper(date).getMonth() + 1;
  }

  public padMonth(date?: dateType): string {
    return padDigit(this.month(date));
  }

  public localeMonth(date?: dateType, type = defaultMonthType): string {
    if (this._isValidType(type, defaultMonthType, localeMonthMaps))
      type = defaultMonthType;
    const localeMonthMap = localeMonthMaps[this.currentLocale][type];
    return localeMonthMap[this.month(date)];
  }

  public date(date?: dateType): number {
    return this._dateWrapper(date).getDate();
  }

  public padDate(date?: dateType): string {
    return padDigit(this.date(date));
  }

  public day(date?: dateType): number {
    const d = this._dateWrapper(date).getDay();
    return d === 0 ? 7 : d;
  }

  private _isValidType(type, defaultType, map) {
    return type !== defaultType && !Object.keys(map[this.currentLocale]);
  }

  public localeDay(date?: dateType, type: string = defaultDayMapType): string {
    if (this._isValidType(type, defaultDayMapType, localeDayMaps))
      type = defaultDayMapType;
    const localeDayMap = localeDayMaps[this.currentLocale][type];
    return localeDayMap[this._dateWrapper(date).getDay()];
  }

  public hours(date?: dateType): number {
    return this._dateWrapper(date).getHours();
  }

  public PadHours(date?: dateType): string {
    return padDigit(this.hours(date));
  }

  public localeHours(date?: dateType, type: string = defaultShortDayType) {
    if (this._isValidType(type, defaultShortDayType, localeShortDayMaps))
      type = defaultShortDayType;
    const hour = this.hours(date);
    const shortDay = localeShortDayMaps[this.currentLocale][type];
    if (hour < 12) return [hour, shortDay[0]];
    else return [hour - 12, shortDay[1]];
  }

  public minutes(date?: dateType): number {
    return this._dateWrapper(date).getMinutes();
  }

  public padMinutes(date?: dateType): string {
    return padDigit(this.minutes(date));
  }

  public seconds(date?: dateType): number {
    return this._dateWrapper(date).getSeconds();
  }

  public padSeconds(date?: dateType): string {
    return padDigit(this.seconds(date));
  }

  public milliseconds(date?: dateType): number {
    return this._dateWrapper(date).getMilliseconds();
  }

  public quarter(date?: dateType): number {
    const m = this.month(date);
    const q = Math.floor(m / 3);
    return q === m / 3 ? q : q + 1;
  }

  public dayOfYear(date?: dateType): number {
    const y = this.year(date);
    const m = this.month(date);
    const d = this.date(date);
    const t = range(m - 1).reduce((accDays: number, cur: number): number => {
      return (accDays += this.daysInMonth(y, cur + 1));
    }, 0);
    return t + d;
  }

  public dayOfMonth(date?: dateType): string {
    const d = this.date(date);
    if (d === 1) return "1st";
    if (d === 2) return "2nd";
    if (d === 3) return "3rd";
    return `${d}th`;
  }

  public weekOfYear(date?: dateType): number {
    return Math.ceil(this.dayOfYear(date) / 7);
  }

  public get(type: string) {
    const getTimeMap = {
      year: this.year(),
      shortYear: this.shortYear(),
      quarter: this.quarter(),
      localeMonth: this.localeMonth(),
      padMonth: this.padMonth(),
      month: this.month(),
      dayOfYear: this.dayOfYear(),
      dayOfMonth: this.dayOfMonth(),
      padDate: this.padDate(),
      date: this.date(),
      localeDay: this.localeDay(),
      day: this.day(),
      localeHours: this.localeHours(),
      PadHours: this.PadHours(),
      hours: this.hours(),
      padMinutes: this.padMinutes(),
      minutes: this.minutes(),
      padSeconds: this.padSeconds(),
      seconds: this.seconds(),
      weekOfYear: this.weekOfYear(),
      milliseconds: this.milliseconds(),
    };
    if (Object.keys(getTimeMap).includes(type)) {
      return getTimeMap[type];
    } else {
      return this.toString();
    }
  }

  public toArray(date?: dateType) {
    const d = this._dateWrapper(date);
    return [
      this.year(d),
      this.month(d),
      this.date(d),
      this.hours(d),
      this.minutes(d),
      this.seconds(d),
      this.milliseconds(d),
    ];
  }

  public toObject(date?: dateType) {
    const d = this._dateWrapper(date);;
    return {
      year: this.year(d),
      month: this.month(d),
      date: this.date(d),
      hour: this.hours(d),
      minute: this.minutes(d),
      second: this.seconds(d),
      millisecond: this.milliseconds(d),
    };
  }

  public toString(date?: dateType): string {
    const d = this._dateWrapper(date);
    return `${this.year(d)}-${this.padMonth(d)}-${this.padDate(
      d
    )} ${this.PadHours(d)}:${this.padMinutes(d)}:${this.padSeconds(d)}`;
  }

  public toLocaleString(date?: dateType): string {
    const d = this._dateWrapper(date);
    if (this.currentLocale === "en_US") {
      return `${this.localeDay(d, "simple")} ${this.localeMonth(
        d,
        "formal"
      )} ${this.padDate(d)} ${this.year(d)} ${this.PadHours(
        d
      )}:${this.padMinutes(d)}:${this.padSeconds(d)}`;
    }
    if (["zh_CN", "zh_TW"].includes(this.currentLocale)) {
      return `${this.year(d)}年${this.month(d)}月${this.date(d)}日 ${
        this.localeHours(d)[0]
      }:${this.minutes(d)}:${this.seconds(d)} ${
        this.localeHours(d)[1]
      } ${this.localeDay(d)}`;
    }
  }

  public toDateString(date?: dateType): string {
    const d = this._dateWrapper(date);
    return `${this.year(d)}-${this.padMonth(d)}-${this.padDate(d)}`;
  }

  public toLocaleDateString(date?: dateType): string {
    const d = this._dateWrapper(date);
    if (this.currentLocale === "en_US") {
      return `${this.localeDay(d, "simple")} ${this.localeMonth(
        d,
        "formal"
      )} ${this.padDate(d)} ${this.year(d)}`;
    }
    if (["zh_CN", "zh_TW"].includes(this.currentLocale)) {
      return `${this.year(d)}年${this.month(d)}月${this.date(d)}日`;
    }
  }

  public toTimeString(date?: dateType): string {
    const d = this._dateWrapper(date);
    return `${this.PadHours(d)}:${this.padMinutes(d)}:${this.padSeconds(d)}`;
  }

  public toLocaleTimeString(date?: dateType): string {
    const d = this._dateWrapper(date);
    return `${this.localeHours(d)[0]}:${this.padMinutes(d)}:${this.padSeconds(
      d
    )} ${this.localeHours(d)[1]}`;
  }

  private _getTimeStamp(tmp, date) {
    if ("X" === tmp) {
      return Math.floor(date.getTime() / 1000);
    }
    // 获取时间戳(以毫秒为单位)
    if ("x" === tmp) {
      return date.getTime();
    }
  }

  // 模板字符格式化
  private _getTplMap(date: dateType) {
    return {
      YYYY: this.year(date),
      YY: this.shortYear(date),
      Q: this.quarter(date),
      MMMM: this.localeMonth(date),
      MM: this.padMonth(date),
      M: this.month(date),
      DDDD: this.dayOfYear(date),
      DDD: this.dayOfMonth(date),
      DD: this.padDate(date),
      D: this.date(date),
      dddd: this.localeDay(date),
      d: this.day(date),
      HHH: this.localeHours(date)[0],
      HH: this.PadHours(date),
      H: this.hours(date),
      mm: this.padMinutes(date),
      m: this.minutes(date),
      ss: this.padSeconds(date),
      s: this.seconds(date),
      ms: this.milliseconds(date),
      ww: this.weekOfYear(date),
      ll: this.localeHours(date)[1],
    };
  }

  public _protectedReplace(key: string, r: string, tpl: string): string {
    return tpl.replace(new RegExp(`((?<=\\()${key}(?=\\)))`, "g"), r);
  }

  // FIXED 前面替换过的串可能会引入模板字符
  // ---------- format time ---------- //
  public format(template: string): string;
  public format(template: string, date: dateType): string;
  public format(
    template: string = "YYYY-MM-DD HH:mm:ss",
    date: any = this.now
  ) {
    const d = this._dateWrapper(date);
    const tplMap = this._getTplMap(d);

    if (["X", "x"].includes(template)) {
      return this._getTimeStamp(template, d);
    }
    // 为所有待替换的 key 添加保护字符
    for (const key of Object.keys(tplMap)) {
      const c = getCharFromRepeat(key);
      if (c) {
        template = template.replace(
          new RegExp(`(?<!${c}|\\()${key}(?!${c}|\\))`, "g"),
          `(${key})`
        );
      } else {
        template = template.replace(
          new RegExp(`(?<!\\()${key}(?!\\))`, "g"),
          `(${key})`
        );
      }
    }
    // 替换模板串
    for (const key of Object.keys(tplMap)) {
      if (template.indexOf(key) !== -1) {
        template = this._protectedReplace(key, tplMap[key], template);
      }
    }
    // 删除保护字符
    return template.replace(/[\\(\\)]/g, "");
  }

  // ---------- Days in Month ---------- //
  daysInMonth(year, month) {
    if (year === undefined || month === undefined) {
      const date = this.now;
      year = this.year(date);
      month = this.month(date);
    }
    if (month !== 2) {
      return daysOfMonthMap.day30.includes(month) ? 30 : 31;
    } else {
      return this.isLeapYear(year) ? 29 : 28;
    }
  }

  // 闰年能被4整除且不能被100整除,或能被400整除
  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 == 0;
  }

  // ---------- Start of Time ---------- //
  // startOf(type) {
  //   const startOfTimeMap = {
  //     'day':
  //   }
  // };

  // ---------- Set Time ---------- //
  // ---------- Add Time ---------- //
  // ---------- Subtract Time ---------- //
  // ---------- Compare Time ---------- //
}

const momentInstance: Moment = new Moment();

// 调用 moment() 时返回单一实例
function getMomentInstance() {
  return momentInstance;
}

export default function moment() {
  return getMomentInstance();
}
