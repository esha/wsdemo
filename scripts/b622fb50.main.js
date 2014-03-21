!function(a,b,c){"use strict";var d=window.View={list:[],define:function(a,b){d.list.push({name:a,re:b instanceof RegExp?b:new RegExp(b||a)}),d.style.innerHTML+=d.rules(a)},rules:function(a){return".view-"+a+", ."+a+"-on .hide-"+a+" { display: none !important; }\n."+a+"-on .view-"+a+" { display: block !important; }\n."+a+"-on span.view-"+a+", ."+a+"-on a.view-"+a+", ."+a+"-on input.view-"+a+", ."+a+"-on button.view-"+a+", ."+a+"-on select.view-"+a+", ."+a+"-on label.view-"+a+", ."+a+"-on img.view-"+a+" { display: inline-block !important; }\n"},update:function(a){var b=a||c.pathname+c.search+c.hash,e=!0;d.list.forEach(function(a){var c=a.re.test(b);d.toggle(a.name,c),c&&(e=!1)}),d.toggle("start",e)},toggle:function(a,c){b.body.classList.toggle(a+"-on",c)}},e=b.querySelector("meta[name=view]");if(e){var f=d.style=b.createElement("style"),g=e.getAttribute("content")||"";g.split(" ").forEach(function(a){d.define.apply(d,a.split("="))}),d.define("start"),b.head.appendChild(f),a.on(d,"location",function(a,b){d.update(b)})}}(window.Eventi,document,window.location),function(a,b){"use strict";var c=b.createElement("style");c.innerHTML="[clone] { display: none }",b.head.appendChild(c),Object.defineProperty(HTMLElement.prototype,"clone",{value:function(a,b){return a&&"object"!=typeof a||(b=a,a=this.getAttribute("insert")||"last"),d.main(this,a,b)}}),b.addEventListener("DOMContentLoaded",function(){for(var a=b.querySelectorAll("[clone]"),e=0,f=a.length;f>e;e++)d.init(a[e]);b.head.removeChild(c)});var d=a.Clone={init:function(a){for(var c=b.createElement("div"),d=0,e=a.childNodes.length;e>d;d++)c.appendChild(a.childNodes[d].cloneNode(!0));a.innerHTML="",a.classList.add("noClones"),Object.defineProperty(a,"cloneSource",{value:c,writeable:!0})},main:function(a,c,e){var f=a.getAttribute("clone"),g=f&&b.querySelector(f)||a;if(c=d.insert[c]||c,g&&c.call){Array.isArray(e)||(e=[e]);for(var h=[],i=0,j=e.length;j>i;i++)h.push(d.clone(a,g,c,e[i]));return a.classList.toggle("noClones",!e.length),d.index(a),1===h.length?h[0]:h}},clone:function(b,c,e,f){var g=(c.cloneSource||c).cloneNode(!0);if(g.classList.add("cloned"),f&&d.values(g,f),e.call(b,g),a.CustomEvent){var h=new CustomEvent("cloned",{bubbles:!0});h.clone=g,h.source=c,h.insert=e,h.values=f,b.dispatchEvent(h)}return g},insert:{first:function(a){this.insertBefore(a,this.childNodes[0])},last:function(a){this.appendChild(a)}},values:function(a,b){"function"==typeof b?b.call(a,a):"function"==typeof a.values?a.values(b):a.setAttribute("data-values",JSON.stringify(b)),Object.defineProperty(a,"cloneValues",{value:b})},index:function(a){for(var b=a.querySelectorAll(".cloned"),c=0,d=b.length;d>c;c++)b[c].setAttribute("index",c)}}}(window,document),function(a){"use strict";Object.defineProperty(HTMLElement.prototype,"values",{value:function(a,c){switch(arguments.length){case 0:return this.querySelector(b.selector())?b.getAll(this):b.get(this);case 1:return b["object"==typeof a?"setAll":"getByName"](this,a);default:return b.setByName(this,a,c)}}});var b=a.Values={selector:function(a){return a&&'[name="'+a+'"],[index="'+a+'"]'||"[name],[index]"},attribute:function(a){return a.getAttribute("name")||a.getAttribute("index")},indexRE:/^[0-9]+$/,getAll:function(a,c){for(var d=0,e=a.children.length;e>d;d++){var f=a.children[d],g=b.attribute(f),h=!!f.querySelector(b.selector());g?(c||(c=b.indexRE.test(g)?[]:{}),c[g]=h?b.getAll(f):b.get(f,g)):h&&(c=b.getAll(f,c))}return c},getByName:function(a,c){c+="";for(var d=b.endpoints(a);d.length;){var e=d.shift();if(c===b.fullName(e,a)||c===b.attribute(e))return e.querySelector(b.selector())?b.getAll(e):b.get(e,c)}},get:function(a,c){var d=[a.getAttribute("read"),a.type,a.nodeName.toLowerCase()],e=b.conf.call(a,d,b.read),f=e.call(a,c);if("string"==typeof f){d=[a.getAttribute("parse"),c,a.type];var g=b.conf.call(a,d,b.parse);f=g.call(a,f,c)}return f},parse:{"default":function(a){try{return JSON.parse(a)}catch(b){return a}}},read:{checkbox:function(){for(var a=this.getAttribute("name"),c=this.parentNode.querySelectorAll(b.selector(a)),d=[],e=0,f=c.length;f>e;e++)c[e].checked&&d.push(c[e].value);return"radio"===this.type||1===c.length?d[0]:d},radio:"checkbox",input:function(){return this.value},textarea:"input",select:function(){for(var a=this.getAttribute("label"),b=this.querySelectorAll("option"),c=[],d=0,e=b.length;e>d;d++){var f=b[d];f.selected&&c.push(a&&"false"!==a?{value:f.value,label:f.label}:f.value)}return this.hasAttribute("multiple")?c:c[0]},"default":function(a){return a&&this.getAttribute("data-"+a)||this.getAttribute(a)||this.innerText}},endpoints:function(a){for(var c=a.querySelectorAll(b.selector()),d=[],e=0,f=c.length;f>e;e++)c[e].querySelector(b.selector())||d.push(c[e]);return!d.length&&b.attribute(a)&&d.push(a),d},fullName:function(a,c){for(var d=[b.attribute(a)];a.parentNode&&a.parentNode!==c&&a.parentNode.getAttribute;)d.unshift(b.attribute(a=a.parentNode));for(var e="",f=!1;d.length;){var g=d.pop();g&&(b.indexRE.test(g)?(e+="["+g+"]",f=!1):(f&&(e+="."),e+=g,f=!0))}return e},setAll:function(a,c){for(var d=b.endpoints(a),e=0;e<d.length;e++){var f=d[e],g=b.fullName(f,a),h=b.resolve(g,c);if(void 0!==h)b.set(f,h,g);else if(f===a)for(g in c)h=c[g],b.set(a,h,g);else d.splice(e--,1)}return d},setByName:function(a,c,d){for(var e=a.querySelectorAll(b.selector(c)),f="object"==typeof d?"setAll":"set",g=0,h=e.length;h>g;g++)b[f](e[g],d);return e},set:function(a,c,d){var e=[a.getAttribute("write"),a.type,a.nodeName.toLowerCase()],f=b.conf.call(a,e,b.write);if(c&&c.value&&(c=c.value),"string"!=typeof c){e=[a.getAttribute("stringify"),void 0!==c&&null!==c?c.constructor.name:"empty"];var g=b.conf.call(a,e,b.stringify);c=g.call(a,c,d)}f.call(a,c,d)},stringify:{Object:function(a){return JSON.stringify(a)},empty:function(){return""},Date:"Object",Array:"Object","default":function(a){return a+""}},write:{checkbox:function(a){var b=Array.isArray(a)?a:a.split(",");this.checked=b.indexOf(this.value)>=0},radio:"checkbox",input:function(a){this.value=a},textarea:"input",select:function(a){if(this.hasAttribute("multiple"))for(var b=Array.isArray(a)?a:a.split(","),c=this.querySelectorAll("option"),d=0,e=c.length;e>d;d++)b.indexOf(c[d].value)>=0&&(c[d].selected=!0);else this.value=a},"default":function(a,b){for(var c=b&&new RegExp("{{"+b+"}}","g"),d=!1,e=0,f=this.attributes.length;f>e;e++){var g=this.attributes[e];c&&c.test(g.value)?g.value=g.value.replace(c,a):(g.name===b||g.name==="data-"+b)&&(g.value=a,d=!0)}if(!d){var h=this.innerHTML;this.innerHTML=c&&c.test(h)?h.replace(c,a):a}}},conf:function(c,d){for(var e=[d,this,a],f=0,g=c.length;g>f;f++)for(var h=0,i=e.length;i>h;h++)if(c[f]){var j=b.resolve(c[f],e[h]);if("string"==typeof j&&(j=e[0][j]),"function"==typeof j)return j}return d["default"]},resolve:function(c,d){d=d||a,c+="";var e=d[c];if(void 0===e&&c)for(var f=0;;){var g,h,i=c.indexOf(".",f);if(i>0)g=c.substring(0,i),h=c.substring(i+1),f=i+1;else{var j=c.indexOf("[",f);if(!(j>=0))break;g=c.substring(0,j),h=c.substring(j),f=j+1}if(g in d){if("["===h.charAt(0)&&(h=h.substring(1,h.indexOf("]"))),e=b.resolve(h,d[g]),void 0!==e)return e;console.log(h,g,d,e)}}return e}}}(window),function(a,b,c,d){"use strict";var e=window.app={base:"/api",paths:{nutrients:"/nutrients",foodunits:"/food-units",analysis:"/analysis",search:"/foods"},path:function(a){return e.base+(e.paths[a]||a)},param:function(a,b,c){return c||0===c||c===!1?a+(a.indexOf("?")>0?"&":"?")+b+"="+c:a},search:function(c,d,f){var g=b.query("#options",1),h=g.classList.contains("hidden")?{}:g.values(),i=b.query("input[name=query]");f?(h.query=f,i.value=decodeURIComponent(f)):h.query=encodeURIComponent(i.value),h.query?(d="#query="+h.query,location.hash!==d&&a.fire.location(d),b.query("#results").values("query",h.query)):i.focus(),e.query("search",h)},query:function(b,c){a.on("^foodunits",function(a,d){e.ajax(b,c).then(function(a){e.results(a,d),e.controls(a)})})},controls:function(a){var c=Object.keys(a).filter(function(a){return a.indexOf("_page")>0});b.query("[click=page]").each(function(b){b.classList.toggle("hidden",!a.total||c.indexOf(b.id+"_page")<0)})},page:function(a){var b=d("json"),c=a.target.id+"_page",f=b&&b[c];f&&e.query(f)},options:function(){b.query("#options").classList.toggle("hidden")},results:function(a,c){var d=b.query("#results"),e=d.query("[clone]").only(0);e.innerHTML="",a.items.forEach(function(a){a.unit=c[a.unit]||a.unit}),e.clone(a.items);var f=d.query("#feedback"),g=b.values("url"),h=g&&g.match(/start=(\d+)/);a.start=h&&parseInt(h[1])||0,a.end=a.start+a.items.length-1,f.classList.toggle("hidden",!a.items.length),f.values(a);var i=b.query("input[name=query]").value;d.classList.toggle("misspelled",a.query!==i)},items:d("list")||[],list:function(){var a=b.query("#list"),c=a.query("[clone]").only(0);c.children.length!==e.items.length&&setTimeout(function(){c.innerHTML="",c.clone(e.items),d("list",e.items)},100),b.query("#api").values({url:"n/a",method:"n/a"}),d("json",e.analysisBody())},add:function(){var b=this.parentNode.cloneValues;e.items.push(b),a.fire.location("#list")},remove:function(){var a=this.parentNode.getAttribute("index");e.items.splice(a,1),e.list()},clear:function(){e.items=[],e.list(),d.remove("analysis")},analysisBody:function(){var a={items:[]};return e.items.forEach(function(b){a.items.push({id:b.id,quantity:b.quantity,unit:b.unit.id})}),a},analyze:function(){e.ajax("analysis",JSON.stringify(e.analysisBody()),{method:"POST",headers:{"Content-Type":"application/json"}}).done(function(b){d("json",b),a.on("^foodunits",function(c,e){b.items.forEach(function(a){a.unit=e[a.unit]||a.unit}),a.on("^nutrients",function(c,e){b.results.forEach(function(a){a.nutrient=e[a.nutrient]||a.nutrient}),d("analysis",b),a.fire.location("#analysis")})})})},analysis:function(){var c=d("analysis");return c?void setTimeout(function(){var a=b.query("#analysis"),d=a.query("[clone].values"),e=a.query("[clone].items");d.innerHTML="",e.innerHTML="",d.clone(c.results),e.clone(c.items)},100):a.fire.location("#list")},json:function(c){var e=d("json");b.query('pre[name="json"]').innerHTML=e?JSON.stringify(e,null,2):"","location"!==c.type&&a.fire.location("#json")},resource:function(a,b,c){e.ajax(c).then(function(a){e.resourceLoaded(b,a)})},resourceLoaded:function(a,c){var d=b.query(".view-"+a.substring(1)+" [clone]").only(0);d.innerHTML="",d.clone(c)},ajax:function(a,f,g){var h=e.path(a);if(f&&(!g||"POST"!==g.method)){for(var i in f)h=e.param(h,i,f[i]);f=null}return g||(g={method:"GET"}),g.url=h,g.data=f,b.query("#api").values({url:g.url.replace(e.base,""),method:g.method}),c(g).then(function(a){return d("json",a),a})},preprocess:function(b){c(e.path(b)).done(function(c){var d={};c.forEach(function(a){d[a.id]=a}),a.fire("^"+b,d)})}};a.types("search","clear","location"),a.on.location(/#(nutrients|foodunits)/,e.resource),a.on.location("#json",e.json),a.on.location("#query={query}",e.search),a.on.location("#list",e.list),a.on.location("#analysis",e.analysis),a.on.search(e.search),a.on("items:add",".food",e.add),a.on("items:remove",".food",e.remove),a.on("items:clear",e.clear),a.on("items:analysis",e.analyze),a.on("page",e.page),a.on("options",e.options),e.preprocess("nutrients"),e.preprocess("foodunits")}(window.Eventi,document.documentElement,jQuery.ajax,window.store);