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

在类型别命中，类型别名可以声明自己能够接受泛型

```js
type Factory<T> = T | number | string

// 直接使用
const foo: Factory<boolean> = true
// 另外声明一个新的类型别名
type FactoryWithBool = Factory<boolean>
const foo: FactoryWithBool = true
```

泛型参数的名称 T 也不是固定的。通常我们使用大写的 T / K / U / V / M / O ...这种形式。如果为了可读性考虑，我们也可以写成大驼峰形式（即在驼峰命名的基础上，首字母也大写）的名称

```js
type Factory<NewType> = NewType | number | string
```

工具类型会接受一个类型，并返回一个包括 null 的联合类型。这样一来，在实际使用时就可以确保你处理了可能为空值的属性读取与方法调用

```js
type MaybeNull<T> = T | null

function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler()
}
```

### 泛型约束与默认值

像函数可以声明一个参数的默认值一样，泛型同样有着默认值的设定

```js
type Factory<T = boolean> = T | number | string

type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure'
type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"

type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”

// 约束泛型的类型
type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure'

type Res4 = ResStatus; // "success"

```

### 对象类型中的泛型

接口响应类型节后的泛型

```js
interface IRes<TData = unknown> {
  code: number
  error?: string
  data: TData
}

interface IUserProfileRes {
  name: string
  homepage: string
  avatar: string
}
// 请求函数中传入特定的响应类型
function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {}

type StatusSucceed = boolean
function handleOperation(): Promise<IRes<StatusSucceed>> {}

// 泛型多层嵌套，例如分页结构
interface IPaginationRes<TItem = unknown> {
  data: TItem[]
  page: number
  totalCount: number
  hasNextPage: boolean
}

function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {}
```

### 函数中的泛型

比如 lodash 的 pick 函数，这个函数首先接受一个对象，然后接受一个对象属性名组成的数组，并从这个对象中截取选择的属性部分

```js
const object = { 'a': 1, 'b': '2', 'c': 3 }
_.pick(object, ['a', 'c'])
// => { 'a': 1, 'c': 3 }

pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>
```

箭头函数的泛型

```js
const handle = <T>(input: T): T => {}

// 在jsx中
const handle = <T extends any>(input: T): T => {}
```

promise 中添加泛型

```ts
function p() {
  return new Promise()<boolean>((resolve, reject) => {
    resolve(true)
  })
}
```

## 内置的工具类型

### Partial

把所有 k 改为可选

```js
interface IFoo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type PartialIFoo = Partial<IFoo>

// 等价于
interface PartialIFoo {
  prop1?: string;
  prop2?: number;
  prop3?: boolean;
  prop4?: () => void;
}
```

### Required

把所有 k 改为必选

### Readonly

把所有 k 改为只读

### IsEqual

```js
type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<'jian'>; // 2
```

### Pick

`Pick<T, K>`，其中 T 是要从中选择属性的原始类型，K 是一个联合类型，用于指定要选择的属性名

- 属性过滤：当你只需要使用一个复杂类型中的部分属性时，可以使用 Pick 来创建一个更精简的类型，这样可以更清晰地表达你的意图，并且在编译时能获得更好的类型检查。
- 函数参数限制：如果一个函数只需要接收一个对象的部分属性，可以使用 Pick 来定义参数的类型，确保传入的对象只包含函数所需的属性，提高代码的可读性和可维护性。

```js
const object = { 'a': 1, 'b': '2', 'c': 3 }
_.pick(object, ['a', 'c'])
// => { 'a': 1, 'c': 3 }

pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>

interface Person {
  name: string;
  age: number;
  address: string;
}

// 从Person接口中选取name和age属性创建新类型PersonInfo
type PersonInfo = Pick<Person, 'name' | 'age'>;

const person: PersonInfo = {
  name: 'John',
  age: 30
};
```

### Omit

用于从一个已有的类型中移除指定的属性，从而创建一个新的类型。它在处理复杂类型和避免重复定义类型时非常有用

```js
// 定义一个原始类型
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// 使用 Omit 创建一个新类型，移除 'id' 和 'email' 属性
type UserWithoutIdAndEmail = Omit<User, 'id' | 'email'>

// 创建一个符合 UserWithoutIdAndEmail 类型的对象
const user: UserWithoutIdAndEmail = {
  name: 'John Doe',
  age: 30
}
```

### Record

Record 是一个内置的工具类型，其用途是创建一个具有指定属性键和属性值类型的对象类型。借助 Record，你能够快速定义出具有相同值类型的一组属性的对象类型。`Record<K, T>`，这里的 K 代表属性键的类型，一般是字符串字面量类型、数字字面量类型或者枚举类型等组成的联合类型；T 代表属性值的类型。`日常使用较多`

```js
// 创建一个 Record 类型，键为 string 类型，值为 number 类型
type ScoreRecord = Record<string, number>

// 创建一个符合 ScoreRecord 类型的对象
const scores: ScoreRecord = {
  Alice: 90,
  Bob: 85,
  Charlie: 78
}

// 可以访问对象的属性
console.log(scores['Alice'])


// 结合枚举
enum Fruit {
    Apple = "apple",
    Banana = "banana",
    Orange = "orange"
}

// 创建一个 Record 类型，键为 Fruit 枚举类型，值为 string 类型
type FruitDescription = Record<Fruit, string>;

// 创建一个符合 FruitDescription 类型的对象
const descriptions: FruitDescription = {
    [Fruit.Apple]: "A red or green fruit",
    [Fruit.Banana]: "A yellow curved fruit",
    [Fruit.Orange]: "A round citrus fruit"
};

// 可以访问对象的属性
console.log(descriptions[Fruit.Banana]);
```

## 类型层级

### 判断类型兼容性的方式

对于原始类型

```js
type Result1 = "jian" extends string ? 1 : 2 // 1
type Result2 = 1 extends number ? 1 : 2 // 1
type Result3 = true extends boolean ? 1 : 2 // 1
type Result4 = { name: string } extends object ? 1 : 2 // 1
type Result5 = { name: 'jian' } extends object ? 1 : 2 // 1
type Result6 = [] extends object ? 1 : 2 // 1
```

object 代表着所有非原始类型的类型，即数组、对象与函数类型，Result6 成立的原因即是[]这个字面量类型也可以被认为是 object 的字面量类型。我们将结论简记为，`字面量类型 < 对应的原始类型`  
对于联合类型

```js
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2 // 1
type Result8 = 'lin' extends 'lin' | 'bu' | 'du' ? 1 : 2 // 1
type Result9 = true extends true | false ? 1 : 2 // 1
```

### 装箱类型

String 与 Object 类型

```js
type Result14 = string extends String ? 1 : 2 // 1
type Result15 = String extends {} ? 1 : 2 // 1
type Result16 = {} extends object ? 1 : 2 // 1
type Result18 = object extends Object ? 1 : 2 // 1
```

## infer

在条件类型中提取类型的某一部分信息

```js
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T

type SwapResult1 = Swap<[1, 2]> // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]> // 不符合结构，没有发生替换，仍是 [1, 2, 3]
```

## 项目配置

```json
{
  "compilerOptions": {
    "target": "ES6", // 指定编译后的 JavaScript 版本，常见的值有 ES3、ES5、ES6/ES2015、ES2016 等
    "module": "commonjs", // 指定生成的模块系统，如 commonjs、amd、esnext 等
    "lib": ["ES6", "DOM"], // 指定要包含在编译中的库文件，例如 ES6 提供的 Promise、Map 等新特性需要引入相应的库
    "outDir": "./dist",
    "rootDir": "./src", // 指定输入文件的根目录，编译器会根据这个目录来组织输出文件的结构
    "strict": true, // 启用所有严格类型检查选项，包括 noImplicitAny、noImplicitThis 等，建议开启以提高代码质量
    "esModuleInterop": true, // 允许在 CommonJS 模块中使用 ES6 模块的导入和导出语法，解决一些模块导入导出的兼容性问题
    "skipLibCheck": true, // 跳过对 node_modules 中所有声明文件（.d.ts）的类型检查，可加快编译速度。
    "forceConsistentCasingInFileNames": true // 强制文件名的大小写一致，避免在不同操作系统上因大小写问题导致的编译错误
  },
  "include": ["src/**/*.ts"], // 指定需要编译的文件或目录，支持通配符
  "exclude": ["node_modules", "dist"] // 指定不需要编译的文件或目录，同样支持通配符
}
```

extends 允许继承另一个 tsconfig.json 文件的配置，可用于复用公共配置

```json
{
  "extends": "./base.tsconfig.json",
  "compilerOptions": {
    // 可以在此基础上进行额外的配置
  }
}
```
