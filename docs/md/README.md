# Markdown使用语法

## 标题使用  

Markdown 标题有两种形式。  
**1、 使用 = 和 - 标记一级和二级标题**     
语法格式如下:  
```markdown
一级标题
========
二级标题  
------- 
```                      
 
**2、 使用#号系列**  
使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。
```markdown
# 一级标题  
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 段落使用  
段落没啥特殊格式 换行有2种方式  
1. 使用两个以上空格加上回车  
> 段落1  
> 段落2
2. 直接使用一个空行  
> 段落1

> 段落2

## 字体  
```markdown
*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
```

## 分割线
分割线可以在一行中用三个以上的*、 -、 _来建立一个分割线，行业不能有其它东西。
```markdown
***

* * *

*****

- - -

----------

___
```
> ***

> * * *

> - - - 

> ___

## 删除线
使用\~~文本\~~
```markdown
not delete  
~~delete~~
```
> not delete  
> ~~delete~~

## 下划线
使用\<u>标签  
```markdown
<u>文本</u>
```
> <u>带下划线的文本</u> 

## 脚注 
脚注是对文本的补充说明
```markdown
[^要表明的文本]

脚注文本例子 [^jiaozhu] 
[^jiaozhu]: 脚注文本
```

## 列表
列表分为无序和有序 无序列表使用(*)、(+)、(-)作为列表标记:
```markdown
* 无序列表*1
* 无序列表*2
* 无序列表*3  

+ 无序列表+1
+ 无序列表+2
+ 无序列表+3   

- 无序列表-1
- 无序列表-2
- 无序列表-3 
```
> * 无序列表*1
> * 无序列表*2
> * 无序列表*3  

> + 无序列表+1
> + 无序列表+2
> + 无序列表+3 

> - 无序列表-1
> - 无序列表-2
> - 无序列表-3 

有序列表直接使用数字并加上(.)来表示
```markdown
1. 有序列表
    + 无序列表1
    + 无序列表2 
2. 有序列表2  
    2.1 有序列表2-1  
    2.2 有序列表2-2
3. 有序列表3
```
> 1. 有序列表
>    + 无序列表1
>    + 无序列表2 
> 2. 有序列表2  
>    2.1 有序列表2-1  
>   2.2 有序列表2-2
> 3. 有序列表3

## 区块 
区块是在段落开头使用(>)符号后面紧跟一个空格符号:    
区块是可以嵌套的一个\>符号是最外层，两个\>符号是第一层嵌套,依次类推
```markdown
> 区块引用1  
> 区块引用2  
    >> 区块引用2-1  
        > * 无序列表
        > * 无序列表2  
    >> 区块引用2-2  
        > 1. 有序列表  
        > 2. 有序列表2 
```
> 区块引用1  
> 区块引用2  
    >> 区块引用2-1  
        > * 无序列表
        > * 无序列表2  
    >> 区块引用2-2  
        > 1. 有序列表  
        > 2. 有序列表2 

列表使用区块   
+ 列表使用区块  
    > 区块1  
    > 区块2   
        >> 区块2-1  
            >>> 区块2-1-1
                >>>> * 无序列表
+ 列表使用区块2

## 代码
```markdown
使用```加上语言(语言可选)
代码内容```
```

> ```javascript 
>	function say (something) {
>		console.log(something)
>	}
> ```

## 链接
```markdown
[链接名称](链接地址)
或者 
<链接地址>	
```

> 百度 [百度](http://www.baidu.com)   
> 百度 <http://www.baidu.com>  

**高级链接** 
```markdown
链接也可以用变量来代替，文档末尾附带变量地址：
这个链接用 1 作为网址变量 [Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）

  [1]: http://www.google.com/
  [runoob]: http://www.runoob.com/
```
> 链接也可以用变量来代替，文档末尾附带变量地址：   
> 这个链接用 1 作为网址变量 [Google][1]   
> 这个链接用 runoob 作为网址变量 [Runoob][runoob]   
> 然后在文档的结尾为变量赋值（网址）

[1]: http://www.google.com/   
[runoob]: http://www.runoob.com/ 

## 图片
```markdown
![alt 属性文本](图片地址 "可选标题")


使用变量
这个链接用 1 作为网址变量 [RUNOOB][1].
然后在文档的结尾位变量赋值（网址）

[1]: http://static.runoob.com/images/runoob-logo.png
```
> ![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)

> ![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png "RUNOOB")

> 这个链接用 1 作为网址变量 [RUNOOB][img].   
> 然后在文档的结尾位变量赋值（网址）   

[img]: http://static.runoob.com/images/runoob-logo.png

## 表格 
制作表格使用 \| 来分隔不同的单元格, 使用 \-来分隔表头和其他行
```markdown
	| 表头  | 表头  |
	| ---  | ---   |
	|单元格 | 单元格 |
	| 单元格 | 单元格 |

对齐方式： 
	-: 设置内容和标题栏居右对齐  
	:- 设置内容和标题栏居左对齐
	:-: 设置内容和标题栏居中对齐
	
	| 居左对齐  | 居中对齐  | 居右对齐 |
	| :----  | :----:   | ----: |
	|单元格 | 单元格 | 单元格 |
	| 单元格 | 单元格 | 单元格 |
	
```
> | 表头  | 表头  |
> | ---  | ---   |
> |单元格 | 单元格 |
> | 单元格 | 单元格 |

> | 居左对齐  | 居中对齐  | 居右对齐 |
> | :----  | :----:   | ----: |
> |单元格 | 单元格 | 单元格 |
> | 单元格 | 单元格 | 单元格 |