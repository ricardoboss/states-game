(function(){"use strict";var e={2029:function(e,t,n){var a=n(9242),i=n(3396),r=n(7139);const o=(0,i._)("h1",null,"States Game",-1),s=(0,i._)("p",null,"A game where you can guess the 50 US states.",-1),l=(0,i._)("hr",null,null,-1),u=["disabled"],h=(0,i._)("strong",null,"Found:",-1),g=(0,i._)("strong",null,"Remaining:",-1),m={key:0},c=(0,i._)("strong",null,"You won!",-1),f=[c],d=(0,i._)("p",null,[(0,i._)("strong",null,"Game Over!")],-1),p=(0,i._)("strong",null,"Missed:",-1),v={key:1},w=(0,i._)("strong",null,"Time remaining:",-1);function b(e,t,n,c,b,k){return(0,i.wg)(),(0,i.iD)(i.HY,null,[o,s,l,e.gameStarted?((0,i.wg)(),(0,i.iD)(i.HY,{key:1},[(0,i.wy)((0,i._)("input",{type:"text",autocomplete:"off",disabled:e.gameOver,"onUpdate:modelValue":t[1]||(t[1]=t=>e.guess=t)},null,8,u),[[a.nr,e.guess]]),(0,i._)("p",null,[h,(0,i.Uk)(" "+(0,r.zw)(e.found.join(", ")),1)]),(0,i._)("p",null,[g,(0,i.Uk)(" "+(0,r.zw)(e.available.length)+" of "+(0,r.zw)(e.states.length),1)]),e.gameOver?((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[e.gameWon?((0,i.wg)(),(0,i.iD)("p",m,f)):(0,i.kq)("",!0),(0,i._)("template",null,[d,(0,i._)("p",null,[p,(0,i.Uk)(" "+(0,r.zw)(e.available.join(", ")),1)])]),(0,i._)("p",null,[(0,i._)("button",{onClick:t[2]||(t[2]=(...t)=>e.startGame&&e.startGame(...t))},"Restart Game")])],64)):((0,i.wg)(),(0,i.iD)("p",v,[w,(0,i.Uk)(" "+(0,r.zw)(Math.floor(e.timer/60).toString().padStart(2,"0"))+":"+(0,r.zw)((e.timer%60).toString().padStart(2,"0")),1)]))],64)):((0,i.wg)(),(0,i.iD)("button",{key:0,onClick:t[0]||(t[0]=(...t)=>e.startGame&&e.startGame(...t))},"Start Game"))],64)}const k=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];var y=(0,i.aZ)({name:"App",data:()=>({states:k,guess:"",found:[],available:[...k].map((e=>e.toLowerCase())),message:"",gameStarted:!1,gameOver:!1,gameWon:!1,timer:-1,timerHandle:-1}),methods:{startGame(){this.found=[],this.guess="",this.message="",this.gameWon=!1,this.gameOver=!1,this.gameStarted=!0,this.timer=600,this.timerHandle=setInterval((()=>{this.timer>0?this.timer--:(this.endGame(),clearInterval(this.timerHandle))}),1e3)},endGame(){clearInterval(this.timerHandle),this.gameOver=!0,this.gameWon=this.found.length===k.length}},watch:{guess(){let e=this.guess.toLowerCase(),t=this.available.findIndex((t=>t===e));if(t>=0){let e=this.available.splice(t,1);this.found.push(e[0]),this.found.sort(),this.guess="",0===this.available.length&&this.endGame()}}}}),_=n(89);const O=(0,_.Z)(y,[["render",b]]);var G=O;(0,a.ri)(G).mount("#app")}},t={};function n(a){var i=t[a];if(void 0!==i)return i.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,a,i,r){if(!a){var o=1/0;for(h=0;h<e.length;h++){a=e[h][0],i=e[h][1],r=e[h][2];for(var s=!0,l=0;l<a.length;l++)(!1&r||o>=r)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(s=!1,r<o&&(o=r));if(s){e.splice(h--,1);var u=i();void 0!==u&&(t=u)}}return t}r=r||0;for(var h=e.length;h>0&&e[h-1][2]>r;h--)e[h]=e[h-1];e[h]=[a,i,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var i,r,o=a[0],s=a[1],l=a[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(l)var h=l(n)}for(t&&t(a);u<o.length;u++)r=o[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(h)},a=self["webpackChunkstates_game"]=self["webpackChunkstates_game"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(2029)}));a=n.O(a)})();
//# sourceMappingURL=app.31b724a8.js.map