// Copyright (c) 2006 Microsoft Corporation
var PCS=new Object();PCS.DEFAULT_MKT="en-us";PCS.LastTimeSelectedCardType="";PCS.IsInicisEvent={LastTimeEvent:null,CurrentEvent:null};PCS.EditableFieldSeletor='input[type="text"]:visible, input[type="text"]:enabled, select:visible, #PIInfo input[type="radio"]:checked, #PIInfo input[type="hidden"][id^="creditCard"], #PIInfo input[type="hidden"][id^="billing"]';PCS.PostMessage={SendMessage:function(jsonData,host){PCSSender.SendMessage(jsonData,host);},
NotifyOnSubmit:function(){document.onkeydown=null;var pmData=eval("("+POST_MESSAGE_MODEL_SUBMITING_JSON+")");if(pmData!=null||pmData!=undefined){PCS.PostMessage.SendMessage(JSON.stringify(pmData),pmData.host);return;}
},
NotifyOnPageLoad:function(){if(typeof(POST_MESSAGE_MODEL_JSON_PAGE_RENDERED)=="undefined"
||POST_MESSAGE_MODEL_JSON_PAGE_RENDERED==null
||POST_MESSAGE_MODEL_JSON_PAGE_RENDERED==""){return;}
var pmData=eval("("+POST_MESSAGE_MODEL_JSON_PAGE_RENDERED+")");if(pmData!=null||pmData!=undefined){PCS.PostMessage.SendMessage(JSON.stringify(pmData),pmData.host);return;}
},
NotifyOnLink:function(){var pmData=eval("("+POST_MESSAGE_MODEL_JSON+")");if(pmData==null||pmData==undefined)
return;$('a[target="_blank"]').click(function(){var url=$(this).attr('href');var dataObj=new Object();dataObj.method="pcs_onnavigationrequired";dataObj.redirecturl=url;dataObj.ispostmessage="true";PCS.PostMessage.SendMessage(JSON.stringify(dataObj),pmData.host);});}
};(function($){$.fn.scrollablePanel=function(options){var settings={increment:50,duration:200};return this.each(function(){if(options){$.extend(settings,options);}
var $this=$(this);var panel=$this.find(".consent-inner-content");var content=$this.find(".consent-content");var downButton=$this.find("#consentScrollbarDown");var upButton=$this.find("#consentScrollbarUp");panel.css('top',0);var c_len=panel.height();var p_len=content.height();var offset=0;if(c_len>p_len){var maxOffset=c_len-p_len;downButton.show();upButton.show();downButton.live('click',function(){offset=offset-settings.increment;if(-offset>maxOffset){offset=-maxOffset;}
panel.animate({top:offset},settings.duration);return false;});upButton.live('click',function(){offset=offset+settings.increment;if(offset>0){offset=0;}
panel.animate({top:offset},settings.duration);return false;});}else{downButton.hide();upButton.hide();}
});};})(jQuery);(function($){$.tools=$.tools||{version:'@VERSION'};$.tools.tooltip={conf:{effect:'toggle',
fadeOutSpeed:"fast",
predelay:0,
delay:30,
opacity:1,
tip:0,
position:['bottom','right'],
offset:[0,0],
relative:false,
cancelDefault:true,
events:{def:"mouseenter, mouseleave, focus, focusout",
input:"focus, blur, click, focusout",
widget:"focus mouseenter, blur mouseleave",
tooltip:"mouseenter, mouseleave, focus, focusout"
},
layout:'<div/>',
tipClass:'tooltip'
},
addEffect:function(name,loadFn,hideFn){effects[name]=[loadFn,hideFn];}
};var effects={toggle:[
function(done){var conf=this.getConf(),tip=this.getTip(),o=conf.opacity;if(o<1){tip.css({opacity:o});}
tip.show();done.call();},
function(done){this.getTip().hide();done.call();}
],
fade:[
function(done){var conf=this.getConf();this.getTip().fadeTo(conf.fadeInSpeed,conf.opacity,done);},
function(done){this.getTip().fadeOut(this.getConf().fadeOutSpeed,done);}
]
};/* calculate tip position relative to the trigger */
function getPosition(trigger,tip,conf){var top=conf.relative?trigger.position().top:trigger.offset().top,
left=conf.relative?trigger.position().left:trigger.offset().left,
pos=conf.position[0];top-=tip.outerHeight()-conf.offset[0];left+=trigger.outerWidth()+conf.offset[1];if(/iPad/i.test(navigator.userAgent)){top-=$(window).scrollTop();}
var height=tip.outerHeight()+trigger.outerHeight();if(pos=='center'){top+=height/2;}
if(pos=='bottom'){top+=height;}
pos=conf.position[1];var width=tip.outerWidth()+trigger.outerWidth();if(pos=='center'){left-=width/2;}
if(pos=='left'){left-=width;}
var minMargin=8;var pageContainer=$("#mainContent");var pageLeft=pageContainer.offset().left;left=left<pageLeft?pageLeft+minMargin:left;left=(left+tip.outerWidth()+minMargin>pageLeft+pageContainer.outerWidth())?(pageLeft+pageContainer.outerWidth()-tip.outerWidth()-minMargin):left;return{top:top,left:left};}
function Tooltip(trigger,conf){var self=this,
fire=trigger.add(self),
tip,
timer=0,
pretimer=0,
title=trigger.attr("title"),
tipAttr=trigger.attr("data-tooltip"),
effect=effects[conf.effect],
shown,
isInput=trigger.is(":input"),
isWidget=isInput&&trigger.is(":checkbox, :radio, select, :button, :submit"),
type=trigger.attr("type"),
evt=conf.events[type]||conf.events[isInput?(isWidget?'widget':'input'):'def'];if(!effect){throw "Nonexistent effect \""+conf.effect+"\"";}
evt=evt.split(/,\s*/);if(evt.length!=4){throw "Tooltip: bad events configuration for "+type;}
trigger.bind(evt[0],function(e){clearTimeout(timer);if(conf.predelay){pretimer=setTimeout(function(){self.show(e);},conf.predelay);}else{self.show(e);}
}).bind(evt[1],function(e){clearTimeout(pretimer);if(conf.delay){timer=setTimeout(function(){self.hide(e);},conf.delay);}else{self.hide(e);}
}).bind(evt[2],function(e){clearTimeout(timer);if(conf.predelay){pretimer=setTimeout(function(){if(self.isShown(true)){self.hide(e);}
else{self.show(e);}
return false;},
conf.predelay);}else{if(self.isShown(true)){self.hide(e);}
else{self.show(e);}
return false;}
}).bind(evt[3],function(e){clearTimeout(pretimer);if(conf.delay){timer=setTimeout(function(){self.hide(e);},conf.delay);}else{self.hide(e);}
});if(title&&conf.cancelDefault){trigger.removeAttr("title");trigger.data("title",title);}
$.extend(self,{show:function(e){if(!tip){if(tipAttr){tip=$(tipAttr);}else if(conf.tip){tip=$(conf.tip).eq(0);}else if(title){tip=$(conf.layout).addClass(conf.tipClass).appendTo(document.body)
.hide().append(title);}else{tip=trigger.next();if(!tip.length){tip=trigger.parent().next();}
}
if(!tip.length){throw "Cannot find tooltip for "+trigger;}
}
if(self.isShown()){return self;}
tip.stop(true,true);var pos=getPosition(trigger,tip,conf);if(conf.tip){tip.html(trigger.data("title"));}
e=$.Event()||e;e.type="onBeforeShow";fire.trigger(e,[pos]);if(e.isDefaultPrevented()){return self;}
pos=getPosition(trigger,tip,conf);tip.css({position:'absolute',top:pos.top,left:pos.left});shown=true;effect[0].call(self,function(){e.type="onShow";shown='full';fire.trigger(e);});var event=conf.events.tooltip.split(/,\s*/);if(!tip.data("__set")){tip.bind(event[0],function(){clearTimeout(timer);clearTimeout(pretimer);});if(event[1]&&!trigger.is("input:not(:checkbox, :radio), textarea")){tip.bind(event[1],function(e){if(e.relatedTarget!=trigger[0]){trigger.trigger(evt[1].split(" ")[0]);}
});}
tip.data("__set",true);}
return self;},
hide:function(e){if(!tip||!self.isShown()){return self;}
e=$.Event()||e;e.type="onBeforeHide";fire.trigger(e);if(e.isDefaultPrevented()){return;}
shown=false;effects[conf.effect][1].call(self,function(){e.type="onHide";fire.trigger(e);});return self;},
isShown:function(fully){return fully?shown=='full':shown;},
getConf:function(){return conf;},
getTip:function(){return tip;},
getTrigger:function(){return trigger;}
});$.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});}
$.fn.tooltip=function(conf){var api=this.data("tooltip");if(api){return api;}
conf=$.extend(true,{},$.tools.tooltip.conf,conf);if(typeof conf.position=='string'){conf.position=conf.position.split(/,?\s/);}
this.each(function(){api=new Tooltip($(this),conf);$(this).data("tooltip",api);});return conf.api?api:this;};})(jQuery);(function($){$.fn.Dropdownlist=function(options){var settings={};return this.each(function(){if(options){$.extend(settings,options);}
var keyName={Tab:9,Enter:13,Up:38,Down:40,Left:37,Right:39};var defaultHeight=$(this).height();var $this=$(this);$this.attr("tabindex","0");$this.find("div.rightarrow").addClass("ddlflag");var delay;$this.bind({focusin:function(){var ul=$(this).find('ul:visible');var li=ul.find('li');var item=li.length;var hoverHeight=ul.height();var isRoll=item*li.outerHeight(true)>hoverHeight;var i=0;$(this).keydown(function(event){var top=ul.scrollTop();switch(event.keyCode){case keyName.Up:{if(i<=item-1&&i>0){li.removeClass('select').eq(--i).addClass('select');}
if(isRoll)
ul.scrollTop(top-li.outerHeight(true));return false;}
case keyName.Down:{if(i<item-1&&i>=0){li.removeClass('select').eq(++i).addClass('select');}
if(isRoll)
ul.scrollTop(top+li.outerHeight(true));return false;}
case keyName.Enter:{if(!$this.hasClass("hover")){$this.removeAttr("tabindex").click();li.eq(i).addClass("select");}
else{$(this).find(':input').first().val(li.eq(i).data('value'));if(li.eq(i).data('value1')!="undefined")
$(this).find(':input').eq(1).val(li.eq(i).data('value1'));if(options){$("#"+settings.id).val(li.eq(i).data('value'));$('label[for='+settings.id+']').hide();}
li.addClass("hidden other").removeClass("select selected").eq(i).removeClass('hidden other select').addClass("selected");$(this).triggerHandler("focusout");}
return false;}
case keyName.Tab:{li.removeClass('select');$(this).triggerHandler("focusout");return true;}
case keyName.Left:{var ancestor=$(this).closest("table").find(".ddlflag").parent();var index=ancestor.index($(this));if(index>0&&index<=ancestor.length)
{li.removeClass('select');ancestor.eq(--index).focus();}
return false;}
case keyName.Right:{var ancestor=$(this).closest("table").find(".ddlflag").parent();var index=ancestor.index($(this));if(index>=0&&index<ancestor.length)
{li.removeClass('select');ancestor.eq(++index).focus();}
return false;}
default:return false;}
});return false;},
focusout:function(){$(this).attr("tabindex","0");$(this).children('ul.items').children('li.other').addClass('hidden');$(this).removeClass('hover');$(this).children('div:first-child').removeClass('downarrow').addClass('rightarrow');$(this).unbind("keydown");},
click:function(){if(!$this.hasClass("hover")){clearTimeout(delay);$this.removeAttr("index");$this.children("ul.items").children("li").removeClass("select");$this.find("li").removeClass("hidden");if(!$this.hasClass("hover")){$this.addClass('hover').scrollTop(0);}
var item=$this.find('li').length;var hoverHeight=$this.height();var isRoll=item*$this.find('li').outerHeight(true)>hoverHeight;if(!isRoll){$this.css('height','auto').css('min-height',defaultHeight);}
$this.children('div:first-child').addClass('downarrow').removeClass('rightarrow');}
}
});$this.hover(
function(){delay=setTimeout(function(){$this.click();},150);},
function(){clearTimeout(delay);$this.focusout();}
);$(this).scroll(function(){});$this.find("li").bind("click",function(){if($this.hasClass("hover"))
{$(this).siblings().addClass("hidden other").removeClass("selected");$(this).removeClass("hidden other").addClass("selected");if(options){$("#"+settings.id).val($(this).data('value'));$('label[for='+settings.id+']').hide();}
$(this).parent().next().filter('input[type=\'hidden\']').eq(0).val($(this).data('value'));if($(this).data('value1')!="undefined")
$(this).parent().nextAll().filter('input[type=\'hidden\']').eq(1).val($(this).data('value1'));$this.removeClass('hover').find('div:first-child').addClass('rightarrow').removeClass('downarrow');$this.attr("tabindex","0");}
else
{$this.click();}
return false;});});};})(jQuery);(function($){$.fn.MBUXDropdownlist=function(options){var settings={};return this.each(function(){if(options){$.extend(settings,options);}
var keyName={Tab:9,Enter:13,Up:38,Down:40,Left:37,Right:39};var defaultHeight=$(this).height();var $this=$(this);$this.attr("tabindex","0");var delay;$this.bind({focusin:function(){var li=$(this).find('li');var item=li.length;var hoverHeight=$(this).height();var isRoll=item*li.outerHeight(true)>hoverHeight;var i=0;$(this).keydown(function(event){var top=$this.children(".item:first").scrollTop();switch(event.keyCode){case keyName.Up:
{if(i<=item-1&&i>0){li.removeClass('highlighting').eq(--i).addClass('highlighting');}
if(isRoll)
$this.children(".item:first").scrollTop(top-li.outerHeight(true));return false;}
case keyName.Down:
{if(i<item-1&&i>=0){li.removeClass('highlighting').eq(++i).addClass('highlighting');}
if(isRoll)
$this.children(".item:first").scrollTop(top+li.outerHeight(true));return false;}
case keyName.Enter:
{if(!$this.hasClass("expand")){$this.click();}else{SetValue(li.eq(i).attr('datavalue'),li.eq(i).text());li.eq(i).click();Close();}
return false;}
case keyName.Tab:
{$(this).triggerHandler("focusout");return true;}
case keyName.Left:
{return false;}
case keyName.Right:
{return false;}
default:return false;}
});return false;},
focusout:function(){$(this).attr("tabindex","0");$(this).unbind("keydown");Close();},
click:function(){Open();}
});$(this).scroll(function(){});$(this).find("li").bind("click",function(){SetValue($(this).attr('datavalue'),$(this).text());Close();return false;});var GetValue=function(){return $this.next(":input").val();};var SetValue=function(val,txt){$this.next(":input").val(val);$this.children("label:first").text(txt);};var Open=function(){if(!$this.hasClass("expand")){$this.addClass("expand");$this.find("li[datavalue='"+GetValue()+"']").addClass("selected");$this.attr("tabindex","0");}
};var Close=function(){var currentVal=GetValue();$this.find("li").removeClass("highlighting").removeClass("selected");$this.removeClass("expand");$this.attr("tabindex","0");$(this).triggerHandler("focusout");};});};})(jQuery);var Popup={CookieName:"PCSContsentAgree",
PopupID:null,
ShadeID:null,
ISShow:false,
NeedShowNormalConsent:false,
CancelUrl:null,
Hide:function(){Popup.ISShow=false;$("#"+Popup.PopupID).hide();$("#"+Popup.ShadeID).hide();},
IsAgree:function(param){var cookie=new PCS.Cookies();var agree=cookie.Get(Popup.CookieName);var paramValue=GetQueryString(param);cookie=null;if(agree!=null&&agree!=""){if(paramValue==null||paramValue==""){if(param=='mkt'){paramValue=PCS.DEFAULT_MKT;}
}
if(paramValue!=null&&paramValue!=""&&agree.indexOf(paramValue)!=-1){return true;}
}
return false;},
KeyDownEvent:function(e){var e=e||window.event;var key=window.event?e.keyCode:e.which;if(key==9){if(document.activeElement.id=="PopupConsentOK"){document.getElementById("PopupConsentCancel").focus();}else{document.getElementById("PopupConsentOK").focus();}
return false;}
},
Show:function(popupid,shadeid,cookieKey){if(Popup.IsAgree(cookieKey)){return;}
this.PopupID=popupid;this.ShadeID=shadeid;popupid="#"+popupid;shadeid="#"+shadeid;var windowHeight=$(window).height();var windowWidth=$(document.body).width();var mainContentHeight=$('#mainContent').height();windowHeight=(windowHeight>mainContentHeight)?mainContentHeight:windowHeight;var popupHeight=$(popupid).height();var popupWidth=$(popupid).width();if(windowHeight<popupHeight){windowHeight=popupHeight;}
var leftPos=windowWidth>popupWidth?(windowWidth-popupWidth)/2:0;var topPos=windowHeight>popupHeight?(windowHeight-popupHeight)/2:0;$(popupid).css("top",topPos+"px");$(popupid).css("left",leftPos+"px");$(shadeid).width($(document).width());$(shadeid).height($(document).height());PCS.Views.putAccountTypeViews();if(cookieKey=="dupm"){$("#PopupControl").append(PCS.Views.getViewById("ConsentContentForAgent"));}else{$("#PopupControl").append(PCS.Views.getViewById("ConsentContent"));}
$(shadeid).show();$(popupid).show();Popup.ISShow=true;document.onkeydown=Popup.KeyDownEvent;},
OKClick:function(paramKey){var paramValue=GetQueryString(paramKey);if(paramValue==null){if(paramKey=="mkt"){paramValue=PCS.DEFAULT_MKT;}
}
var cookie=new PCS.Cookies();var agree=cookie.Get(Popup.CookieName);if(agree==null||agree==""){agree="|"+paramValue+"|";}else{if(agree.indexOf(paramValue)==-1){agree+=paramValue+"|";}
}
if(Popup.NeedShowNormalConsent&&paramKey=="dupm"){cookie.Add(Popup.CookieName,agree,null,null,null);Popup.CookieName="PCSContsentAgreeMkt";Popup.Show(this.PopupID,this.ShadeID,"mkt");Popup.NeedShowNormalConsent=false;$("#PopupConsentOK").bind("click",function(){Popup.OKClick("mkt")});}else{Popup.Hide();cookie.Add(Popup.CookieName,agree,null,null,null);cookie=null;document.onkeydown=null;}
},
CancelClick:function(){document.onkeydown=null;var pmData=eval("("+POST_MESSAGE_MODEL_JSON+")");if(pmData!=null||pmData!=undefined){if(pmData.ispostmessage.toLowerCase()=="true"){pmData.method="pcs_onerror";pmData.errorcode="11";pmData.redirecturl=Popup.CancelUrl;PCS.PostMessage.SendMessage(JSON.stringify(pmData),pmData.host);return;}
}
location.href=Popup.CancelUrl;}
}
var StepTitleToggleCollapse={ExpandImgUrl:null,
CollapseImgUrl:null,
Init:function(){$(".font-section-title").click(StepTitleToggleCollapse.ToggleCollapse);},
ToggleCollapse:function(){var img=$(this).children("img").first();var container=$(this).next().first();if($(container).css("display")==""||$(container).css("display")=="block"){$(img).attr("src",StepTitleToggleCollapse.CollapseImgUrl);$(container).hide();}else{$(img).attr("src",StepTitleToggleCollapse.ExpandImgUrl);$(container).show();}
PageHeightChangeNotice();}
}
var ViewMode={ModeType:0,
Init:function(modeType){this.ModeType=parseInt(modeType);switch(this.ModeType){case 1:
this.Hide(this.View1_Tit1_PIList_Tit2);break;case 2:
this.Hide(this.View2_Tit1_PIList_Tit2_Btns);break;case 3:
this.Hide(this.View3_ExistingPI);this.InputDisabled(this.View3_ExistingPI);break;case 4:
this.Hide(this.View4_Tit1_PIList);break;default:
break;}
},
View1_Tit1_PIList_Tit2:["#ChoosePITitle","#ChoosePIChildTitle","#PIList","#PIDetailTitle"],
View2_Tit1_PIList_Tit2_Btns:["#ChoosePITitle","#ChoosePIChildTitle","#PIList","#PIDetailTitle","#btnSave","#btnReset"],
View3_ExistingPI:["#ExistingPI"],
View4_Tit1_PIList:["#selectCountryDiv","#ChoosePITitle","#ChoosePIChildTitle","#PIList"],
Hide:function(hideIdList){if(typeof(hideIdList)=="undefined"||hideIdList.length<=0){return;}
for(var i=0;i<hideIdList.length;i++){$(hideIdList[i]).hide();}
},
InputDisabled:function(hideIdList){if(typeof(hideIdList)=="undefined"||hideIdList.length<=0){return;}
for(var i=0;i<hideIdList.length;i++){$(hideIdList[i]+" input").prop("disabled",true);}
}
}
var InputHint={HINT_ID_LIST:new Array(),
HintInit:function(idlist){this.HINT_ID_LIST=idlist;for(var i=0;i<idlist.length;i++){var id=idlist[i];$(this.GetHintDiv(id)).bind("click",{elementID:id},InputHint.HintClick);$("#"+id).bind("focus",InputHint.HintFocus);$("#"+id).bind("blur",InputHint.HintBlur);if($("#"+id).val()!=""||$("#"+id).val().length>0){$(this.GetHintDiv(id)).hide();}
}
},
GetHintDiv:function(id){if($("#"+id+" ~ div[class*='hint']").length>1){return $("#"+id+" ~ div[class*='hint'][forid='"+id+"']");}
return $("#"+id+" ~ div[class*='hint']").first();},
HintClick:function(event){$(this).hide();var id="#"+event.data.elementID;setTimeout(function(){$(id).focus();},50);},
HintFocus:function(event){$(InputHint.GetHintDiv(this.id)).hide();},
HintBlur:function(event){if(this.value==""||this.value.length<=0){$(InputHint.GetHintDiv(this.id)).show();}
}
}
var ValidateResult={VALIDATERESULT_PI_ID:null,
ValidateResultInit:function(idlist,piid){if(this.VALIDATERESULT_PI_ID==null){this.VALIDATERESULT_PI_ID=(piid==null||piid=='')?$("input[name=pcs_spiid]:radio").val():piid;}
if(this.VALIDATERESULT_PI_ID==null||
this.VALIDATERESULT_PI_ID==''||
this.VALIDATERESULT_PI_ID==piid){for(var i=0;i<idlist.length;i++){var editField=$("#"+idlist[i]);if(editField.parent().not('.cc_dd_width').is('div.dropdownlist')){editField=editField.parent();}
editField.addClass("input-err");editField.blur(ValidateResult.ValidateResultClear);}
}
},
ValidateResultClear:function(){$(this).removeClass("input-err");}
}
function DropdownListClickForBAM(){$(".dropdownlist").Dropdownlist();$("#pi-addr ul.items li").bind("click",function(){var liData=$(this).data('value');var billingState=$("#billingState");if(billingState.length){billingState.val(liData);}
var billingCity=$('#billingCityOfHK :input(input[type=hidden])');if(billingCity.length){$("#billingCity").val(liData);}
return false;});}
function OnFieldEdit(){if($('form').validate()!=null
&&$('form').validate().submitted!=null
&&this.name in $('form').validate().submitted){PageHeightChangeNotice();}
}
function IsEmptyObject(obj){for(var prop in obj){return false;}
return true;};PCS.Views={putViewById:function(id,view){this[id]=view;},
getViewById:function(id){var view=this[id];delete this[id];return view;},
putAccountDetialInfoViews:function(){$("#AccountDetailInfo").children("div").each(function(){PCS.Views.putViewById(this.id,this);$(this).detach();});},
putAllViews:function(){$("#PIDetailTitle, #pi-card, #pi-addr, #pi-sepa, #piNote, #divBillingState, #AccountDetailInfo").children("div").each(function(){PCS.Views.putViewById(this.id,this);$(this).detach();});},
putBankPayViews:function(){$("#accountCPFAndCNPJLabel").children("div").each(function(){PCS.Views.putViewById(this.id,this);$(this).detach();});},
putACHAuthAgreementViews:function(){$("#ACHAuthAgreementDiv").children("div").each(function(){PCS.Views.putViewById(this.id,this);$(this).detach();});},
putAccountTypeViews:function(){$("#AccountDetailInfoPobo, #PopupControl").children("div").each(function(){PCS.Views.putViewById(this.id,this);$(this).detach();});},
prefillPage:function(category,cardtype,dataObject,subtype){RefreshUIOnSelectedPI(cardtype,category,subtype);if(dataObject==null)return;if(category==null||category.toLowerCase()!="new"){$("#pi-card input, #pi-card select, #pi-addr input, #pi-addr select, #pi-extra input, #pi-sepa input, #pi-sepa select, #pi-sepa textarea").each(function(){if($(this).is(":radio")){$(this).prop("checked",this.value==dataObject[this.name]);}else{ExpiredYearSelect($(this),dataObject[this.id],cardtype,category);$(this).val(dataObject[this.id]);}
});if(cardtype=="cc"&&isUsedCustomizedDropdownlist){ExpiredYearSelectBam($("ul#creditCardExpireYear"),dataObject['creditCardExpireYear']);}
$("#pi-card ul.items li, #pi-extra ul.items li").each(function(){var $this=$(this);var elementID=$this.parent().siblings('input[type=\'hidden\']')[0].id;if($this.data('value')==dataObject[elementID]){$this.siblings().addClass('hidden').addClass('other');$this.removeClass('hidden').removeClass('other');}
});$("#pi-card .readonly-field, #pi-addr .readonly-field, #pi-sepa .readonly-field, #pi-extra .readonly-field").each(function(){if($(this).is(":radio")){$(this).prop("checked",this.value==dataObject[this.name]);}else{if(dataObject[this.id]&&this.id=="bapType"){switch(dataObject[this.id].toLowerCase()){case "checking":
$(this).html(bapTypeChecking);break;case "savings":
$(this).html(bapTypeSavings);break;}
}else if(dataObject[this.id]&&this.id=="isResident"){switch(dataObject[this.id].toLowerCase()){case "0":
$(this).html(bapTypeNonResident);break;case "1":
$(this).html(bapTypeResident);break;}
}
else{$(this).html(dataObject[this.id]);}
}
});if(CREDIT_CARD_TYPE_DISPLAY_MODE_FOR_EDIT.toLowerCase()!="text"){var cardType=dataObject["creditCardType"];if(CREDIT_CARD_TYPE_DISPLAY_MODE_FOR_EDIT.toLowerCase()=="imagehidden"){$("#CreditCardTypeList label").hide();$("#CreditCardTypeList label img[cardtype='"+cardType+"']").parent().show();}else{$("#CreditCardTypeList label img").each(function(){if($(this).attr("cardtype")==cardType){$(this).attr("src",$(this).attr("normalsrc"));}else{$(this).attr("src",$(this).attr("graysrc"));}
});}
}
}else if(category.toLowerCase()=="new"){$("#pi-addr input, #pi-extra input").each(function(){if($(this).is(":radio")){$(this).prop("checked",this.value==dataObject[this.name]);}else{$(this).val(dataObject[this.id]);}
});$("#pi-addr .readonly-field, #pi-extra .readonly-field").each(function(){if($(this).is(":radio")){$(this).prop("checked",this.value==dataObject[this.name]);}else{$(this).html(dataObject[this.id]);}
});}
$("#pi-addr ul.items li").each(function(){var $this=$(this);var elements=new Array();elements[0]='billingState';elements[1]='billingCity';for(var i=0;i<elements.length;i++){var datavalue=dataObject[elements[i]];if(datavalue!=null&&datavalue!='')
{if($this.data('value')==datavalue){$this.siblings().addClass('hidden').addClass('other');$this.removeClass('hidden').removeClass('other');}
}
}
});$("#pi-addr input").each(function(){if($(this).is(":radio"))
$(this).prop("checked",this.value==dataObject[this.name]);else{if(cardtype!="bap"||dataObject["isunicode"+this.id]==null||dataObject["isunicode"+this.id]=="0"){if(this.value==""){$(this).val(dataObject[this.id]);}
else{if(this.value!=dataObject[this.id]){dataObject[this.id]=this.value;if(dataObject["isunicode"+this.id]!=null){dataObject["isunicode"+this.id]="0";}
}
}
}
else{if(this.value!=dataObject[this.id]){dataObject[this.id]=this.value;if(dataObject["isunicode"+this.id]!=null){dataObject["isunicode"+this.id]="0";}
}
$(this).val("");}
}
});InputHint.HintInit(INPUT_HINT_LIST);}
};PCS.CCTypeClick=function(){$("#creditCardNumber").focusout();}
PCS.BPRadioClick=function(){var $this=$(this);var typeid=$this.attr("id"),
subtype=$this.attr("subtype");if(typeof(typeid)=="undefined"||typeof(subtype)=="undefined"){return;}
if(subtype=="account"){PCS.Views.putBankPayViews();}
switch(typeid){case "bankRadioPayCPFID":
{$("#"+subtype+"CPFAndCNPJLabel").append(PCS.Views.getViewById(subtype+"-cpf"));$("#CCM").attr("value","").prop("disabled",true).addClass("account-field");$("#lblBillingCCMHint").prop("disabled",true);}
break;case "bankRadioPayCNPJID":
{$("#"+subtype+"CPFAndCNPJLabel").append(PCS.Views.getViewById(subtype+"-cnpj"));$("#CCM").prop("disabled",false).removeClass("account-field");$("#lblBillingCCMHint").prop("disabled",false);}
break;default:
break;}
InputHint.HintInit(INPUT_HINT_LIST);}
PCS.PITypeDropdownClick=function(category,cardtype,subtype,cardid){if(typeof(category)=="undefined"||typeof(cardtype)=="undefined"){return;}
$("#pcs_spiid").val(cardid);PCS.PITypeClickHandler(category,cardtype,subtype,"false",cardid);}
PCS.RadioClick=function(){var $this=$(this);var category=$this.attr("category"),
cardtype=$this.attr("cardtype"),
subtype=$this.attr("subtype"),
eSignedMandate=$this.attr("eSignedMandate"),
cardid=$this.val();if(typeof(category)=="undefined"||typeof(cardtype)=="undefined"){return;}
PCS.PITypeClickHandler(category,cardtype,subtype,eSignedMandate,cardid);}
function RefreshAlertOnPage(){setTimeout(function(){$.each($("div[role='alert']:visible"),function(index,item){$(item).html($(item).html());})
},5000);}
PCS.PITypeClickHandler=function(category,cardtype,subtype,eSignedMandate,cardid){var carddata=PCS.Cards[cardtype][cardid],
needcvv='false',
addr="addr",
needAddressInfo=PCS.Cards[cardtype].NeedAddressInfo;RefreshAlertOnPage();if(PCS.PageManager){PCS.PageManager.reset();}
PCS.Views.putAllViews();$("#PIDetailTitle").show();if(cardtype!=null&&cardtype.toLowerCase()=="sv"){$("#PIDetailTitle").append(PCS.Views.getViewById('svPIDetailTitle'));}else{if(category.toLowerCase()=="new"){if(!needAddressInfo&&(subtype=="AAAAAAIPOY"||subtype=="AAAAAAJ39E"||subtype=="AAAAAALITU")){$("#PIDetailTitle").append(PCS.Views.getViewById('EmptyTitle'));}else{if(STEP2_TITLE_ADD_Dynamic=="true"){var view=PCS.Views.getViewById(cardtype+'PIDetailTitle');if(view!=null&&view.outerHTML!="")
$("#PIDetailTitle").append(view);else 
$("#PIDetailTitle").hide();}else{$("#PIDetailTitle").append(PCS.Views.getViewById('NewPIDetailTitle'));}
}
}else{if(cardtype.toLowerCase()=='lwp'&&!needAddressInfo){$("#PIDetailTitle").append(PCS.Views.getViewById('EmptyTitle'));}else if(cardtype.toLowerCase()=='cc'){$("#PIDetailTitle").append(PCS.Views.getViewById('ccEditPIDetailTitle'));}else{$("#PIDetailTitle").append(PCS.Views.getViewById('otherEditPIDetailTitle'));}
}
}
if(cardtype.toLowerCase()=="lwp"){if(category.toLowerCase()=="new"){if(cardid!=null&&cardid.length>0){$("#pi-card").append(PCS.Views.getViewById(cardid));}
}else{$("#pi-card").append(PCS.Views.getViewById(category+subtype));}
}
else{if(cardtype.toLowerCase()=="dd"){var needSEPA=isSEPA;if(category.toLowerCase()!="new"){needSEPA=subtype=="sepa";}
$("#isSEPA").val(needSEPA);if(needSEPA){if(category.toLowerCase()=="new"){$("#pi-card").append(PCS.Views.getViewById(category+cardtype));$("#pi-sepa").append(PCS.Views.getViewById("newsepa"));}else if(eSignedMandate=="true"){$("#pi-card").append(PCS.Views.getViewById(category+subtype));$("#pi-sepa").append(PCS.Views.getViewById("ro-eSignedMandate-sepa"));}else{$("#pi-card").append(PCS.Views.getViewById(category+subtype));$("#pi-sepa").append(PCS.Views.getViewById("ro-sepa"));}
}else{$("#pi-card").append(PCS.Views.getViewById(category+cardtype));}
}else{$("#pi-card").append(PCS.Views.getViewById(category+cardtype));}
$("#piNote").append(PCS.Views.getViewById(category+cardtype+"note"));}
if(category.toLowerCase()=="new"){if(needAddressInfo){$("#pi-addr").append(PCS.Views.getViewById("ed"+addr));}
}
else{if(needAddressInfo&&cardtype.toLowerCase()!='pp'){$("#pi-addr").append(PCS.Views.getViewById(category+addr));}
}
var $thisStateDiv=$("#divBillingState");if(cardtype!=null&&cardtype.toLowerCase()=="bap"){if($thisStateDiv&&needAddressInfo){$thisStateDiv.prepend(PCS.Views.getViewById("bapPITypeStates"));$("#bapPITypeStates").show();$("#otherPITypeStates").hide();}
}else{if($thisStateDiv&&needAddressInfo){$thisStateDiv.prepend(PCS.Views.getViewById("otherPITypeStates"));$("#otherPITypeStates").show();$("#bapPITypeStates").hide();}
}
var isPayOutPI=AccountInfoDisplay(cardtype,category);if(cardid!=PCS.DefaultSelectedPIId){$("#ValidationResultMessage").hide();$('.input-err').each(function(){$(this).removeClass('input-err');});}else{$("#ValidationResultMessage").show();}
var payinemail=$("#payinaccountemail");var payoutemail=$("#payoutaccountemail");if(isPayOutPI&&payoutemail.length){PCS.Profile['billingEmail']=payoutemail.val();}else if(payinemail.length){PCS.Profile['billingEmail']=payinemail.val();}
var profile=PCS.Profile;if(category.toLowerCase()=="new"){PCS.Views.prefillPage(category,cardtype,profile,subtype);}
else{PCS.Views.prefillPage(category,cardtype,carddata,subtype);if(carddata.CVVChallengeOnUpdate&&carddata.CVVChallengeOnUpdate.toLowerCase()=='true'){$('#editcc-cvv-div').show();}
else{$('#editcc-cvv-div').hide();}
}
if(eSignedMandate=="true"){$("#sepaPIId").val(cardid);}
SetTheDefaultValueForBAMStyleDropdown(cardtype,needAddressInfo);if(cardtype=='bap'){$("#NeedShowASCIIEncodeNote").removeClass('hidden');}else{$("#NeedShowASCIIEncodeNote").addClass('hidden');}
if($("#PIBrowserMsg").length){if(cardtype=='inicis'){$("#PIBrowserMsg").removeClass('hidden');}else{$("#PIBrowserMsg").addClass('hidden');}
}
if(cardtype!=null&&cardtype.toLowerCase()=="sv"){var disclaimLink=$("#disclaimText a")
if(disclaimLink!=undefined&&disclaimLink!=null){var target=disclaimLink.attr("target");if(typeof target===typeof undefined){disclaimLink.attr("target","_blank");}
}
}
var validator=$("#PCSBodyForm").validate();if(cardtype=='bap'&&isDynamicGroup){validator.groups['billingAddress1']='ValidateLocationAddress';validator.groups['billingAddress2']='ValidateLocationAddress';validator.groups['billingAddress3']='ValidateLocationAddress';validator.groups['billingDistrict']='ValidateLocationAddress';validator.settings.rules["billingAddress1"]["NonCCNumberSuspicious"]=false;validator.settings.rules["billingAddress2"]["NonCCNumberSuspicious"]=false;validator.settings.rules["billingAddress3"]["NonCCNumberSuspicious"]=false;validator.settings.rules["billingDistrict"]["NonCCNumberSuspicious"]=false;}else{validator.groups['billingAddress1']='';validator.groups['billingAddress2']='';validator.groups['billingAddress3']='';validator.groups['billingDistrict']='';validator.settings.rules["billingAddress1"]["NonCCNumberSuspicious"]=true;validator.settings.rules["billingAddress2"]["NonCCNumberSuspicious"]=true;validator.settings.rules["billingAddress3"]["NonCCNumberSuspicious"]=true;validator.settings.rules["billingDistrict"]["NonCCNumberSuspicious"]=true;}
if(isACH){PCS.Views.putACHAuthAgreementViews();if(cardtype=='dd'){$("#ACHAuthAgreementDiv").append(PCS.Views.getViewById("subAgreementACH"));ACHAuthAgreement(true);}
}
if(cardtype=='dd'){$("#ShowDirectDebitMandateInstruction").removeClass('hidden');}else{$("#ShowDirectDebitMandateInstruction").addClass('hidden');}
if((category.toLowerCase()=="ed")&&(cardtype!=null&&cardtype.toLowerCase()=="cc")){var ccYear=carddata.creditCardExpireYear;var ccMonth=carddata.creditCardExpireMonth;var currentDate=new Date();var currentYear=currentDate.getFullYear();var currentMonth=currentDate.getMonth()+1;if(ccYear<currentYear||(ccYear==currentYear&&ccMonth<currentMonth)){if(isUsedCustomizedDropdownlist){$('.box .dropdownlist').not('.cc_dd_width').addClass("input-err");}
else{$('#creditCardExpireMonth').addClass("input-err");$('#creditCardExpireYear').addClass("input-err");}
$('#cc_expiredmsg').removeClass('hidden');}else{if(isUsedCustomizedDropdownlist){$('.box .dropdownlist').not('.cc_dd_width').removeClass("input-err");}
else{$('#creditCardExpireMonth').removeClass("input-err");$('#creditCardExpireYear').removeClass("input-err");}
if($('#cc_expiredmsg').is(':visible')){$('#cc_expiredmsg').addClass('hidden');}
}
}else{if($('#cc_expiredmsg').is(':visible')){$('#cc_expiredmsg').addClass('hidden');}
}
$("#selected-pi-type").val(cardtype);$("#selected-pi-category").val(category);$("#pcs_svstype").val("");if(subtype!=undefined&&subtype!=null){$("#selected-pi-subtype").val(subtype);}
if(cardtype!=null){if(PCS.LastTimeSelectedCardType!=cardtype){if(cardtype.toLowerCase()=="inicis"&&PCS.IsInicisEvent.CurrentEvent!=null){PCS.IsInicisEvent.CurrentEvent=PCS.IsInicisEvent.CurrentEvent.replace("{0}",cardtype);PCS.IsInicisEvent.CurrentEvent=PCS.IsInicisEvent.CurrentEvent.replace("{1}",category);eval(PCS.IsInicisEvent.CurrentEvent);}
if(PCS.LastTimeSelectedCardType.toLowerCase()=="inicis"&&PCS.IsInicisEvent.LastTimeEvent!=null){PCS.IsInicisEvent.LastTimeEvent=PCS.IsInicisEvent.LastTimeEvent.replace("{0}",cardtype);PCS.IsInicisEvent.LastTimeEvent=PCS.IsInicisEvent.LastTimeEvent.replace("{1}",category);eval(PCS.IsInicisEvent.LastTimeEvent);}
}
}
if(isNoPermission){$("#pi-card").append(PCS.Views.getViewById("challengePermissionDiv"));$("#btnSave").prop('disabled',true);return;}else{$("#btnSave").prop('disabled',false);}
if(PARTNER!="mbux"){$("#pagefooter").show();}
if($("#btnSave").is(":disabled")){$("#btnSave").prop('disabled',false);}
$("#cvvresult").html("");if(isSEPA)
{var yourPaymetnInputs=$("#directDebitNumber, #directDebitBankCode, #directDebitHolderName");var yourPaymentOutputDic={"directDebitNumber":"iBANNumber",
"directDebitBankCode":"swiftBIC",
"directDebitHolderName":"accountName"
};var typingTimer;var doneTypingInterval=100;yourPaymetnInputs.each(function(idx,item){$(this).bind('focusout',function(){clearTimeout(typingTimer);var itemValue=item.value;var itemID=item.id;if(itemValue.length>0){typingTimer=setTimeout(function(){var outputItemID=yourPaymentOutputDic[itemID];$("#"+outputItemID).val(itemValue);},doneTypingInterval);}
});});if(HasPayinAccount)
{PCS.FillSEPAAccountInfo(PCS.YourInfoProfile);}
if($("#pi-extra").is(":visible"))
{var yourAccountInputs=$("#billingAddress1, #billingAddress2, #billingAddress3, #billingCity, #billingState, #billingZipcode, #billingDistrict");var yourAccountOutputDic={"billingAddress1":"sepaAddress1",
"billingAddress2":"sepaAddress2",
"billingAddress3":"sepaAddress3",
"billingDistrict":"sepaDistrict",
"billingCity":"signingCity",
"billingState":"signingState",
"billingZipcode":"signingZipcode"
};yourAccountInputs.each(function(idx,item){$(this).bind('focusout',function(){clearTimeout(typingTimer);var itemValue=item.value;var itemID=item.id;if(itemValue.length>0){typingTimer=setTimeout(function(){var outputItemID=yourAccountOutputDic[itemID];$("#"+outputItemID).val(itemValue);},doneTypingInterval);}
});});$("#FirstName, #LastName, #CompanyName").each(function(idx,item){$(this).bind('focusout',function(){clearTimeout(typingTimer);var yourName=$("#FirstName").val();var lastName=$("#LastName").val();if(lastName!=undefined&&lastName!=null&&lastName.length>0)
{yourName+=" "+lastName;}
var companyName=$("#CompanyName").val();if(companyName!=undefined&&companyName!=null&&companyName.length>0)
{yourName=companyName;}
if(yourName!=undefined&&yourName!=null&&yourName.length>0){typingTimer=setTimeout(function(){$("#name").val(yourName);},doneTypingInterval);}
});});}
}
PCS.LastTimeSelectedCardType=cardtype;setTimeout("PageHeightChangeNotice();",200);ReorderTabindex();if((piuserType.toLowerCase()=="business"||piuserType.toLowerCase()=="corporate")&&needShowCPFAndCNPJAndCCM!=undefined&&needShowCPFAndCNPJAndCCM!=""){if(needShowCPFAndCNPJAndCCM.toLowerCase()=="showcpf"||($.inArray("CPF",INPUT_INVOLVEDELEMENT_LIST))!=-1){$("#bankRadioPayCPFID").trigger("click");}
else{$("#bankRadioPayCNPJID").trigger("click");}
}
ValidateResult.ValidateResultInit(INPUT_INVOLVEDELEMENT_LIST,cardid);if(!notUseDeadPageForInicisPay){if(category=="new"&&cardtype=="inicis"){$("#pi-addr").hide();$("#pi-extra").hide();$("#btnSave").hide();}else{$("#pi-addr").show();$("#btnSave").show();AccountInfoDisplay(cardtype,category);}
}
if(PCS.PageManager){PCS.PageManager.regenerate();PCS.PageManager.apply();}
}
PCS.EachEvent=function(){if(this.value==PCS.DefaultSelectedPIId){var $this=$(this);var category=$this.attr("category"),
cardtype=$this.attr("cardtype");subtype=$this.attr("subtype"),
$(this).trigger("click");$(this).prop('checked',true);if(PCS.RequestForm!=undefined){PCS.Views.prefillPage(null,cardtype,PCS.RequestForm,subtype);}
return false;}
}
PCS.PopulateProfile=function(dataObject){if(dataObject==null){return;}
$("#act-addr input, #act-addr select, #act-extra input, #act-extra select").each(function(){if($(this).is(":radio"))
$(this).prop("checked",this.value==dataObject[this.name]);else 
$(this).val(dataObject[this.id]);});$("#act-addr .readonly-field, #act-extra .readonly-field").each(function(){if($(this).is(":radio"))
$(this).prop("checked",this.value==dataObject[this.name]);else 
$(this).text(dataObject[this.id]);});FillAcountCPFAndCNPJ(dataObject);}
PCS.FillAccountInfo=function(dataObj){if(dataObj==null)return;$("#pi-addr input, #pi-addr select, #pi-extra input").each(function(){if($(this).is(":radio"))$(this).prop("checked",this.value==PCS.Profile[this.name]);else $(this).val(PCS.Profile[this.id]);});$("#pi-addr .readonly-field, #pi-extra .readonly-field").each(function(){if($(this).is(":radio"))$(this).prop("checked",this.value==PCS.Profile[this.name]);else $(this).text(PCS.Profile[this.id]);});FillAcountCPFAndCNPJ(dataObj);}
PCS.FillSEPAAccountInfo=function(dataObj){if(dataObj==null)return;$("#roYourPaymentInformation input").each(function(){if($(this).is(":radio"))$(this).prop("checked",this.value==PCS.YourInfoProfile[this.name]);else $(this).val(PCS.YourInfoProfile[this.id]);});$("#roYourPaymentInformation .readonly-field").each(function(){if($(this).is(":radio"))$(this).prop("checked",this.value==PCS.YourInfoProfile[this.name]);else $(this).text(PCS.YourInfoProfile[this.id]);});}
function SetTheDefaultValueForBAMStyleDropdown(cardtype,needAddressInfo)
{var billingState=$("#billingState");var billingCity=$('#billingCityOfHK :input(input[type=hidden])');var otherPITypeStates=$("#otherPITypeStatesHiddenli");var bapPITypeStates=$("#bapPITypeStatesHiddenli");if(cardtype!=null&&cardtype.toLowerCase()=="bap"){if(needAddressInfo){var bapData="";if(bapPITypeStates&&bapPITypeStates.length>0){bapData=bapPITypeStates.data('value');if(billingState&&billingState.length>0&&billingState.val()==''){billingState.val(bapData);}
if(billingCity&&billingCity.length>0&&billingCity.val()==''){$('#billingCity').val(bapData)
}
}
}
}else{if(needAddressInfo){var otherData="";if(otherPITypeStates&&otherPITypeStates.length>0){otherData=otherPITypeStates.data('value');if(billingState&&billingState.length>0&&billingState.val()==''){billingState.val(otherData);}
if(billingCity&&billingCity.length>0&&billingCity.val()==''){$('#billingCity').val(otherData)
}
}
}
}
}
function FillAcountCPFAndCNPJ(dataObj)
{if((dataObj["CPF"]!=undefined)&&$("#CPF").attr("subtype")!=undefined&&$("#CPF").attr("subtype")=="text-br"){$("#CPF").val(dataObj["CPF"]);}
if((dataObj["CNPJ"]!=undefined)&&$("#CNPJ").attr("subtype")!=undefined&&$("#CNPJ").attr("subtype")=="text-br"){$("#CNPJ").val(dataObj["CNPJ"]);}
}
function SwitchMexicoTaxId(cardtype){var $thisTaxID=$("#divTaxID");if($thisTaxID){if(cardtype!=null&&cardtype.toLowerCase()=="sv"){$thisTaxID.prepend(PCS.Views.getViewById("TaxIDForCSV"));$("#TaxIDForCSV").show();$("#TaxIDForOtherPI").hide();}else{$thisTaxID.prepend(PCS.Views.getViewById("TaxIDForOtherPI"));$("#TaxIDForOtherPI").show();$("#TaxIDForCSV").hide();}
}
}
function AccountInfoDisplay(cardtype,category){var payout_pi_types=new Array();payout_pi_types[0]='bap';payout_pi_types[1]='pp';var result=$.inArray(cardtype,payout_pi_types);var isPayOutPI=(result!=-1);if(NeedSelectCountry){SwitchMexicoTaxId(cardtype);$("#pi-extra").show();}else
{$this=$("#AccountDetailInfo");if(NEED_PI_EXTRA_FOR_PAYIN&&(!isPayOutPI||(isPayOutPI&&!HasPayinAccount))){if($this){$this.append(PCS.Views.getViewById("UserDetailForPayin"));SwitchMexicoTaxId(cardtype);$("#pi-extra").show();}
}else if(NEED_PI_EXTRA_FOR_PAYOUT&&isPayOutPI){if($this){$this.append(PCS.Views.getViewById("UserDetailForPayout"));}
$("#pi-extra").show();}
else{$("#pi-extra").hide();}
}
return isPayOutPI;}
PCS.Cookies=function(){this.Add=function(name,value,expires,path,domain){var cookieStr=name+"="+escape(value);if(expires!=null&&expires!=""){var date=new Date();date.setTime(date.getTime()+expires*24*3600*1000);cookieStr+=";expires="+date.toGMTString();}
if(path!=null&&path!=""){cookieStr+=";path="+path;}
if(domain!=null&&domain!=""){cookieStr+=";domain="+domain;}
document.cookie=cookieStr;}
this.Remove=function(name){var date=new Date();date.setTime(date.getTime()-10000);document.cookie=name+"=a; expires="+date.toGMTString();}
this.Get=function(name){var cookieArr=document.cookie.split("; ");for(var i=0;i<cookieArr.length;i++){var temp=cookieArr[i].split("=");if(temp[0]==name){return unescape(temp[1]);}
}
return null;}
};function GetQueryString(name){var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");var r=window.location.search.substr(1).match(reg);if(r!=null)return unescape(r[2]);return null;}
function onStoredValuePISelect(){$("#newsv > div[class='hidden']").hide();$("#btnSave").prop("disabled",!STORED_VALUE_ISENOUGH);}
function RefreshSaveButtonStatus(responseState){if(responseState=="succeed"){$("#btnSave").prop("disabled",false);}else{$("#btnSave").prop("disabled",true);}
}
function ExpiredYearSelect(obj,data,cardtype,category){$this=obj;if(cardtype=="cc"){var findYY=$this.find("option[value='YYYY']");if(findYY.length>0){if($this.find("option:nth-child(2)").val()!=new Date().getFullYear()){$this.find("option:nth-child(2)").remove();}
if($this.find("option[value='"+data+"']").length==0){findYY.after($("<option></option>").val(data).html(data));}
}
}
}
function ExpiredYearSelectBam(obj,data){if(obj==null||obj==undefined)return;$this=obj;if($this.children().first().attr('data-value')!=new Date().getFullYear()){$this.children().first().remove();}
if((data!=null&&data!=undefined)&&$this.find("li[data-value='"+data+"']").length==0){$this.prepend($("<li></li>").attr("data-value",data).html(data).attr("title",data).addClass('hidden').addClass('other'));}
}
function RefreshUIOnSelectedPI(cardtype,category,subtype){$("div[class*='reviewandsign']").hide();$("#PIInfoReview").hide();$("#DDReview").hide();$("#PPReview").hide();switch(cardtype){case "cc":
break;case "dd":
break;case "pp":
$("#PIInfoReview").show();$("#PPReview").show();break;case "pppi":
break;case "bap":
break;case "inicis":
break;case "sv":
onStoredValuePISelect();break;default:
break;}
if(cardtype!="sv"){$("#btnSave").prop("disabled",false);}else{$("#btnSave").prop("disabled",!STORED_VALUE_ISENOUGH);}
ViewMode.Init(ViewMode.ModeType);}
function CheckParentUrl(parentUrl){if(!(parentUrl=="")){if(window.top==window.self){this.location.href=parentUrl;}
}
}
function AutoFormat(ostring){if(ostring.length){ostring=$.trim(ostring);var formatStr="";for(var i=0;i<ostring.length;){formatStr+=ostring.substring(i,i+5)+'-';i=i+5;}
formatStr=formatStr.substring(0,formatStr.length-1);formatStr=formatStr.length>29?formatStr.substring(0,29):formatStr;return formatStr;}
return ostring;}
function ParseChar(sStr){var zChar=new Array('-',' ');for(i=0;i<zChar.length;i++){var sNewStr="";var iStart=0;var iEnd=sStr.indexOf(zChar[i]);while(iEnd!=-1){sNewStr+=sStr.substring(iStart,iEnd);iStart=iEnd+1;iEnd=sStr.indexOf(zChar[i],iStart);}
sNewStr+=sStr.substring(sStr.lastIndexOf(zChar[i])+1,sStr.length);sStr=sNewStr;}
return sStr;}
function OnPasteFormat(obj,e){var string=$(this).val();var newString=ParseChar(string);if(newString.length){var formated=AutoFormat(newString);setTimeout(function(){$(this).val(formated);},50);}
}
function isActiveXSupported(){return(window.ActiveXObject||"ActiveXObject"in window);}
function prepareNewInicis(){var needAuth=false;if($("#selected-pi-category").val()=='new'&&$("#selected-pi-type").val()=='inicis'){needAuth=true;}
if(needAuth){var isChrome=navigator.userAgent.indexOf("Chrome")>-1;if(!isActiveXSupported()&&!isChrome){return false;}
if(!auth()){return false;}
return true;}
return true;}
function ForbiddenInputPaste(idlist){if(idlist.length<=0)return;for(var i=0;i<idlist.length;i++){$(idlist[i]).bind('paste',function(){return false;});}
}
function auth(){if(document.INIpay==null||document.INIpay.object==null){return false;}
else{return MakeAuthMessage(document.forms["PCSBodyForm"]);}
}
function onInicisCreditCardTypeSelect(merchantid){$("#acceptmethod").val('BILLAUTH');$("#inicisPayMethodType").val('CreditCard');$("#mid").val(merchantid);}
function onInicisMobileTypeSelect(merchantid){$("#acceptmethod").val('BILLAUTH(HPP):HPP(1)');$("#inicisPayMethodType").val('Mobile');$("#mid").val(merchantid);}
PCS.generateFingerPrintScript=function(orgid,sessionGuid){$("#FingerPrintInframe").html("<iframe src='https://fpt.live-partner.com/tags?org_id="+orgid+"&session_id="+sessionGuid+"' height='0' width='0' tabindex='-1' style='border:0px';></iframe>");}
function PCSRedirectionNotify(){var pmData=eval("("+POST_MESSAGE_MODEL_JSON+")");if(pmData!=null||pmData!=undefined){if(pmData.ispostmessage.toLowerCase()=="false"){var listenerUrl=pmData.listenerurl;if(listenerUrl!=null&&listenerUrl!=""){sendInfoToListener('redirection',listenerUrl);}
}
else{if(pmData.method=="pcs_onredirectionnotify"){PCS.PostMessage.SendMessage(JSON.stringify(pmData),pmData.host);}
}
}
}
function SubscriptionAgreement(isenable){if(!isenable){return;}
$("#subAgreement").click(function(){if($(this).is(':checked')){$("#SubAgreementDiv").removeClass("subagreement-select");}else{$("#SubAgreementDiv").addClass("subagreement-select");}
});}
function CheckSubscriptionAgreement(){var subID="subAgreement";if($("#"+subID).length<=0){return true;}
if($("#"+subID).is(':checked')){return true;}else{$("#SubAgreementDiv").addClass("subagreement-select");return false;}
}
function ACHAuthAgreement(isenable){if(!isenable){return;}
$("#ACHAuthAgreement").click(function(){if($(this).is(':checked')){$("#subAgreementACH").removeClass("subagreement-select");}else{$("#subAgreementACH").addClass("subagreement-select");}
});}
function CheckACHAuthAgreement(){var subID="ACHAuthAgreement";if($("#"+subID).length<=0){return true;}
if($("#"+subID).is(':checked')){return true;}else{$("#subAgreementACH").addClass("subagreement-select");return false;}
}
function ReadyValidate(){jQuery.validator.addMethod(
"pattern",
function(value,element,regexp){if(regexp=="^$"||regexp==''){return true;}
return this.optional(element)||new RegExp(regexp,'g').test(value);},
"Invalid input."
);jQuery.validator.addMethod(
'ValidateLocationAddress',
function(value,element,param){var address1=$.trim($('#billingAddress1').val());var address2=$.trim($('#billingAddress2').val());var address3=$.trim($('#billingAddress3').val());var district=$.trim($('#billingDistrict').val());var addressLength=address1.length+address2.length+address3.length+district.length;if($('#bankAccountPayHolderName')[0]){if($('#bankAccountPayHolderName').val().length>0){var result=addressLength<=33;if(!result){$('#billingAddress1').addClass("input-err");$('#billingAddress2').addClass("input-err");$('#billingAddress3').addClass("input-err");$('#billingDistrict').addClass("input-err");}else{$('#billingAddress1').removeClass("input-err");$('#billingAddress2').removeClass("input-err");$('#billingAddress3').removeClass("input-err");$('#billingDistrict').removeClass("input-err");}
return result;}
}
else{return true;}
return true;},
"Location address is too long."
);jQuery.validator.addMethod(
'ValidateBankLocationAddress',
function(value,element,param){var address1=$.trim($('#bapBranchLocationAddress1').val());var address2=$.trim($('#bapBranchLocationAddress2').val());var address3=$.trim($('#bapBranchLocationAddress3').val());var addressLength=address1.length+address2.length+address3.length;if($('#bankAccountPayBankName')[0]){if($('#bankAccountPayBankName').val().length>0){var result=(addressLength<=35);if(!result){$('#bapBranchLocationAddress1').addClass("input-err");$('#bapBranchLocationAddress2').addClass("input-err");$('#bapBranchLocationAddress3').addClass("input-err");}else{$('#bapBranchLocationAddress1').removeClass("input-err");$('#bapBranchLocationAddress2').removeClass("input-err");$('#bapBranchLocationAddress3').removeClass("input-err");}
return result;}
}
else{return true;}
return true;},
"Bank address is too long."
);jQuery.validator.addMethod(
'CheckBuyerNameCombined',
function(value,element,param){var firstName=$.trim($('#inicisPayBuyerFirstName').val());var lastName=$.trim($('#inicisPayBuyerLastName').val());var buyerName=firstName+lastName;return buyerName.length<=30;},
"First Name + Last Name should not exceed 30 characters."
);jQuery.validator.addMethod(
'PrepaidCardNumbersCheck',
function(value,element,param){var strlen=$("#PrepaidCardNumber").val().length 
var errorMsgID="PrepaidCardNumbersCheckMessage";if(strlen==29||strlen==0){$("#"+errorMsgID).remove();return true;}
return false;},
"You must enter 25 character prepaid card number."
);jQuery.validator.addMethod(
'CheckBuyerTelephoneCombined',
function(value,element,param){var prefixValue=$.trim($('#inicisPayBuyerTelephonePhonePrefix').val());var numberValue=$.trim($('#inicisPayBuyerTelephonePhoneNumber').val());return(prefixValue.length>0&&numberValue.length>0)||(prefixValue.length==0&&numberValue.length==0);},
"You need input Telephone Prefix and Number if you want to fill telephone information."
);jQuery.validator.addMethod(
'myEqual',
function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();},
"You must enter the same number as the account number to confirm."
);jQuery.validator.addMethod(
'CheckPrefixPhoneNumberCombined',
function(value,element,param){var prefix=$.trim($("#billingPhonePrefix").val());var number=$.trim($("#billingPhoneNumber").val());var wholePhoneNumber=prefix+number;return wholePhoneNumber.length==10;},
"10 digits are required for the phone prefix and number. Check that you have entered them correctly."
);jQuery.validator.addMethod(
'CVVCheck',
function(value,element,param){var type=null;var amex='^[0-9]{4}$';var others='^[0-9]{3}$';type=GetCardTypeFromField(param);if(type=="AMEX"){if(!value.match(amex)){return false;}
}
else{if(!value.match(others)){return false;}
}
return true;},
"The CVV number does not match to the credit card type, please check it."
);jQuery.validator.addMethod(
'IsCreditCardExpire',
function(value,element,param){var month=$.trim($('#creditCardExpireMonth').val());var year=$.trim($('#creditCardExpireYear').val());if(month==''||year==''){return true;}else{var currentDate=new Date();var currentYear=currentDate.getFullYear();var currentMonth=currentDate.getMonth()+1;if(year<currentYear){return false;}
if(year==currentYear&&month<currentMonth){return false;}
}
return true;},
"Your credit card has expired. Please update the expiration date."
);jQuery.validator.addMethod(
'IsBirthday',
function(value,element,param){var month=$.trim($('#monthOfBirthday').val());var year=$.trim($('#yearOfBirthday').val());var day=$.trim($('#dayOfBirthday').val());if(year==''||month==''||day==''){return true;}else{month=month-1;var birthday=new Date(year,month,day);if(!(birthday&&birthday.getFullYear()>0)){return false;}
if(birthday.getFullYear()!=year
||birthday.getMonth()!=month
||birthday.getDate()!=day){return false;}
}
return true;},
"Birthday is invalid."
);jQuery.validator.addMethod(
'IsNumberMatchedCardType',
function(value,element,param){if(typeof(CREDIT_CARD_TYPE_DISPLAY_MODE)=='undefined'){return true;}
if(CREDIT_CARD_TYPE_DISPLAY_MODE.toLocaleLowerCase()=="imagelist"){if(CREDIT_CARD_TYPE_IMAGELIST_DISPLAY_TYPE.toLocaleLowerCase()=="hidden"){$('#CreditCardTypeList input:radio[name="creditCardType"]').parent().show();}else{$('#CreditCardTypeList input:radio[name="creditCardType"]').each(function(){$(this).next("img").attr("src",$(this).next("img").attr("normalsrc"));});}
}
var ccSubTypes={"ELO":'^(636297|504175|438935|636368|451416)[0-9]{10}$',
"VISA":'^4(?:[0-9]{12}|[0-9]{15})$',
"MC":'^5[1-5][0-9]{14}$',
"AMEX":'^3[47][0-9]{13}$',
"DISCOVER":'^6(?:011|4[4-9][0-9]|5[0-9]{2})[0-9]{12}|62[4-6][0-9]{13}|628[2-8][0-9]{12}|622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5]))[0-9]{10}|3(?:0[0-5]|[689][0-9])[0-9]{11}|3095[0-9]{10}$',
"DINERS":'^3(?:0[0-5]|[689][0-9])[0-9]{11}|3095[0-9]{10}$',
"JCB":'^(?:3[0-9]{15}|(2131|1800)[0-9]{11})$'
};var cctype=null;var ccnumber=$("#creditCardNumber").val();if(ccnumber==''||ccnumber==null){return true;}
for(var type in ccSubTypes){if($.inArray(type,SUPPORTED_CREDITCARD_TYPE)!=-1&&ccnumber.match(ccSubTypes[type]))
{cctype=type;break;}
}
var result=$.inArray(cctype,SUPPORTED_CREDITCARD_TYPE);if(cctype==null||result==-1){return false;}else{var $this=$("#creditCardType");function CheckErrMsg(){var ccTypeErrorMsg=$("label.error[for=creditCardType]");if(ccTypeErrorMsg.length>0&&ccTypeErrorMsg.css("display")=="inline"){ccTypeErrorMsg.hide();}
}
if($this.is(":radio")){$('input:radio[name="creditCardType"][value="'+cctype+'"]').prop('checked',true);$('input:radio[name="creditCardType"]').first().removeClass("error");CheckErrMsg();}
else{$("#creditCardType option[value ="+cctype+"]").attr("selected","selected");$("#creditCardType").removeClass("error");CheckErrMsg();}
if(CREDIT_CARD_TYPE_DISPLAY_MODE.toLocaleLowerCase()=="imagelist"){if(CREDIT_CARD_TYPE_IMAGELIST_DISPLAY_TYPE.toLocaleLowerCase()=="hidden"){$('#CreditCardTypeList input:radio[name="creditCardType"][value!="'+cctype+'"]').parent().hide();$('#CreditCardTypeList input:radio[name="creditCardType"][value="'+cctype+'"]:first').parent().show();}else{$('#CreditCardTypeList input:radio[name="creditCardType"][value!="'+cctype+'"]').each(function(){$(this).next("img").attr("src",$(this).next("img").attr("graysrc"));});$('#CreditCardTypeList input:radio[name="creditCardType"][value="'+cctype+'"]').each(function(){$(this).next("img").attr("src",$(this).next("img").attr("normalsrc"));});}
}
return true;}
},
"Credit card number and credit card type does not match, please check it."
);jQuery.validator.addMethod(
'PICVCheck',
function(value,element,param){var list=$('input[id^="Picv"][type="text"]');var isListNull=true;if(list==null||list.length==0){throw new exception("Cannot find PICV textbox.");}
for(i=0;i<list.length;i++){if(list[i].value!=null&&jQuery.trim(list[i].value)!=""){isListNull=false;break;}
}
if(isListNull){return false;}else{return true;}
},
"At least one of the two fields is required."
);jQuery.validator.addMethod(
'NonCCNumberSuspicious',
function(value,element,param){return notCCNumberSuspicious(value);},
"Invalid input."
);function notCCNumberSuspicious(value){if(typeof(PCSSuspiciousCCBinRange)==="undefined"||PCSSuspiciousCCBinRange==''){return true;}
return!(new RegExp(PCSSuspiciousCCBinRange,'g').test(value));}
}
function ReadyTooltip(){$("#WhatsThis, #WhatsThisEdit").tooltip({position:"bottom left",
offset:[3,100],
effect:"toggle",
opacity:1.0,
layout:""
}).each(function(i){if(this.href){$(this).data('href',this.href).addClass('link');$(this).click(function(){$(this).attr('href',$(this).data('href'));});}
});$("#WhatsThisForPobo").tooltip({position:"bottom center",
offset:[3,100],
effect:"toggle",
opacity:1.0,
layout:""
}).each(function(i){if(this.href){$(this).data('href',this.href).addClass('link');$(this).click(function(){$(this).attr('href',$(this).data('href'));});}
});}
function GetParameterValue(qString,parameter){if(qString=='')return;var keyValPairs=[];var params={};var queryString=qString.substr(qString.indexOf('?')+1);if(queryString.length){keyValPairs=queryString.split('&');for(pairIndex in keyValPairs){var key=keyValPairs[pairIndex].split('=')[0];if(!key.length)continue;if(typeof params[key]==='undefined'){params[key]=[];}
params[key].push(keyValPairs[pairIndex].split('=')[1]);}
return params[parameter];}else
{return;}
}
function SelectCountryChanage(){var newMKT=$(this).val();if(newMKT=="")return;var url=window.location.href;if(Entry_Url!=undefined&&Entry_Url!=null&&Entry_Url.length>0){url=Entry_Url;}
var lowerUrl=url.toLowerCase();var needHandleAccountIDAndPIID=$('#NeedHandleAccountIDAndPIID').val();if(lowerUrl.indexOf("?mkt=")==-1
&&lowerUrl.indexOf("&mkt=")==-1){if(url.indexOf("?")==-1){url=url+"?mkt="+newMKT;}else{url=url+"&mkt="+newMKT;}
}else{var re=/[\?|\&][mM][kK][tT]=([a-zA-Z]{2,3}\-[a-zA-Z]{2,4})(\-[a-zA-Z]{2})?/g;if(lowerUrl.indexOf("&mkt=")>=0){url=url.replace(re,"&mkt="+newMKT);}
if(lowerUrl.indexOf("?mkt=")>=0){url=url.replace(re,"?mkt="+newMKT);}
}
if(needHandleAccountIDAndPIID.toLowerCase()=='true'
&&lowerUrl.indexOf("addmkt=")==-1){var oldMkt=GetParameterValue(lowerUrl,"mkt");if(oldMkt==undefined||oldMkt=="")oldMkt="en-us";if(url.indexOf("?")==-1){url=url+"?addmkt="+oldMkt;}else{url=url+"&addmkt="+oldMkt;}
}
window.location.href=url;}
function SelectUserTypeChange()
{var userType=$(this).val();$this=$("#AccountDetailInfoPobo");if($this.length){PCS.Views.putAccountTypeViews();if(userType.toLowerCase()=="business"){$this.append(PCS.Views.getViewById("BusinessUserDetail"));$("#bankRadioPayCNPJID").trigger("click");}else
{$this.append(PCS.Views.getViewById("PersonalUserDetail"));}
InputHint.HintInit(INPUT_HINT_LIST);}
}
function DisplaySubmitLoading(location){var animation=$('#loading_animation').html();switch(location){case "center":
{$("#LoadingDiv").append(animation);var winWidth=$(document).width();var winHeight=$(window).height();var topPoint=(winHeight-$("#LoadingDiv").height())/2;var leftPoint=(winWidth-$("#LoadingDiv").width())/2;$("#ShadeDiv").width($(document).width());$("#ShadeDiv").height($(document).height());$("#ShadeDiv").show();$("#LoadingDiv").css("top",topPoint+"px");$("#LoadingDiv").css("left",leftPoint+"px");$("#LoadingDiv").show();document.documentElement.scrollTop=0;break;}
case "button":
{var displaybtn=$("#Buttons").html();$("#Buttons").html(animation+displaybtn);break;}
case "buttonText":
{var text=$('#loading_text').html();$("#Buttons").html(animation+text);break;}
case "none":
default:
return;}
}
function ReadyText(supportAccessibility){if(supportAccessibility){$(".accessibilityread").bind("mouseover",function(){$(this).focus();}).bind("mouseout",function(){$(this).blur();});}
}
function ReorderTabindex(){try{if(typeof DISABLE_TAB_INDEX_ID_LIST!='undefined'){DisableTab(DISABLE_TAB_INDEX_ID_LIST);}
if($('div.buttonsFocusReorder').length<=0&&(typeof ORDERED_TAB_INDEX_ID_LIST=='undefined'||ORDERED_TAB_INDEX_ID_LIST.length<=0)){return;}
var tabIndexCounter=0;var allCanFocusedElements=new Array();$("a, body, button, frame, iframe, img, input, isIndex, object, select, textArea").not(":hidden").each(function(){if($(this).attr("tabindex")>=0){allCanFocusedElements.push($(this));}
});if(typeof ORDERED_TAB_INDEX_ID_LIST!='undefined'&&ORDERED_TAB_INDEX_ID_LIST.length>=0){allCanFocusedElements=CreateReorderedList(allCanFocusedElements,ORDERED_TAB_INDEX_ID_LIST);}
$.each(allCanFocusedElements,function(){$(this).attr("tabindex",++tabIndexCounter);});if($('div.buttonsFocusReorder').length>0){var tabindexOfSaveButton=$("#btnSave").attr("tabindex");var tabindexOfCancelButton=$("#btnReset").attr("tabindex");var tabIndexTmp=0;if(tabindexOfSaveButton!=null&&tabindexOfCancelButton!=null&&tabindexOfSaveButton>tabindexOfCancelButton){tabIndexTmp=tabindexOfSaveButton;$("#btnSave").attr("tabindex",tabindexOfCancelButton);$("#btnReset").attr("tabindex",tabIndexTmp);}
}
}catch(err){}
}
function CreateReorderedList(sourceList,orderedTabIds){if(!sourceList||!orderedTabIds){return sourceList;}
var sourceIdSetObjectMap={};$.each(sourceList,function(){var myId=this.attr('id');if(!!myId&&myId!=""){sourceIdSetObjectMap[myId]=this;}
});var newOrderedTabIds=[];$.each(orderedTabIds,function(){if(this in sourceIdSetObjectMap){newOrderedTabIds.push(this.toString());}
})
if(newOrderedTabIds.length==0){return sourceList;}
var newObjectList=[];var matchedIdMap={};var topOfOrderedList=0;$.each(sourceList,function(){var myId=this.attr('id');if(!myId||myId==""){newObjectList.push(this);return;}
if(myId in matchedIdMap){newObjectList.push(matchedIdMap[myId]);return;}
if($.inArray(myId,newOrderedTabIds)>=0){var topObj=sourceIdSetObjectMap[newOrderedTabIds[topOfOrderedList++]];matchedIdMap[myId]=topObj;newObjectList.push(topObj);return;}
newObjectList.push(this);return;});return newObjectList;}
function DisableTab(tabIdList){if(!tabIdList||tabIdList.length==0){return;}
$.each(tabIdList,function(){$('#'+this).attr('tabindex',-1);})
}
$(document).ready(function(){ReadyValidate();ReadyTooltip();$(window).resize(function(){setTimeout('if (Popup.ISShow) Popup.Show("PopupConsent", "ShadeDiv");',200);});$("input[name='creditCardType']:radio").click(PCS.CCTypeClick);$("#creditCardType").change(PCS.CCTypeClick);$("#Buttons input").bind({mousedown:function(){$(this).addClass("click");},
mouseup:function(){$(this).removeClass("click");}
});$("#selectCountry").bind("change",SelectCountryChanage);$(PCS.EditableFieldSeletor).live('change',OnFieldEdit);$(PCS.EditableFieldSeletor).live('keyup',OnFieldEdit);$this=$("#AccountDetailInfoPobo");if($this.length){PCS.Views.putAccountTypeViews();if($("#usertype option:selected").val()=="PERSONAL"){$this.append(PCS.Views.getViewById("PersonalUserDetail"));}else{$this.append(PCS.Views.getViewById("BusinessUserDetail"));}
$("#pi-extra").show();}
$("#usertype").live("change",SelectUserTypeChange);setTimeout("ReorderTabindex()",200);$("div#tooltip.tooltip").css({"margin-left":"0px"});try{$('#PIList input[name=pcs_spiid]:visible').live("keydown",function(e){if($('#PIInfo input[name=pcs_spiid]:visible').length>0&&!e.shiftKey&&e.keyCode==9){$('#PIInfo input[name=pcs_spiid]:visible').first().focus();e.returnValue=false;if(e.preventDefault)e.preventDefault();}
});}catch(err){}
PCS.PostMessage.NotifyOnPageLoad();});window.onload=function(){try{var paymentMethod=$('.payment-method');var piCardInputField=$('#pi-card :input:not(input[type=hidden])');var inputField=$('#mainContent :input:not(input[type=hidden])');if(paymentMethod!=null&&paymentMethod.length>0
&&(window.getComputedStyle?window.getComputedStyle(paymentMethod[0],null).display:paymentMethod[0].currentStyle.display)=="none"){if(piCardInputField.length>0){piCardInputField[0].focus();}
}
else{if(inputField.length>0){inputField[0].focus();}
}
}catch(err){}
setTimeout("PageHeightChangeNotice();",200);if(typeof LogEvent!='undefined'){sessionGuid=$('#sessionGuid').val();if(typeof sessionGuid=='undefined'){sessionGuid="";}
LogEvent(window.location.pathname,"PageLoad","",sessionGuid);}
}
function findGroupByID(groups,id){if(groups==null||id==null){return null;}
for(var key in groups){if(id.indexOf(key)>=0){return groups[key];}
}
return null;}
function setFieldChangedFlag(fieldName){try{if(!fieldName){return;}
var field=$('#'+fieldName);if(field.length<=0){return;}
if(field.val().toLowerCase()==='true'){return;}
field.val(fieldsChanged());}
catch(err){}
}
function fieldsChanged(){var updatedFields=findUpdatedFields('change');return updatedFields&&!IsEmptyObject(updatedFields);}
function findUpdatedFields(queryType){var spiid=$('[name="pcs_spiid"]:checked');var sourceData;var updatedFields={};var groups={'creditCardExpire':['creditCardExpireMonth','creditCardExpireYear'],
'billingPhone':['billingPhonePrefix','billingPhoneNumber'],
'Birthday':['monthOfBirthday','dayOfBirthday','yearOfBirthday']
};if(spiid==null||spiid.length==0){sourceData=PCS.Profile;}else if(spiid.attr('cardtype')!=""&&spiid.val().indexOf('$new')==-1){sourceData=PCS.Cards[spiid.attr('cardtype')][spiid.val()];$('#updatedFieldsUpdate').show();}else if(spiid.val().indexOf('$new')!=-1){$(PCS.EditableFieldSeletor).each(function(){if($(this).val()!=''&&!$(this).is('[readonly="true"]')){var id=$(this).attr('id');var fieldName=$('#'+id).parents('div.cell').find('h4');if(fieldName==null||fieldName.length==0){fieldName="";}else{fieldName=fieldName.text();}
var groupIDs=findGroupByID(groups,id);if(groupIDs!=null&&groupIDs.length>0){var groupStr="";for(var key in groupIDs){var val=getTextByOptionValue(groupIDs[key]);if(val!=null){if(groupStr==""){groupStr+=val;}else{groupStr+="-"+val;}
}
}
if(updatedFields[fieldName]==null)
updatedFields[fieldName]=['',groupStr];}else if(fieldName!=""){if($(this).is(":radio")&&$(this).attr('title')!=""){updatedFields[fieldName]=['',getTextByOptionValue(id,$(this).attr('title')),id];}else{updatedFields[fieldName]=['',getTextByOptionValue(id,$(this).val()),id];}
}
else if($(this).attr('subtype')!=null&&$(this).attr('subtype')=='text-br'){var cpfAndcnpjType=$('#'+id).parents('div.cell').find('span input[type="radio"]:checked').attr('title');if(cpfAndcnpjType!=undefined&&cpfAndcnpjType!='')
updatedFields[cpfAndcnpjType]=['',getTextByOptionValue(id,$(this).val()),id];}
}
});$('#updatedFieldsAdd').show();return updatedFields;}else{}
if(sourceData!=null){for(var id in sourceData){if(sourceData.hasOwnProperty(id)&&sourceData[id]!=null){var newData=$('input#'+id+', select#'+id+', textarea#'+id).val();var fieldName=$('#'+id).parents('div.cell').find('h4');var radioObj=$("input[type='radio'][name='"+id+"']:checked");if(radioObj!=undefined&&radioObj.length>0)
{newData=radioObj.val();fieldName=radioObj.parents('div.cell').find('h4');}
if(queryType.toLowerCase()==='all'||
(queryType.toLowerCase()==='change'&&newData!=undefined&&newData!=sourceData[id])){var obj=new Object();if(fieldName==null||fieldName.length==0){fieldName="";}else{fieldName=fieldName.text();}
var groupIDs=findGroupByID(groups,id);if(groupIDs!=null&&groupIDs.length>0){var oldGroupStr="";var newGroupStr="";for(var key in groupIDs){var origVal=getTextByOptionValue(groupIDs[key],sourceData[groupIDs[key]]);var val=getTextByOptionValue(groupIDs[key]);if(origVal!=null&&val!=null){if(newGroupStr==""&&oldGroupStr==""){oldGroupStr+=origVal;newGroupStr+=val;}else{oldGroupStr+="-"+origVal;newGroupStr+="-"+val;}
}
}
if(updatedFields[fieldName]==null){updatedFields[fieldName]=[oldGroupStr,newGroupStr]
}
}else{var oldText=getTextByOptionValue(id,sourceData[id]);newData=getTextByOptionValue(id,newData);if(radioObj!=undefined&&radioObj.length>0){oldText=$("input[type='radio'][value='"+sourceData[id]+"']").attr('title');newData=radioObj.attr('title');}
updatedFields[fieldName]=[oldText,newData,id]
}
}
}
}
}
return updatedFields;}
function getTextByOptionValue(id,data){if(data==null)
data=$('input#'+id+', select#'+id).val();if(id==null||id==''||data==null||data=='')
return data;if(id.toLowerCase()=="billingstate"&&$('ul#BillingState')!=null&&$('ul#BillingState').length>0){if($('div[id$="PITypeStates"]:visible').length>0){return $('div[id$="PITypeStates"]:visible').find('ul#BillingState li[data-value="'+data+'"]').text();}else{return $('ul#BillingState li[data-value="'+data+'"]').text();}
}else if($('ul#'+id)!=null&&$('ul#'+id).length>0){return $('ul#'+id+' li[data-value="'+data+'"]').text();}else if($('select#'+id)!=null&&$('select#'+id).length>0){return $('#'+id+' option[value="'+data+'"]').text();}else{return data;}
}
function objectHasProperty(obj){if(obj!=null){for(var key in obj){if(obj.hasOwnProperty(key))
return true;}
}
return false;}
function showSubmitConfirmation(form,isAnonymous){if(isAnonymous){$('#PageContainer').hide();$('#submitConfirmation').show();}else{var list=findUpdatedFields('Change');showDetailTitleAndAddContent(list);$('#PageContainer').hide();$('#submitConfirmation').show();}
PageHeightChangeNotice();}
function showDetailTitleAndAddContent(list)
{var str="";var size=0;if($('[name="pcs_spiid"]:checked').length>0&&$('[name="pcs_spiid"]:checked').val().indexOf('$new')!=-1){for(var fieldName in list){str=str.concat('<tr><td class="width-oleft">'+fieldName+'</td>'+'<td class="width-ocenter">'+list[fieldName][0]+'</td>'+'<td class="width-oright">'+list[fieldName][1]+'</td></tr>');size++;}
$("#detail-title").hide();}
else{for(var fieldName in list){str=str.concat('<tr><td class="width-tleft">'+fieldName+'</td>'+'<td class="width-tcenter">'+list[fieldName][0]+'</td>'+'<td class="width-tright">'+list[fieldName][1]+'</td></tr>');size++;}
$("#detail-title").show();}
if(size==0){str=str.concat('<tr><td colspan="3"><span class="noUpdatedField">'+noInformation+'</span></td></tr>');}
$('#updatedFieldsTable').find('tbody').append(str);}
function submitConfirmationConfirmed(){isConfirmed=true;$('#mainContent').find('form').submit();}
function submitConfirmationCanceled(isAnonymous){$('#mainContent').find('#PageContainer').show();$('#updatedFieldsTable').find('tbody').html('');$('#updatedFieldsAdd').hide();$('#updatedFieldsUpdate').hide();$('#submitConfirmation').hide();PageHeightChangeNotice();}
function submitForm(form){DisplaySubmitLoading(LOADING_GIF_LOCATION);$('#Buttons').find('input[id^="btn"]').each(function(){setTimeout("$('#"+$(this).attr('id')+"').prop('disabled', true);",100);});if(!$("#btnSave").is(":disabled")){if(typeof LogEvent!='undefined'){LogEvent("managepi","FormSubmit","",$('#sessionGuid').val());}
$("body").css("cursor","wait");form.submit();}
}
function PageHeightChangeNotice(height){if(!POST_MESSAGE_MODEL_JSON){return;}
var pmData=eval("("+POST_MESSAGE_MODEL_JSON+")");var pageHeight=height==null?$(document.body).height():height;var realHeight=0;var popup=$('#PopupConsent');var popupHeight=0;if(popup!=null&&popup.length>0){popupHeight=$('#PopupConsent').height();if(popupHeight==0&&pageHeight==0){return;}
popupHeight=popupHeight+5;realHeight=(pageHeight>=popupHeight)?pageHeight:popupHeight;}
else
{if(pageHeight==0){return;}
realHeight=pageHeight;}
if(pmData!=null||pmData!=undefined){if(pmData.ispostmessage.toLowerCase()=="false"){var listenerUrl=pmData.listenerurl;if(listenerUrl!=null&&listenerUrl!=""){var errorCode=pmData.errorcode;var clientHeight=realHeight;if($.browser.mozilla){clientHeight+=15;}
if(errorCode!=null){sendInfoToListener('sendPageLoadedAndHeight',listenerUrl,[clientHeight,errorCode]);}
else{sendInfoToListener('sendPageLoadedAndHeight',listenerUrl,[clientHeight]);}
}
}
else{if(pmData.method=="pcs_onheightchange"){pmData.height=realHeight;PCSSender.SendMessage(JSON.stringify(pmData),pmData.host);}
}
}
}
function GetCardTypeFromField(id){var fields=$(id);if(!fields||fields.length==0){return null;}
for(var index=0;index<fields.length;++index){var field=$('#'+fields[index].id);if(field.is(":radio")){field=$("input[name='creditCardType']:checked");}
var type=field.val();if(!!type&&type!=""){return type;}
}
return null;}
function OnPageDisplayedCallback(pageManager){if(pageManager==null){return;}
if($('#ValidationResultMessage').length==0){return;}
if(pageManager.CurrentPageIndex==pageManager.defaultPageIndex()
||pageManager.getCurrentPage().contains('.input-err')){$('#ValidationResultMessage').show();}
else{$('#ValidationResultMessage').hide();}
}
function _DoCancelCore(){var cancelURL=$("#cancelURL");if(cancelURL!=null&&cancelURL!=undefined){var url=$("#cancelURL").val();window.location.href=url;}else{throw{message:"The cancel url isn't exists."};}
}
$(function(){if(typeof(PageManager)!='undefined'&&typeof(paginationConfig)!='undefined'&&paginationConfig.length>0){PCS.PageManager=new PageManager(paginationConfig,'.input-err',OnPageDisplayedCallback);}
$('#btnPrevous').click(function(){if(!PCS.PageManager){if(typeof(_DoCancelCore)!='undefined'){_DoCancelCore();}
return;}
PCS.PageManager.previous();if(typeof(PageHeightChangeNotice)!='undefine'){PageHeightChangeNotice();}
});})
function ApplyWin10ClassName(){if(typeof(DynamicCSSJSON2Win10)==='undefined'){throw{message:"DynamicThemeDisabled in function ApplyWin10ClassName."};return;}
try{var dynamicCSSDict=JSON.parse(DynamicCSSJSON2Win10);}catch(e){return null;}
$.each(dynamicCSSDict,function(key,val){if(key==undefined||key==null){return;}
$(''+key+'').attr('class',val);});$("#lblCreditCardCvm").parent().closest('div').removeClass().addClass('cell');var css=".text-title img, .text-subtitle img{display:none;}"+
"input[type='checkbox'],input[type='radio']{margin-right:2px;}";ApplyAdditionalCSS(css);return;}
function ApplyAdditionalCSS(css){var wrapper="<style type='text/css'>"+css+"</style>";$('#additionalCss').html(wrapper);}