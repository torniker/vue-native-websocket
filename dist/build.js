!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueNativeSock=t():e.VueNativeSock=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){o(this,e),this.listeners=new Map}return r(e,[{key:"addListener",value:function(e,t,n){return"function"==typeof t&&(this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push({callback:t,vm:n}),!0)}},{key:"removeListener",value:function(e,t,n){var o=this.listeners.get(e),r=void 0;return!!(o&&o.length&&(r=o.reduce(function(e,o,r){return"function"==typeof o.callback&&o.callback===t&&o.vm===n&&(e=r),e},-1))>-1)&&(o.splice(r,1),this.listeners.set(e,o),!0)}},{key:"emit",value:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var r=this.listeners.get(e);return!(!r||!r.length)&&(r.forEach(function(e){var t;(t=e.callback).call.apply(t,[e.vm].concat(n))}),!0)}}]),e}();t.default=new i},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),i=o(r),c=n(0),s=o(c);t.default={install:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)throw new Error("[vue-native-socket] cannot locate connection");var o=null;n.connectManually?(e.prototype.$connect=function(r){o=r?new i.default(r,n):new i.default(t,n),e.prototype.$socket=o.WebSocket},e.prototype.$disconnect=function(){o&&o.reconnection&&(o.reconnection=!1),e.prototype.$socket&&(e.prototype.$socket.close(),delete e.prototype.$socket)}):(o=new i.default(t,n),e.prototype.$socket=o.WebSocket),e.mixin({created:function(){var e=this,t=this,n=this.$options.sockets;this.$options.sockets=new Proxy({},{set:function(e,n,o){return s.default.addListener(n,o,t),e[n]=o,!0},deleteProperty:function(e,n){return s.default.removeListener(n,t.$options.sockets[n],t),delete e.key,!0}}),n&&Object.keys(n).forEach(function(t){e.$options.sockets[t]=n[t]})},beforeDestroy:function(){var e=this,t=this.$options.sockets;t&&Object.keys(t).forEach(function(t){delete e.$options.sockets[t]})}})}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,e),this.format=n.format&&n.format.toLowerCase(),this.connectionUrl=t,this.opts=n,this.reconnection=this.opts.reconnection||!1,this.reconnectionAttempts=this.opts.reconnectionAttempts||1/0,this.reconnectionDelay=this.opts.reconnectionDelay||1e3,this.reconnectTimeoutId=0,this.reconnectionCount=0,this.connect(t,n),n.store&&(this.store=n.store),this.onEvent()}return r(e,[{key:"connect",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=n.protocol||"";return this.WebSocket=n.WebSocket||(""===o?new WebSocket(e):new WebSocket(e,o)),"json"===this.format&&("sendObj"in this.WebSocket||(this.WebSocket.sendObj=function(e){return t.WebSocket.send(JSON.stringify(e))})),this.WebSocket}},{key:"reconnect",value:function(){var e=this;this.reconnectionCount<=this.reconnectionAttempts?(this.reconnectionCount++,clearTimeout(this.reconnectTimeoutId),this.reconnectTimeoutId=setTimeout(function(){e.store&&e.passToStore("SOCKET_RECONNECT",e.reconnectionCount),e.connect(e.connectionUrl,e.opts),e.onEvent()},this.reconnectionDelay)):this.store&&this.passToStore("SOCKET_RECONNECT_ERROR",!0)}},{key:"onEvent",value:function(){var e=this;["onmessage","onclose","onerror","onopen"].forEach(function(t){e.WebSocket[t]=function(n){c.default.emit(t,n),e.store&&e.passToStore("SOCKET_"+t,n),e.reconnection&&"onopen"===t&&(e.reconnectionCount=0),e.reconnection&&"onclose"===t&&e.reconnect()}})}},{key:"passToStore",value:function(e,t){if(e.startsWith("SOCKET_")){var n="commit",o=e.toUpperCase();if("json"===this.format&&t.data){var r=t.data.split("\n"),i=!0,c=!1,s=void 0;try{for(var u,a=r[Symbol.iterator]();!(i=(u=a.next()).done);i=!0){var f=u.value,l=JSON.parse(f);l.mutation?o=[l.namespace||"",l.mutation].filter(function(e){return!!e}).join("/"):l.action&&(n="dispatch",o=[l.namespace||"",l.action].filter(function(e){return!!e}).join("/")),this.store[n](o,l)}}catch(e){c=!0,s=e}finally{try{!i&&a.return&&a.return()}finally{if(c)throw s}}}else this.store[n](o,t)}}}]),e}();t.default=s}])});