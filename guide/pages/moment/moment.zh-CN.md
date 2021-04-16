# Moment 时间格式化工具

类 moment API 的时间格式化小工具，支持获取和设置格式化时间串等功能。

## 何时使用

- 时间格式化，支持区域化需求
- 轻量级工具
- 类 moment API，简单易用
## 代码案例

```ts
import { moment } from 'toolkit';
moment().format();
```

更多代码案例请参考：[Moment 测试文件](../../../_test_/moment/moment.test.ts)

## API
### Parse
#### now

```ts
const now = moment().current();
```

#### current info

```ts
const year = moment().year();
const month = moment().month();
const date = moment().date();
const day = moment().day();
const localeDay = moment().localeDay(); // '周日' | 'Sunday'
const hours = moment().hours();
const localeHours = moment().localeHours(); // [hour, 'am'/'pm']
const minutes = moment().minutes();
const seconds = moment().seconds();
const milliseconds = moment().milliseconds();
// 或者使用 get 方法,如
const year = moment().get('year')
// 将当前时间对象转化为数组
const [year, month, date, hour, minute, second, millisecond] = moment().toArray();
// 将当前时间对象转化为对象
const {year, month, date, hour, minute, second, millisecond} = moment().toObject();
// 获取当前时间串
const now = moment().toString();
const now = moment().get();
```

#### format

> 获取当前时间的毫秒值

```ts
const now = moment().format('x');
```

> 获取当前时间的秒值

```ts
const now = moment().format('X');
```

> 获取格式化的时间

| Property | Example                              | Description               |
| -------- | ------------------------------------ | ------------------------- |
| YYYY     | 2021                                 | 4 digit year              |
| YY       | 21                                   | 2 digit year              |
| Q        | 1..4                                 | Quarter of year           |
| MMMM     | Jan..December 一月..十二月 1月..12月 | Locale month number       |
| MM       | 01..12                               | Month number with 2 digit |
| M        | 1..12                                | Month number              |
| DDDD     | 1..365                               | Day of year               |
| DDD      | 1st..31th                            | Day of month with ordinal |
| DD       | 1..31                                | Day of month with 2 digit |
| D        | 1..31                                | Day of month              |
| dddd     | Mon...Sunday 周一..周六              | Day name in locale        |
| d        | 1..7                                 | Day name                  |
| HHH      | 3(下午)                              | Locale hour               |
| HH       | 01                                   | Hours with 2 digit        |
| H        | 1                                    | Hours                     |
| mm       | 05                                   | Minutes with 2 digit      |
| m        | 5                                    | Minutes                   |
| ss       | 04                                   | Seconds with 2 digit      |
| s        | 4                                    | Seconds                   |
| ms       | 57                                   | millSeconds               |
| ww       | 1..53                                | Week of year              |
| ll       | am..pm 上午..下午                    | Locale time               |

> 使用方法：

- 格式化当前时间

```ts
moment().format("YYYY-MM-DD HH时mm分ss秒");
// 2021-1-3 10:35:14
moment().format("X");
// 1611715788
moment().format("x");
// 1611715788466
moment().format("YYYY-MM-DD HH时mm分ss秒 ll");
// 2021-1-3 10时49分48秒 am
moment().format("YYYY-MM-DD HH时mm分ss秒");
// 2021-1-3 10时49分48秒
```

- 格式化传入时间
传入的 string 有 new Date(string)来转化为 Date 对象。

```ts
moment().format("YYYY-MM-DD HH时mm分ss秒 ll", 11111111111);
moment().format("YYYY-MM-DD HH时mm分ss秒 ll", "11111111111");
moment().format("YYYY-MM-DD HH时mm分ss秒 LL", '2020-12-12 14:14:14');
```

## TODO

- [ ] 完善 API
- [ ] 优化代码
