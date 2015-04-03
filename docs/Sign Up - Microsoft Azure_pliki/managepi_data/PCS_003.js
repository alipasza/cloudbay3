// Copyright (c) 2006 Microsoft Corporation
$(function(){InitListners();});function InitListners(){if(window.addEventListener){window.addEventListener("message",OnMessage,false);}else{if(window.attachEvent){window.attachEvent("onmessage",OnMessage);}
}
}
var MessageHandler=
{ValidateInput:function(options){var parameter=options.Parameter;if(parameter==null){parameter='Highlight';}
var form=GetFormOnPage(options.FormId);if(form==null){return;}
var isValid=false;if(parameter=="NoHighlight"){if(form.validate()==null){throw{message:"invalid form"};}
isValid=form.validate().checkForm();}
else{isValid=form.valid();}
return this.CreateResultObject(isValid?"valid":"invalid",options);},
Query:function(options){var parameter=options.Parameter;if(!parameter){parameter="Change";}
var result={};if(parameter=="Change"||parameter=="All"){var updatedFieldsMap=findUpdatedFields(parameter);result=this.TransformToPublicInterfaceFormat(updatedFieldsMap);}
return this.CreateResultObject(result,options);},
Next:function(options){var form=GetFormOnPage(options.FormId);if(form==null){throw{message:"invalid form"};}
var isValid=form.valid();if(!isValid){return this.CreateResultObject("invalid",options);}
if(!PCS.PageManager){form.submit();return this.CreateResultObject("submitting",options);}
if(PCS.PageManager.hasNext()){PCS.PageManager.next();if(typeof(PageHeightChangeNotice)!='undefined'){PageHeightChangeNotice();}
return this.CreateResultObject("nextpage",options);}
form.submit();return this.CreateResultObject("submitting",options);},
Previous:function(options){if(!PCS.PageManager||!PCS.PageManager.hasPrevious()){_DoCancel();}
PCS.PageManager.previous();if(typeof(PageHeightChangeNotice)!='undefined'){PageHeightChangeNotice();}
return this.CreateResultObject("previouspage",options);},
ApplyCSS:function(options){var css=options.Parameter;if(css==null||typeof(dynamicCSSJSON)=='undefined'){return this.CreateResultObject("DynamicThemeDisabled",options);}
if(!this.SecurityCheck(css)){return this.CreateResultObject("InvalidInputChar",options);}
var stdCSS=this.ConvertToCSS(dynamicCSSJSON,css);if(stdCSS==null){return this.CreateResultObject("InvalidInputFormat",options);}
this.PutCSSIntoPage(stdCSS);if(typeof(PageHeightChangeNotice)!='undefined'){PageHeightChangeNotice();}
return this.CreateResultObject("CSSApplied",options);},
ConvertToCSS:function(dict,message){try{var dynamicCSSDict=JSON.parse(dict);var inputCSS=JSON.parse(message);}catch(e){return null;}
var rtnCSSStr='';for(var option in inputCSS){if(inputCSS[option]==null||$.trim(inputCSS[option])==''){continue;}
var name=$.trim(option.toLowerCase());var attr='';var index=option.indexOf(':');if(index>0){name=$.trim(option.substring(0,index).toLowerCase());attr=option.substring(index).replace(/\s/g,'');}
if(dynamicCSSDict.hasOwnProperty(name)){var selector=$.trim(dynamicCSSDict[name]);if(selector.indexOf(',')>0){selector=selector.replace(/,/g,attr+',');}
rtnCSSStr+=selector+attr+'{'+inputCSS[option]+'}';}
}
return rtnCSSStr;},
PutCSSIntoPage:function(css){var wrapper="<style type='text/css'>"+css+"</style>";$('#applyCss').html(wrapper);},
SecurityCheck:function(css){if(css.indexOf('javascript')>0||css.indexOf('expression')>0){return false;}
var invalidChars="<>^|";if(new RegExp("["+invalidChars+"]+").test(css)){return false;}
return true;},
TransformToPublicInterfaceFormat:function(updatedFieldsMap){if(!updatedFieldsMap){return null;}
var resultList=[];for(var field in updatedFieldsMap){if(!field){continue;}
var label=$.trim(field.replace(/\*/g,""));if(updatedFieldsMap[field].length>2){resultList.push({Label:label,From:updatedFieldsMap[field][0],To:updatedFieldsMap[field][1],ID:updatedFieldsMap[field][2]});}else{resultList.push({Label:label,From:updatedFieldsMap[field][0],To:updatedFieldsMap[field][1]});}
}
return resultList;},
CreateResultObject:function(resultCore,options){var result={method:options.Callback,
Result:resultCore,
Corelation:options.Corelation
};return JSON.stringify(result);}
};function GetFormOnPage(formId){var selector="form";if(formId&&formId!=""){selector+="#"+formId;}
return $(selector);}
function _DoCancel(){if(typeof(_DoCancelCore)!='undefined'){_DoCancelCore();}
}
function OnMessage(event){var domain="";if('domain'in event){domain=event.domain;}
if('origin'in event){domain=event.origin;}
if(!IsDomainWhiteListed(PARTNER_DOMAINS,domain)){throw{message:"Invalid domain: "+domain};return;}
var message=event.data;switch(message.toLowerCase()){case 'next':
$(document.forms).submit();break;case 'cancel':
_DoCancel();break;case 'later':
$('#btnLater')[0].onclick();break;default:
HandleReceivedMessage(message,event);break;}
}
function IsDomainWhiteListed(list,domain){if(list==null||domain==null||list.length==0||domain=='')
return false;for(var i=0;i<list.length;i++){var regexStr=list[i];var regex=new RegExp(regexStr);if(domain.match(regex)){return true;}
}
return false;}
function HandleReceivedMessage(options,event){if(options==null){return;}
var jsonOptions=JSON.parse(options);if(jsonOptions==null){return;}
var method=jsonOptions.Method;if(!method){return;}
var resultObj={};if(MessageHandler[method]){resultObj=MessageHandler[method](jsonOptions);}
PostApiResultToCaller(event,resultObj);}
function PostApiResultToCaller(event,jsonObj){if(event&&event.source&&PCS&&PCS.PostMessage&&jsonObj){PCSSender.SendMessage(jsonObj,null,{origin:event.origin,target:event.source,type:"api_return"});}
}