# Native js 调原生方法模块

通过方法的封装方便快捷的管理 js 与原生部分（android, ios）方法的连通，舍弃手动写代码注册的方法，通过方法自动生成注册减少冗余代码，满足通用方法的使用需求。

## 使用

```ts
import Native from "toolkit";
Native.setTitle("hello");
```

Native 以实例的方法导出，在项目中维持单例模式。

## 注册通用方法

通用方法请在'native/native.ts'中注册，方法以 json 的方式管理。

## 参数

| 参数    | 描述                             |
| ------- | -------------------------------- |
| common  | 适用于 android 和 ios 的通用方法 |
| android | 适用于 android 的特殊方法        |
| ios     | 适用于 ios 的特殊方法            |

## 方法参数

可使用的方法类型如下：

string: 不用传参和特殊处理的同步方法的简写、
object: 对方法进行详细的配置。

详细配置的参数如下：

| 参数                  | 描述                      | 类型         |
| --------------------- | ------------------------- | ------------ |
| functionName          | 方法名称                  | string       |
| params                | 参数数组                  | Array        |
| customAndroidCallback | 自定义 android 的处理方法 | () => string |
| customIosCallback     | 自定义 ios 的处理方法     | () => string |
| customErrorHandler    | 自定义 error 的处理方法   | () => string |

