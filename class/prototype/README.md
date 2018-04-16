Class Prototype
===============

Prototype 匿名設計模式
---------------------

```javascript
(function(window, $){
  
  // Pointer `this` for defined class 
  var self;
	
  // Assigning class
  window.MyClass = self = function (options) {
  
    // Code...
  };
	
  // Prototype declares by using pointer
  self.prototype.render = function () {
  
    // Code...
  };
  
  // If the method is used for binding which would lost `this`
  self.prototype.callback = function () {
  
    // Code...
  };

})(window, jQuery);
```

```javascript
var myObject = new MyClass();
myObject.render();
```
