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

> 承上，此寫法是為了解決`this`問題，在Literals Object內無法宣告Class級區域變數例如：
> 
> ```javascript
> var Class = new function (options) {
>     var self = this;
>     self.render = function () {}
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
