import{r as e}from"./vendor-71f819f8.js";let t,a,r,o={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,l=(e,t)=>{let a="",r="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+s+";":r+="f"==i[1]?l(s,i):i+"{"+l(s,"k"==i[1]?"":t)+"}":"object"==typeof s?r+=l(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=l.p?l.p(i,s):i+":"+s+";")}return a+(t&&o?t+"{"+o+"}":o)+r},d={},c=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+c(e[a]);return t}return e};function u(e){let t=this||{},a=e.call?e(t.p):e;return((e,t,a,r,o)=>{let u=c(e),p=d[u]||(d[u]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(u));if(!d[p]){let t=u!==e?e:(e=>{let t,a,r=[{}];for(;t=i.exec(e.replace(s,""));)t[4]?r.shift():t[3]?(a=t[3].replace(n," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(n," ").trim();return r[0]})(e);d[p]=l(o?{["@keyframes "+p]:t}:t,a?"":"."+p)}let m=a&&d.g?d.g:null;return a&&(d.g=d[p]),f=d[p],y=t,g=r,(b=m)?y.data=y.data.replace(b,f):-1===y.data.indexOf(f)&&(y.data=g?f+y.data:y.data+f),p;var f,y,g,b})(a.unshift?a.raw?((e,t,a)=>e.reduce((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+r+(null==i?"":i)},""))(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o})(t.target),t.g,t.o,t.k)}u.bind({g:1});let p=u.bind({k:1});function m(e,o){let i=this||{};return function(){let s=arguments;function n(l,d){let c=Object.assign({},l),p=c.className||n.className;i.p=Object.assign({theme:a&&a()},c),i.o=/ *go\d+/.test(p),c.className=u.apply(i,s)+(p?" "+p:""),o&&(c.ref=d);let m=e;return e[0]&&(m=c.as||e,delete c.as),r&&m[0]&&r(c),t(m,c)}return o?o(n):n}}var f=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,y=(()=>{let e=0;return()=>(++e).toString()})(),g=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),b="default",h=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return h(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},v=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},w={},E=(e,t=b)=>{w[t]=h(w[t]||x,e),v.forEach(([e,a])=>{e===t&&a(w[t])})},k=e=>Object.keys(w).forEach(t=>E(e,t)),$=(e=b)=>t=>{E(t,e)},j={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=e=>(t,a)=>{let r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||y()}))(t,e,a);return $(r.toasterId||(e=>Object.keys(w).find(t=>w[t].toasts.some(t=>t.id===e)))(r.id))({type:2,toast:r}),r.id},D=(e,t)=>C("blank")(e,t);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(e,t)=>{let a={type:3,toastId:e};t?$(t)(a):k(a)},D.dismissAll=e=>D.dismiss(void 0,e),D.remove=(e,t)=>{let a={type:4,toastId:e};t?$(t)(a):k(a)},D.removeAll=e=>D.remove(void 0,e),D.promise=(e,t,a)=>{let r=D.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?f(t.success,e):void 0;return o?D.success(o,{id:r,...a,...null==a?void 0:a.success}):D.dismiss(r),e}).catch(e=>{let o=t.error?f(t.error,e):void 0;o?D.error(o,{id:r,...a,...null==a?void 0:a.error}):D.dismiss(r)}),e};var O,N,z,A,I=(t,a="default")=>{let{toasts:r,pausedAt:o}=((t={},a=b)=>{let[r,o]=e.useState(w[a]||x),i=e.useRef(w[a]);e.useEffect(()=>(i.current!==w[a]&&o(w[a]),v.push([a,o]),()=>{let e=v.findIndex(([e])=>e===a);e>-1&&v.splice(e,1)}),[a]);let s=r.toasts.map(e=>{var a,r,o;return{...t,...t[e.type],...e,removeDelay:e.removeDelay||(null==(a=t[e.type])?void 0:a.removeDelay)||(null==t?void 0:t.removeDelay),duration:e.duration||(null==(r=t[e.type])?void 0:r.duration)||(null==t?void 0:t.duration)||j[e.type],style:{...t.style,...null==(o=t[e.type])?void 0:o.style,...e.style}}});return{...r,toasts:s}})(t,a),i=e.useRef(new Map).current,s=e.useCallback((e,t=1e3)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);e.useEffect(()=>{if(o)return;let e=Date.now(),t=r.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(r<0))return setTimeout(()=>D.dismiss(t.id,a),r);t.visible&&D.dismiss(t.id)});return()=>{t.forEach(e=>e&&clearTimeout(e))}},[r,o,a]);let n=e.useCallback($(a),[a]),l=e.useCallback(()=>{n({type:5,time:Date.now()})},[n]),d=e.useCallback((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=e.useCallback(()=>{o&&n({type:6,time:Date.now()})},[o,n]),u=e.useCallback((e,t)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=t||{},s=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return e.useEffect(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},P=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,_=p`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=p`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=m("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=p`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,T=m("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,H=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,S=p`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,R=m("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${S} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,U=m("div")`
  position: absolute;
`,q=m("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=p`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Y=m("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:t})=>{let{icon:a,type:r,iconTheme:o}=t;return void 0!==a?"string"==typeof a?e.createElement(Y,null,a):a:"blank"===r?null:e.createElement(q,null,e.createElement(T,{...o}),"loading"!==r&&e.createElement(U,null,"error"===r?e.createElement(L,{...o}):e.createElement(R,{...o})))},G=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,J=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,K=m("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Q=m("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,V=e.memo(({toast:t,position:a,style:r,children:o})=>{let i=t.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,o]=g()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[G(a),J(a)];return{animation:t?`${p(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${p(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||a||"top-center",t.visible):{opacity:0},s=e.createElement(Z,{toast:t}),n=e.createElement(Q,{...t.ariaProps},f(t.message,t));return e.createElement(K,{className:t.className,style:{...i,...r,...t.style}},"function"==typeof o?o({icon:s,message:n}):e.createElement(e.Fragment,null,s,n))});O=e.createElement,l.p=N,t=O,a=z,r=A;var W=({id:t,className:a,style:r,onHeightUpdate:o,children:i})=>{let s=e.useCallback(e=>{if(e){let a=()=>{let a=e.getBoundingClientRect().height;o(t,a)};a(),new MutationObserver(a).observe(e,{subtree:!0,childList:!0,characterData:!0})}},[t,o]);return e.createElement("div",{ref:s,className:a,style:r},i)},X=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:t,position:a="top-center",toastOptions:r,gutter:o,children:i,toasterId:s,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=I(r,s);return e.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let s=r.position||a,n=((e,t)=>{let a=e.includes("top"),r=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:g()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...r,...o}})(s,c.calculateOffset(r,{reverseOrder:t,gutter:o,defaultPosition:a}));return e.createElement(W,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?X:"",style:n},"custom"===r.type?f(r.message,r):i?i(r):e.createElement(V,{toast:r,position:s}))}))},te=D;export{ee as F,te as z};
