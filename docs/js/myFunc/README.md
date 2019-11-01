# 自定义封装方法

## 洗牌函数

```
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
```
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
```
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
```
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
```
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
```
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
