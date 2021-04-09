import fetch from "../../src/fetch";

describe("create fetch object", () => {
  it("create empty obj", () => {
    return fetch
      .request({
        method: "get",
        url:
          "https://cloud.xylink.com/api/rest/v3/en/cloudMeetingRooms/number/9005969319?securityKey=2d5b9c7cb1306324f6075f4cc95b403e17747b1fe25&t=1612172728248",
      })
      .then((res) => console.log("==>", res, typeof res));
  });
});
