touchTab 横向滑动tab组件
======

适用于移动端横向滑动tab组件使用，通过对外暴露相应的事件完成相应的切换逻辑

###对外事件

```
@customEvent canTouchTabMove touchmove时触发，此时可处理滑动tab
@customEvent clearTouchTabMove touchend时触发，可以滑动但不满足切换条件时触发
@customEvent canTouchTabSwitch touchend时触发，达到切换条件，触发切换事件
```

###使用
```javascript
var touchTabIns = new touchTab({
    el: $( document.body ),  //绑定事件的dom元素 id或jq对象
    offsetX: 50              //触摸起止X偏移值，大于些值才会触发下拉事件  
});

$.bind(touchTabIns, 'canTouchTabMove', function() {
    //此时可处理滑动tab
});

$.bind(touchTabIns, 'clearTouchTabMove', function() {
    //可以滑动但不满足切换条件时触发
});

$.bind(touchTabIns, 'canTouchTabSwitch', function() {
    //达到切换条件，触发切换事件
});
```

###demo 扫描以下二维码手机体验
![demo](https://github.com/zhangchen2397/touchTab/blob/master/qrcode.png?raw=true)
