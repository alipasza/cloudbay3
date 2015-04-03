// Copyright (c) 2006 Microsoft Corporation
var PCSSender=new Object();PCSSender.SendMessage=function(jsonData,host,options){var internalOptions={target:window.parent,type:"message",data:jsonData,url:host};$.extend(internalOptions,options);var pm=new PCSSendMessage();pm.sendMessage(internalOptions);};if(!("JSON"in window&&window.JSON)){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case "string":return quote(value);case "number":return isFinite(value)?String(value):"null";case "boolean":case "null":return String(value);case "object":if(!value){return "null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());var listenerIframe;function sendInfoToListener(methodName,listenerUrl,args){if(listenerUrl&&listenerUrl!='null'){var argString='';if(args!=null){if(args[0]){argString+='&height='+encodeURIComponent(args[0]);}
if(args[1]){argString+='&errorcode='+encodeURIComponent(args[1]);}
}
if(listenerUrl.indexOf('?')!=-1){listenerUrl=listenerUrl+"&r="+Math.random();}
else{listenerUrl=listenerUrl+"?r="+Math.random();}
var urlToBeSent=listenerUrl+"#method="+methodName+argString;IframeLoad(urlToBeSent);}
}
function IframeLoad(url){if(!listenerIframe){listenerIframe=document.body.appendChild(document.createElement('iframe'));listenerIframe.style.cssText="width:0px;height:0px;display:none;";}
listenerIframe.contentWindow.location.replace(url);}
function PCSSendMessage(){this.settings={target:null,
type:null,
data:null,
url:null,
origin:"*",
hash:false
};this.sendMessage=function(options){var obj=$.extend({},this.settings,options),
target=obj.target;if(!obj.target){return;}
var message={data:obj.data,type:obj.type};if(("postMessage"in target)&&!obj.hash){target.postMessage(JSON.stringify(message),obj.origin);}
else{this.sendHashMessage(obj,message);}
};charsArray='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');randomChars=function(){var r=[];for(var i=0;i<32;i++){r[i]=this.charsArray[0|Math.random()*32];};return r.join("");};this.sendHashMessage=function(options,msg){var targetWindow=options.target,
targetURL=options.url;if(!targetURL){return;}
targetURL=(""+targetURL).replace(/#.*$/,"");var sourceWindow,
sourceURL=(""+sourceURL).replace(/#.*$/,"");if(window==targetWindow.parent){sourceWindow="parent";}
else{try{for(var i=0,len=parent.frames.length;i<len;i++){var f=parent.frames[i];if(f==window){sourceWindow=i;break;}
};}
catch(ex){sourceWindow=window.name;}
}
if(sourceWindow==null){return;}
var hashmessage={"x-requested-with":"postmessage",
source:{name:sourceWindow,
url:sourceURL
},
postmessage:msg
};var hashID="#x-postmessage-id="+randomChars();targetWindow.location=targetURL+hashID+encodeURIComponent(JSON.stringify(hashmessage));};}