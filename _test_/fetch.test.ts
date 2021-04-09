import Fetch from "../src/fetch";

const fetch = new Fetch({
  responseType: "text",
  timeout: 1000000,
});

const url = "https://605c15da6d85de00170d940e.mockapi.io/api/fetch/user";
const baseUrl = "https://605c15da6d85de00170d940e.mockapi.io/api/fetch";
describe("create fetch object", () => {
  // it("fetch data with request", () => {
  //   return fetch
  //     .request({
  //       method: "get",
  //       url,
  //     })
  //     .then((res: any) => {
  //       console.log("==>", res.status);
  //       console.log("==>", res.statusText);
  //       console.log("==>", res.data);
  //       console.log("==>", res.ok);
  //     });
  // });
  // it("fetch data with get", async () => {
  //   return fetch
  //     .get(url, {})
  //     .then((res: any) => console.log("==>", res, typeof res));
  // });
  // it("fetch data with await/async", async () => {
  //   const res = await fetch.get(url, {});
  //   console.log("==>", res, typeof res);
  // });
  // it("fetch data with baseURL", () => {
  //   return fetch
  //     .get("/user", {
  //       baseURL: "https://605c15da6d85de00170d940e.mockapi.io/api/fetch",
  //       params: {
  //         pass: "jonsam",
  //         user: "jonsam",
  //       },
  //     })
  //     .then((res) => console.log("==>", res));
  // });
  // it("fetch data with timeout", () => {
  //   return fetch
  //     .get(url, {
  //       timeout: 10,
  //     })
  //     .then((res) => console.log("==>", res, typeof res));
  // });
  // it("post data", () => {
  //   return fetch
  //     .post("/user", {
  //       baseURL: baseUrl,
  //       timeout: 3000,
  //       data: {
  //         name: "jonsam ng",
  //         avatar: "",
  //       },
  //     })
  //     .then((res) => console.log("==>", res));
  // });
  // it("put data", () => {
  //   return fetch
  //     .put("/user/1", {
  //       baseURL: baseUrl,
  //       timeout: 3000,
  //       data: {
  //         name: "jonsam ng",
  //         avatar: "",
  //       },
  //       transformRequest: [
  //         function (data) {
  //           delete data.avatar;
  //           return data;
  //         },
  //         function (data) {
  //           data["age"] = 18;
  //           return data;
  //         },
  //       ],
  //       transformResponse: [
  //         function (data) {
  //           delete data.msg;
  //           return data;
  //         },
  //         function (data) {
  //           data["message"] = 18;
  //           return data;
  //         },
  //       ],
  //       headers: { "X-Requested-With": "XMLHttpRequest" },
  //       // auth: {
  //       //   username: "janedoe",
  //       //   password: "s00pers3cret",
  //       // },
  //     })
  //     .then((res) => {
  //       console.log("==>", res);
  //       console.log("==>", res.request.origin.headers);
  //       console.log("==>", res.request.options.headers);
  //     });
  // });
  it("should fetch error work", async () => {
    jest.setTimeout(30000000); // The default timeout is 5000
    const res = await fetch.get("/user", {
      baseURL: baseUrl,
      timeout: 60000,
      responseType: "json",
    });
    console.log("==>", res);
  });
});
