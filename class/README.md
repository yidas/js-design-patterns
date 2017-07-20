Class 
=====

[Constructor Class](#constructor-class)

[Literals Object](#literals-object)


### Constructor Class

```
var Class = function (options) {
    this.render = function () {}
};

var class1 = new Class();
class1.render(); 
```

---

### Literals Object

JavaScript靜態物件的第一個想法，

```
var Class =  {
    render : function () {}
};

Class.render(); 
```

架構不錯，但到了使用`this`就會有瓶頸，例如callback內function蓋掉了`this`時得每次重複宣告，抑或callback內call function蓋掉了`this`得用帶parameter解決。

---

### Static Class

目前我靜態物件的最佳解

```
var Class = new function (options) {
    this.render = function () {}
};

Class.render(); 
```

---

承上，此寫法是為了解決`this`問題，在Literals Object內無法宣告Class級區域變數例如：

```
var Class = new function (options) {
    var self = this;
    self.render = function () {}
};
```
