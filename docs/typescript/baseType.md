---
sidebar_position: 1
---

# 数据类型

## 基础数据类型

- number
- string
- boolean
- 数组
  数组内的元素类型相同
  ```javascript
  let list: number[] = [1, 2, 3]
  let list: Array<number> = [1, 2, 3]
  ```
- 元组
  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
  ```javascript
  let x: [string, number]
  x = ['hello', 10]
  ```
- 枚举
  ```javascript
  enum Color {Red, Green, Blue}
  let c: Color = Color.Green;
  ```
- Any
- Void:
  当一个函数没有返回值时，你通常会见到其返回值类型是 void
- Null、Undefined:
  默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。如果指定了`--strictNullChecks`标记，null 和 undefined 只能赋值给 void 和它们各自
- Never
- Object

## 类型断言

在 jsx 中只有 as 语法断言是被允许的

```javascript
let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length

let someValue: any = "this is a string"
let strLength: number = (someValue as string).length
```

## declare

在 TypeScript 里，declare 关键字起着至关重要的作用，它主要用于告诉 TypeScript 编译器某个变量、函数、类、模块等的类型信息，不过并不涉及具体的实现。常用于在声明文件中，例如，创建一个 globals.d.ts 文件

```javascript
// globals.d.ts
declare const PI: number;
declare function square(x: number): number;

// 在其他文件中，main.ts
console.log(PI);
const result = square(5);
```

## interface

必有属性，可选属性

```javascript
interface Config {
  color?: string
  width: number
}

function setConfig(config: Config){}
const myConfig = setConfig({width: 12})
```

只读属性

```javascript
interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

## type 和 interface 如何选择

type: 适用于定义复杂的类型，如联合类型，交叉类型，元组类型  
interface:在定义对象结构，类的契约是使用较多，尤其是需要声明合并的场景

## 高级类型

### 字面量类型

数据实现时就是 interface 中的值

```javascript
interface Tmp {
  obj: {
    name: 'wang',
    age: 18
  };
}

const tmp: Tmp = {
  obj: {
    name: 'wang',
    age: 18
  }
}
```

### 联合类型

代表了一组类型的可用集合，只要最终赋值的类型属于联合类型的成员之一，就可以认为符合这个联合类型。联合类型对其成员并没有任何限制，除了上面这样对同一类型字面量的联合，我们还可以将各种类型混合到一起

```javascript
interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2);
}
// 字面量类型与联合类型，例如实现一个接口的返回值
interface Res {
  code: 10000 | 10001 | 50000;
  status: 'success' | 'failure';
  data: any;
}
```

### 交叉类型

```javascript
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct

const profile: ProfileStruct = {
  name: 'jian',
  age: 18
}

// test
type Struct1 = {
  primitiveProp: string,
  objectProp: {
    name: string
  }
}

type Struct2 = {
  primitiveProp: number,
  objectProp: {
    age: number
  }
}

type Composed = Struct1 & Struct2

type PrimitivePropType = Composed['primitiveProp'] // never
type ObjectPropType = Composed['objectProp'] // { name: string; age: number; }

type UnionIntersection1 = (1 | 2 | 3) & (1 | 2) // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string // string
```

### 索引类型

```javascript
interface AllStringTypes {
  [key: string]: string;
}

const foo: AllStringTypes = {
  jian: '599'
}
```

### 映射类型

```javascript
type Stringify<T> = {
  [K in keyof T]: string;
}

interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Foo>;

// 等价于
interface StringifiedFoo {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}
```
