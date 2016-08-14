!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.MiyanokoLib=e():t.MiyanokoLib=e()}(this,function(){return function(t){function e(a){if(r[a])return r[a].exports;var i=r[a]={exports:{},id:a,loaded:!1};return t[a].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var a;a=function(t){/*!
	     * MiyanokoLib
	     * v1.0.0 (c) 2016 miyanokomiya.tokyo
	     * license MIT
	     */
var e={canvasUtil:r(1),mathUtil:r(2),Sound:r(3),SvgUtil:r(4)};return e}.call(e,r,e,t),!(void 0!==a&&(t.exports=a))},function(t,e,r){var a;a=function(t){var e={getCursorPoint:function(t){var e=null,r=t.originalEvent||t;r.touches&&r.touches.length>0&&(r=r.touches[0]);var a=r.target.getBoundingClientRect(),i=a.left+window.pageXOffset,n=a.top+window.pageYOffset;return e={x:r.pageX-i,y:r.pageY-n}}};return e}.call(e,r,e,t),!(void 0!==a&&(t.exports=a))},function(t,e,r){var a;a=function(){var t={MINVALUE:1e-6,isSame2D:function(t,e){return Math.abs(t.x-e.x)<this.MINVALUE&&Math.abs(t.y-e.y)<this.MINVALUE},length2D:function(t,e){e=e||{x:0,y:0};var r=t.x-e.x,a=t.y-e.y;return Math.sqrt(r*r+a*a)},vecAdd2D:function(t,e){return{x:t.x+e.x,y:t.y+e.y}},vecSub2D:function(t,e){return{x:t.x-e.x,y:t.y-e.y}},vecMult2D:function(t,e){return{x:t.x*e,y:t.y*e}},vecUnit2D:function(t){var e=this.length2D(t);if(Math.abs(e)<this.MINVALUE)throw new Error("Unit vector cannot be calced from zero vector.");return this.vecMult2D(t,1/e)},cross2D:function(t,e){return t.x*e.y-t.y*e.x},inner2D:function(t,e){return t.x*e.x+t.y*e.y},pointCopy2D:function(t){return t?{x:t.x,y:t.y}:null},pointArrayCopy2D:function(t){for(var e=[],r=0;r<t.length;r++)e.push(this.pointCopy2D(t[r]));return e},centralPoint2D:function(t,e){var r=this.vecAdd2D(t,e);return this.vecMult2D(r,.5)},radian2D:function(t,e){var r=t.x-e.x,a=t.y-e.y;return(Math.atan2(a,r)+2*Math.PI)%(2*Math.PI)},symmetryPoint2D:function(t,e){var r=this.vecSub2D(e,t),a=this.pointCopy2D(t);return a.x+=r.x,a.y+=r.y,a},rotate2D:function(t,e,r){r=r||{x:0,y:0},t=this.vecSub2D(t,r);var a=(this.length2D(t),{});return a.x=Math.cos(e)*t.x-Math.sin(e)*t.y,a.y=Math.sin(e)*t.x+Math.cos(e)*t.y,a=this.vecAdd2D(a,r)},solveEquationOrder2:function(t,e,r){if(0===t)return 0===e?[]:[-r/e];var a=e*e-4*t*r;if(0>a)return[];var i=.5/t;if(0===a)return[-e*i];var n=Math.sqrt(a);return[(-e+n)*i,(-e-n)*i]},pedalPoint2D:function(t,e){var r=e[0],a=e[1],i=this.vecSub2D(a,r),n=this.vecSub2D(t,r),s=this.inner2D(i,n),o=s/this.inner2D(i,i);return this.vecAdd2D(r,this.vecMult2D(i,o))},_rayToBezier2:function(t,e,r,a,i){var n=i.x-a.x,s=i.y-a.y,o=t.x-2*e.x+r.x,l=2*(e.x-t.x),h=t.x,u=t.y-2*e.y+r.y,c=2*(e.y-t.y),y=t.y,x=this.solveEquationOrder2(o*s-n*u,l*s-n*c,s*h-s*a.x-n*y+n*a.y);return x},crossLineAndBezier:function(t,e,r,a,i){for(var n=this._rayToBezier2(t,e,r,a,i),s=(i.x-a.x,i.y-a.y,[]),o=0;o<n.length;o++)0<=n[o]&&n[o]<=1&&s.push({x:(r.x-2*e.x+t.x)*n[o]*n[o]+2*(e.x-t.x)*n[o]+t.x,y:(r.y-2*e.y+t.y)*n[o]*n[o]+2*(e.y-t.y)*n[o]+t.y});return s},aroundRectangle:function(t){var e=[],r=[];t.forEach(function(t){e.push(t.x),r.push(t.y)});var a={x:Math.min.apply(null,e),y:Math.min.apply(null,r)},i={x:Math.max.apply(null,e),y:Math.max.apply(null,r)};return{x:a.x,y:a.y,width:i.x-a.x,height:i.y-a.y}},centerOfAroundRectangle:function(t){var e=this.aroundRectangle(t);return{x:e.x+e.width/2,y:e.y+e.height/2}},isPointOnTriangle:function(t,e){var r=this.vecSub2D(t[1],t[0]),a=this.vecSub2D(t[2],t[1]),i=this.vecSub2D(t[0],t[2]),n=this.vecSub2D(e,t[0]),s=this.vecSub2D(e,t[1]),o=this.vecSub2D(e,t[2]),l=this.cross2D(r,s),h=this.cross2D(a,o),u=this.cross2D(i,n);return l>=0&&h>=0&&u>=0||0>=l&&0>=h&&0>=u?!0:!1},isPointOnArea:function(t,e){var r=0,a=[];for(r=0;r<t.length;r++){var i=t[r%t.length],n=t[(r+1)%t.length];(i.x>=e.x||n.x>=e.x)&&a.push([i,n])}var s=0;for(r=0;r<a.length;r++){var o=this.aroundRectangle(t),l=o.x+o.width;this.isCrossSegAndSeg([e,{x:l,y:e.y}],a[r])&&s++}return s%2===1},isPointOnBezierArea:function(t,e,r){var a=0,i=null,n=null,s=null,o=t.length,l=[],h=[];for(a=0;o>a;a++)n=t[a%o],s=t[(a+1)%o],e[(a+1)%o]?h.push([n,e[(a+1)%o],s]):l.push([n,s]);var u=0,c=this.aroundRectangle(t),y=10*(c.x+c.width),x={x:y,y:r.y};for(a=0;a<l.length;a++)this.isCrossSegAndSeg([r,x],l[a])&&u++;for(a=0;a<h.length;a++){i=h[a][0],n=h[a][1],s=h[a][2];for(var p=this.crossLineAndBezier(i,n,s,r,x),f=0;f<p.length;f++)p[f].x>=r.x&&u++}return u%2===1},isCrossSegAndSeg:function(t,e){return this._isCrossSegAndSeg(t[0].x,t[0].y,t[1].x,t[1].y,e[0].x,e[0].y,e[1].x,e[1].y)},_isCrossSegAndSeg:function(t,e,r,a,i,n,s,o){var l=(i-s)*(e-n)+(n-o)*(i-t),h=(i-s)*(a-n)+(n-o)*(i-r),u=(t-r)*(n-e)+(e-a)*(t-i),c=(t-r)*(o-e)+(e-a)*(t-s);return 0>u*c&&0>l*h},isCrossLineAndSeg:function(t,e){var r=this.cross2D(t[0],this.vecSub2D(e[0],t[1])),a=this.cross2D(t[0],this.vecSub2D(e[1],t[1]));return 0>r*a?!0:!1},isParallel:function(t,e){t=Array.isArray(t)?this.vecSub2D(t[1],t[0]):t,e=Array.isArray(e)?this.vecSub2D(e[1],e[0]):e;var r=this.cross2D(t,e);return Math.abs(r)<this.MINVALUE?!0:!1},crossPolygonAndLine:function(t,e){for(var r=[],a=t.length,i=0;a>i;i++){var n=[t[i],t[(i+1)%a]],s=this.crossSegAndLine(n,e);null!==s&&r.push(s)}return r},isOnLine:function(t,e){var r=this.pedalPoint2D(t,e);return this.isSame2D(t,r)},crossSegAndLine:function(t,e){if(this.isParallel(t,e))return null;if(this.isOnLine(t[0],e))return this.pointCopy2D(t[0]);if(this.isOnLine(t[1],e))return this.pointCopy2D(t[1]);var r=((e[1].x-e[0].x)*(t[0].y-e[0].y)-(e[1].y-e[0].y)*(t[0].x-e[0].x))/2,a=((e[1].x-e[0].x)*(e[0].y-t[1].y)-(e[1].y-e[0].y)*(e[0].x-t[1].x))/2,i=r/(r+a);if(i>0&&1>i){var n={x:t[0].x+(t[1].x-t[0].x)*i,y:t[0].y+(t[1].y-t[0].y)*i};return n}return null},splitPolyByLine:function(t,e){var r=this,a=[],i=[],n=[],s=0,o=t.length;for(s=0;o>s;s++){var l=[t[s%o],t[(s+1)%o]],h=this.crossSegAndLine(l,e);a.push(t[s%o]),null!==h&&(a.push(h),i.push(s+1+i.length),n.push(h))}if(n.length%2!==0)return[];var u=this.radian2D(e[0],e[1]);n.sort(function(t,e){return t=r.rotate2D(t,-u),e=r.rotate2D(e,-u),t.x-e.x});for(var c=[],y=0;y<n.length-1;){for(var x=[n[y],n[y+1]],p=!1,f=0;f<t.length;f++)if(this.isSameSeg2D(x,[t[f],t[(f+1)%t.length]])){p=!0;break}if(!p){c=x;break}y+=2}if(2!==c.length)return[];var v=n.concat(),g=v.indexOf(c[0]);-1!==g&&v.splice(g,1),g=v.indexOf(c[1]),-1!==g&&v.splice(g,1);var d=a.concat();v.forEach(function(t){var e=d.indexOf(t);d.splice(e,1)}),a=d,n=c;var m=a.indexOf(n[0]),D=a.indexOf(n[1]);if(-1===m||-1===D)return[];i=[],i[0]=Math.min(m,D),i[1]=Math.max(m,D);var S=[];if(2==i.length){var b=[];for(s=0;s<=i[0];s++)b.push({x:a[s].x,y:a[s].y});for(s=i[1];s<a.length;s++)b.push({x:a[s].x,y:a[s].y});for(S.push(b),b=[],s=i[0];s<=i[1];s++)b.push({x:a[s].x,y:a[s].y});S.push(b),b=[]}return S},omitSamePoint:function(t){for(var e=t.concat(),r=t.length,a=0;r>a;a++){var i=e[a],n=e[(a+1)%r];if(this.isSame2D(i,n)){e.splice(a,1),e=this.omitSamePoint(e);break}}return e},triangleSplit:function(t){var e=this;t=this.convertLoopwise(t);for(var r=t.concat(),a=0,i=0,n=[];r.length>=3;){var s=r.concat();s.sort(function(t,r){return e.length2D(r)-e.length2D(t)}),a=r.indexOf(s[0]);var o=this._getTriangle(r,a);if(o)r.splice(a,1);else{var l=r.length,h=this.vecSub2D(r[(a+1)%l],r[a]),u=this.vecSub2D(r[0>a-1?l-1:a-1],r[a]);i=this.cross2D(h,u);for(var c=a;!o;){c=(c+1)%l;var y=this.vecSub2D(r[(c+1)%l],r[c]),x=this.vecSub2D(r[0>c-1?l-1:c-1],r[c]),p=this.cross2D(y,x);p*i>0&&(o=this._getTriangle(r,c))}r.splice(c,1)}n.push(o)}return n},_getTriangle:function(t,e){var r=t.length,a=t[e],i=t[(e+1)%r],n=t[0>e-1?r-1:e-1],s=[a,i,n];return t.some(function(t){return t!==a&&t!==i&&t!==n&&this.isPointOnTriangle(s,t)?(s=null,!0):void 0},this),s},area:function(t,e){var r=0;if(t.length>2){for(var a=t.length,i=0;a-1>i;i++)r+=(t[i].x-t[i+1].x)*(t[i].y+t[i+1].y);r+=(t[a-1].x-t[0].x)*(t[a-1].y+t[0].y),r/=2,e||(r=Math.abs(r))}return r},loopwise:function(t){var e=this.area(t,!0);return e>0?1:0>e?-1:0},convertLoopwise:function(t){var e=t.concat();return-1===this.loopwise(t)&&e.reverse(),e},gravity2D:function(t){var e={x:0,y:0};return t.forEach(function(t){e.x+=t.x,e.y+=t.y}),e.x/=t.length,e.y/=t.length,e},isSameSeg2D:function(t,e){return this.isSame2D(t[0],e[0])&&this.isSame2D(t[1],e[1])||this.isSame2D(t[1],e[0])&&this.isSame2D(t[0],e[1])?!0:!1},approximateBezier:function(t,e){var r,a,i,n,s,o,l,h,u=[];if(3===t.length)for(i=1/e,r=0;e>=r;r++)n=i*r,s=this.vecMult2D(t[0],(1-n)*(1-n)),o=this.vecMult2D(t[1],2*n*(1-n)),l=this.vecMult2D(t[2],2*n*n),a={x:s.x+o.x+l.x,y:s.y+o.y+l.y},u.push(a);else if(4===t.length)for(i=1/e,r=0;e>=r;r++)n=i*r,s=this.vecMult2D(t[0],(1-n)*(1-n)*(1-n)),o=this.vecMult2D(t[1],3*n*(1-n)*(1-n)),l=this.vecMult2D(t[2],3*n*n*(1-n)),h=this.vecMult2D(t[3],n*n*n),a={x:s.x+o.x+l.x+h.x,y:s.y+o.y+l.y+h.y},u.push(a);return u},approximateArc:function(t,e,r,a,i,n,s){var o=[],l=0,h=null,u=0,c=a-r,y=c/s;for(l=0;s>l;l++)u=y*l+r-n,h={x:t*Math.cos(u),y:e*Math.sin(u)},o.push(h);return o.forEach(function(t){var e=this.rotate2D(t,n);t.x=e.x,t.y=e.y},this),o.forEach(function(t){t.x+=i.x,t.y+=i.y},this),o},approximateArcWithPoint:function(e,r,a,i,n,s,o,l){var h=t.getEllipseCenter(a,i,e,r,o),u=null;u=n&&s||!n&&!s?this.loopwise([a,i,h[0]])<0?h[0]:h[1]:this.loopwise([a,i,h[0]])>0?h[0]:h[1];var c=0,y=0,x=t.getRadianOnArc(a,e,r,u,o),p=t.getRadianOnArc(i,e,r,u,o);return s?x>p?(c=x-2*Math.PI,y=p):(c=x,y=p):x>p?(c=x,y=p):(c=x,y=p-2*Math.PI),pList=t.approximateArc(e,r,c,y,h[0],o,l),pList},getRadianOnArc:function(t,e,r,a,i){t=this.rotate2D(t,-i,a);var n=Math.acos((t.x-a.x)/e);return t.y-a.y<0&&(n=-n+2*Math.PI),n+=i,n%=2*Math.PI},getEllipseCenter:function(t,e,r,a,i){t=this.rotate2D(t,-i),e=this.rotate2D(e,-i);var n={x:t.x/r,y:t.y/a},s={x:e.x/r,y:e.y/a},o=this.getCircleCenter(n,s,1),l={x:o[0].x*r,y:o[0].y*a},h={x:o[1].x*r,y:o[1].y*a};return l=this.rotate2D(l,i),h=this.rotate2D(h,i),[l,h]},getCircleCenter:function(t,e,r){var a=(t.x+e.x)/2,i=(t.x-e.x)/2,n=(t.y+e.y)/2,s=(t.y-e.y)/2,o=Math.sqrt(i*i+s*s),l=Math.sqrt(Math.pow(r/o,2)-1),h={x:a+s*l,y:n-i*l},u={x:a-s*l,y:n+i*l};return[h,u]},transform2D:function(t,e){var r=[],a=e[0],i=e[1],n=e[2],s=e[3],o=e[4],l=e[5];return t.forEach(function(t){var e={x:a*t.x+n*t.y+o,y:i*t.x+s*t.y+l};r.push(e)},this),r}};return t}.call(e,r,e,t),!(void 0!==a&&(t.exports=a))},function(t,e,r){var a;a=function(t){var e=function(t){this.src=t,this.audio=new Audio,this.audio.src=t,this.audio.load(),this.audio.volume=.3};return e.prototype.play=function(){var t=this.audio;"undefined"!=typeof t.currentTime&&(t.currentTime=0),t.play()},e}.call(e,r,e,t),!(void 0!==a&&(t.exports=a))},function(t,e,r){var a;a=function(t){var e=r(2),a={BEZIER_SPLIT_COUNT:10,ELLIPSE_SPLIT_COUNT:20,loadSvgGraphicsPath:function(t){var e=new DOMParser,r=null;try{r=e.parseFromString(t,"image/svg+xml")}catch(a){throw console.log("This svg resouce is invalid to parse."),a}var i=this.parseSvgGraphics(r);return i},parseSvgGraphics:function(t){var e=[],r=0,a=t.getElementsByTagName("path");for(r=0;r<a.length;r++)e.push({tag:"path",pointList:this.parsePath(a[r]),style:this.parseTagStyle(a[r])});var i=t.getElementsByTagName("rect");for(r=0;r<i.length;r++)e.push({tag:"rect",pointList:this.parseRect(i[r]),style:this.parseTagStyle(i[r])});var n=t.getElementsByTagName("ellipse");for(r=0;r<n.length;r++)e.push({tag:"ellipse",pointList:this.parseEllipse(n[r]),style:this.parseTagStyle(n[r])});var s=t.getElementsByTagName("circle");for(r=0;r<s.length;r++)e.push({tag:"circle",pointList:this.parseCircle(s[r]),style:this.parseTagStyle(s[r])});return e},adoptTransform:function(t,r){var a=[];if(r.forEach(function(t){a.push(e.pointCopy2D(t))},this),!t.attributes.transform)return a;var i=t.attributes.transform.value.split(/\)/);return i.forEach(function(t){var r=t.split(/\(/);if(2===r.length){var i=r[0],n=[];switch(r[1].split(/,/).forEach(function(t){n.push(parseFloat(t,10))}),i.trim().toLowerCase()){case"matrix":a=e.transform2D(a,n);break;case"translate":a.forEach(function(t){t.x+=n[0],t.y+=n[1]},this);break;case"scale":var s=n[0],o=n[0];n.length>1&&(o=n[1]),a.forEach(function(t){t.x*=s,t.y*=o},this);break;case"rotate":var l=null;n.length>2&&(l={x:n[1],y:n[2]}),a.forEach(function(t){var r=e.rotate2D(t,n[0]*Math.PI/180,l);t.x=r.x,t.y=r.y},this);break;case"skewx":a.forEach(function(t){t.x+=Math.tan(n[0])*t.y},this);break;case"skewy":a.forEach(function(t){t.y+=Math.tan(n[0])*t.x},this)}}},this),a},parseCircle:function(t){var r=[],a=parseFloat(t.attributes.cx.value,10),i=parseFloat(t.attributes.cy.value,10),n=parseFloat(t.attributes.r.value,10);return r=e.approximateArc(n,n,0,2*Math.PI,{x:a,y:i},0,this.ELLIPSE_SPLIT_COUNT),r=this.adoptTransform(t,r)},parseEllipse:function(t){var r=[],a=parseFloat(t.attributes.cx.value,10),i=parseFloat(t.attributes.cy.value,10),n=parseFloat(t.attributes.rx.value,10),s=parseFloat(t.attributes.ry.value,10);return r=e.approximateArc(n,s,0,2*Math.PI,{x:a,y:i},0,this.ELLIPSE_SPLIT_COUNT),r=this.adoptTransform(t,r)},parseRect:function(t){var e=[],r=parseFloat(t.attributes.x.value,10),a=parseFloat(t.attributes.y.value,10),i=parseFloat(t.attributes.width.value,10),n=parseFloat(t.attributes.height.value,10);return e.push({x:r,y:a}),e.push({x:r+i,y:a}),e.push({x:r+i,y:a+n}),e.push({x:r,y:a+n}),e=this.adoptTransform(t,e)},parsePath:function(t){for(var r=[],a=this.splitD(t.attributes.d.value),i={x:0,y:0},n={x:0,y:0},s=0;s<a.length;s++){var o=a[s],l=[],h=null,u=null,c=null,y=null;switch(o.command){case"M":l.push({x:o.x,y:o.y});break;case"m":l.push({x:i.x+o.x,y:i.y+o.y});break;case"L":case"H":case"V":l.push({x:o.x,y:o.y});break;case"l":case"h":case"v":l.push({x:i.x+o.x,y:i.y+o.y});break;case"Q":h=i,u={x:o.x,y:o.y},c={x:o.x2,y:o.y2},l=e.approximateBezier([h,u,c],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=c;break;case"q":h=i,u={x:h.x+o.x,y:h.y+o.y},c={x:h.x+o.x2,y:h.y+o.y2},l=e.approximateBezier([h,u,c],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=c;break;case"T":h=i,u=e.symmetryPoint2D(h,n),c={x:o.x,y:o.y},l=e.approximateBezier([h,u,c],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=c;break;case"t":h=i,u=e.symmetryPoint2D(h,n),c={x:h.x+o.x,y:h.y+o.y},l=e.approximateBezier([h,u,c],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=c;break;case"C":h=i,u={x:o.x,y:o.y},c={x:o.x2,y:o.y2},y={x:o.x3,y:o.y3},l=e.approximateBezier([h,u,c,y],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=y;break;case"c":h=i,u={x:h.x+o.x,y:h.y+o.y},c={x:h.x+o.x2,y:h.y+o.y2},y={x:h.x+o.x3,y:h.y+o.y3},l=e.approximateBezier([h,u,c,y],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=y;break;case"S":h=i,u=e.symmetryPoint2D(h,n),c={x:o.x,y:o.y},y={x:o.x2,y:o.y2},l=e.approximateBezier([h,u,c,y],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=y;break;case"s":h=i,u=e.symmetryPoint2D(h,n),c={x:h.x+o.x,y:h.y+o.y},y={x:h.x+o.x2,y:h.y+o.y2},l=e.approximateBezier([h,u,c,y],this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=y;break;case"A":h=i,u={x:o.x,y:o.y},l=e.approximateArcWithPoint(o.rx,o.ry,h,u,o.largeArcFlag,o.sweepFlag,o.xAxisRotation/180*Math.PI,this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=u;break;case"a":h=i,u={x:h.x+o.x,y:h.y+o.y},l=e.approximateArcWithPoint(o.rx,o.ry,h,u,o.largeArcFlag,o.sweepFlag,o.xAxisRotation/180*Math.PI,this.BEZIER_SPLIT_COUNT),l.shift(),l[l.length-1]=u;break;default:continue}l.length>0&&(i=l[l.length-1],r=r.concat(l),l.length>1&&(n=l[l.length-2]))}return r=this.adoptTransform(t,r)},splitD:function(t){for(var e=[],r=/M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z|B|b|R|r/,a=/H|h/,i=/V|v/,n=/M|m|L|l|T|t|Q|q|C|c/,s=/Q|q|C|c|S|s/,o=/C|c/,l=/A|a/,h=t;h.length>0;){var u={};u.command=h[0],h=h.slice(1);var c=null,y=h.search(r);-1===y?(c=h.slice(0),h=""):(c=h.slice(0,y),h=h.slice(y));var x=c.trim().split(/,| /);-1!==u.command.search(a)?(u.x=parseFloat(x[0],10),u.y=0):-1!==u.command.search(i)?(u.x=0,u.y=parseFloat(x[0],10)):-1!==u.command.search(l)?(u.rx=parseFloat(x[0],10),u.ry=parseFloat(x[1],10),u.xAxisRotation=parseFloat(x[2],10),u.largeArcFlag=parseInt(x[3],10),u.sweepFlag=parseInt(x[4],10),u.x=parseFloat(x[5],10),u.y=parseFloat(x[6],10)):-1!==u.command.search(n)&&(u.x=parseFloat(x[0],10),u.y=parseFloat(x[1],10),-1!==u.command.search(s)&&(u.x2=parseFloat(x[2],10),u.y2=parseFloat(x[3],10),-1!==u.command.search(o)&&(u.x3=parseFloat(x[4],10),u.y3=parseFloat(x[5],10)))),e.push(u)}return e},parseTagStyle:function(t){var e={},r=[];if(t.attributes.style){var a=t.attributes.style.value;a.split(";").forEach(function(t){var e=t.split(":"),a=e[0],i=e[1];r[a]=i},this)}else for(var i=0;i<t.attributes.length;i++)r[t.attributes[i].name]=t.attributes[i].value;for(var n in r){var s=r[n];if("fill"===n.toLowerCase())"none"===s.toLowerCase()?(e.fillStyle=0,e.fill=!1):(e.fillStyle=s,e.fill=!0);else if("stroke"===n.toLowerCase())"none"===s.toLowerCase()?(e.strokeStyle=0,e.stroke=!1):(e.strokeStyle=s,e.stroke=!0);else if("stroke-width"===n.toLowerCase())e.lineWidth=parseFloat(s,10);else if("stroke-opacity"===n.toLowerCase())e.strokeGlobalAlpha=parseFloat(s,10);else if("fill-opacity"===n.toLowerCase())e.fillGlobalAlpha=parseFloat(s,10);else if("stroke-linecap"===n.toLowerCase())e.lineCap=s;else if("stroke-linejoin"===n.toLowerCase())e.lineJoin=s;else if("stroke-dasharray"===n.toLowerCase())if("none"===s.toLowerCase())e.lineDash=[];else{var o=s.split(",");e.lineDash=[],o.forEach(function(t){e.lineDash.push(parseFloat(t,10))})}}return e},serializeSvgString:function(t){var e=this.serializeSvg(t),r=new XMLSerializer,a=r.serializeToString(e);return a},serializeSvg:function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=100,a=100;return t.forEach(function(t){var i=this.serializePath(t.pointList,t.style);e.appendChild(i),t.pointList.forEach(function(t){r=Math.max(r,t.x),a=Math.max(a,t.y)},this)},this),r*=1.1,a*=1.1,e.setAttribute("width",r),e.setAttribute("height",a),e},serializePath:function(t,e){var r=document.createElementNS("http://www.w3.org/2000/svg","path"),a=this.serializePointList(t);r.setAttribute("d",a);var e=this.serializeStyle(e);return r.setAttribute("style",e),r},serializePointList:function(t){var e="";return t.forEach(function(r,a){0===a?e+="M "+r.x+","+r.y:(e+=" L "+r.x+","+r.y,a===t.length-1&&(e+=" Z"))},this),e},serializeStyle:function(t){var e="";return e+=t.fill?"fill:"+t.fillStyle+";":"fill:none;",t.fillGlobalAlpha&&(e+="fill-opacity:"+t.fillGlobalAlpha+";"),e+=t.stroke?"stroke:"+t.strokeStyle+";":"stroke:none;",t.lineWidth&&(e+="stroke-width:"+t.lineWidth+";"),t.strokeGlobalAlpha&&(e+="stroke-opacity:"+t.strokeGlobalAlpha+";"),t.lineCap&&(e+="stroke-linecap:"+t.lineCap+";"),t.lineJoin&&(e+="stroke-linejoin:"+t.lineJoin+";"),t.lineDash&&(e+=t.lineDash.length>0?"stroke-dasharray:"+t.lineDash.join(",")+";":"stroke-dasharray:none;"),e}};return a}.call(e,r,e,t),!(void 0!==a&&(t.exports=a))}])});