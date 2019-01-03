JavaScript Class Design partterns
=================================

- [Class Types](#class-types)
    - [Constructor Class](#constructor-class)
    - [Literals Object](#literals-object)
    - [Static Class](#static-class)
- [Prototype](#prototype)
- [Closures 封閉函式](#closures-封閉函式)
- [Additions](#additions)
    - [Use Strict](#use-strict)
    - [This 傳遞](#this-傳遞)

CLASS TYPES
-----------

### Constructor Class

```javascript
var Class = function (options) {
    this.render = function () {}
};

var object1 = new Class();
object1.render(); 
```

以上是直覺寫法，但建議使用`prototype`來定義method(避免constructed重複宣告達到高效)：

```javascript
var Class = function (options) {};

Class.prototype.render = function () {};

var object1 = new Class();
object1.render(); 
```

### Literals Object

JavaScript靜態物件的第一個想法，

```javascript
var Class =  {
    render : function () {}
};

Class.render(); 
```

架構不錯，缺點為在物件內無法宣告區域變數(亦即達不到`private`變數或方法)。
若在物件方法中再次用到`function`，且須使用`this`指到物件本身就會有瓶頸，得每次帶入物件`this`本身，而無法從物件那層定義個物件區域變數代表`this`。

### Static Class

目前我靜態物件的最佳解

```javascript
var Class = new function (options) {
    var that = this;
    var construtor = function() {}
    this.render = function() {}
    construtor();
};

Class.render(); 
```

此寫法支援宣告區域變數，以補足`Literals Object`的缺點：


#### 函式包裝執行回傳物件寫法(function(){})()

另一種直接生成寫法，但須透過`return this`取得物件。

```javascript
var Class = (function (options) {
    this.render = function () {}
    return this;
})();

Class.render();
```

---

Prototype
---------

非靜態物件意即可以產生多個實例的類別，在設計時，可以使用原型(Prototype)，在 Constructor 外定義 方法(Method)，達到建立實例效能優化。

```javascript
var Class = function() {};
Class.prototype.message = function(s) {
  var msg = s + '';
};
Class.prototype.addition = function(i, j) {
  return (i * 2 + j * 2) / 2;
};
var instance = new Class();
```

> [JavaScript Prototype Operator Performance](https://jsperf.com/prototype-operator-performance)

---

Closures 封閉函式
-----------------

或稱匿名函式，大量用在JavaScript，除了定義，還可以直接執行形成封閉命名空間：

```javascript
(function ($) {
  //...
})(jQuery);
```

> 還可以在函式定義前加上「~」和「!」等符號來定義匿名函式，如`!function(){}()`

### 閉包

中文`閉包`一詞說法是指`函式巢狀函式`，應用為內部函式可以引用外部函式的引數和變數，引數和變數不會被垃圾回收機制收回：

```javascript
var f = (function (a) {
  var base = 5;
  function b() {alert(a+base);}
  return b;
})(2);
```


---

ADDITION 
--------

### Use Strict

[JavaScript Use Strict](https://www.w3schools.com/js/js_strict.asp)(嚴謹模式)建議使用在物件撰寫中。


### This 傳遞

`this`傳遞問題解決方法：

#### 定義class that區域變數為this

```javascript
var Class = new function (options) {
    var that = this;
    this.render = function() {}
    var init = function() {
        that.render();
    }
    init();
};
```

意即所有Class內部均透過`that`區域變數呼叫Class本身，保留內部巢狀this使用彈性。

#### Bind This

```javascript
var Class = new function (options) {

    var that = this;
    this.render = function() {}
    
    var init = (function() {
        this.render();
    }).bind(this);
    
    init();
};
```

使用[Bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)方法將Class級`this`傳遞進去取代內部`this`，微升效能但每次須使用得各自宣告。

```javascript
var Class = new function (options) {

    var that = this;
    this.render = function() {}
    
    var init = function() {
        this.render();
    };
    
    init.bind(this)();
};
```
