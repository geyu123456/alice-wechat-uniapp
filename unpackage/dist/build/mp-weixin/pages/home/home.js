(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{"100a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("a34a")),i=o(n("a2f9"));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,a,i,o,s){try{var c=e[o](s),u=c.value}catch(r){return void n(r)}c.done?t(u):Promise.resolve(u).then(a,i)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(a,i){var o=e.apply(t,n);function c(e){s(o,a,i,c,u,"next",e)}function u(e){s(o,a,i,c,u,"throw",e)}c(void 0)}))}}var u={mixins:[i.default],data:function(){return{swiperList:["http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225733.jpg","http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225715.jpg","http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225742.jpg","http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225358.jpg"],allGoods:[]}},onLoad:function(){this.getSwiperList(),this.getAllGoodsList()},methods:{getSwiperList:function(){return["http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225733.jpg","http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225715.jpg","http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225742.jpg","http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225358.jpg"]},getAllGoodsList:function(){var t=this;return c(a.default.mark((function n(){var i,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.get("/goods/queryList");case 2:if(i=n.sent,o=i.data,console.log(o),200===o.code){n.next=7;break}return n.abrupt("return",e.$showMsg());case 7:t.allGoods=o.data,console.log(o.data);case 9:case"end":return n.stop()}}),n)})))()},gotoDetail:function(t){e.navigateTo({url:"/subpkg/goods_detail/goods_detail?goods_id="+t.goodsId})}}};t.default=u}).call(this,n("543d")["default"])},"5a13":function(e,t,n){"use strict";n.r(t);var a=n("100a"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"829c":function(e,t,n){"use strict";n.r(t);var a=n("c2e4"),i=n("5a13");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("c63b");var s,c=n("f0c5"),u=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=u.exports},b1cf:function(e,t,n){},c2e4:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement;e._self._c},o=[]},c329:function(e,t,n){"use strict";(function(e){n("e811");a(n("66fd"));var t=a(n("829c"));function a(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},c63b:function(e,t,n){"use strict";var a=n("b1cf"),i=n.n(a);i.a}},[["c329","common/runtime","common/vendor"]]]);