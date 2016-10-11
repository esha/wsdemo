!function(a,b){"use strict";var c=b.createElement("style");c.innerHTML="[clone] { display: none }",b.head.appendChild(c),Object.defineProperty(HTMLElement.prototype,"clone",{value:function(a,b){return a&&"object"!=typeof a||(b=a,a=this.getAttribute("insert")||"last"),d.main(this,a,b)}}),b.addEventListener("DOMContentLoaded",function(){for(var a=b.querySelectorAll("[clone]"),e=0,f=a.length;f>e;e++)d.init(a[e]);b.head.removeChild(c)});var d=a.Clone={init:function(a){for(var c=a.children.length>1,d=c?b.createElement("div"):b.createDocumentFragment(),e=0,f=a.childNodes.length;f>e;e++)d.appendChild(a.childNodes[e].cloneNode(!0));a.innerHTML="",a.classList.add("noClones"),Object.defineProperty(a,"cloneSource",{value:d,writeable:!0})},main:function(a,c,e){var f=a.getAttribute("clone"),g=f&&b.querySelector(f)||a;if(c=d.insert[c]||c,g&&c.call){Array.isArray(e)||(e=[e]);for(var h=[],i=0,j=e.length;j>i;i++)h.push(d.clone(a,g,c,e[i]));return a.classList.toggle("noClones",!e.length),d.index(a),1===h.length?h[0]:h}},clone:function(b,c,e,f){var g=(c.cloneSource||c).cloneNode(!0),h=g.classList?g:(g.children||g.childNodes)[0];if(h&&h.classList.add("cloned"),f&&d.values(h,f),e.call(b,g),a.CustomEvent){var i=new CustomEvent("cloned",{bubbles:!0});i.clone=g,i.source=c,i.insert=e,i.values=f,b.dispatchEvent(i)}return g},insert:{first:function(a){this.insertBefore(a,this.childNodes[0])},last:function(a){this.appendChild(a)}},values:function(a,b,c){if("function"==typeof b)b.call(a,a);else if("function"==typeof a.values)a.values(b);else if(a.children.length)for(var e=0,f=a.children.length;f>e;e++)d.values(a.children[e],b,!0);c||Object.defineProperty(a,"cloneValues",{value:b})},index:function(a){for(var b=a.querySelectorAll(".cloned"),c=0,d=b.length;d>c;c++)b[c].setAttribute("index",c)}}}(window,document),function(a){"use strict";Object.defineProperty(HTMLElement.prototype,"values",{value:function(a,c){switch(arguments.length){case 0:return this.querySelector(b.selector())?b.getAll(this):b.get(this);case 1:return b["object"==typeof a?"setAll":"getByName"](this,a);default:return b.setByName(this,a,c)}}});var b=a.Values={selector:function(a){return a&&'[name="'+a+'"],[index="'+a+'"]'||"[name],[index]"},attribute:function(a){return a.getAttribute("name")||a.getAttribute("index")},indexRE:/^[0-9]+$/,getAll:function(a,c){for(var d=0,e=a.children.length;e>d;d++){var f=a.children[d],g=b.attribute(f),h=!!f.querySelector(b.selector());g?(c||(c=b.indexRE.test(g)?[]:{}),c[g]=h?b.getAll(f):b.get(f,g)):h&&(c=b.getAll(f,c))}return c},getByName:function(a,c){c+="";for(var d=b.endpoints(a);d.length;){var e=d.shift();if(c===b.fullName(e,a)||c===b.attribute(e))return e.querySelector(b.selector())?b.getAll(e):b.get(e,c)}},get:function(a,c){var d=[a.getAttribute("read"),a.type,a.nodeName.toLowerCase()],e=b.conf.call(a,d,b.read),f=e.call(a,c);if("string"==typeof f){d=[a.getAttribute("parse"),c,a.type];var g=b.conf.call(a,d,b.parse);f=g.call(a,f,c)}return f},parse:{"default":function(a){try{return JSON.parse(a)}catch(b){return a}}},read:{checkbox:function(){for(var a=this.getAttribute("name"),c=this.parentNode.querySelectorAll(b.selector(a)),d=[],e=0,f=c.length;f>e;e++)c[e].checked&&d.push(c[e].value);return"radio"===this.type||1===c.length?d[0]:d},radio:"checkbox",input:function(){return this.value},textarea:"input",select:function(){for(var a=this.getAttribute("label"),b=this.querySelectorAll("option"),c=[],d=0,e=b.length;e>d;d++){var f=b[d];f.selected&&c.push(a&&"false"!==a?{value:f.value,label:f.label}:f.value)}return this.hasAttribute("multiple")?c:c[0]},"default":function(a){return a&&this.getAttribute("data-"+a)||this.getAttribute(a)||this.innerText}},endpoints:function(a){for(var c=a.querySelectorAll(b.selector()),d=[],e=0,f=c.length;f>e;e++)c[e].querySelector(b.selector())||d.push(c[e]);return!d.length&&b.attribute(a)&&d.push(a),d},fullName:function(a,c){for(var d=[b.attribute(a)];a.parentNode&&a.parentNode!==c&&a.parentNode.getAttribute;)d.unshift(b.attribute(a=a.parentNode));for(var e="",f=!1;d.length;){var g=d.pop();g&&(b.indexRE.test(g)?(e+="["+g+"]",f=!1):(f&&(e+="."),e+=g,f=!0))}return e},setAll:function(a,c){var d=b.endpoints(a).map(function(d){var e=b.fullName(d,a);return[d,b.resolve(e,c),e]}).filter(function(a){return void 0!==a[1]});if(!d.length)for(var e,f=a.outerHTML,g=/{{(\w+(\.\w+|\[\d+])*)}}/g;e=g.exec(f);){var h=e[1],i=b.resolve(h,c);void 0!==i&&d.push([a,i,h])}return d.forEach(function(a){b.set.apply(b,a)}),a},setByName:function(a,c,d){for(var e=a.querySelectorAll(b.selector(c)),f="object"==typeof d?"setAll":"set",g=0,h=e.length;h>g;g++)b[f](e[g],d);return e},set:function(a,c,d){var e=[a.getAttribute("write"),a.type,a.nodeName.toLowerCase()],f=b.conf.call(a,e,b.write);if(c&&c.value&&(c=c.value),"string"!=typeof c){e=[a.getAttribute("stringify"),void 0!==c&&null!==c?c.constructor.name:"empty"];var g=b.conf.call(a,e,b.stringify);c=g.call(a,c,d)}f.call(a,c,d)},stringify:{Object:function(a){return JSON.stringify(a)},empty:function(){return""},Date:"Object",Array:"Object","default":function(a){return a+""}},write:{checkbox:function(a){var b=Array.isArray(a)?a:a.split(",");this.checked=b.indexOf(this.value)>=0},radio:"checkbox",input:function(a){this.value=a},textarea:"input",select:function(a){if(this.hasAttribute("multiple"))for(var b=Array.isArray(a)?a:a.split(","),c=this.querySelectorAll("option"),d=0,e=c.length;e>d;d++)b.indexOf(c[d].value)>=0&&(c[d].selected=!0);else this.value=a},"default":function(a,b){var c=new RegExp("{{"+b+"}}","g");if(c.test(this.innerHTML))this.innerHTML=this.innerHTML.replace(c,a);else{for(var d=!1,e=0,f=this.attributes.length;f>e;e++){var g=this.attributes[e];c.test(g.value)&&(g.value=g.value.replace(c,a),d=!0)}d||(this.innerHTML=a)}}},conf:function(c,d){for(var e=[d,this,a],f=0,g=c.length;g>f;f++)for(var h=0,i=e.length;i>h;h++)if(c[f]){var j=b.resolve(c[f],e[h]);if("string"==typeof j&&(j=e[0][j]),"function"==typeof j)return j}return d["default"]},resolve:function(c,d){d=d||a,c+="";var e=d[c];if(void 0===e&&c)for(var f=0;;){var g,h,i=c.indexOf(".",f);if(i>0)g=c.substring(0,i),h=c.substring(i+1),f=i+1;else{var j=c.indexOf("[",f);if(!(j>=0))break;g=c.substring(0,j),h=c.substring(j),f=j+1}if(g in d&&("["===h.charAt(0)&&(h=h.substring(1,h.indexOf("]"))),e=b.resolve(h,d[g]),void 0!==e))return e}return e}}}(window),function(a,b,c,d,e,f){"use strict";var g=function(){var a=location.search.match(/apikey=(\w+)/);return a?a[1]:c("apikey")}(),h=function(a){return console.log(g?a+"?apikey="+g:a),g?a+"?apikey="+g:a},i=window.app={api:new e({url:"/api"+(location.toString().indexOf("staging")>0?"-staging":""),debug:!0,throttle:{key:"staging",ms:510},requestData:function(a){i.loading(!0),i.saveCommunications("request",a,this)},load:function(){i.saveCommunications("response",this.response,this.cfg),i.loading(!1)},failure:function(a){i.error(a)},"@service":{url:"/",auto:!0,then:function(a){return b.query("[name=implementation_version]").innerHTML=a.implementation_version,a}},"@foodunits":{url:"/food-units",saveResult:!0,responseData:function(a){return i.buildResource(a,"foodunits")}},"@units":{url:"/units",saveResult:!0,responseData:function(a){return i.buildResource(a,"units")}},"@nutrients":{url:"/nutrients",saveResult:!0,responseData:function(a){return i.buildResource(a,"nutrients")}},"@search":{requires:["app.api.units"],url:"/foods?query={query}&count={count}&start={start}&spell={spell}"},"@view":{requires:["app.api.units","app.api.nutrients"],url:h("/food/{0}"),then:function(a){a.nutrient_data=a.nutrient_data.filter(function(a){return"urn:uuid:a4d01e46-5df2-4cb3-ad2c-6b438e79e5b9"===a.nutrient});var b=c("response");return b.data=a,c("response",b),a}},"@analyze":{requires:["app.api.nutrients","app.api.units"],method:"POST",headers:{"Content-Type":"application/vnd.com.esha.data.Foods+json"},url:h("/analysis")},"@recommend":{requires:["app.api.nutrients","app.api.units"],method:"POST",headers:{"Content-Type":"application/vnd.com.esha.data.PersonalProfile+json"},url:h("/recommendations")}}),saveCommunications:function(a,b,d){var f={direction:a,body:b,method:d.method||"GET",url:e.api.resolve(d.url,d.data,null,!1).replace(i.base,"")};if("response"===a){var g=d.xhr;f.headers=g.responseHeaders,f.status=g.status}else f.headers=d.headers;c(a,f),i.updateAPI()},_loading:0,loading:function(a){i._loading+=a?1:-1,f.toggle("loading",i._loading>0)},buildResource:function(a,b){var d={};return a.forEach(function(a){d[a.id]=a}),i[b]=d,c(b+".response",c("response")),c(b+".request",c("request")),d.__list__=a,d},service:function(){i.api.service().then(function(){a.fire.location("#response")})},search:function(c,d,e){var f=b.query("#options",1),g=f.classList.contains("hidden")?{}:f.values(),h=b.query("input[name=query]");e?(g.query=e,h.value=decodeURIComponent(e)):g.query=encodeURIComponent(h.value),g.query?(d="#query="+g.query,location.hash!==d&&a.fire.location(d),b.query("#results").values("query",g.query)):h.focus(),i.query("search",g)},query:function(a,b){i.api.search(b).then(function(a){i.results(a),i.controls(a)})},controls:function(a){var c=Object.keys(a).filter(function(a){return a.indexOf("_page")>0});b.query("[click=page]").each(function(b){b.classList.toggle("hidden",!a.total||c.indexOf(b.id+"_page")<0)})},page:function(a){var b=c("response"),d=b.body,e=a.target.id+"_page",f=d&&d[e];f&&i.query(f)},options:function(){b.query("#options").classList.toggle("hidden")},results:function(a){var c=b.query("#results"),d=c.query("[clone]");d.innerHTML="",a.items.forEach(i.processUnits),d.clone(a.items);var e=c.query("#feedback"),f=b.values("url"),g=f&&f.match(/start=(\d+)/);a.start=g&&parseInt(g[1])||0,a.end=a.start+a.items.length-1,e.classList.toggle("hidden",!a.items.length),e.values(a);var h=b.query("input[name=query]").value;c.classList.toggle("misspelled",a.query!==h)},items:c("list")||[],list:function(){var a=b.query("#list"),e=a.query("[clone]");e.children.length!==i.items.length&&setTimeout(function(){e.innerHTML="",e.clone(i.items),e.queryAll(".food").each(function(a,b){var c=i.items[b],e=a.query("[name=unit]");d.init(e),e.clone(c.units),e.value=c.unit.id}),c("list",i.items)},100)},add:function(){i.items.push(this.cloneValues),a.fire.location("#list")},prepExternal:function(a){var c=b.query("#external"),d=c.query("select[name=unit]");a&&a.quantity||(a={quantity:1,calories:"",input:"",unit:"urn:uuid:85562e85-ba37-4e4a-8400-da43170204a7"}),i.api.units().then(function(){d.clone(i.units.__list__),c.values(a),d.value=a.unit})},externalBaseUri:"external_",external:function(){var c=b.query("#external"),d=i.units[c.query("[name=unit]").value],e={id:c.values("id"),description:c.values("description"),quantity:c.values("quantity"),unit:d,nutrient_data:[{nutrient:c.values("nutrient"),value:c.values("value")}],product:"-not in ESHA db-",units:[d]};i.items.push(e),a.fire.location("#list")},view:function(c,d,e){e?i.api.view(e).then(function(a){var c=b.query("#view"),d=c.query("[clone].values");i.processUnits(a),a.units=a.units.map(function(a){return a.description}).join(", "),i.ensureDefined(a,["group","supplier","product"]),c.values(a),d.innerHTML="",a.nutrient_data.forEach(i.processNutrientDatum),d.clone(a.nutrient_data)}).catch(i.error):(e=this.cloneValues.id,a.fire.location(e.startsWith("urn:uuid:")?"#view/"+e:"#list"))},ensureDefined:function(a,b){b.forEach(function(b){b in a||(a[b]=null)})},processUnits:function(a){a.unit=i.units[a.unit]||a.unit,a.units&&(a.units=a.units.map(function(a){return i.units[a]||a}))},processNutrientDatum:function(a){"number"==typeof a.value&&(a.value=Math.round(10*a.value)/10),a.nutrient=i.nutrients[a.nutrient]||a.nutrient},update:function(a){var b=this.getAttribute("index"),c=i.items[b],d=a.target.getAttribute("name"),e=a.target.value;c[d]="unit"===d?i.units[e]:e},remove:function(){var a=this.nearest("[index]").getAttribute("index");i.items.splice(a,1),i.list()},clear:function(){i.items=[],i.list()},analyze:function(){var a={items:[]};i.items.forEach(function(b){var c={id:b.id,quantity:b.quantity,unit:b.unit.id};b.nutrient_data&&(c.description=b.description,c.nutrient_data=b.nutrient_data),a.items.push(c)}),i.api.analyze(a).then(i.analysis)},analysis:function(a){a.items.forEach(function(a){a.unit=i.units[a.unit]||a.unit}),a.results.forEach(i.processNutrientDatum);var c=b.query("#analysis"),d=c.query("[clone].values"),e=c.query("[clone].items");d.innerHTML="",e.innerHTML="",d.clone(a.results),e.clone(a.items)},recommend:function(){var a=document.query("#profile"),b=a.xValue;b.sex?c("lastProfile",b):c.has("lastProfile")&&(b=c("lastProfile"),a.xValue=b),b.age&&(b["ageIn"+b.ageUnit]=b.age),b.height&&(b["heightIn"+b.heightUnit]=b.height),b.weight&&(b["weightIn"+b.weightUnit]=b.weight),i.api.recommend(b).then(i.recommendations)},recommendations:function(a){a.recommendations.forEach(function(a){var b=a.type.split("#")[1];b||(b=a.type.split("/").pop().toUpperCase()),a.type=b||a.type,i.processNutrientDatum(a),i.processUnits(a)});var b=document.query("#recs");b.xValue=a;var c=b.query("[clone]");c.innerHTML="",c.clone(a.recommendations);var d=document.query("#profile"),e=d.xValue;e.age||(e.age=a.profile.ageInMonths,e.ageUnit="Months"),e.weight||(e.weight=a.profile.weightInKilograms,e.weightUnit="Kilograms"),e.height||(e.height=a.profile.heightInMeters,e.heightUnit="Meters"),d.xValue=e},network:function(d,e){var f=c(d);f.body=JSON.stringify(f.body,null,2),f.body.length<3&&(f.body=""),f.headers=JSON.stringify(f.headers,null,1).replace(/",?/g,"").substring(2).replace("\n}","\n"),b.query('[name="network"]').values(f),i.updateAPI(f),"location"!==e.type&&a.fire.location("#"+d)},updateAPI:function(a){b.query(".api").values(a||c("request"))},error:function(d){var e=c("response"),f=e.body&&e.body.messages?e.body.messages[0]:{text:"location"===d.type?"":d};f.status=e.status,b.query("[name=error]").values(f),d&&"location"===d.type||a.fire.location("#error")},resource:function(a,d,e){i.api[e]().then(function(a){var d=b.query('[vista="'+e+'"] [clone]');d.innerHTML="",d.clone(a.__list__),c("response",c(e+".response")),c("request",c(e+".request")),i.updateAPI()})}};a.alias("location"),a.on(window,{"location@#service":i.service,"location@`#(nutrients|units|foodunits)`":i.resource,"location@#request":i.network.bind(i,"request"),"location@#response":i.network.bind(i,"response"),"location@#query={query}":i.search,"location@#list":i.list,"location@#analysis":i.analyze,"location@#recommendations":i.recommend,"location@#profile+recommendations":i.recommend,"location@#view/{uri}":i.view,"location@#external":i.prepExternal,"location@#error":i.error,search:i.search,recommend:i.recommend,"items:add<.food>":i.add,"items:external<.food>":i.external,"items:view<.food>":i.view,"items:remove<.food>":i.remove,"items:clear":i.clear,page:i.page,options:i.options,"change<.food>":i.update})}(window.Eventi,document.documentElement,window.store,window.Clone,window.Posterior,window.Vista);