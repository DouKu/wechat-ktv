webpackJsonp([1],{"+KzP":function(t,e){},"/5H1":function(t,e){},"0q52":function(t,e,n){"use strict";var a=n("lC5x"),s=n.n(a),o=n("J0Oq"),c=n.n(o),i=n("BMa3"),r=n.n(i),u=n("QmSG"),l=n("WOFH"),d=n.n(l),f=n("L/hj");e.a={data:function(){return{showToAuth:!1,authUrl:"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+u.a.appId+"&redirect_uri="+encodeURIComponent(u.a.redirectUrl)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect",localId:"",showText:""}},methods:{changeRouter:function(t){this.$router.push(t)},translateVoice:function(){var t=this;d.a.translateVoice({localId:this.localId,isShowProgressTips:0,success:function(e){t.showText=e.translateResult}})},startRecord:function(){var t=this;d.a.startRecord(),setTimeout(function(){t.stopRecord()},5e3)},stopRecord:function(){var t=this;d.a.stopRecord({success:function(e){t.localId=e.localId}})},playVoice:function(){d.a.playVoice({localId:this.localId})},pauseVoice:function(){d.a.pauseVoice({localId:this.localId})},stopVoice:function(){d.a.stopVoice({localId:this.localId})},uploadVoice:function(){d.a.uploadVoice({localId:this.localId,isShowProgressTips:0,success:function(t){var e=t.serverId;r.a.request({url:u.a.baseUrl+"/api/auth/audio",method:"post",data:{mediaId:e}})}})}},mounted:function(){var t=this;return c()(s.a.mark(function e(){var n,a,o,c;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Object(f.a)(window.location.search),a=n.code,(o=window.localStorage.getItem("openid"))||a){e.next=7;break}t.showToAuth=!0,e.next=21;break;case 7:if(!a||o){e.next=20;break}return t.showToAuth=!1,e.prev=9,e.next=12,r.a.request({method:"post",url:u.a.baseUrl+"/api/wechat/exchangeToken",data:{code:a}});case 12:c=e.sent,window.localStorage.setItem("openid",c.data.data.openid),e.next=18;break;case 16:e.prev=16,e.t0=e.catch(9);case 18:e.next=21;break;case 20:t.showToAuth=!1;case 21:case"end":return e.stop()}},e,t,[[9,16]])}))()}}},"4Frp":function(t,e){},"D//U":function(t,e){},DICR:function(t,e,n){"use strict";var a=n("lC5x"),s=n.n(a),o=n("J0Oq"),c=n.n(o),i=n("WOFH"),r=n.n(i),u=n("QmSG"),l=n("BMa3"),d=n.n(l);e.a={name:"app",mounted:function(){var t=this;return c()(s.a.mark(function e(){var n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.request({url:u.a.baseUrl+"/api/wechat/getJSConfig",method:"get",params:{url:window.location.href}});case 2:n=t.sent,r.a.config(n.data.data),r.a.ready(function(){console.log("config success")}),r.a.error(function(t){console.log("wx jsapi err:",t)}),r.a.onMenuShareTimeline({title:"美莱周年庆",link:u.a.redirectUrl+"?type=share",imgUrl:"http://os32fgzvj.bkt.clouddn.com/012489fbdca023b5de1f5ddb41e15f61-head-picture.jpg",success:function(){console.log(u.a.recordId,"分享ID"),console.log("分享成功")},cancel:function(){console.log("分享失败")}}),r.a.onMenuShareAppMessage({title:"美莱周年庆",desc:"唱歌",link:u.a.redirectUrl+"?type=share",imgUrl:"http://os32fgzvj.bkt.clouddn.com/012489fbdca023b5de1f5ddb41e15f61-head-picture.jpg",success:function(){console.log("分享成功")},cancel:function(){console.log("分享失败")}});case 8:case"end":return t.stop()}},e,t)}))()}}},"DU+p":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"w-popup-select"},[n("div",{staticClass:"w-popup-container"},[n("h1",[t._v("请选择歌曲")]),t._v(" "),t._l(t.musics,function(e,a){return n("div",{key:a,staticClass:"w-select-item",on:{click:function(n){t.handleChoose(e)}}},[t._v(t._s(e.name))])})],2)])},s=[],o={render:a,staticRenderFns:s};e.a=o},Es8E:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],o={render:a,staticRenderFns:s};e.a=o},FZqj:function(t,e,n){"use strict";function a(t){n("/5H1")}var s=n("w0K0"),o=n("i/2Q"),c=n("46Yf"),i=a,r=c(s.a,o.a,!1,i,"data-v-0b332b07",null);e.a=r.exports},"K+fn":function(t,e){},"L/hj":function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a=function(t){t=t.substr(0,t.length-1);var e={};if(-1!==t.indexOf("?"))for(var n=t.substr(1),a=n.split("&"),s=0;s<a.length;s++)e[a[s].split("=")[0]]=unescape(a[s].split("=")[1]);return e}},L8Y5:function(t,e,n){"use strict";function a(t){n("4Frp")}var s=n("0q52"),o=n("hegJ"),c=n("46Yf"),i=a,r=c(s.a,o.a,!1,i,"data-v-ab3b5d52",null);e.a=r.exports},Lu2J:function(t,e){},"M+NO":function(t,e,n){"use strict";var a=n("lC5x"),s=n.n(a),o=n("J0Oq"),c=n.n(o),i=n("nyfM"),r=n("BMa3"),u=n.n(r),l=n("QmSG"),d=n("WOFH"),f=n.n(d);e.a={created:function(){var t=this;return c()(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.request({url:l.a.baseUrl+"/api/auth/audio",method:"get"});case 2:n=e.sent,t.musics=n.data.data;case 4:case"end":return e.stop()}},e,t)}))()},components:{popupSelect:i.a},data:function(){return{firstRecord:!0,musics:[],open:!0,localId:"",currentMusic:{},finalUrl:"http://os32fgzvj.bkt.clouddn.com/8rYXE6emqQU9mLpfr-pSA_dk1peuRrqmqleZI1WdzjOfbmklRuLYkz-zzzAcU_9F.mp3"}},methods:{addUser:function(){l.a.recordId="292929"},startRecord:function(){var t=this;f.a.startRecord(),setTimeout(function(){t.firstRecord=!1,t.stopRecord()},15e3)},stopRecord:function(){var t=this;console.log("stop"),f.a.stopRecord({success:function(e){t.localId=e.localId}})},handleReSelectMusic:function(){this.open=!0,console.log(this.open)},handleSelectMusic:function(t){this.currentMusic=t},getAudios:function(){var t=this;return c()(s.a.mark(function e(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},startPreVoice:function(){this.$refs.preAudio.play()},startRecordVoice:function(){this.$refs.afterAudio.play()},preAudioEnd:function(){console.log("播放结束"),this.$refs.src=this.finalUrl,this.$refs.afterAudio.play()},afterAudioEnd:function(){console.log("播放结束")},uploadVoice:function(){var t=this;f.a.uploadVoice({localId:this.localId,isShowProgressTips:0,success:function(){var e=c()(s.a.mark(function e(n){var a,o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.serverId,e.next=3,u.a.request({url:l.a.baseUrl+"/api/auth/chorus",method:"post",data:{mediaId:a,audioId:t.currentMusic._id,openid:localStorage.getItem("openid")}});case 3:o=e.sent,t.finalUrl=o.data.data.finalUrl;case 5:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}()})}}}},M93x:function(t,e,n){"use strict";function a(t){n("Lu2J")}var s=n("DICR"),o=n("Es8E"),c=n("46Yf"),i=a,r=c(s.a,o.a,!1,i,null,null);e.a=r.exports},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("BQQs"),s=n("M93x"),o=n("YaEn"),c=n("+KzP");n.n(c);a.a.config.productionTip=!1,new a.a({el:"#app",router:o.a,render:function(t){return t(s.a)}})},QmSG:function(t,e,n){"use strict";e.a={appId:"wxed73c69d3bdf1dce",redirectUrl:"http://119.29.193.240",baseUrl:"http://119.29.193.240",recordId:"13213"}},Sk9T:function(t,e){},"V/q6":function(t,e,n){"use strict";e.a={mounted:function(){var t=this;setTimeout(function(){t.$router.push("/rule")},2e3)},methods:{playVideo:function(){this.$refs.video.play()},pauseVideo:function(){this.$refs.video.pause()},stopVideo:function(){this.$refs.video.currentTime=0,this.$refs.video.pause()}}}},YaEn:function(t,e,n){"use strict";var a=n("BQQs"),s=n("cigS"),o=n("L8Y5"),c=n("kxSe"),i=n("bXRj"),r=n("FZqj"),u=n("v2W6");a.a.use(s.a),e.a=new s.a({routes:[{path:"/",name:"index",component:o.a},{path:"/video",name:"video",component:c.a},{path:"/person",name:"person",component:i.a},{path:"/rule",name:"rule",component:r.a},{path:"/detail",name:"detail",component:u.a}]})},adZT:function(t,e){},bXRj:function(t,e,n){"use strict";function a(t){n("K+fn")}var s=n("M+NO"),o=n("ouIT"),c=n("46Yf"),i=a,r=c(s.a,o.a,!1,i,null,null);e.a=r.exports},cRSc:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-detail"},[n("div",[t._v("规则")]),t._v(" "),n("div",{on:{click:function(e){t.changeRouter("/rule")}}},[t._v("返回")])])},s=[],o={render:a,staticRenderFns:s};e.a=o},hegJ:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{height:"100%"}},[t._v("\n  微信测试 "+t._s(t.showText)+"\n  "),n("a",{directives:[{name:"show",rawName:"v-show",value:t.showToAuth,expression:"showToAuth"}],staticStyle:{"font-size":"20px"},attrs:{href:t.authUrl}},[t._v("跳转授权")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.startRecord}},[t._v("开始录音")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.stopRecord}},[t._v("停止录音")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.playVoice}},[t._v("播放录音")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.pauseVoice}},[t._v("暂停播放")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.stopVoice}},[t._v("停止播放")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.translateVoice}},[t._v("识别语音")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.uploadVoice}},[t._v("上传")]),t._v(" "),n("div",{staticClass:"btn",on:{click:function(e){t.changeRouter("/video")}}},[t._v("开始")])])},s=[],o={render:a,staticRenderFns:s};e.a=o},"i/2Q":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-rule"},[n("img",{attrs:{src:"http://os32fgzvj.bkt.clouddn.com/012489fbdca023b5de1f5ddb41e15f61-head-picture.jpg"}}),t._v(" "),n("div",{staticClass:"w-select-event"},[n("div",{staticClass:"btn",on:{click:function(e){t.changeRouter("/detail")}}},[t._v("规则")]),t._v(" "),n("div",{staticClass:"btn",on:{click:function(e){t.changeRouter("/person")}}},[t._v("开始")])])])},s=[],o={render:a,staticRenderFns:s};e.a=o},kxSe:function(t,e,n){"use strict";function a(t){n("adZT")}var s=n("V/q6"),o=n("tBE9"),c=n("46Yf"),i=a,r=c(s.a,o.a,!1,i,null,null);e.a=r.exports},nyfM:function(t,e,n){"use strict";function a(t){n("D//U")}var s=n("pfcm"),o=n("DU+p"),c=n("46Yf"),i=a,r=c(s.a,o.a,!1,i,"data-v-f954aa92",null);e.a=r.exports},ouIT:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-person"},[t.musics.length?n("popup-select",{attrs:{musics:t.musics},on:{selectMusic:t.handleSelectMusic},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}}):t._e(),t._v(" "),n("div",[t._v("\n    已选择歌曲"+t._s(t.currentMusic.name||"未选择歌曲")+"\n  ")]),t._v(" "),t.currentMusic._id?n("div",{staticClass:"btn",on:{click:t.handleReSelectMusic}},[t._v("重新选择")]):t._e(),t._v(" "),t.firstRecord?[n("div",{staticClass:"btn",on:{click:t.startRecord}},[t._v("开始录制")])]:[n("div",{staticClass:"btn",on:{click:t.startRecord}},[t._v("重新录制")])],t._v(" "),n("div",{staticClass:"btn",on:{click:t.uploadVoice}},[t._v("上传")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.addUser}},[t._v("邀请好友")]),t._v(" "),n("audio",{ref:"preAudio",attrs:{src:t.currentMusic.url,preload:"true"},on:{ended:t.preAudioEnd}}),t._v(" "),n("audio",{ref:"afterAudio",attrs:{src:t.finalUrl,preload:"true"},on:{ended:t.afterAudioEnd}}),t._v(" "),n("div",{staticClass:"btn",on:{click:t.startPreVoice}},[t._v("播放原音")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.startRecordVoice}},[t._v("播放录音")]),t._v(" "),n("div",[t._v(t._s(t.finalUrl))]),t._v(" "),n("div",[t._v("\n    活动规则\n  ")]),t._v(" "),n("div",[t._v("\n    排行榜\n  ")])],2)},s=[],o={render:a,staticRenderFns:s};e.a=o},pfcm:function(t,e,n){"use strict";e.a={props:{value:{type:Boolean,default:function(){return!1}},musics:Array},watch:{value:function(t){console.log(t,"val"),this.show=t}},created:function(){},methods:{handleChoose:function(t){this.show=!1,this.$emit("input",this.show),this.$emit("selectMusic",t)}},data:function(){return{show:this.value}}}},tBE9:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-video"},[n("video",{ref:"video",staticStyle:{"object-fit":"fill",width:"100%",height:"100%"},attrs:{src:"http://os32fgzvj.bkt.clouddn.com/test.mp4",preload:"auto","webkit-playsinline":"true",playsinline:"true","x-webkit-airplay":"allow","x5-video-player-type":"h5","x5-video-player-fullscreen":"true","x5-video-orientation":"portraint"}}),t._v(" "),n("div",{staticClass:"btn",on:{click:t.playVideo}},[t._v("播放视频")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.pauseVideo}},[t._v("暂停视频")]),t._v(" "),n("div",{staticClass:"btn",on:{click:t.stopVideo}},[t._v("停止视频")])])},s=[],o={render:a,staticRenderFns:s};e.a=o},v2W6:function(t,e,n){"use strict";function a(t){n("Sk9T")}var s=n("vw10"),o=n("cRSc"),c=n("46Yf"),i=a,r=c(s.a,o.a,!1,i,null,null);e.a=r.exports},vw10:function(t,e,n){"use strict";e.a={methods:{changeRouter:function(t){this.$router.push(t)}}}},w0K0:function(t,e,n){"use strict";e.a={methods:{changeRouter:function(t){this.$router.push(t)}}}}},["NHnr"]);
//# sourceMappingURL=app.e2272484bc4fbd899ef2.js.map