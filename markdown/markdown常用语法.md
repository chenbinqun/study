# <center>makdown常用语法</center>
## 1. 标题  
标题只需要在要被标识为标题的文本前添加井号<code> # </code>即可,六级标题每级只需在对应级数添加对应<code> # </code>即可；<code>注：可在#后面添加一个空格为makdown标准写法，后面语法也一样。</code>
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 2. 列表  
列表只需在文本前添加减号<code> - </code>或星<code> * </code>即可标识为无序列表，有序列表为数字加一个小数点<code> 1. 2.  3. ... </code>
### 无序列表  
- 无序列表1 <code> - </code>
    - 无序列表2 <code> - </code>
* 无序列表3 <code> * </code>
    * 无序列表4 <code> * </code>

### 有序列表  
1. 有序列表1
2. 有序列表2
3. 有序列表3

### 引用  
引用只需在文本前添加大于号<code> > </code>即可
> 这是一段引用文本

## 3. 连接和图片  
连接和图片语法很像，区别就是图片前面多了一个感叹号<code>!</code>

1. 图片语法` ![图片](连接) `

![MarkdownPad md编辑器](http://markdownpad.com/img/markdownpad2-weblogo.png)

2.连接语法` [连接显示文本](连接) `

[MarkdownPad md编辑器](http://markdownpad.com/download/markdownpad2-setup.exe)

## 4. 粗体和斜体  
粗体斜体都是使用星号<code>*</code>包含文本,并且星号和文本起始不能有空格。` **粗体** | *斜体* `

**粗体**  *斜体*

## 5. 表格  
表格是markdown比较麻烦的一个语法，通过竖杆<code>|</code>和减号<code></code>组成和冒号<code>组成</code>，竖杆用于确认表格的td，减号用于分割表头表体，冒号用于对齐，冒号在左边则左对齐，右边则右对齐，两边都有则是中间对齐。可以参考[makdown表格语法](https://help.github.com/articles/organizing-information-with-tables/)

<code>| 姓名 |  年龄 | 性别  |</code>  
<code>| ---- | :---- | -----:|</code>  
<code>| 张三 | 10   | 男    |</code>  
<code>| 李四 | 20   | 女    |</code>  
<code>| 王五 | 30   | 男    |</code>  

## 6. 代码框  
只需要用两个 ` 把中间的代码包裹起来

`
function(){  
	var a = 1  
}  
`

## 7.分割线  
分割线由三个连续的星号组成 `***`

***

## 8.其他  
单个回车视为空格。  
连续回车才能分段。  
行尾加两个空格，即可段内换行。  

__这样也能表示粗体__
_这样也能表示斜体_

行的开头空4个空格，表示程序代码  
  
	function(){
		var xx = 1;
	}

文本下面添加一个等于号也可以表示大标题
===

文本下面添加一个减号也可以表示二级标题
----

连续三个减号也可以组成分割线

---

连接和图片也可以使用索引方式获取，定义索引是`[所引值]: url`

[索引连接][1]
![索引图片][2]
[1]: http://markdownpad.com/download/markdownpad2-setup.exe
[2]: http://markdownpad.com/img/markdownpad2-weblogo.png

自连接表示法：<http://www.baidu.com>

Markdown 支持在下面这些符号前面加上反斜杠来帮助插入普通的符号：

    \   反斜杠
    `   反引号
    *   星号
    _   底线
    {}  大括号
    []  方括号
    ()  括号
    #   井字号
    +    加号
    -    减号
    .   英文句点
    !   惊叹号
    
