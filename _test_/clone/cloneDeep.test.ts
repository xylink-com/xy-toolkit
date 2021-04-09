import cloneDeep from '../../src/cloneDeep';

// 测试null
test('clonedNull is null', () => {
  const clonedNull = cloneDeep(null);

  expect(clonedNull).toBeNull;
});

// 测试正则
test('clonedReg is /^123abc$/ig', () => {
  const reg = /^123abc$/ig;
  const clonedReg = cloneDeep(reg);

  expect(clonedReg).toEqual(/^123abc$/ig);
});

// 测试Date
test('clonedDate is new Date(2021, 1, 22)', () => {
  const date = new Date(2021, 1, 22);
  const clonedDate = cloneDeep(date);

  expect(clonedDate).toEqual(new Date(2021, 1, 22));
});

// 测试function
test('clonedFun is fun', () => {
  const fun = () => {
    return "fun";
  };
  const clonedFun = cloneDeep(fun);

  expect(clonedFun).toEqual(fun);
});

// 测试symbol
test('obj is { [Symbol()]: "Hello" }', () => {
  const symbol = Symbol();
  const obj = {
    [symbol]: 'Hello'
  };
  const clonedObj = cloneDeep(obj);

  clonedObj[symbol] = 'World';

  expect(obj).toEqual({ [symbol]: 'Hello' });
  expect(clonedObj).toEqual({ [symbol]: 'World' });
});

// 测试相同引用
test('obj is {item1, { age: 1 }, item2: {age: 1}}', () => {
  const obj = {}; 
  const obj1 = { age: 10 };

  obj['item1'] = obj1;
  obj['item2'] = obj1;

  const clonedObj = cloneDeep(obj);

  obj['item1'].age = 1;
  clonedObj['item1'].age = 2;

  expect(obj).toEqual({item1: { age: 1 }, item2: { age: 1 }});
  expect(clonedObj).toEqual({item1: { age: 2 }, item2: { age: 2}});
});

// 测试循环引用
test('output obj1 and conedObj', () => {
  const obj1 = { a: {} };
  const obj2 = {
    b: obj1
  };

  obj1.a = obj2;
  
  const clonedObj = cloneDeep(obj1);

  console.log('obj1:', obj1); // 输出: { a: { b: [Circular] } } 
  console.log('clonedObj:', clonedObj); // 输出: { a: { b: [Circular] } }
});

// 数组、对象组合
test('test array combine with object', () => {
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
      teachers: [
        {
          title: 'Teacher Wang',
          project: 'English'
        },
        {
          title: 'Teacher Li',
          project: 'Math'
        }
      ],
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

  expect(arr[0].students[0].name).toBe('Li Lei');
  expect(clonedArr[2].school.location).toBe('Shaanxi');
});

// 测试多种数据类型
test('test multiple data type', () => {
  const set = new Set([{name: 'xiaoming', age: 12}, 2, 3, 4, 4]);
  const map = new Map([
    ['name', 'xiaoming'],
    ['title', 'Author']
  ]);
  const fun = () => {
    return "fun";
  };
  const arr = [
    [
      null,
      /^123abc$/ig,
      new Date(2021, 1, 22),
      fun,
      Symbol('symbol'),
      set,
      map
    ],
    [
      'string',
      123,
      true,
      undefined,
    ],
    [
      {
        object: {
          types: [
            'function',
            'array'
          ]
        }
      }
    ]
  ];

  const clonedArr = cloneDeep(arr);

  clonedArr[0][1] = /^abc$/ig;
  clonedArr[1][2] = false;
  clonedArr[2][0]['object'].types[0] = 'fun';

  expect(arr[0][1]).toEqual(/^123abc$/ig);
  expect(arr[1][2]).toBe(true);
  expect(arr[2][0]['object'].types[0]).toBe('function');
  expect(clonedArr[0][5]).toEqual(set);
  expect(clonedArr[0][6]).toEqual(map);
});

// 测试空对象、空数组
test('test empty array and object', () => {
  const object = {
    arr: [],
    obj: {}
  };
  const clonedObject = cloneDeep(object);

  expect(clonedObject).toEqual({arr: [], obj: {}});
});

// 测试set
test('test set type', () => {
  const set = new Set([{name: 'xiaoming', age: 12}, 2, 3, 4, 4]);
  const clonedSet = cloneDeep(set);

  expect(clonedSet).toEqual(set);
});

// 测试map
test('test map type', () => {
  const map = new Map([
    ['name', 'xiaoming'],
    ['title', 'Author']
  ]); 
  const clonedMap = cloneDeep(map);

  expect(clonedMap).toEqual(map);
});