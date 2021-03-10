/** 
 * @author chenjiaojiao
 * 
 * Created at     : 2021-01-21 18:45:42
 * Last modified  : 2021-01-22 18:21:38
 */

// 获取数据类型
const getType = (value) => {
  const type = Object.prototype.toString.call(value);

  return type.match(/\[object (.*)\]/)[1];
}

const getObj = (value) => {
  if (getType(value) === 'Array') {
    return [];
  } else if (getType(value) === 'Set') {
    return new Set();
  } else if (getType(value) === 'Map') {
    return new Map();
  } else {
    return {};
  }
};

const cloneDeep = (value) => {
  // 存放已递归到的目标对象
  const clonedObjs = [];

  const baseClone = (value) => {
    // 如果不是引用类型，就返回原数据
    if (typeof value !== 'object') {
      return value;
    }
    if (value === null) {
      return value;
    } 
    if (getType(value) === 'RegExp') {
      return value;
    } 
    if (getType(value) === 'Date') {
      return value;
    }

    const length = clonedObjs.length;
    const obj = getObj(value);

    for (let i = 0 ; i < length; i++) {
      if (clonedObjs[i].value === value) {
        return clonedObjs[i].copyTarget;
      }
    }
    
    clonedObjs.push({value, copyTarget: obj});

    if (getType(value) === 'Set') {
      value.forEach(key => {   
        // @ts-ignore
        obj.add(key)
      });
    } else if (getType(value) === 'Map') {
      value.forEach((value, key) => {   
        // @ts-ignore
        obj.set(key, value);
      });
    } else {
      // Object.keys: 返回一个数组，包括对象自身的所有可枚举属性（不含Symbol属性）的键名
      Object.keys(value).forEach(key => { 
        if (obj[key]) { 
          return; 
        } 
        obj[key] = baseClone(value[key]);
      });

      // Object.getOwnPropertySymbols: 返回一个数组，包含对象自身的所有Symbol属性的键名
      Object.getOwnPropertySymbols(value).forEach(key => {
        if (obj[key]) {
          return;
        }
        obj[key] = baseClone(value[key]);
      });
    }
  
    return obj;
  };
  
  return baseClone(value);
};

export default cloneDeep;
