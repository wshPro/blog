"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[197],{6740:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"typescript/highLevel","title":"\u9ad8\u7ea7\u7528\u6cd5","description":"\u51fd\u6570","source":"@site/docs/typescript/highLevel.md","sourceDirName":"typescript","slug":"/typescript/highLevel","permalink":"/Blog/docs/typescript/highLevel","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"\u6570\u636e\u7c7b\u578b","permalink":"/Blog/docs/typescript/baseType"}}');var s=t(4848),o=t(8453);const i={sidebar_position:2},c="\u9ad8\u7ea7\u7528\u6cd5",u={},a=[{value:"\u51fd\u6570",id:"\u51fd\u6570",level:2},{value:"\u7c7b\u578b\u67e5\u8be2\u64cd\u4f5c\u7b26",id:"\u7c7b\u578b\u67e5\u8be2\u64cd\u4f5c\u7b26",level:2},{value:"\u6cdb\u578b",id:"\u6cdb\u578b",level:2}];function l(n){const e={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,o.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"\u9ad8\u7ea7\u7528\u6cd5",children:"\u9ad8\u7ea7\u7528\u6cd5"})}),"\n",(0,s.jsx)(e.h2,{id:"\u51fd\u6570",children:"\u51fd\u6570"}),"\n",(0,s.jsx)(e.p,{children:"\u51fd\u6570\u7684\u7c7b\u578b\u7b7e\u540d"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"type FuncFoo = (name: string) => number\n\nconst foo: FuncFoo = name => {\n  return name.length\n}\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u53ef\u9009\u53c2\u6570\u4e0e rest \u53c2\u6570"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"// \u5728\u51fd\u6570\u903b\u8f91\u4e2d\u6ce8\u5165\u53ef\u9009\u53c2\u6570\u9ed8\u8ba4\u503c\nfunction foo1(name: string, age?: number): number {\n  const inputAge = age || 18 // \u6216\u4f7f\u7528 age ?? 18\n  return name.length + inputAge\n}\n\n// \u76f4\u63a5\u4e3a\u53ef\u9009\u53c2\u6570\u58f0\u660e\u9ed8\u8ba4\u503c\nfunction foo2(name: string, age: number = 18): number {\n  const inputAge = age\n  return name.length + inputAge\n}\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u51fd\u6570\u91cd\u8f7d"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"function func(foo: number, bar: true): string;\nfunction func(foo: number, bar?: false): number;\nfunction func(foo: number, bar?: boolean): string | number {\n  if (bar) {\n    return String(foo);\n  } else {\n    return foo * 599;\n  }\n}\n\nconst res1 = func(599); // number\nconst res2 = func(599, true); // string\nconst res3 = func(599, false); // number\n"})}),"\n",(0,s.jsx)(e.h2,{id:"\u7c7b\u578b\u67e5\u8be2\u64cd\u4f5c\u7b26",children:"\u7c7b\u578b\u67e5\u8be2\u64cd\u4f5c\u7b26"}),"\n",(0,s.jsxs)(e.p,{children:["typeof \u8fd4\u56de\u4e00\u4e2a typescript ",(0,s.jsx)(e.code,{children:"\u7c7b\u578b"})]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"const str = 'jian'\n\nconst obj = { name: 'jian' }\n\nconst nullVar = null\nconst undefinedVar = undefined\n\nconst func = (input: string) => {\n  return input.length > 10\n}\n\ntype Str = typeof str // \"jian\"\ntype Obj = typeof obj // { name: string; }\ntype Null = typeof nullVar // null\ntype Undefined = typeof undefined // undefined\ntype Func = typeof func // (input: string) => boolean\n\nconst func = (input: string) => {\n  return input.length > 10\n}\n\nconst func2: typeof func = (name: string) => {\n  return name === 'jian'\n}\n"})}),"\n",(0,s.jsx)(e.p,{children:"ReturnType \u83b7\u53d6\u4e00\u4e2a\u8fd4\u56de\u503c\u7684\u7c7b\u578b"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"const func = (input: string) => {\n  return input.length > 10\n}\n\n// boolean\ntype FuncReturnType = ReturnType<typeof func>\n"})}),"\n",(0,s.jsx)(e.h2,{id:"\u6cdb\u578b",children:"\u6cdb\u578b"})]})}function p(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>i,x:()=>c});var r=t(6540);const s={},o=r.createContext(s);function i(n){const e=r.useContext(o);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:i(n.components),r.createElement(o.Provider,{value:e},n.children)}}}]);