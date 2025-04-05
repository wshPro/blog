---
sidebar_position: 2
---

# 高级用法

## 函数

函数的类型签名

```js
type FuncFoo = (name: string) => number

const foo: FuncFoo = name => {
  return name.length
}
```

可选参数与 rest 参数

```js
// 在函数逻辑中注入可选参数默认值
function foo1(name: string, age?: number): number {
  const inputAge = age || 18 // 或使用 age ?? 18
  return name.length + inputAge
}

// 直接为可选参数声明默认值
function foo2(name: string, age: number = 18): number {
  const inputAge = age
  return name.length + inputAge
}
```

函数重载

```js
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number
```

## 类型查询操作符

typeof 返回一个 typescript `类型`

```js
const str = 'jian'

const obj = { name: 'jian' }

const nullVar = null
const undefinedVar = undefined

const func = (input: string) => {
  return input.length > 10
}

type Str = typeof str // "jian"
type Obj = typeof obj // { name: string; }
type Null = typeof nullVar // null
type Undefined = typeof undefined // undefined
type Func = typeof func // (input: string) => boolean

const func = (input: string) => {
  return input.length > 10
}

const func2: typeof func = (name: string) => {
  return name === 'jian'
}
```

ReturnType 获取一个返回值的类型

```js
const func = (input: string) => {
  return input.length > 10
}

// boolean
type FuncReturnType = ReturnType<typeof func>
```

## 泛型
