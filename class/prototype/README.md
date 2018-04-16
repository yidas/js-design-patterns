Class Prototype
===============

Prototype 匿名設計模式
---------------------

```javascript
(function(window, $){
  
  // Pointer `this` for defined class 
  var Class;
	
  // Assigning class
  window.MyClass = Class = function (options) {
  
    var self = this;
    // Code...
  };
	
  // Prototype declares by using pointer
  Class.prototype.render = function () {
  
  	var self = this;
    // Code...
  };
  
  // If the method is used for binding which would lost `this`
  Class.prototype.callback = function () {
  
  	var self = Class;
    // Code...
  };

})(window, jQuery);
```

```javascript
var myObject = new MyClass();
myObject.render();
```
