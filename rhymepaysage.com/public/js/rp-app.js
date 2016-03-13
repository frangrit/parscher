document.createElement("picture"),function(){"use strict";function e(t,r){function i(e,t){return function(){return e.apply(t,arguments)}}var s;if(r=r||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=r.touchBoundary||10,this.layer=t,this.tapDelay=r.tapDelay||200,this.tapTimeout=r.tapTimeout||700,!e.notNeeded(t)){for(var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,a=0,u=o.length;u>a;a++)c[o[a]]=i(c[o[a]],c);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,r):i.call(t,e,n,r)},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(t,e,n,r)}),"function"==typeof t.onclick&&(s=t.onclick,t.addEventListener("click",function(e){s(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,i=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=r&&/OS [6-7]_\d/.test(navigator.userAgent),o=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(r&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;r&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,s;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],r){if(s=window.getSelection(),s.rangeCount&&!s.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,o,c,a,u,l=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,o=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(u=e.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(t=this.findControl(l)){if(this.focus(l),n)return!1;l=t}}else if(this.needsFocus(l))return e.timeStamp-o>100||r&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,e),r&&"select"===c||(this.targetElement=null,e.preventDefault()),!1);return r&&!i&&(a=l.fastClickScrollParent,a&&a.fastClickLastScrollTop!==a.scrollTop)?!0:(this.needsClick(l)||(e.preventDefault(),this.sendClick(l,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,r,i,s;if("undefined"==typeof window.ontouchstart)return!0;if(r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(o&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(s=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],s>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var t,n=document.createElement("source"),r=function(e){var t,r,i=e.parentNode;"PICTURE"===i.nodeName.toUpperCase()?(t=n.cloneNode(),i.insertBefore(t,i.firstElementChild),setTimeout(function(){i.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,r=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=r}))},i=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)r(t[e])},s=function(){clearTimeout(t),t=setTimeout(i,99)},o=e.matchMedia&&matchMedia("(orientation: landscape)"),c=function(){s(),o&&o.addListener&&o.addListener(s)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?c():document.addEventListener("DOMContentLoaded",c),s}())}(window),function(e,t,n){"use strict";function r(e){return" "===e||"	"===e||"\n"===e||"\f"===e||"\r"===e}function i(t,n){var r=new e.Image;return r.onerror=function(){b[t]=!1,te()},r.onload=function(){b[t]=1===r.width,te()},r.src=n,"pending"}function s(){F=!1,U=e.devicePixelRatio,O={},W={},A.DPR=U||1,H.width=Math.max(e.innerWidth||0,T.clientWidth),H.height=Math.max(e.innerHeight||0,T.clientHeight),H.vw=H.width/100,H.vh=H.height/100,v=[H.height,H.width,U].join("-"),H.em=A.getEmValue(),H.rem=H.em}function o(e,t,n,r){var i,s,o,c;return"saveData"===x.algorithm?e>2.7?c=n+1:(s=t-n,i=Math.pow(e-.6,1.5),o=s*i,r&&(o+=.1*i),c=e+o):c=n>1?Math.sqrt(e*t):e,c>n}function c(e){var t,n=A.getSet(e),r=!1;"pending"!==n&&(r=v,n&&(t=A.setRes(n),A.applySetCandidate(t,e))),e[A.ns].evaled=r}function a(e,t){return e.res-t.res}function u(e,t,n){var r;return!n&&t&&(n=e[A.ns].sets,n=n&&n[n.length-1]),r=l(t,n),r&&(t=A.makeUrl(t),e[A.ns].curSrc=t,e[A.ns].curCan=r,r.res||ee(r,r.set.sizes)),r}function l(e,t){var n,r,i;if(e&&t)for(i=A.parseSet(t),e=A.makeUrl(e),n=0;n<i.length;n++)if(e===A.makeUrl(i[n].url)){r=i[n];break}return r}function d(e,t){var n,r,i,s,o=e.getElementsByTagName("source");for(n=0,r=o.length;r>n;n++)i=o[n],i[A.ns]=!0,s=i.getAttribute("srcset"),s&&t.push({srcset:s,media:i.getAttribute("media"),type:i.getAttribute("type"),sizes:i.getAttribute("sizes")})}function h(e,t){function n(t){var n,r=t.exec(e.substring(h));return r?(n=r[0],h+=n.length,n):void 0}function i(){var e,n,r,i,s,a,u,l,d,h=!1,p={};for(i=0;i<c.length;i++)s=c[i],a=s[s.length-1],u=s.substring(0,s.length-1),l=parseInt(u,10),d=parseFloat(u),_.test(u)&&"w"===a?((e||n)&&(h=!0),0===l?h=!0:e=l):V.test(u)&&"x"===a?((e||n||r)&&(h=!0),0>d?h=!0:n=d):_.test(u)&&"h"===a?((r||n)&&(h=!0),0===l?h=!0:r=l):h=!0;h||(p.url=o,e&&(p.w=e),n&&(p.d=n),r&&(p.h=r),r||n||e||(p.d=1),1===p.d&&(t.has1x=!0),p.set=t,f.push(p))}function s(){for(n(q),a="",u="in descriptor";;){if(l=e.charAt(h),"in descriptor"===u)if(r(l))a&&(c.push(a),a="",u="after descriptor");else{if(","===l)return h+=1,a&&c.push(a),void i();if("("===l)a+=l,u="in parens";else{if(""===l)return a&&c.push(a),void i();a+=l}}else if("in parens"===u)if(")"===l)a+=l,u="in descriptor";else{if(""===l)return c.push(a),void i();a+=l}else if("after descriptor"===u)if(r(l));else{if(""===l)return void i();u="in descriptor",h-=1}h+=1}}for(var o,c,a,u,l,d=e.length,h=0,f=[];;){if(n(G),h>=d)return f;o=n(j),c=[],","===o.slice(-1)?(o=o.replace(Y,""),i()):s()}}function f(e){function t(e){function t(){s&&(o.push(s),s="")}function n(){o[0]&&(c.push(o),o=[])}for(var i,s="",o=[],c=[],a=0,u=0,l=!1;;){if(i=e.charAt(u),""===i)return t(),n(),c;if(l){if("*"===i&&"/"===e[u+1]){l=!1,u+=2,t();continue}u+=1}else{if(r(i)){if(e.charAt(u-1)&&r(e.charAt(u-1))||!s){u+=1;continue}if(0===a){t(),u+=1;continue}i=" "}else if("("===i)a+=1;else if(")"===i)a-=1;else{if(","===i){t(),n(),u+=1;continue}if("/"===i&&"*"===e.charAt(u+1)){l=!0,u+=2;continue}}s+=i,u+=1}}}function n(e){return l.test(e)&&parseFloat(e)>=0?!0:d.test(e)?!0:"0"===e||"-0"===e||"+0"===e?!0:!1}var i,s,o,c,a,u,l=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,d=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(s=t(e),o=s.length,i=0;o>i;i++)if(c=s[i],a=c[c.length-1],n(a)){if(u=a,c.pop(),0===c.length)return u;if(c=c.join(" "),A.matchesMedia(c))return u}return"100vw"}t.createElement("picture");var p,m,g,v,A={},y=!1,E=function(){},w=t.createElement("img"),S=w.getAttribute,k=w.setAttribute,C=w.removeAttribute,T=t.documentElement,b={},x={algorithm:""},L="data-pfsrc",M=L+"set",z=navigator.userAgent,P=/rident/.test(z)||/ecko/.test(z)&&z.match(/rv\:(\d+)/)&&RegExp.$1>35,D="currentSrc",R=/\s+\+?\d+(e\d+)?w/,B=/(\([^)]+\))?\s*(.+)/,I=e.picturefillCFG,N="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",$="font-size:100%!important;",F=!0,O={},W={},U=e.devicePixelRatio,H={px:1,"in":96},Q=t.createElement("a"),X=!1,q=/^[ \t\n\r\u000c]+/,G=/^[, \t\n\r\u000c]+/,j=/^[^ \t\n\r\u000c]+/,Y=/[,]+$/,_=/^\d+$/,V=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,K=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},J=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},Z=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=J(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,r){var i;if(!(t in O))if(O[t]=!1,r&&(i=t.match(e)))O[t]=i[1]*H[i[2]];else try{O[t]=new Function("e",n(t))(H)}catch(s){}return O[t]}}(),ee=function(e,t){return e.w?(e.cWidth=A.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},te=function(e){if(y){var n,r,i,s=e||{};if(s.elements&&1===s.elements.nodeType&&("IMG"===s.elements.nodeName.toUpperCase()?s.elements=[s.elements]:(s.context=s.elements,s.elements=null)),n=s.elements||A.qsa(s.context||t,s.reevaluate||s.reselect?A.sel:A.selShort),i=n.length){for(A.setupRun(s),X=!0,r=0;i>r;r++)A.fillImg(n[r],s);A.teardownRun(s)}}};p=e.console&&console.warn?function(e){console.warn(e)}:E,D in w||(D="src"),b["image/jpeg"]=!0,b["image/gif"]=!0,b["image/png"]=!0,b["image/svg+xml"]=t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A.ns=("pf"+(new Date).getTime()).substr(0,9),A.supSrcset="srcset"in w,A.supSizes="sizes"in w,A.supPicture=!!e.HTMLPictureElement,A.supSrcset&&A.supPicture&&!A.supSizes&&!function(e){w.srcset="data:,a",e.src="data:,a",A.supSrcset=w.complete===e.complete,A.supPicture=A.supSrcset&&A.supPicture}(t.createElement("img")),A.supSrcset&&!A.supSizes?!function(){var e="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",n="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",r=t.createElement("img"),i=function(){var e=r.width;2===e&&(A.supSizes=!0),g=A.supSrcset&&!A.supSizes,y=!0,setTimeout(te)};r.onload=i,r.onerror=i,r.setAttribute("sizes","9px"),r.srcset=n+" 1w,"+e+" 9w",r.src=n}():y=!0,A.selShort="picture>img,img[srcset]",A.sel=A.selShort,A.cfg=x,A.DPR=U||1,A.u=H,A.types=b,A.setSize=E,A.makeUrl=J(function(e){return Q.href=e,Q.href}),A.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},A.matchesMedia=function(){return e.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?A.matchesMedia=function(e){return!e||matchMedia(e).matches}:A.matchesMedia=A.mMQ,A.matchesMedia.apply(this,arguments)},A.mMQ=function(e){return e?Z(e):!0},A.calcLength=function(e){var t=Z(e,!0)||!1;return 0>t&&(t=!1),t},A.supportsType=function(e){return e?b[e]:!0},A.parseSize=J(function(e){var t=(e||"").match(B);return{media:t&&t[1],length:t&&t[2]}}),A.parseSet=function(e){return e.cands||(e.cands=h(e.srcset,e)),e.cands},A.getEmValue=function(){var e;if(!m&&(e=t.body)){var n=t.createElement("div"),r=T.style.cssText,i=e.style.cssText;n.style.cssText=N,T.style.cssText=$,e.style.cssText=$,e.appendChild(n),m=n.offsetWidth,e.removeChild(n),m=parseFloat(m,10),T.style.cssText=r,e.style.cssText=i}return m||16},A.calcListLength=function(e){if(!(e in W)||x.uT){var t=A.calcLength(f(e));W[e]=t?t:H.width}return W[e]},A.setRes=function(e){var t;if(e){t=A.parseSet(e);for(var n=0,r=t.length;r>n;n++)ee(t[n],e.sizes)}return t},A.setRes.res=ee,A.applySetCandidate=function(e,t){if(e.length){var n,r,i,s,c,l,d,h,f,p=t[A.ns],m=A.DPR;if(l=p.curSrc||t[D],d=p.curCan||u(t,l,e[0].set),d&&d.set===e[0].set&&(f=P&&!t.complete&&d.res-.1>m,f||(d.cached=!0,d.res>=m&&(c=d))),!c)for(e.sort(a),s=e.length,c=e[s-1],r=0;s>r;r++)if(n=e[r],n.res>=m){i=r-1,c=e[i]&&(f||l!==A.makeUrl(n.url))&&o(e[i].res,n.res,m,e[i].cached)?e[i]:n;break}c&&(h=A.makeUrl(c.url),p.curSrc=h,p.curCan=c,h!==l&&A.setSrc(t,c),A.setSize(t))}},A.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},A.getSet=function(e){var t,n,r,i=!1,s=e[A.ns].sets;for(t=0;t<s.length&&!i;t++)if(n=s[t],n.srcset&&A.matchesMedia(n.media)&&(r=A.supportsType(n.type))){"pending"===r&&(n=r),i=n;break}return i},A.parseSets=function(e,t,r){var i,s,o,c,a=t&&"PICTURE"===t.nodeName.toUpperCase(),u=e[A.ns];(u.src===n||r.src)&&(u.src=S.call(e,"src"),u.src?k.call(e,L,u.src):C.call(e,L)),(u.srcset===n||r.srcset||!A.supSrcset||e.srcset)&&(i=S.call(e,"srcset"),u.srcset=i,c=!0),u.sets=[],a&&(u.pic=!0,d(t,u.sets)),u.srcset?(s={srcset:u.srcset,sizes:S.call(e,"sizes")},u.sets.push(s),o=(g||u.src)&&R.test(u.srcset||""),o||!u.src||l(u.src,s)||s.has1x||(s.srcset+=", "+u.src,s.cands.push({url:u.src,d:1,set:s}))):u.src&&u.sets.push({srcset:u.src,sizes:null}),u.curCan=null,u.curSrc=n,u.supported=!(a||s&&!A.supSrcset||o&&!A.supSizes),c&&A.supSrcset&&!u.supported&&(i?(k.call(e,M,i),e.srcset=""):C.call(e,M)),u.supported&&!u.srcset&&(!u.src&&e.src||e.src!==A.makeUrl(u.src))&&(null===u.src?e.removeAttribute("src"):e.src=u.src),u.parsed=!0},A.fillImg=function(e,t){var n,r=t.reselect||t.reevaluate;e[A.ns]||(e[A.ns]={}),n=e[A.ns],(r||n.evaled!==v)&&((!n.parsed||t.reevaluate)&&A.parseSets(e,e.parentNode,t),n.supported?n.evaled=v:c(e))},A.setupRun=function(){(!X||F||U!==e.devicePixelRatio)&&s()},A.supPicture?(te=E,A.fillImg=E):!function(){var n,r=e.attachEvent?/d$|^c/:/d$|^c|^i/,i=function(){var e=t.readyState||"";s=setTimeout(i,"loading"===e?200:999),t.body&&(A.fillImgs(),n=n||r.test(e),n&&clearTimeout(s))},s=setTimeout(i,t.body?9:99),o=function(e,t){var n,r,i=function(){var s=new Date-r;t>s?n=setTimeout(i,t-s):(n=null,e())};return function(){r=new Date,n||(n=setTimeout(i,t))}},c=T.clientHeight,a=function(){F=Math.max(e.innerWidth||0,T.clientWidth)!==H.width||T.clientHeight!==c,c=T.clientHeight,F&&A.fillImgs()};K(e,"resize",o(a,99)),K(t,"readystatechange",i)}(),A.picturefill=te,A.fillImgs=te,A.teardownRun=E,te._=A,e.picturefillCFG={pf:A,push:function(e){var t=e.shift();"function"==typeof A[t]?A[t].apply(A,e):(x[t]=e[0],X&&A.fillImgs({reselect:!0}))}};for(;I&&I.length;)e.picturefillCFG.push(I.shift());e.picturefill=te,"object"==typeof module&&"object"==typeof module.exports?module.exports=te:"function"==typeof define&&define.amd&&define("picturefill",function(){return te}),A.supPicture||(b["image/webp"]=i("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document),$(document).ready(function(){FastClick.attach(document.body),$("#container").size()>0&&(document.createStyleSheet?document.createStyleSheet("/css/rp-app.css"):$("head").append($("<link rel='stylesheet' href='/css/rp-app.css' type='text/css' media='screen' />"))),$("#nav-secondary li a").on("click",function(e){e.preventDefault(),thisBodyClass=$(this).attr("id"),$("body").removeClass().addClass(thisBodyClass)})});