(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-member-myRemind"],{"1b8f":function(i,t,e){"use strict";var n=e("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(e("c739")),c={components:{popup:a.default},data:function(){return{popup:""}},methods:{liClick:function(i){uni.navigateTo({url:"/pages/tabBar/home/listItems?type="+i})}}};t.default=c},2454:function(i,t,e){"use strict";var n=e("b03c"),a=e.n(n);a.a},5312:function(i,t,e){"use strict";e.r(t);var n=e("1b8f"),a=e.n(n);for(var c in n)"default"!==c&&function(i){e.d(t,i,function(){return n[i]})}(c);t["default"]=a.a},ad3e:function(i,t,e){"use strict";e.r(t);var n=e("e081"),a=e("5312");for(var c in a)"default"!==c&&function(i){e.d(t,i,function(){return a[i]})}(c);e("2454");var o=e("2877"),s=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"c3776322",null);t["default"]=s.exports},b03c:function(i,t,e){var n=e("c607");"string"===typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);var a=e("4f06").default;a("35827d48",n,!0,{sourceMap:!1,shadowMode:!1})},c607:function(i,t,e){t=i.exports=e("2350")(!1),t.push([i.i,"uni-page-body[data-v-c3776322]{background:#f6f7f9}[data-v-c3776322]::-webkit-scrollbar{width:0}.page[data-v-c3776322]{margin-top:%?20?%}._li[data-v-c3776322]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:%?710?%;height:%?140?%;margin-left:auto;margin-right:auto;margin-top:%?20?%;background:#fff;padding:0 %?20?%;border-radius:%?20?%}._li .pic[data-v-c3776322]{position:relative;background-color:#f60;-webkit-box-sizing:border-box;box-sizing:border-box;margin-right:%?30?%;width:%?100?%;height:%?100?%;padding:%?15?%;border-radius:50%}._li .pic uni-image[data-v-c3776322]{width:100%;height:100%}._li .pic uni-text[data-v-c3776322]{position:absolute;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 0 %?3?% %?0?%;-webkit-box-sizing:border-box;box-sizing:border-box;top:%?-8?%;right:%?-14?%;width:%?40?%;height:%?40?%;border-radius:50%;background-color:#f06;color:#fff}._li uni-text[data-v-c3776322]{font-size:%?32?%}._li .time[data-v-c3776322]{position:absolute;top:%?12?%;right:%?20?%;font-size:%?20?%;color:#b0b0b0}._li:nth-child(2) .pic[data-v-c3776322]{background-color:#66f}._li:nth-child(3) .pic[data-v-c3776322]{background-color:#f0c}._li:nth-child(4) .pic[data-v-c3776322]{background-color:#6c6}body.?%PAGE?%[data-v-c3776322]{background:#f6f7f9}",""])},e081:function(i,t,e){"use strict";var n=function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("v-uni-view",{staticClass:"page"},[e("v-uni-view",{staticClass:"list"},[e("v-uni-view",{key:i.index,staticClass:"_li",on:{click:function(t){t=i.$handleEvent(t),i.liClick("follow")}}},[e("v-uni-view",{staticClass:"pic"},[e("v-uni-image",{attrs:{src:"../../static/home/跟进.png"}}),e("v-uni-text",[i._v("1")])],1),e("v-uni-text",[i._v("有新的跟进事项")]),e("v-uni-text",{staticClass:"time"},[i._v("13:15:35")])],1),e("v-uni-view",{key:i.index,staticClass:"_li",on:{click:function(t){t=i.$handleEvent(t),i.liClick("tixing")}}},[e("v-uni-view",{staticClass:"pic"},[e("v-uni-image",{attrs:{src:"../../static/home/提醒.png"}}),e("v-uni-text",[i._v("1")])],1),e("v-uni-text",[i._v("有新的提醒事项")]),e("v-uni-text",{staticClass:"time"},[i._v("昨天")])],1),e("v-uni-view",{key:i.index,staticClass:"_li",on:{click:function(t){t=i.$handleEvent(t),i.liClick("daodian")}}},[e("v-uni-view",{staticClass:"pic"},[e("v-uni-image",{attrs:{src:"../../static/home/预约.png"}}),e("v-uni-text",[i._v("1")])],1),e("v-uni-text",[i._v("有新的预约客户到啦")]),e("v-uni-text",{staticClass:"time"},[i._v("2019-11-01")])],1),e("v-uni-view",{key:i.index,staticClass:"_li",on:{click:function(t){t=i.$handleEvent(t),i.liClick("zhuangjiao")}}},[e("v-uni-view",{staticClass:"pic"},[e("v-uni-image",{attrs:{src:"../../static/home/转交%20-%20线性.png"}}),e("v-uni-text",[i._v("1")])],1),e("v-uni-text",[i._v("有新的客户转交给你啦")]),e("v-uni-text",{staticClass:"time"},[i._v("2019-10-22")])],1)],1),e("popup",{ref:"popup",attrs:{popup:i.popup},on:{childPopup:function(t){t=i.$handleEvent(t),i.childPopup(t)}}})],1)},a=[];e.d(t,"a",function(){return n}),e.d(t,"b",function(){return a})}}]);