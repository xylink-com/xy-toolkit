## HashMap 

HashMap 是使用 Array 和 Map 实现的简易的 HashMap 容器，具有类似于 Map 的易操作的 API。

## 何时使用

- 保存 k-v 对的容易。
- 比 Map 的查找更高效。
- 适合存储数据较多、查找操作比较频繁的场景。

## 代码案例

```ts
import { HashMap } from "toolkit";
const hashMap = new HashMap(4);
hashMap.set("cat", "animal");
const dog = hashMap.get("dog");
```

更多代码案例请参考：[HashMap 测试文件](../../../_test_/eventEmitter/hashMap.test.ts)

### API

#### 实例方法

| API          | 参数                   | 返回值            | 描述                                         |
| ------------ | ---------------------- | ----------------- | -------------------------------------------- |
| set          | key, value             | this              | 设置键值对                                   |
| get          | key                    | value             | 获取键对应的值                               |
| has          | key                    | boolean           | 判断是否含有键                               |
| size         |                        | number            | 键值对的数量                                 |
| countBuckets |                        | number            | 非空 bucket 的数量                           |
| keys         |                        | Array             | 获取 key 数组                                |
| values       |                        | Array             | 获取 values 数组                             |
| entries      |                        | Array             | 获取 entries 数组                            |
| forEach      | callback(k, v) => void | void              | 循环键值对                                   |
| delete       | key                    | this \| undefined | 删除键值对                                   |
| clear        |                        | void              | 清空所有 bucket                              |
| toObject     |                        | Object            | 以 object 的方式查看 key 在 buckets 中的分布 |
| toArray      |                        | Array             | 以 Array 的方式查看 key 在 buckets 中的分布  |

#### 静态属性

| 参数       | 描述                 |
| ---------- | -------------------- |
| buckets    | bucket 集合          |
| collisions | 有碰撞的 bucket 数量 |
| opacity    | number               |

## 链接

[HashMaps](https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#HashMaps)