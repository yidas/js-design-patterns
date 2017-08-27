Class 
=====

- [Constructor Class](#constructor-class)

- [Literals Object](#literals-object)

- [Static Class](#static-class)


## Constructor Class

```javascript
var Class = function (options) {
    this.render = function () {}
};

var object1 = new Class();
object1.render(); 
```

---

## Literals Object

JavaScript靜態物件的第一個想法，

```javascript
var Class =  {
    render : function () {}
};

Class.render(); 
```

架構不錯，但到了使用`this`就會有瓶頸，例如callback內function蓋掉了`this`時得每次重複宣告，抑或callback內call function蓋掉了`this`得用帶parameter解決。

---

## Static Class

目前我靜態物件的最佳解

```javascript
var Class = new function (options) {
    this.render = function () {}
};

Class.render(); 
```

> 承上，此寫法是為了支援宣告區域變數，在Literals Object內無法宣告Class級private function例如：
> 
> ```javascript
> var Class = new function (options) {
>     var self = this;
>     var init = function () {}
>     init();
> };
> ```

#### 函式包裝回傳物件寫法(function(){})()

另一種寫法，透過`return this`取得物件。

```javascript
var Class = (function (options) {
    this.render = function () {}
    return this;
})();

Class.render(); 
```

---

ADDITION 
--------

### Use Strict

[JavaScript Use Strict](https://www.w3schools.com/js/js_strict.asp)(嚴謹模式)建議使用在物件撰寫中。


### This 傳遞

`this`傳遞問題解決方法：

#### 定義class self區域變數為this

```javascript
var Class = new function (options) {
    var self = this;
    this.render = function() {}
    var init = function() {
        self.render();
    }
    init();
};
```

意即所有Class內部均透過`self`區域變數呼叫Class本身，保留內部巢狀this使用彈性。

#### Bind This

```javascript
var Class = new function (options) {
    var self = this;
    this.render = function() {}
    var init = (function() {
        this.render();
    }).bind(this)
    init();
};
```

使用[Bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)方法將Class級`this`傳遞進去取代內部`this`，微升效能但每次須使用得各自宣告。
