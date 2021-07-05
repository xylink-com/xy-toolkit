/**
 * 全屏函数库，支持事件、方法、和多个元素同时调用全屏API
 *
 * @author jinghui-Luo
 *
 * Created at     : 2020-12-04 15:37:02
 * Last modified  : 2021-07-05 17:20:28
 */

const browser = function () {
  const browserList = [
    [
      'requestFullscreen',
      'exitFullscreen',
      'fullscreenElement',
      'fullscreenchange',
      'fullscreenEnabled',
    ],
    [
      'webkitRequestFullscreen',
      'webkitExitFullscreen',
      'webkitFullscreenElement',
      'webkitfullscreenchange',
      'webkitFullscreenEnabled',
      'webkitCancelFullScreen',
    ],
    [
      'mozRequestFullScreen',
      'mozCancelFullScreen',
      'mozFullScreenElement',
      'mozfullscreenchange',
      'mozFullScreenEnabled',
    ],
    [
      'msRequestFullscreen',
      'msExitFullscreen',
      'msFullscreenElement',
      'MSFullscreenChange',
      'msFullscreenEnabled',
    ],
  ];

  const browserLen = browserList.length;
  let val;
  let result = {};

  for (let i = 0; i < browserLen; i++) {
    val = browserList[i];

    if (val && val[1] in document) {
      val.forEach((item, index) => {
        result[browserList[0][index]] = item;
      });

      break;
    }
  }

  return result;
};

/**
 * 浏览器元素全屏展示库
 *
 * @class { IFScreen } FScreen 全屏类
 */
class FScreen {
  /**
   * 浏览器兼容全屏API对象
   */
  browser: any;
  /**
   * 所有需要全屏展示的元素Map列表
   */
  eles: any;
  /**
   * 是否初始化
   */
  isInit: boolean;

  constructor() {
    this.browser = browser();
    this.eles = new Map();
    this.isInit = false;

    this.fullscreenChangeCallback = this.fullscreenChangeCallback.bind(this);
  }

  /**
   * 获取当前全屏元素
   *
   * @public
   * @returns 全屏元素
   */
  public ele() {
    return document[this.browser.fullscreenElement];
  }

  /**
   * 获取所有全屏元素对象
   *
   * @public
   * @returns 全屏元素对象数据
   */
  public getEles() {
    return this.eles;
  }

  /**
   * 初始化配置全屏参数
   *
   * @public
   * @param { HTMLElement } ele 请求全屏的元素
   * @param { Function } cb 元素全屏状态回调事件
   */
  public init(ele: any | HTMLElement, cb?: (e: any) => void) {
    this.eles.set(ele, { ele, cb, isFullScreen: false });

    if (!this.isInit) {
      this.initEventListener();
    }
  }

  /**
   * 全屏状态变化回调事件
   *
   * @private
   * @param { any } e 回调状态数据
   */
  private fullscreenChangeCallback(e: any) {
    const fullscreenEle = this.ele();
    const currentEle = e.target;

    if (fullscreenEle === null) {
      // 没有全屏元素，则更新所有ele的全屏状态
      this.eles.forEach((eleObj: any) => {
        eleObj.isFullScreen = false;

        eleObj.cb(eleObj);
      });
    } else if (fullscreenEle !== null && currentEle !== fullscreenEle) {
      // 连续请求全屏，依次退出时回调
      // safari不会调用此回调，因为无法连续请求全屏api
      const currentEle = e.target;

      if (this.eles.has(currentEle)) {
        const eleObj = this.eles.get(currentEle);

        eleObj.isFullScreen = false;

        eleObj.cb(eleObj);
      }
    } else if (fullscreenEle !== null) {
      // 全屏时回调
      const eleObj = this.eles.get(currentEle);

      eleObj.isFullScreen = true;

      this.eles.set(currentEle, eleObj);

      eleObj.cb(eleObj);
    }
  }

  /**
   * 初始化document全屏监听事件
   *
   * @private
   */
  private initEventListener() {
    document.addEventListener(
      this.browser.fullscreenchange,
      this.fullscreenChangeCallback
    );

    this.isInit = true;
  }

  /**
   * 移除document全屏监听事件
   *
   * @private
   */
  private removeEventListener() {
    document.removeEventListener(
      this.browser.fullscreenchange,
      this.fullscreenChangeCallback
    );
  }

  /**
   * 清理全屏元素和事件
   *
   * @public
   * @param ele 需要退出全屏的元素
   */
  public clear(ele: any) {
    if (this.eles.has(ele)) {
      const eleObj = this.eles.get(ele);

      eleObj.isFullScreen = false;

      if (this.eles.size <= 1) {
        this.removeEventListener();

        this.isInit = false;
      }

      this.eles.delete(ele);
    }
  }

  /**
   * 清理全屏元素和事件
   */
  public clearAll() {
    this.removeEventListener();

    this.eles = new Map();
    this.isInit = false;
  }

  /**
   * 将元素进行全屏展示
   *
   * @public
   * @param { HTMLElement } ele 需要全屏的元素
   */
  public request(ele: any) {
    if (this.eles.has(ele)) {
      const eleObj = this.eles.get(ele);

      eleObj.ele[this.browser.requestFullscreen]();
    } else {
      this.init(ele);

      this.request(ele);
    }
  }

  /**
   * 退出全屏显示
   *
   * @public
   * @param { HTMLElement } ele 需要退出全屏的元素
   */
  public exit(ele: any) {
    const hasEle = this.eles.has(ele);

    if (hasEle) {
      const item = this.eles.get(ele);

      if (item.isFullScreen) {
        document[this.browser.exitFullscreen]();
      }
    }
  }
}

const fscreen = new FScreen();

export { fscreen };
