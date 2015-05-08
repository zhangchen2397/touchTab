/**
 * 横向tab滑动组件，不用iscroll
 * @author samczhang@tencent.com
 * --------------------------------------
 * 对外调用接口及自定义事件
 * @customEvent canTouchTabMove touchmove时触发，此时可处理滑动tab
 * @customEvent clearTouchTabMove touchend时触发，可以滑动但不满足切换条件时触发
 * @customEvent canTouchTabSwitch touchend时触发，达到切换条件，触发切换事件
 *
 * demo http://info.3g.qq.com/g/s?aid=wechat_l
 *
 */

( function( root, factory ) {
    if ( typeof define === 'function' ) {
        define( 'touchTab', [ 'jqmobi' ], function( $ ) {
            return factory( root, $ );
        } );
    } else {
        root.touchTab = factory( root, root.$ );
    }
} )( window, function( root, $ ) {

    var touchTab = function( config ) {
        this.defaultConfig = {
            el: $( document.body ),  //绑定事件的dom元素 id或jq对象
            offsetX: 50              //触摸起止X偏移值，大于些值才会触发下拉事件   
        };

        this.config = $.extend( {}, this.defaultConfig, config || {} );
        this.el = ( typeof this.config.el === 'string' ) ? $( this.config.el ) : this.config.el;

        this.init.call( this );
    };

    $.extend( touchTab.prototype, {
        init: function() {
            this._cacheDom();
            this._initEvent();
        },

        _cacheDom: function() {
            this.el = ( typeof this.config.el === 'string' ) ? $( this.config.el ) : this.config.el;
        },

        _initEvent: function() {
            var me = this,
                config = this.config,
                el = this.el,

                touchStartX = 0,
                touchStartY = 0;

            el.on( 'touchstart', function( event ) {
                var touchTarget = event.changedTouches[ 0 ];

                touchStartX = touchTarget.clientX;
                touchStartY = touchTarget.clientY;
            } );

            el.on( 'touchmove', function( event ) {
                var touchTarget = event.changedTouches[ 0 ],
                    touchMoveX = touchTarget.clientX,
                    touchMoveY = touchTarget.clientY;

                var offsetX = touchMoveX - touchStartX,
                    offsetY = touchMoveY - touchStartY;

                if ( Math.abs( offsetX ) > 5 && Math.abs( offsetX ) > Math.abs( offsetY ) ) {
                    event.preventDefault();

                    $.trigger( me, 'canTouchTabMove', [ {
                        offsetX: offsetX
                    } ] );
                }
            } );

            el.on( 'touchend', function( event ) {
                var touchTarget = event.changedTouches[ 0 ],
                    touchEndX = touchTarget.clientX,
                    touchEndY = touchTarget.clientY;

                var offsetX = touchEndX - touchStartX,
                    offsetY = touchEndY - touchStartY;

                if ( Math.abs( offsetX ) > config.offsetX && Math.abs( offsetX ) > Math.abs( offsetY ) ) {
                    $.trigger( me, 'canTouchTabSwitch', [ {
                        offsetX: offsetX
                    } ] );
                } else {
                    $.trigger( me, 'clearTouchTabMove' );
                }
            } );
        }
    } );

    return touchTab;
} );
