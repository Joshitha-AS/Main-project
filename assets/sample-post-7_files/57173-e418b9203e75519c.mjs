"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[57173],{503546:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(667294),i=n(616550),r=n(282999),o=n(297728),l=n(730212),s=n(383399),u=n(402189),m=n(862014),p=n(984821);function c(){let e=(0,s.Z)(),t=(0,o.F)(),{isRTL:n}=(0,l.B)(),c=(0,i.TH)(),d=(0,i.k6)(),h=c.search,b=(0,p.Z)(c)&&!n&&e.isAuth&&!e.isPartner&&!(0,r.OK)(c);return(0,a.useEffect)(()=>{h.includes("enable_vertical_nav")&&((0,m.M)(),d.push("/"),window.location.reload())},[h,d]),{enabled:b&&t.checkExperiment("web_vertical_nav").anyEnabled,group:b?t.checkExperiment("web_vertical_nav").group:u.lR.NONE}}},897128:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});var a=n(667294),i=n(883119),r=n(573706),o=n(986782);function l(e,t,n){var a;return(t="symbol"==typeof(a=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?a:String(a))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let s={},u=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class m{constructor(){l(this,"idMap",new Map),l(this,"objMap",new WeakMap)}get(e){let t=u(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=u(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=u(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}var p=n(587435),c=n(39260),d=n(430303),h=n(679482),b=n(512541),f=n(297728),_=n(730212),w=n(410150),y=n(415787),g=n(855746),v=n(785893);function x({analyticsData:e,children:t,idx:n,isMeasuring:i,masonryV2ExpName:r,masonryV2ExpGroup:l}){let s=(0,w.ZP)(),{isAuthenticated:u}=(0,_.B)(),m=(0,g.MM)();return(0,a.useEffect)(()=>{if(e.current[n]){let{fetchTimestamp:t,measureTimestamp:a,hasRendered:o,pageCount:p}=e.current[n]??{},c={deviceType:s,experimentName:r,experimentGroup:l,handlerId:m,isAuthenticated:u,pageCount:p};i&&!a&&(e.current[n].measureTimestamp=Date.now(),(0,y.LY)("webapp.masonry.itemMeasureStart",Date.now()-t,{tags:c})),i||o||((0,y.LY)("webapp.masonry.itemRenderStart",Date.now()-a,{tags:c}),e.current[n].hasRendered=!0)}},[i]),(0,v.jsx)(o.Z,{name:"MasonryItem",children:t})}function E(e){let{align:t,cacheKey:n,id:l,isGridCentered:u=!0,items:E,layout:C,loadItems:S,masonryRef:M,optOutFluidGridExperiment:k=!1,renderItem:$,scrollContainerRef:R,virtualize:O=!0,_getColumnSpanConfig:N,_dynamicHeights:I,useLoadingState:j}=e,T=(0,w.ZP)(),{isAuthenticated:W,isRTL:G}=(0,_.B)(),{logContextEvent:L}=(0,r.v)(),A=(0,f.F)(),D="desktop"===T,B=(0,g.MM)(),Z=(0,a.useRef)(E.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),{_loadingStateItems:P,_renderLoadingStateItems:V}=(0,d.Z)({useLoadingState:j}),{experimentalColumnWidth:F,experimentalGutter:H,anyEnabled:z,group:Y}=(0,p.Z)("flexible"!==C&&!k),U=e.serverRender??!!D,J="flexible"===C||"uniformRowFlexible"===C||"desktop"!==T||z,K=(J&&C?.startsWith("uniformRow")?"uniformRowFlexible":void 0)??(U?"serverRenderedFlexible":"flexible"),X=e.columnWidth??F??h.yF;J&&(X=Math.floor(X));let q=e.gutterWidth??H??(D?h.oX:1),Q=e.minCols??h.yc,ee=(0,a.useRef)(0),et=X+q,en=function(e){if(null==e)return;let t=function(e){let t=s[e];return t&&t.screenWidth===window.innerWidth||(s[e]={screenWidth:window.innerWidth}),s[e]}(e);return t.measurementCache||(t.measurementCache=new m),t.measurementCache}(n),ea=(0,a.useCallback)(()=>R?.current||window,[R]),ei=(0,a.useRef)(!0),{anyEnabled:er,group:eo}=N?A.checkExperiment("web_masonry_mixed_early_bailout"):{anyEnabled:!1,group:""},el=er?e=>e<=3?2*q:3*q:void 0,es=u&&ei.current?"centered":"",{className:eu,styles:em}=function(e){let t=`m_${Object.keys(e).sort().reduce((t,n)=>{let a=e[n];return null==a||"object"==typeof a||"function"==typeof a?t:"boolean"==typeof a?t+(a?"t":"f"):t+a},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:a,isRTL:i,itemWidth:r,maxColumns:o,minColumns:l,items:s,_getColumnSpanConfig:u}=e,m=u?s.map((e,t)=>({index:t,columnSpanConfig:u(e)??1})).filter(e=>1!==e.columnSpanConfig):[],p=r+a,c=Array.from({length:o+1-l},(e,t)=>t+l).map(e=>{let s=e===l?0:e*p,u=e===o?null:(e+1)*p-.01,{styles:c,numberOfVisibleItems:d}=m.reduce((i,o)=>{let{columnSpanConfig:l}=o,s=Math.min(function({columnCount:e,columnSpanConfig:t}){return"number"==typeof t?t:t[e<=2?"sm":e<=4?"md":e<=8?"lg":"xl"]??1}({columnCount:e,columnSpanConfig:l}),e),u=null!=o.index&&i.numberOfVisibleItems>=s+o.index,m=n?100/e*s:r*s+a*(s-1),{numberOfVisibleItems:p}=i;return u?p-=s-1:o.index<p&&(p+=1),{styles:i.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:a,width:i,flexible:r}){let o="number"==typeof n?n:btoa(JSON.stringify(n));return r?`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${i}% !important;
      }`:`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${i}px !important;
      }`}({className:t,index:o.index,columnSpanConfig:l,visible:u,width:m,flexible:n})),numberOfVisibleItems:p}},{styles:"",numberOfVisibleItems:e}),h=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*p}px;
      }

      .${t} .static {
        width: ${r}px !important;
      }
    `;return{minWidth:s,maxWidth:u,styles:`
      .${t} .static:nth-child(-n+${d}) {
        position: static !important;
        visibility: visible !important;
        float: ${i?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${a/2}px;
      }

      ${h}

      ${c}
    `}}),d=c.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),h=c.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),b=`
    ${d.join("")}
    @supports not (container-type: inline-size) {
      ${h.join("")}
    }
  `;return{className:t,styles:`
  .masonryContainer {
      container-type: inline-size;
    }

    .masonryContainer > .centered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${b}
  `}}({gutterWidth:q,flexible:J,items:E,isRTL:G,itemWidth:X,maxColumns:e.maxColumns??Math.max(E.length,h.g5),minColumns:Q,_getColumnSpanConfig:N}),ep=`${es} ${eu}`.trim(),{anyEnabled:ec,expName:ed,group:eh,isMeasureAllEnabled:eb}=(0,c.Z)(),ef=(0,a.useMemo)(()=>!en||E.every(e=>!en.has(e)),[]),e_=eh&&ef,ew=(0,a.useRef)(),ey=(0,a.useRef)(E.length),eg=(0,a.useRef)(0);(0,a.useEffect)(()=>{e_&&E.forEach((e,t)=>{Z.current[t]||(Z.current[t]={fetchTimestamp:Date.now(),measureTimestamp:0,hasRendered:!1,pageCount:eg.current})}),ey.current=E.length,eg.current+=1},[E]),(0,a.useEffect)(()=>{ei.current&&(ei.current=!1)},[]),(0,a.useEffect)(()=>{let e=()=>ee.current+=1;return e_&&(ew.current=Date.now(),window.addEventListener("scroll",e)),()=>{if(e_){let t=Z.current;window.removeEventListener("scroll",e);let n=t.filter(e=>!!e.measureTimestamp).length,a=t.filter(e=>e.hasRendered).length,i=ey.current,r={deviceType:T,experimentName:ed,experimentGroup:eh,handlerId:B,isAuthenticated:W};(0,y.LY)("webapp.masonry.timeSpent",ew.current?Date.now()-ew.current:0,{tags:r}),(0,y.S0)("webapp.masonry.itemsFetched",i,{tags:r}),(0,y.S0)("webapp.masonry.itemsMeasured",n,{tags:r}),(0,y.S0)("webapp.masonry.itemsMeasuredPercentage",Math.floor(n/i*100),{tags:r}),(0,y.S0)("webapp.masonry.itemsRendered",a,{tags:r}),(0,y.S0)("webapp.masonry.itemsRenderedPercentage",Math.floor(a/i*100),{tags:r}),(0,y.S0)("webapp.masonry.scrollCount",ee.current,{tags:r})}}},[]);let ev=(0,a.useCallback)((e,t,n)=>{let a=e.reduce((e,t)=>e+t),i=a/e.length;(0,y.S0)("webapp.masonry.multiColumnWhitespace.average",i,{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:B,isAuthenticated:W,multiColumnItemSpan:e.length}}),(0,y.S0)("webapp.masonry.twoColWhitespace",i,{sampleRate:1,tags:{columnWidth:X,minCols:Q}}),eo&&(0,y.S0)("webapp.masonry.graphIterations",t,{sampleRate:1,tags:{columnSpan:n,exprimentGroup:eo}}),L({event_type:15878,component:14468,aux_data:{total_whitespace_px:a}}),L({event_type:16062,component:14468,aux_data:{average_whitespace_px:i}}),L({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,y.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:B,isAuthenticated:W,multiColumnItemSpan:e.length}}),L({event_type:16261,component:14468})),t>=100&&((0,y.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:B,isAuthenticated:W,multiColumnItemSpan:e.length}}),L({event_type:16262,component:14468}))}),(0,y.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:B,isAuthenticated:W,multiColumnItemSpan:e.length}})},[X,eo,L,Q,W,B,Y,eh]),ex=(0,a.useCallback)(e=>e_?(0,v.jsx)(x,{analyticsData:Z,idx:e.itemIdx,isMeasuring:e.isMeasuring,masonryV2ExpGroup:eh,masonryV2ExpName:ed,children:(0,v.jsx)(o.Z,{name:"MasonryItem",children:$(e)})}):(0,v.jsx)(o.Z,{name:"MasonryItem",children:$(e)}),[$]);return(0,v.jsx)("div",{className:"masonryContainer","data-test-id":"masonry-container",id:l,style:z?{padding:`0 ${q/2}px`}:void 0,children:(0,v.jsxs)("div",{className:ep,children:[U&&ei.current?(0,v.jsx)(b.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:em}):null,(0,v.jsx)(i.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?et*e.maxColumns:void 0,children:ec?(0,v.jsx)(i.GX,{ref:e=>{M&&(M.current=e)},_dynamicHeights:I,_earlyBailout:el,_getColumnSpanConfig:N,_loadingStateItems:P,_logTwoColWhitespace:ev,_measureAll:eb,_renderLoadingStateItems:V,align:t,columnWidth:X,gutterWidth:q,items:E,layout:J?K:C??"basic",loadItems:S,measurementStore:en,minCols:Q,renderItem:ex,scrollContainer:ea,virtualBufferFactor:.3,virtualize:O}):(0,v.jsx)(i.Rk,{ref:e=>{M&&(M.current=e)},_dynamicHeights:I,_earlyBailout:el,_getColumnSpanConfig:N,_loadingStateItems:P,_logTwoColWhitespace:ev,_renderLoadingStateItems:V,align:t,columnWidth:X,gutterWidth:q,items:E,layout:J?K:C??"basic",loadItems:S,measurementStore:en,minCols:Q,renderItem:ex,scrollContainer:ea,virtualBufferFactor:.3,virtualize:O})})]})})}},587435:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(503546),i=n(297728),r=n(730212),o=n(410150);let l=({isEligible:e=!0,skipActivation:t,skipVerticalNavCheck:n})=>{let l=(0,o.ZP)(),{isAuthenticated:s}=(0,r.B)(),u=(0,i.F)(),{enabled:m}=(0,a.Z)();return"desktop"===l&&e?m&&!n?{anyEnabled:!0,group:"enabled_221_16"}:u.checkExperiment(s?"web_fluid_grid_desktop_auth":"web_fluid_grid_desktop_unauth",{dangerouslySkipActivation:t||!1}):{group:"",anyEnabled:!1}};function s(e=!0){let{group:t,anyEnabled:n}=l({isEligible:e}),a=t.match(/enabled_([\d]+)_([\d]+)/),i=a?parseInt(a[1],10):void 0,r=a?parseInt(a[2],10):void 0,o=r?Math.floor(r/4):void 0;return{anyEnabled:n,group:t,experimentalColumnWidth:i,experimentalGutter:r,experimentalGutterBoints:o}}},430303:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(667294),i=n(883119),r=n(876594),o=n(934980),l=n(512541),s=n(785893);let u=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,m={backgroundColor:r._VP,animation:"pulsing 2s ease-out 0.5s infinite",borderRadius:r.Ev2};function p({data:e}){let{height:t}=e;return(0,s.jsxs)(a.Fragment,{children:[(0,s.jsx)(l.Z,{unsafeCSS:(0,o.Ll)([u])}),(0,s.jsx)(i.xu,{dangerouslySetInlineStyle:{__style:m},"data-test-id":"skeleton-pin",children:(0,s.jsx)(i.xu,{height:t})})]})}function c({useLoadingState:e,numOfPins:t=50}){let n=(0,a.useMemo)(()=>Array.from({length:t}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236}],[]),[t]);return{_loadingStateItems:e?n:void 0,_renderLoadingStateItems:e?({data:e})=>(0,s.jsx)(p,{data:e}):void 0}}},402189:(e,t,n)=>{n.d(t,{BO:()=>x,GC:()=>k,GJ:()=>f,L7:()=>h,Lc:()=>p,Mh:()=>u,Qf:()=>m,Qq:()=>M,Un:()=>$,X$:()=>S,Z7:()=>d,bT:()=>y,bd:()=>w,df:()=>c,iz:()=>O,kl:()=>_,lR:()=>R,m6:()=>E,mT:()=>v,pS:()=>g,uW:()=>C,zz:()=>b});var a,i,r=n(883119),o=n(876594),l=n(65967),s=n(241716);let u="right",m=72,p="VerticalNavContent",c=24,d="lg",h=16,b=16,f=392,_=12,w=o.mJW,y=o.Kuk,g=new r.H3([s.NW]),v=new r.Ry(s.fe-3),x=new r.H3([g,l.kl]),E=new r.H3([x]),C=2,S=8,M=3,k=12,$=((a={}).PINTEREST_LOGO="web.vertical_nav.pinterest_logo.click",a.HOME="web.vertical_nav.home.click",a.TODAY="web.vertical_nav.today.click",a.CREATE="web.vertical_nav.create.click",a.NEWS="web.vertical_nav.news.click",a.CONVERSATIONS="web.vertical_nav.conversations.click",a.AVATAR="web.vertical_nav.avatar.click",a.ACCOUNT_SWITCHER="web.vertical_nav.account_switcher.click",a.MORE_OPTIONS_OPT_OUT="web.vertical_nav.more_options.opt_out",a.MORE_OPTIONS="web.vertical_nav.more_options.click",a),R=((i={}).CONTROL="control",i.EMPLOYEES="employees",i.ENABLED="enabled",i.ENABLED_HOME_BUTTON="enabled_home_button",i.ENABLED_HOME_AND_LOGO="enabled_home_and_logo",i.NONE="",i),O=e=>({tags:{experimentGroup:e}})},862014:(e,t,n)=>{n.d(t,{M:()=>r,f:()=>i});var a=n(914896);let i=()=>{a.t8({name:"forced_experiments",purpose:"personalization",httpOnly:!1,duration:"30d"},JSON.stringify({web_vertical_nav:!1}))},r=()=>{a.zN("forced_experiments")}},984821:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(282999);function i(e){return!((0,a.Gl)(e)||(0,a.PY)(e)||(0,a.jC)(e)||(0,a.Xn)(e)||(0,a.b_)(e)||(0,a.oF)(e)||(0,a.dt)(e)||(0,a.x7)(e)||(0,a.cY)(e)||(0,a.bb)(e))}},65967:(e,t,n)=>{n.d(t,{CZ:()=>o,Db:()=>s,Lu:()=>r,kl:()=>a,sb:()=>l,t3:()=>i,to:()=>u});let a=new(n(883119)).Ry(700),i="defaultInboxView",r="newMessageView",o="newMessageSelectRecipientsView",l="invitesRequestsView",s="followInviteEducationView",u=64}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/57173-e418b9203e75519c.mjs.map