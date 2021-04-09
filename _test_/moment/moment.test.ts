import moment from "../../src/moment";
// moment().locale("en_US");
// moment().locale("zh_TW");
describe("momentJS", () => {
  it("date info", () => {
    // expect(moment().year()).toEqual(new Date().getFullYear());
    // expect(moment().shortYear()).toEqual(21);
    // expect(moment().month()).toEqual(new Date().getMonth() + 1);
    // expect(moment().date()).toEqual(new Date().getDate());
    // expect(moment().day()).toEqual(new Date().getDay());
    // expect(moment().hours()).toEqual(new Date().getHours());
    // expect(moment().minutes()).toEqual(new Date().getMinutes());
    // expect(moment().seconds()).toEqual(new Date().getSeconds());
    // console.log(moment().localeHours());
    // console.log(moment().toArray());
    // console.log(moment().toObject());
    // console.log(moment().day());
    // console.log(moment().shortYear());
    // console.log(moment().localeDay());
    // console.log(moment().localeMonth());
    // console.log(moment().padMonth());
    // console.log(moment().quarter());
    // console.log(moment().dayOfYear('2021-2-2'));
    // console.log(moment().dayOfMonth('2021-2-2'));
    // console.log(moment().toString());
    // console.log(moment().toLocaleString());
    // console.log(moment().toDateString());
    // console.log(moment().toLocaleDateString());
    // console.log(moment().toTimeString());
    // console.log(moment().toLocaleTimeString());
  });
});

describe("momentJS", () => {
  // it("format time", () => {
    console.log(moment().format("YYYY-MM-DD HH时mm分s秒 ms毫秒"));
  //   console.log(moment().daysInMonth());
  //   console.log(moment().daysInMonth(2020, 2));
  //   console.log(moment().daysInMonth(2021, 2));
  //   console.log(moment().daysInMonth(2020, 12));
  //   console.log(moment().format(undefined, "X"));
  //   console.log(moment().format(undefined, "x"));
  //   console.log(moment().format(null, "YYYY-MM-DD HH时mm分ss秒", true));
  //   console.log(moment().format(undefined, "YYYY-MM-DD HH时mm分ss秒 ll", true));
  //   console.log(moment().format(undefined, "YYYY-MM-DD HH时mm分ss秒", true));
  //   console.log(
  //     moment().format(undefined, "YYYY-MM-DD HH时mm分ss秒", false)
  //   );
  // });
});

describe("momentJS", () => {
  it("format custom time", () => {
    // console.log(moment().format("YYYY-MM-DD HH时mm分ss秒"));
    // console.log(moment().format("YYYY-MM-DD HHH时mm分ss秒 ll"));
    // console.log(
    //   moment().format(
    //     "YYYY YY Q MMMM MM M DDDD DDD D dddd d HHH HH H mm m ss s ww ll"
    //   )
    // );
    // console.log(
    //   moment().format(
    //     "YYYY YY Q MMMM MM M DDDD DDD D dddd d HHH HH H mm m ss s ww ll",
    //     "111111111111"
    //   )
    // );
    console.log(moment().format("YYYY-MM-DD HH时mm分ss秒", "2020-12-12"));
    console.log(
      moment().format("YYYY-MM-DD HHH时mm分ss秒 ll", "2020-12-12 14:14:14")
    );
  });
});

describe("momentJS", () => {
  it("get time", () => {
    // console.log(moment().get("year"));
    // console.log(moment().get("shortYear"));
    // console.log(moment().get("quarter"));
    // console.log(moment().get("localeMonth"));
    // console.log(moment().get("padMonth"));
    // console.log(moment().get("month"));
    // console.log(moment().get("dayOfYear"));
    // console.log(moment().get("dayOfMonth"));
    // console.log(moment().get("padDate"));
    // console.log(moment().get("date"));
    // console.log(moment().get("localeDay"));
    // console.log(moment().get("day"));
    // console.log(moment().get("localeHours"));
    // console.log(moment().get("PadHours"));
    // console.log(moment().get("hours"));
    // console.log(moment().get("padMinutes"));
    // console.log(moment().get("minutes"));
    // console.log(moment().get("padSeconds"));
    // console.log(moment().get("seconds"));
    // console.log(moment().get("weekOfYear"));
    // console.log(moment().get("milliseconds"));
    // console.log(moment().get());
    // console.log(moment().toString());
    // console.log(moment().toLocaleString());
    // console.log(moment());
  });
});
