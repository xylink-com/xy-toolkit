class UrlParam {
  defalutParamStr: string;
  constructor() {
    this.defalutParamStr = window.location.search
  }

  private searchMatch(search: string) {
    return search.indexOf('?') > -1 ? search.substr(1) : search;
  }

  getUrlParam(name: string, search?: string): string | undefined {
    const urlSearch = search || this.defalutParamStr;
    const reg = new RegExp("(^|&|\\?)" + name + "=([^&?]*)(&|\\?|$)"); //构造一个含有目标参数的正则表达式对象
    let r = this.searchMatch(urlSearch).match(reg);
    if (r != null) return unescape(r[2]); return undefined; //返回参数值
  }

  getAllUrlParams(search?: string) {
    const urlSearch = search || this.defalutParamStr;
    const query = this.searchMatch(urlSearch).split(/[&?]/);
    const params = {};
    for (let i = 0; i < query.length; i++) {
      let q = query[i].split('=')
      if (q.length === 2) {
        params[q[0]] = q[1]
      }
    }
    return params
  }
}

export default new UrlParam()