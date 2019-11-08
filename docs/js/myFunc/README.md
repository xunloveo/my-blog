# 自定义封装方法

## 洗牌函数

```javascript
随机获取给定区间的值
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

洗牌函数 随机改变数组
function shuffle(arr) {
    let _arr = arr.slice()
    for (let i =0; i < arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

```

## js给元素设置兼容前缀
```javascript
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
```

## css 一些操作
```javascript
// 判断是否有这个类名
export function hasClass(el, className) {
      let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
      return reg.test(el.className)
    }
 
// 添加类名  
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 设置或者获取data-
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
```

## list转为tree
```javascript
/**
 * 以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);

// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];
 */

function convert(list) {
	const res = []
	const map = list.reduce((res, v) => (res[v.id] = v, res), {})
	for (const item of list) {
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}

let list = [
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
]

console.log(convert(list))
```

## 函数柯里化
```javascript
/**
 * 函数柯里化实现
 * 
 */

function currying(fn, length) {
	length = length || fn.length // 第一次调用函数fn参数的长度， 后续调用获取fn剩余参数的长度
	return function (...args) {
		console.log(args.length, length)
		return args.length >= length 
			? fn.apply(this, args)
			: currying(fn.bind(this, ...args), length - args.length)
	}
}

// es6 简化版
const simpleCurrying = fn =>
	judge = (...args) => 
		args.length >= fn.length
			? fn(...args)
			: (...arg) => judge(...args, ...arg)

// test 
const fn = currying(function(a, b, c) {
	console.log([a, b, c])
})

// fn("a", "b", "c")
// fn("a", "b")("c")
// fn("a")("b")("c")

const f1 = simpleCurrying((a, b, c) =>
	console.log([a, b, c])
)
f1("a", "b", "c")
f1("a")("b", "c")
f1("a", "c")("b")
f1("a")("b")("c")
```

## 自定义new
```javascript
/**
 * 实现new的思路：
 * 	1. 首先创建一个空的对象，空对象的_proto_属性指向构造函数的原型对象
 * 	2. 把上面的空对象赋值构造函数内部的this,用构造函数内部的方法修改空对象
 * 	3. 如果构造函数返回一个非基本类型的值，则返回这个值， 否则返回上面创建的对象
*/
function _new (fn, ...arg) {
	const obj = Object.create(fn.prototype)
	const ret = fn.apply(obj, arg)
	return ret instanceof Object ? ret : obj
}

// test
let Dog = function(name) {
	this.name = name
}
Dog.prototype.bark = function() {
	console.log('bark')
}
Dog.prototype.sayName = function () {
	console.log(`My name is ${this.name}`)
}

let dog = _new(Dog, 'simao')
dog.bark()
dog.sayName()
console.log(dog instanceof Dog) // true
```

## 自定义实现call
```javascript
Function.prototype.myCall = function (ctx) {
  let context = ctx || window
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 取出后面的参数
  let args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', 24)
  let result = context.fn(...args)
  // 删除 fn
  delete context.fn

  return result
}

let a = {
  value: 1
}

function getValue(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

getValue.call(a, 'yck', '24')
getValue.myCall(a, 'xx', 25)
```

## 自定义实现apply
```javascript
Function.prototype.myApply = function (ctx) {
  let context = ctx || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn

  return result
}

// test 

let a = {
  value: 1
}

function getValue(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

getValue.apply(a, ['yck', '24'])
getValue.myApply(a, ['yck', '24'])
```

## 自定义实现bind
```javascript
Function.prototype.myBind = function (ctx) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  let _this = this

  let args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    console.log(this, F, this instanceof F)
    // 进行类型判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(ctx, args.concat(...arguments))
  }
}

a = {
  name: 'xx'
}

name = 'aa'

function test(arg) {
  console.log(this.name, arg)
}

test(111)
test.bind(a, 'ssss')()
test.myBind(a, 'qqqq')()

new test('11').bind
```

## 实现深拷贝
```javascript
function deepClone (obj) {
    if (obj === null) return null  
    if (obj instanceof RegExp) return new RegExp(obj)  
    if (obj instanceof Date) return new Date(obj)  
    if (typeof obj !== 'object') return obj  
    let t = new obj.constructor()  
    for (let key in obj) {
        t[key] = deepClone(obj[key]) // 递归
    }  
    return t
}
```

## 判断pc端
```javascript
function isPC() {
    let userAgentInfo = navigator.userAgent
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let v = 0, agent; agent = Agents[v++]) {
        if (userAgentInfo.indexOf(agent) > 0) {
            flag = false
            break
        }
    }
    return flag
}
```

## 判断手机类型
```javascript
function phoneType() {
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 ) {  // 安卓
        return 'Android'  
    } else if (u.indexOf('iPhone') > -1) { // 苹果
        return 'iPhone'
    } else if (u.indexOf('iPad') > -1) { // iPad
        return 'iPad'
    } else if (u.indexOf('Windows Phone') > -1) { // winphone 手机
        return 'Windows Phone'
    } else { // 其它
        return 'other'
    }
}
```

## 判断浏览器类型
```javascript
function browserType(){
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) return "IE7"
        else if(fIEVersion == 8) return "IE8";
        else if(fIEVersion == 9) return "IE9";
        else if(fIEVersion == 10) return "IE10";
        else return "IE7以下"//IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return "Edge";
    if (isFF) return "FF";
    if (isOpera) return "Opera";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
}
```

## 货币格式化
```javascript
const digitsRE = /(\d{3})(?=\d)/g

/**
 *  
 * @param  {[type]} value    [description] 货币值
 * @param  {[type]} currency [description] 默认为$
 * @param  {[type]} decimals [description] 小数默认2位
 * @return {[type]}          [description]
 */
export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  let stringified = Math.abs(value).toFixed(decimals)
  let _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  let i = _int.length % 3
  let head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  let _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  let sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}
```

## 防抖
```javascript
/**
 * 防抖函数，返回函数连续调用时， 空闲时间必须大于或等于 wait, func 才会执行
 *
 * @param {*} func 回调函数
 * @param {number} [wait=50] 时间间隔
 * @param {boolean} [immediate=true] 是否立即调用
 * @return {function} 返回客户调用函数
 */
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕， 清空缓存的定时器序号
    timer = null

    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 返回函数是每次实际调用的函数
  return function (...params) {
    // 如果没有创建延迟执行函数
    if (!timer) {
      timer = later()
      // 如果是立即执行函数，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      // 如果有延迟执行函数， 调用的时候清除原来的并重新设定一个
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

## 节流
```javascript
// 获取当前时间
function _now() {
  return +new Date()
}

/**
 *
 *
 * @param {*} func 回调函数
 * @param {*} wait 时间间隔
 * @param {*} [options={}] 如果想忽略开始函数的调用， 传入 {leading: false}
 *                         如果想忽略结尾函数的调用， 传入 { trailing: false}
 *                         两者不能共存，否则函数不能执行 *                         
 * @returns                返回库户调用函数
 */
function throttle(func, wait, options = {}) {
  let context, args, result
  let timeout = null
  // 之前的时间戳
  let previous = 0

  // 定时器回调函数
  const later = () => {
    // 如果设置了leading, 就将previous 设为0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : _now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  return function (...args) {
    // 获取当前时间戳
    let now = _now()
    // 首次进入前者肯定为true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算remaining 的值是会大于0
    if (!previous && options.leading === false) previous = now
    // 计算剩余时间
    let remaining = wait - (now - previous)
    console.log('r', remaining)
    context = this
    args = args

    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing, 只会进入这个条件
    // 如果没有设置 leading, 那么第一次会进入这个条件
    // 还有一点， 你可能觉得开启了定时器 那么应该就不会进入这个if 条件了
    // 其实还是会进入的 因为定时器的延时
    // 并不是准确的时间， 很可能你设置了2秒
    // 但是她需要2.2秒才触发， 这时候就会进入这个条件

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    console.log('re', result)
    return result
  }
}
```

## 时间格式化
```javascript
let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    let len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {    
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            let matchs1 = pattern.match(SIGN_REGEXP);
            let matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                let _date = new Date(1970, 0, 1);
                for (let i = 0; i < matchs1.length; i++) {
                    let _int = parseInt(matchs2[i]);
                    let sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }
    }
}
```

## 查询地址栏的参数
```javascript
function getQueryStringByName (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  let context = "";
  if (r != null) context = r[2];
  reg = null;
  r = null;
  return context == null || context == "" || context == "undefined" ? "" : context;
}
```



