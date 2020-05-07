# 常用
1. 最优化的继承方式： 圣杯模式
    ```
        var inherit = (function(c, p) {
            var F = function(){};
            return function(c,p) {
                F.prototype = p.prototype;
                c.prototype = new F();
                c.uber = p.prototype;
                c.prototype.constructor = c;
            }
        })();
    ```
    
2. 类型判断  
    基本类型(null) 使用String(null) 返回'null'  
    基本类型(string/number/boolean/undefined) 以及 function 使用typeof   
    其余引用类型(Array/Date/RegExp/Error/Object) 调用toString后根据[object xxx]进行判断
    ```
    var class2Type = {}
    'Array Date RegExp Object Error'.split(' ').forEach(e => class2Type['[object ' + e + ']'] = e.toLowerCase())
    function type(obj) {
        if(obj == null) return String(obj)
        return typeof obj === 'object' ? class2Type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
    }
    ```
    
3. 防抖和节流  
    防抖：将多次高频操作优化为只在最后一次执行
```
    function debounce(fn, wait, immediate) {
        let timer = null
        
        return function() {
            let args = arguments
            let context = this
            
            // 初始立即执行
            if (immediate && !timer) {
                fn.apply(context, args)
            } 
            
            if(timer) clearTimeout(timer)
            
            timer = setTimeout(function() {
                fn.apply(context, args)
            }, wait)
        }
    }
```  

   节流：每隔一段时间执行一次  
   ```  
    function throttle(fn, wait, immediate) {
        let timer = null
        let callNow = immediate
        
        return function() {
            let context = this,
            args = arguments
            
            // 是否立即执行
            if (callNow) {
                fn.apply(context, args)
                callNow = false
            }
            
            // 每隔一段时间执行
            if (!timer) {
                timer = setTimeout(function() {
                    fn.apply(context, args)
                    timer = null
                }, wait)
            }
        }
    }
   ```
   
4.  函数柯里化  
        在一个函数中，首先填充几个函数，然后再返回一个新的函数的技术，称为函数的柯里化。  
通常用于在不侵入函数的前提下，为函数 预置通用函数， 供多次重复使用。
```
    const add = function add(x) {
        return function(y) {
            return x + y
        }
    }
    
    // 通用初始函数
    const add1 = add(1)
    
    add1(2) === 3
    add1(20) === 21
```
        将普通函数进行柯里化
```
    function curry (fn, args = []) {
        return function () {
            let rest = [...args, ...arguments]
            if (rest.length < fn.length) {
                return curry.call(this, fn, rest)
            } else {
                return fn.apply(this, rest)
            }
        }
    }
    
    // test
    function sum(a, b, c) {
        return a + b + c
    }
    
    let sumFn = curry(sum)
    sumFn(1)(2)(3) // 6
    sumFn(1)(2, 3) // 6
```
5. 判断手机类型
```
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
6. 判断pc端
```
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
7. 判断浏览器类型
```
    function browserType(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
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
8. 常用的正则检验输入是否正确
```
    function checkStr (str, type) {
        switch (type) {
            case 'phone':   //手机号码
                return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
            case 'tel':     //座机
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'card':    //身份证
                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
            case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                return /^[a-zA-Z]\w{5,17}$/.test(str)
            case 'postal':  //邮政编码
                return /[1-9]\d{5}(?!\d)/.test(str);
            case 'QQ':      //QQ号
                return /^[1-9][0-9]{4,9}$/.test(str);
            case 'email':   //邮箱
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'money':   //金额(小数点2位)
                return /^\d*(?:\.\d{0,2})?$/.test(str);
            case 'URL':     //网址
                return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
            case 'IP':      //IP
                return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
            case 'date':    //日期时间
                return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            case 'number':  //数字
                return /^[0-9]$/.test(str);
            case 'english': //英文
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese': //中文
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':   //小写
                return /^[a-z]+$/.test(str);
            case 'upper':   //大写
                return /^[A-Z]+$/.test(str);
            case 'HTML':    //HTML标记
                return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
            default:
                return true;
        }
    }
```
9. 严格的身份证校验
```
function isCardID(sId) {
        if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
            alert('你输入的身份证长度或格式错误')
            return false
        }
        //身份证城市
        var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        if(!aCity[parseInt(sId.substr(0,2))]) { 
            alert('你的身份证地区非法')
            return false
        }

        // 出生日期验证
        var sBirthday=(sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2))).replace(/-/g,"/"),
            d = new Date(sBirthday)
        if(sBirthday != (d.getFullYear()+"/"+ (d.getMonth()+1) + "/" + d.getDate())) {
            alert('身份证上的出生日期非法')
            return false
        }

        // 身份证号码校验
        var sum = 0,
            weights =  [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            codes = "10X98765432"
        for (var i = 0; i < sId.length - 1; i++) {
            sum += sId[i] * weights[i];
        }
        var last = codes[sum % 11]; //计算出来的最后一位身份证号码
        if (sId[sId.length-1] != last) { 
            alert('你输入的身份证号非法')
            return false
        }

        return true
    }
}
```
10. 实现一个深拷贝
```
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

11. 文本插入操作(光标处)
```javascript
var insertHtmlAtCaret = function(html) { //文本插入操作
      var sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          var el = document.createElement("div");
          el.innerHTML = html;
          var frag = document.createDocumentFragment(),
            node, lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }
    }
```