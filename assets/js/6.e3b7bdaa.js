(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{290:function(t,e,n){},330:function(t,e,n){"use strict";var i=n(290);n.n(i).a},334:function(t,e,n){"use strict";n.r(e);n(85);var i={data:function(){return{num:6,maxNumL:10}},computed:{knowledgeData:function(){var t=this.setKnowledgeLayout(this.num,160,{width:60,height:60});return this.setName(t)}},methods:{setName:function(t){for(var e=["HTML","CSS","JS","jQuery","Vue","Node"],n=0;n<t.length;n++)t[n].name=e[n];return t},setKnowledgeLayout:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{width:0,height:0};if(!(t<3)){for(var i=t%2==1?0:2*Math.PI/t/2,s=[],a=0;a<t;a++){var o=2*a*Math.PI/t+i;s.push({top:-e*Math.cos(o)-n.height/2,left:-e*Math.sin(o)-n.width/2})}return s}}}},s=(n(330),n(33)),a=Object(s.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home-container"},[t._m(0),t._v(" "),n("div",{staticClass:"knowledge"},[n("div",{staticClass:"knowledge-container"},[n("div",{staticClass:"circle"}),t._v(" "),n("div",{staticClass:"knowledge-list"},t._l(t.knowledgeData,(function(e,i){return n("div",{key:e.name,staticClass:"knowledge-item",style:{left:e.left+"px",top:e.top+"px"}},[t._v("\n\t\t\t\t\t\t "+t._s(e.name)+"\n\t\t\t\t")])})),0)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"text"},[e("p",[this._v("知识需要不断积累，不断实践。每当遇到问题的时候找到解决方法并把它记录下来，把一些奇淫技巧以及一些常用的工具方法记录在此，当以后遇到的时候能够快速应对。")]),this._v(" "),e("p",[this._v("此博文存入的就是日常自己接触到的一些知识，把它们都记录在此，主要涉及到的都是有关前端方面的知识，希望有所作用能够提高自己的专业技术以及写文章能力。")])])}],!1,null,null,null);e.default=a.exports}}]);