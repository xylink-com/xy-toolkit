# CloneDeep

cloneDeep 是一个用于深拷贝的工具函数，可对数组、对象进行深拷贝，包含的数据类型有：基本数据类型、Symbal、object（数组、方法、Set、Map、正则、日期）。

## 例子

```ts
import { cloneDeep } from "@xylink/cloneDeep";

const arr = [
  {
    students: [
      {
        name: 'Li Lei',
        age: 12
      }, 
      {
        name: 'Wang Meimei',
        age: 11
      }
    ]
  },
  {
    school: {
      name: 'Hope Primary School',
      location: 'Shaanxi',
    }
  }
];
const clonedArr = cloneDeep(arr);

arr[2].school.location = 'Shanxi';
clonedArr[0].students[0].name = 'Li Ming';

// arr[0].students[0].name: 'Li Lei'
// clonedArr[2].school.location: 'Shaanxi'
```