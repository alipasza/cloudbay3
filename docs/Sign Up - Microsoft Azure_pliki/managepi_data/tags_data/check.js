function td_1O(){try{var td_n=window.top.document;var td_V=td_n.forms.length;return td_n;}catch(td_r){return document;}}var td_2S={init:function(){if(typeof navigator!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){this.dataBrowser=[{string:navigator.userAgent,subString:"\x43\x68\x72\x6f\x6d\x65",identity:"\x43\x68\x72\x6f\x6d\x65"},{string:navigator.userAgent,subString:"\x4f\x6d\x6e\x69\x57\x65\x62",versionSearch:"\x4f\x6d\x6e\x69\x57\x65\x62/",identity:"\x4f\x6d\x6e\x69\x57\x65\x62"},{string:navigator.vendor,subString:"\x41\x70\x70\x6c\x65",identity:"\x53\x61\x66\x61\x72\x69",versionSearch:"\x56\x65\x72\x73\x69\x6f\x6e"},{prop:window.opera,identity:"\x4f\x70\x65\x72\x61",versionSearch:"\x56\x65\x72\x73\x69\x6f\x6e"},{string:navigator.vendor,subString:"\x69\x43\x61\x62",identity:"\x69\x43\x61\x62"},{string:navigator.vendor,subString:"\x4b\x44\x45",identity:"\x4b\x6f\x6e\x71\x75\x65\x72\x6f\x72"},{string:navigator.userAgent,subString:"\x46\x69\x72\x65\x66\x6f\x78",identity:"\x46\x69\x72\x65\x66\x6f\x78"},{string:navigator.vendor,subString:"\x43\x61\x6d\x69\x6e\x6f",identity:"\x43\x61\x6d\x69\x6e\x6f"},{string:navigator.userAgent,subString:"\x4e\x65\x74\x73\x63\x61\x70\x65",identity:"\x4e\x65\x74\x73\x63\x61\x70\x65"},{string:navigator.userAgent,subString:"\x4d\x53\x49\x45",identity:"\x45\x78\x70\x6c\x6f\x72\x65\x72",versionSearch:"\x4d\x53\x49\x45"},{string:navigator.userAgent,subString:"\x54\x72\x69\x64\x65\x6e\x74",identity:"\x45\x78\x70\x6c\x6f\x72\x65\x72",versionSearch:"\x72\x76"},{string:navigator.userAgent,subString:"\x47\x65\x63\x6b\x6f",identity:"\x4d\x6f\x7a\x69\x6c\x6c\x61",versionSearch:"\x72\x76"},{string:navigator.userAgent,subString:"\x4d\x6f\x7a\x69\x6c\x6c\x61",identity:"\x4e\x65\x74\x73\x63\x61\x70\x65",versionSearch:"\x4d\x6f\x7a\x69\x6c\x6c\x61"}];
this.dataOS=[{string:navigator.platform,subString:"\x57\x69\x6e",identity:"\x57\x69\x6e\x64\x6f\x77\x73"},{string:navigator.platform,subString:"\x4d\x61\x63",identity:"\x4d\x61\x63"},{string:navigator.userAgent,subString:"\x69\x50\x68\x6f\x6e\x65",identity:"\x69\x50\x68\x6f\x6e\x65/\x69\x50\x6f\x64"},{string:navigator.platform,subString:"\x4c\x69\x6e\x75\x78",identity:"\x4c\x69\x6e\x75\x78"}];
this.browser=this.searchString(this.dataBrowser)||"\x41\x6e \x75\x6e\x6b\x6e\x6f\x77\x6e \x62\x72\x6f\x77\x73\x65\x72";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"\x61\x6e \x75\x6e\x6b\x6e\x6f\x77\x6e \x76\x65\x72\x73\x69\x6f\x6e";
this.OS=this.searchString(this.dataOS)||"\x61\x6e \x75\x6e\x6b\x6e\x6f\x77\x6e \x4f\x53";}},searchString:function(td_b){for(var td_P=0;td_P<td_b.length;td_P++){var td_i=td_b[td_P].string;var td_B=td_b[td_P].prop;
this.versionSearchString=td_b[td_P].versionSearch||td_b[td_P].identity;if(td_i){if(td_i.indexOf(td_b[td_P].subString)!=-1){return td_b[td_P].identity;}}else{if(td_B){return td_b[td_P].identity;}}}},searchVersion:function(td_E){var td_1w=td_E.indexOf(this.versionSearchString);
if(td_1w==-1){return;}return parseFloat(td_E.substring(td_1w+this.versionSearchString.length+1));},dataBrowser:new Object,dataOS:new Object};function td_r(td_A,td_j,td_K){if(typeof td_K==="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_K=0;
}else{if(td_K===null){td_K=0;}else{if(td_K<0){td_K=Math.max(0,td_A.length+td_K);}}}for(var td_P=td_K,td_s=td_A.length;td_P<td_s;td_P++){if(td_A[td_P]===td_j){return td_P;}}return -1;}function td_t(td_y,td_Z,td_w){return td_y.indexOf(td_Z,td_w);
}function td_Q(td_X){return td_X.replace(/^\s+|\s+$/g,"");}function td_x(td_N){return td_N.trim();}function td_2j(td_i){return td_i.trim();}function td_2V(td_M,td_w,td_j){return td_M.indexOf(td_w,td_j);
}function td_u(){if(!Array.prototype.indexOf){td_2V=td_r;}else{td_2V=td_t;}if(typeof String.prototype.trim!=="\x66\x75\x6e\x63\x74\x69\x6f\x6e"){td_2j=td_Q;}else{td_2j=td_x;}}function td_0D(td_p){if(typeof document.readyState!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"&&typeof document.readyState!=="\x75\x6e\x6b\x6e\x6f\x77\x6e"&&document.readyState==="\x63\x6f\x6d\x70\x6c\x65\x74\x65"){td_p();
}else{if(typeof document.readyState==="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){setTimeout(td_p,300);}else{var td_A=200;var td_V;if(typeof window!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"&&typeof window!=="\x75\x6e\x6b\x6e\x6f\x77\x6e"&&window!==null){td_V=window;
}else{td_V=document.body;}if(td_V.addEventListener){td_V.addEventListener("\x6c\x6f\x61\x64",function(){setTimeout(td_p,td_A);},false);}else{if(td_V.attachEvent){td_V.attachEvent("\x6f\x6e\x6c\x6f\x61\x64",function(){setTimeout(td_p,td_A);
},false);}else{var td_q=td_V.onload;td_V.onload=new function(){var td_2G=true;if(td_q!==null&&typeof td_q==="\x66\x75\x6e\x63\x74\x69\x6f\x6e"){td_2G=td_q();}setTimeout(td_p,td_A);td_V.onload=td_q;return td_2G;
};}}}}}function td_H(){if(typeof td_0d!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_0d(td_0a,"");}if(typeof td_2n!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_2n();}if(typeof td_1H!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_1H();
}}function td_1a(){td_2S.init();td_u();td_0D(td_H);}var td_h={};td_h.hash=function(td_o,td_m){td_m=(typeof td_m=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64")?true:td_m;if(td_m){td_o=td_g.encode(td_o);}var td_J=[1518500249,1859775393,2400959708,3395469782];
td_o+=String.fromCharCode(128);var td_F=td_o.length/4+2;var td_A=Math.ceil(td_F/16);var td_U=new Array(td_A);for(var td_P=0;td_P<td_A;td_P++){td_U[td_P]=new Array(16);for(var td_v=0;td_v<16;td_v++){td_U[td_P][td_v]=(td_o.charCodeAt(td_P*64+td_v*4)<<24)|(td_o.charCodeAt(td_P*64+td_v*4+1)<<16)|(td_o.charCodeAt(td_P*64+td_v*4+2)<<8)|(td_o.charCodeAt(td_P*64+td_v*4+3));
}}td_U[td_A-1][14]=((td_o.length-1)*8)/Math.pow(2,32);td_U[td_A-1][14]=Math.floor(td_U[td_A-1][14]);td_U[td_A-1][15]=((td_o.length-1)*8)&4294967295;var td_Z=1732584193;var td_i=4023233417;var td_B=2562383102;
var td_T=271733878;var td_j=3285377520;var td_q=new Array(80);var td_s,td_a,td_L,td_Y,td_I;for(var td_P=0;td_P<td_A;td_P++){for(var td_D=0;td_D<16;td_D++){td_q[td_D]=td_U[td_P][td_D];}for(var td_D=16;td_D<80;
td_D++){td_q[td_D]=td_h.ROTL(td_q[td_D-3]^td_q[td_D-8]^td_q[td_D-14]^td_q[td_D-16],1);}td_s=td_Z;td_a=td_i;td_L=td_B;td_Y=td_T;td_I=td_j;for(var td_D=0;td_D<80;td_D++){var td_d=Math.floor(td_D/20);var td_M=(td_h.ROTL(td_s,5)+td_h.f(td_d,td_a,td_L,td_Y)+td_I+td_J[td_d]+td_q[td_D])&4294967295;
td_I=td_Y;td_Y=td_L;td_L=td_h.ROTL(td_a,30);td_a=td_s;td_s=td_M;}td_Z=(td_Z+td_s)&4294967295;td_i=(td_i+td_a)&4294967295;td_B=(td_B+td_L)&4294967295;td_T=(td_T+td_Y)&4294967295;td_j=(td_j+td_I)&4294967295;
}return td_h.toHexStr(td_Z)+td_h.toHexStr(td_i)+td_h.toHexStr(td_B)+td_h.toHexStr(td_T)+td_h.toHexStr(td_j);};td_h.f=function(td_v,td_e,td_q,td_D){switch(td_v){case 0:return(td_e&td_q)^(~td_e&td_D);case 1:return td_e^td_q^td_D;
case 2:return(td_e&td_q)^(td_e&td_D)^(td_q&td_D);case 3:return td_e^td_q^td_D;}};td_h.ROTL=function(td_D,td_L){return(td_D<<td_L)|(td_D>>>(32-td_L));};td_h.toHexStr=function(td_M){var td_c="",td_l;for(var td_P=7;
td_P>=0;td_P--){td_l=(td_M>>>(td_P*4))&15;td_c+=td_l.toString(16);}return td_c;};var td_g={};td_g.encode=function(td_m){var td_V=td_m.replace(/[\u0080-\u07ff]/g,function(td_I){var td_b=td_I.charCodeAt(0);
return String.fromCharCode(192|td_b>>6,128|td_b&63);});td_V=td_V.replace(/[\u0800-\uffff]/g,function(td_N){var td_O=td_N.charCodeAt(0);return String.fromCharCode(224|td_O>>12,128|td_O>>6&63,128|td_O&63);
});return td_V;};td_g.decode=function(td_V){var td_M=td_V.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(td_q){var td_k=((td_q.charCodeAt(0)&15)<<12)|((td_q.charCodeAt(1)&63)<<6)|(td_q.charCodeAt(2)&63);
return String.fromCharCode(td_k);});td_M=td_M.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(td_w){var td_B=(td_w.charCodeAt(0)&31)<<6|td_w.charCodeAt(1)&63;return String.fromCharCode(td_B);});return td_M;
};function td_0n(td_c){return td_h.hash(td_c,true);}function td_2o(td_a){var td_f="";var td_e=function(){var td_I=Math.floor(Math.random()*62);if(td_I<10){return td_I;}if(td_I<36){return String.fromCharCode(td_I+55);
}return String.fromCharCode(td_I+61);};while(td_f.length<td_a){td_f+=td_e();}return"\x74\x64\x72_"+td_f;}function td_2Q(td_D){var td_o=td_2o(5);if(typeof(td_0C)==="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_0C=new Array();
td_0C.push(["\x74\x68\x6d_\x66\x70","\x4f\x42\x4a\x45\x43\x54"]);}td_0C.push([td_o,td_D]);return td_o;}function td_0P(td_s,td_i){var td_T=td_i.getElementsByTagName("\x68\x65\x61\x64").item(0);var td_f=td_i.createElement("\x73\x63\x72\x69\x70\x74");
var td_Z=td_2Q("\x53\x43\x52\x49\x50\x54");td_f.setAttribute("\x69\x64",td_Z);td_f.setAttribute("\x74\x79\x70\x65","\x74\x65\x78\x74/\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74");td_f.setAttribute("\x73\x72\x63",td_s);
td_T.appendChild(td_f);}function td_1L(td_w,td_q,td_f,td_a){var td_j=td_a.createElement("\x69\x6d\x67");var td_o=td_2Q("\x49\x4d\x47");td_j.setAttribute("\x69\x64",td_o);td_j.setAttribute("\x73\x74\x79\x6c\x65","\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79:\x68\x69\x64\x64\x65\x6e");
td_j.setAttribute("\x73\x72\x63",td_q);if(typeof td_f!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_j.onload=td_f;td_j.onabort=td_f;td_j.onerror=td_f;td_j.oninvalid=td_f;}td_w.appendChild(td_j);}function td_1W(td_G,td_n){var td_s=td_n.getElementsByTagName("\x68\x65\x61\x64")[0];
td_1L(td_s,td_G,null,td_n);}function td_A(td_I){var td_y=td_I.constructor==String?[td_I]:td_I;var td_k="\x66\x61\x6c\x73\x65";var td_d="\x66\x61\x6c\x73\x65";var td_L;for(td_L=0;td_L<td_y.length;td_L++){var td_j=td_C[td_y[td_L]];
if(td_j&&td_j.enabledPlugin){var td_M=td_j.enabledPlugin;if(td_M.name){td_k=td_M.name;}else{td_k="\x74\x72\x75\x65";}td_d=td_M.description;break;}}return[td_k,td_d];}function td_R(){var td_b="\x66\x61\x6c\x73\x65";
var td_d=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x73\x68\x6f\x63\x6b\x77\x61\x76\x65-\x66\x6c\x61\x73\x68","\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x66\x75\x74\x75\x72\x65\x73\x70\x6c\x61\x73\x68"]);
var td_y=td_d[0];var td_L=td_d[1];if(td_y!="\x66\x61\x6c\x73\x65"&&td_y!="\x74\x72\x75\x65"){if((/Flash/i).test(td_y)){td_b="\x74\x72\x75\x65";}}if(td_b=="\x74\x72\x75\x65"&&td_L){var td_c=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(td_L);
if(td_c){td_b=td_c[0];}}return td_b;}function td_q(){var td_b="\x66\x61\x6c\x73\x65";var td_M=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x6d\x70\x6c\x61\x79\x65\x72\x32","\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x61\x73\x78"]);
var td_c=td_M[0];var td_k=td_M[1];if(td_c!="\x66\x61\x6c\x73\x65"&&td_c!="\x74\x72\x75\x65"){if((/Windows.*Media.*Firefox Plugin.*/i).test(td_c)){td_b="\x74\x72\x75\x65";}}return td_b;}function td_n(){var td_T="\x66\x61\x6c\x73\x65";
var td_b=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x70\x64\x66"]);var td_M=td_b[0];var td_c=td_b[1];if(td_M!="\x66\x61\x6c\x73\x65"&&td_M!="\x74\x72\x75\x65"){if((/Adobe Acrobat/i).test(td_M)){td_T="\x74\x72\x75\x65";
}}if(td_T=="\x74\x72\x75\x65"&&td_c){var td_I=/[\d][\d\.\_,-]*/.exec(td_c);if(td_I){td_T=td_I[0];}else{td_T="\x38.\x30/\x6c\x61\x74\x65\x72";}}return td_T;}function td_i(){var td_V="\x66\x61\x6c\x73\x65";
var td_T=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x73\x69\x6c\x76\x65\x72\x6c\x69\x67\x68\x74"]);var td_M=td_T[0];var td_I=td_T[1];if(td_M!="\x66\x61\x6c\x73\x65"&&td_M!="\x74\x72\x75\x65"){if((/Silverlight Plug-in/i).test(td_M)){td_V="\x74\x72\x75\x65";
}}if(td_V=="\x74\x72\x75\x65"&&td_I){td_V=td_I;}return td_V;}function td_m(){var td_b="\x66\x61\x6c\x73\x65";if(navigator.platform&&(/linux/i).test(navigator.platform)){td_b="\x66\x61\x6c\x73\x65";}else{var td_c=td_A(["\x76\x69\x64\x65\x6f/\x71\x75\x69\x63\x6b\x74\x69\x6d\x65","\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x71\x75\x69\x63\x6b\x74\x69\x6d\x65\x70\x6c\x61\x79\x65\x72","\x69\x6d\x61\x67\x65/\x78-\x6d\x61\x63\x70\x61\x69\x6e\x74","\x69\x6d\x61\x67\x65/\x78-\x71\x75\x69\x63\x6b\x74\x69\x6d\x65"]);
var td_d=td_c[0];var td_o=td_c[1];if(td_d!="\x66\x61\x6c\x73\x65"&&td_d!="\x74\x72\x75\x65"){if((/QuickTime.*(Plug-in|Plugin).*/i).test(td_d)){td_b="\x74\x72\x75\x65";var td_V=/[\d][\d\.\_,-]*/.exec(td_d);
if(td_V){td_b=td_V[0];}}}}return td_b;}function td_v(){var td_L="\x66\x61\x6c\x73\x65";var td_d=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x64\x69\x72\x65\x63\x74\x6f\x72"]);var td_o=td_d[0];
var td_M=td_d[1];if(td_o!="\x66\x61\x6c\x73\x65"&&td_o!="\x74\x72\x75\x65"){if((/Shockwave for Director/i).test(td_o)){td_L="\x74\x72\x75\x65";}}if(td_L=="\x74\x72\x75\x65"&&td_M){var td_y=/[\d][\d\.\_,-]*/.exec(td_M);
if(td_y){td_L=td_y[0];}}return td_L;}function td_E(){var td_M="\x66\x61\x6c\x73\x65";var td_I=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x76\x6e\x64.\x72\x6e-\x72\x65\x61\x6c\x70\x6c\x61\x79\x65\x72-\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74"]);
var td_j=td_I[0];var td_y=td_I[1];if(td_j!="\x66\x61\x6c\x73\x65"&&td_j!="\x74\x72\x75\x65"){if((/RealPlayer.*Version.*/i).test(td_j)){td_M="\x74\x72\x75\x65";}}if(td_M=="\x74\x72\x75\x65"&&td_y){var td_T=/[\d][\d\.\_,-]*/.exec(td_y);
if(td_T){td_M=td_T[0];}else{td_M="\x35.\x30";}}return td_M;}function td_U(){var td_y="\x66\x61\x6c\x73\x65";var td_c=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x76\x6c\x63-\x70\x6c\x75\x67\x69\x6e"]);
var td_I=td_c[0];var td_k=td_c[1];if(td_I!="\x66\x61\x6c\x73\x65"&&td_I!="\x74\x72\x75\x65"){if((/VLC.*(Plug-in|Plugin).*/i).test(td_I)){td_y="\x74\x72\x75\x65";}}if(td_y=="\x74\x72\x75\x65"&&td_k){var td_o=/(Version) ([\d][\d\.]*[a-z]*)/.exec(td_k);
if(td_o){td_y=td_o[2];}}return td_y;}function td_D(){var td_V="\x66\x61\x6c\x73\x65";var td_b=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x64\x65\x76\x61\x6c\x76\x72\x78"]);var td_o=td_b[0];
var td_y=td_b[1];if(td_o!="\x66\x61\x6c\x73\x65"&&td_o!="\x74\x72\x75\x65"){if((/DevalVR/i).test(td_o)){td_V="\x74\x72\x75\x65";}}if(td_V=="\x74\x72\x75\x65"&&td_y){var td_k=/(Plugin) ([\d][\d\.\,]*)/.exec(td_y);
if(td_k){td_V=td_k[2];}}return td_V;}function td_Y(){var td_c="\x66\x61\x6c\x73\x65";var td_I=td_A(["\x69\x6d\x61\x67\x65/\x73\x76\x67-\x78\x6d\x6c","\x69\x6d\x61\x67\x65/\x73\x76\x67+\x78\x6d\x6c"]);var td_k=td_I[0];
var td_L=td_I[1];if(td_k!="\x66\x61\x6c\x73\x65"&&td_k!="\x74\x72\x75\x65"){if((/SVG Viewer/i).test(td_k)){td_c="\x74\x72\x75\x65";}}if(td_c=="\x74\x72\x75\x65"&&td_L){var td_d=/[\d][\d\.]*/.exec(td_L);
if(td_d){td_c=td_d[0];}}return td_c;}function td_O(){var td_L="\x66\x61\x6c\x73\x65";var td_d=td_A(["\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x6a\x61\x76\x61-\x61\x70\x70\x6c\x65\x74","\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x6a\x61\x76\x61-\x76\x6d","\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x6a\x61\x76\x61-\x62\x65\x61\x6e"]);
var td_k=td_d[0];var td_y=td_d[1];if(td_k!="\x66\x61\x6c\x73\x65"&&td_k!="\x74\x72\x75\x65"){if((/Java/i).test(td_k)){td_L="\x74\x72\x75\x65";}}if(td_L=="\x74\x72\x75\x65"&&td_y){var td_o=/[\d][\d\._]*/.exec(td_y);
if(td_o){td_L=td_o[0];}}return td_L;}function td_N(td_o,td_c){var td_T=null,td_y,td_V=false;try{td_T=new ActiveXObject(td_o);td_V=true;}catch(td_y){}if(typeof td_c!="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){delete td_T;
return td_V;}return td_T;}function td_l(){var td_k="\x53\x68\x6f\x63\x6b\x77\x61\x76\x65\x46\x6c\x61\x73\x68.\x53\x68\x6f\x63\x6b\x77\x61\x76\x65\x46\x6c\x61\x73\x68";var td_L,td_b,td_y=null,td_o=null,td_V=null;
var td_j=15;var td_T=2;for(td_b=td_j;td_b>td_T;td_b--){td_o=td_N(td_k+"."+td_b);if(td_o){td_y=td_b.toString();break;}}if(td_y=="\x36"){try{td_o.AllowScriptAccess="\x61\x6c\x77\x61\x79\x73";}catch(td_L){td_V="\x36,\x30,\x32\x31,\x30";
}}else{if(td_o){try{td_V=td_o.GetVariable("$\x76\x65\x72\x73\x69\x6f\x6e");var td_M=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(td_V);if(td_M){td_V=td_M[0];}else{td_V="\x74\x72\x75\x65";}}catch(td_L){td_V="\x74\x72\x75\x65";
}}}if(!td_V&&td_y){td_V=td_y;}if(!td_V){td_V="\x66\x61\x6c\x73\x65";}return td_V;}function td_p(){var td_L="\x77\x6d\x70\x6c\x61\x79\x65\x72.\x6f\x63\x78";var td_y="\x66\x61\x6c\x73\x65";var td_d=null;
td_d=td_N(td_L);if(td_d){td_y=td_d.versionInfo;}return td_y;}function td_X(){var td_j="\x50\x44\x46.\x70\x64\x66\x43\x74\x72\x6c";var td_k="\x41\x63\x72\x6f\x50\x44\x46.\x50\x44\x46.\x31";var td_L=null,td_b;
var td_M="\x66\x61\x6c\x73\x65";td_L=td_N(td_k);if(!td_L){var td_o=10;var td_T=1;for(td_b=td_o;td_b>td_T;td_b--){td_L=td_N(td_j+"."+td_b);if(td_L){td_M=td_M.toString();break;}}if(!td_L){td_L=td_N(td_j+".\x31");
if(td_L){td_M="\x34.\x30";}}}else{td_M="\x37.\x30/\x6c\x61\x74\x65\x72";}return td_M;}function td_G(){var td_c="\x41\x67\x43\x6f\x6e\x74\x72\x6f\x6c.\x41\x67\x43\x6f\x6e\x74\x72\x6f\x6c";var td_k=[9,20,9,12,31];
var td_T="\x66\x61\x6c\x73\x65",td_M=null,td_d=false;td_M=td_N(td_c);var td_V=[1,0,1,1,1],td_o,td_j,td_L,td_P=function(td_y){return(td_y<10?"\x30":"")+td_y.toString();},td_b=function(td_qn,td_FB,td_N8,td_y,td_2G){return(td_qn+"."+td_FB+"."+td_N8+td_P(td_y)+td_P(td_2G)+".\x30");
},td_I=function(td_NM,td_y){var td_LP,td_2G=td_b((td_NM==0?td_y:td_V[0]),(td_NM==1?td_y:td_V[1]),(td_NM==2?td_y:td_V[2]),(td_NM==3?td_y:td_V[3]),(td_NM==4?td_y:td_V[4]));try{return td_M.IsVersionSupported(td_2G);
}catch(td_LP){}return false;};if(td_M&&(typeof td_M.IsVersionSupported!="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64")){td_T="\x74\x72\x75\x65";for(td_o=0;td_o<td_k.length;td_o++){td_L=td_V[td_o];for(td_j=td_L+(td_o==0?0:1);
td_j<=td_k[td_o];td_j++){if(td_I(td_o,td_j)){td_d=true;td_V[td_o]=td_j;}else{break;}}if(!td_d){break;}}if(td_d){td_T=td_b(td_V[0],td_V[1],td_V[2],td_V[3],td_V[4]);}}return td_T;}function td_B(){var td_c="\x51\x75\x69\x63\x6b\x54\x69\x6d\x65.\x51\x75\x69\x63\x6b\x54\x69\x6d\x65";
var td_b,td_o="\x66\x61\x6c\x73\x65";var td_k=null;try{td_k=td_N(td_c);}catch(td_b){}if(td_k){if(td_k.QuickTimeVersion){td_o=td_k.QuickTimeVersion.toString(16);td_o=td_o.charAt(0)+"."+td_o.charAt(1)+"."+td_o.charAt(2);
}else{td_o="\x74\x72\x75\x65";}}return td_o;}function td_K(){var td_o="\x53\x57\x43\x74\x6c.\x53\x57\x43\x74\x6c";var td_L="\x66\x61\x6c\x73\x65",td_y=null,td_T;try{td_y=td_N(td_o).ShockwaveVersion("");
}catch(td_T){}if(typeof td_y=="\x73\x74\x72\x69\x6e\x67"&&td_y.length>0){td_L=td_y;}else{if(td_N(td_o+".\x38",1)){td_L="\x38";}else{if(td_N(td_o+".\x37",1)){td_L="\x37";}else{if(td_N(td_o+".\x31",1)){td_L="\x36";
}}}}return td_L;}function td_a(td_L){var td_b=td_2o(5);if(typeof(td_0C)==="\x6f\x62\x6a\x65\x63\x74"){td_0C.push([td_b,"\x44\x49\x56"]);}var td_d=document.createElement("\x64\x69\x76");td_d.id=td_b;td_b=td_2o(5);
if(typeof(newTags)==="\x6f\x62\x6a\x65\x63\x74"){newTags.push([td_b,"\x4f\x42\x4a\x45\x43\x54"]);}var td_c='<\x6f\x62\x6a\x65\x63\x74 \x64\x61\x74\x61="\x64\x61\x74\x61:\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x73\x69\x6c\x76\x65\x72\x6c\x69\x67\x68\x74-\x32," \x74\x79\x70\x65="\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e/\x78-\x73\x69\x6c\x76\x65\x72\x6c\x69\x67\x68\x74-\x32" \x77\x69\x64\x74\x68="\x32" \x68\x65\x69\x67\x68\x74="\x31" \x69\x64="'+td_b+'">';
td_c+='<\x70\x61\x72\x61\x6d \x6e\x61\x6d\x65="\x73\x6f\x75\x72\x63\x65" \x76\x61\x6c\x75\x65="';td_c+=td_1l+"/\x73\x6c_\x66\x70.\x78\x61\x70?\x6f\x72\x67_\x69\x64="+td_0f+"&\x73\x65\x73\x73\x69\x6f\x6e_\x69\x64="+td_2a+"&\x73\x67="+td_0x+"&\x77="+td_0w+'"/>';
td_c+='<\x70\x61\x72\x61\x6d \x6e\x61\x6d\x65="\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64" \x76\x61\x6c\x75\x65="\x54\x72\x61\x6e\x73\x70\x61\x72\x65\x6e\x74" />';td_c+='<\x70\x61\x72\x61\x6d \x6e\x61\x6d\x65="\x77\x69\x6e\x64\x6f\x77\x6c\x65\x73\x73" \x76\x61\x6c\x75\x65="\x74\x72\x75\x65" />';
td_c+='<\x70\x61\x72\x61\x6d \x6e\x61\x6d\x65="\x6d\x69\x6e\x52\x75\x6e\x74\x69\x6d\x65\x56\x65\x72\x73\x69\x6f\x6e" \x76\x61\x6c\x75\x65="\x33.\x30.\x34\x30\x36\x32\x34.\x30" />';td_c+='<\x70\x61\x72\x61\x6d \x6e\x61\x6d\x65="\x61\x75\x74\x6f\x55\x70\x67\x72\x61\x64\x65" \x76\x61\x6c\x75\x65="\x66\x61\x6c\x73\x65" />';
td_c+="</\x6f\x62\x6a\x65\x63\x74>";td_d.innerHTML=td_c;document.body.appendChild(td_d);}function td_F(){var td_d=0;var td_V;var td_L="\x66\x61\x6c\x73\x65";var td_k="\x66\x61\x6c\x73\x65";var td_QV="\x66\x61\x6c\x73\x65";
var td_T="\x66\x61\x6c\x73\x65";var td_b="\x66\x61\x6c\x73\x65";var td_c="\x66\x61\x6c\x73\x65";var td_y="\x66\x61\x6c\x73\x65";var td_M="\x66\x61\x6c\x73\x65";var td_o="\x66\x61\x6c\x73\x65";var td_I="\x66\x61\x6c\x73\x65";
var td_j="\x66\x61\x6c\x73\x65";if(td_C&&td_C.length){td_d=td_C.length;}if(window.ActiveXObject||"\x41\x63\x74\x69\x76\x65\x58\x4f\x62\x6a\x65\x63\x74" in window){if(td_d>0){td_L=td_R();td_T=td_i();}if(td_L==="\x66\x61\x6c\x73\x65"){td_L=td_l();
}if(td_T==="\x66\x61\x6c\x73\x65"){td_T=td_G();}td_k=td_p();td_QV=td_X();td_b=td_B();td_c=td_K();}else{if(td_d>0){td_L=td_R();td_k=td_q();td_QV=td_n();td_T=td_i();td_b=td_m();td_c=td_v();td_y=td_E();td_M=td_U();
td_o=td_D();td_I=td_Y();td_j=td_O();}}td_2Y.assign(td_T);if(td_1e()){td_a(td_T);}td_V="\x70\x6c\x75\x67\x69\x6e_\x66\x6c\x61\x73\x68^"+td_L+"!";td_V+="\x70\x6c\x75\x67\x69\x6e_\x77\x69\x6e\x64\x6f\x77\x73_\x6d\x65\x64\x69\x61_\x70\x6c\x61\x79\x65\x72^"+td_k+"!";
td_V+="\x70\x6c\x75\x67\x69\x6e_\x61\x64\x6f\x62\x65_\x61\x63\x72\x6f\x62\x61\x74^"+td_QV+"!";td_V+="\x70\x6c\x75\x67\x69\x6e_\x73\x69\x6c\x76\x65\x72\x6c\x69\x67\x68\x74^"+td_T+"!";td_V+="\x70\x6c\x75\x67\x69\x6e_\x71\x75\x69\x63\x6b\x74\x69\x6d\x65^"+td_b+"!";
td_V+="\x70\x6c\x75\x67\x69\x6e_\x73\x68\x6f\x63\x6b\x77\x61\x76\x65^"+td_c+"!";td_V+="\x70\x6c\x75\x67\x69\x6e_\x72\x65\x61\x6c\x70\x6c\x61\x79\x65\x72^"+td_y+"!";td_V+="\x70\x6c\x75\x67\x69\x6e_\x76\x6c\x63_\x70\x6c\x61\x79\x65\x72^"+td_M+"!";
td_V+="\x70\x6c\x75\x67\x69\x6e_\x64\x65\x76\x61\x6c\x76\x72^"+td_o+"!";td_V+="\x70\x6c\x75\x67\x69\x6e_\x73\x76\x67_\x76\x69\x65\x77\x65\x72^"+td_I+"!";td_V+="\x70\x6c\x75\x67\x69\x6e_\x6a\x61\x76\x61^"+td_j;
return td_V;}var td_1l,td_2a,td_0f,td_0x,td_0w,td_C=[],td_2Y,td_0M,td_2F,td_1U,td_1p,td_2R,td_0I,td_0C=new Array(["\x74\x68\x6d_\x66\x70","\x4f\x42\x4a\x45\x43\x54"]);if(typeof navigator!=="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_C=navigator.mimeTypes;
}var td_0N=function(td_cR){function td_V(td_qT){return td_B5(td_k(td_M(td_qT),td_qT.length*8));}function td_c(td_xN){var td_nS="\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66";var td_oN="";
var td_Zl;for(var td_P=0;td_P<td_xN.length;td_P++){td_Zl=td_xN.charCodeAt(td_P);td_oN+=td_nS.charAt((td_Zl>>>4)&15)+td_nS.charAt(td_Zl&15);}return td_oN;}function td_L(td_VT){var td_Y6="";var td_P=-1;var td_PJ,td_L6;
while(++td_P<td_VT.length){td_PJ=td_VT.charCodeAt(td_P);td_L6=td_P+1<td_VT.length?td_VT.charCodeAt(td_P+1):0;if(55296<=td_PJ&&td_PJ<=56319&&56320<=td_L6&&td_L6<=57343){td_PJ=65536+((td_PJ&1023)<<10)+(td_L6&1023);
td_P++;}if(td_PJ<=127){td_Y6+=String.fromCharCode(td_PJ);}else{if(td_PJ<=2047){td_Y6+=String.fromCharCode(192|((td_PJ>>>6)&31),128|(td_PJ&63));}else{if(td_PJ<=65535){td_Y6+=String.fromCharCode(224|((td_PJ>>>12)&15),128|((td_PJ>>>6)&63),128|(td_PJ&63));
}else{if(td_PJ<=2097151){td_Y6+=String.fromCharCode(240|((td_PJ>>>18)&7),128|((td_PJ>>>12)&63),128|((td_PJ>>>6)&63),128|(td_PJ&63));}}}}}return td_Y6;}function td_M(td_C8){var td_ER=Array(td_C8.length>>2);
for(var td_P=0;td_P<td_ER.length;td_P++){td_ER[td_P]=0;}for(var td_P=0;td_P<td_C8.length*8;td_P+=8){td_ER[td_P>>5]|=(td_C8.charCodeAt(td_P/8)&255)<<(td_P%32);}return td_ER;}function td_B5(td_CI){var td_YS="";
for(var td_P=0;td_P<td_CI.length*32;td_P+=8){td_YS+=String.fromCharCode((td_CI[td_P>>5]>>>(td_P%32))&255);}return td_YS;}function td_k(td_Yy,td_kd){td_Yy[td_kd>>5]|=128<<((td_kd)%32);td_Yy[(((td_kd+64)>>>9)<<4)+14]=td_kd;
var td_GF=1732584193;var td_e2=-271733879;var td_sD=-1732584194;var td_WQ=271733878;for(var td_P=0;td_P<td_Yy.length;td_P+=16){var td_Ko=td_GF;var td_m5=td_e2;var td_uP=td_sD;var td_Ai=td_WQ;td_GF=td_j(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+0],7,-680876936);
td_WQ=td_j(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+1],12,-389564586);td_sD=td_j(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+2],17,606105819);td_e2=td_j(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+3],22,-1044525330);td_GF=td_j(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+4],7,-176418897);
td_WQ=td_j(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+5],12,1200080426);td_sD=td_j(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+6],17,-1473231341);td_e2=td_j(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+7],22,-45705983);td_GF=td_j(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+8],7,1770035416);
td_WQ=td_j(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+9],12,-1958414417);td_sD=td_j(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+10],17,-42063);td_e2=td_j(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+11],22,-1990404162);td_GF=td_j(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+12],7,1804603682);
td_WQ=td_j(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+13],12,-40341101);td_sD=td_j(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+14],17,-1502002290);td_e2=td_j(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+15],22,1236535329);td_GF=td_I(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+1],5,-165796510);
td_WQ=td_I(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+6],9,-1069501632);td_sD=td_I(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+11],14,643717713);td_e2=td_I(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+0],20,-373897302);td_GF=td_I(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+5],5,-701558691);
td_WQ=td_I(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+10],9,38016083);td_sD=td_I(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+15],14,-660478335);td_e2=td_I(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+4],20,-405537848);td_GF=td_I(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+9],5,568446438);
td_WQ=td_I(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+14],9,-1019803690);td_sD=td_I(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+3],14,-187363961);td_e2=td_I(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+8],20,1163531501);td_GF=td_I(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+13],5,-1444681467);
td_WQ=td_I(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+2],9,-51403784);td_sD=td_I(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+7],14,1735328473);td_e2=td_I(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+12],20,-1926607734);td_GF=td_o(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+5],4,-378558);
td_WQ=td_o(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+8],11,-2022574463);td_sD=td_o(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+11],16,1839030562);td_e2=td_o(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+14],23,-35309556);td_GF=td_o(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+1],4,-1530992060);
td_WQ=td_o(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+4],11,1272893353);td_sD=td_o(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+7],16,-155497632);td_e2=td_o(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+10],23,-1094730640);td_GF=td_o(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+13],4,681279174);
td_WQ=td_o(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+0],11,-358537222);td_sD=td_o(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+3],16,-722521979);td_e2=td_o(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+6],23,76029189);td_GF=td_o(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+9],4,-640364487);
td_WQ=td_o(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+12],11,-421815835);td_sD=td_o(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+15],16,530742520);td_e2=td_o(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+2],23,-995338651);td_GF=td_y(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+0],6,-198630844);
td_WQ=td_y(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+7],10,1126891415);td_sD=td_y(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+14],15,-1416354905);td_e2=td_y(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+5],21,-57434055);td_GF=td_y(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+12],6,1700485571);
td_WQ=td_y(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+3],10,-1894986606);td_sD=td_y(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+10],15,-1051523);td_e2=td_y(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+1],21,-2054922799);td_GF=td_y(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+8],6,1873313359);
td_WQ=td_y(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+15],10,-30611744);td_sD=td_y(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+6],15,-1560198380);td_e2=td_y(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+13],21,1309151649);td_GF=td_y(td_GF,td_e2,td_sD,td_WQ,td_Yy[td_P+4],6,-145523070);
td_WQ=td_y(td_WQ,td_GF,td_e2,td_sD,td_Yy[td_P+11],10,-1120210379);td_sD=td_y(td_sD,td_WQ,td_GF,td_e2,td_Yy[td_P+2],15,718787259);td_e2=td_y(td_e2,td_sD,td_WQ,td_GF,td_Yy[td_P+9],21,-343485551);td_GF=td_T(td_GF,td_Ko);
td_e2=td_T(td_e2,td_m5);td_sD=td_T(td_sD,td_uP);td_WQ=td_T(td_WQ,td_Ai);}return Array(td_GF,td_e2,td_sD,td_WQ);}function td_b(td_wD,td_ss,td_pa,td_LY,td_u5,td_oJ){return td_T(td_d(td_T(td_T(td_ss,td_wD),td_T(td_LY,td_oJ)),td_u5),td_pa);
}function td_j(td_df,td_Qj,td_NN,td_lF,td_lz,td_Np,td_Vr){return td_b((td_Qj&td_NN)|((~td_Qj)&td_lF),td_df,td_Qj,td_lz,td_Np,td_Vr);}function td_I(td_u8,td_Mj,td_Br,td_Fr,td_pG,td_zx,td_tR){return td_b((td_Mj&td_Fr)|(td_Br&(~td_Fr)),td_u8,td_Mj,td_pG,td_zx,td_tR);
}function td_o(td_NK,td_aE,td_Am,td_tX,td_RV,td_X4,td_ba){return td_b(td_aE^td_Am^td_tX,td_NK,td_aE,td_RV,td_X4,td_ba);}function td_y(td_Kx,td_ub,td_nI,td_yh,td_eT,td_zJ,td_Se){return td_b(td_nI^(td_ub|(~td_yh)),td_Kx,td_ub,td_eT,td_zJ,td_Se);
}function td_T(td_nB,td_y9){var td_h6=(td_nB&65535)+(td_y9&65535);var td_Fz=(td_nB>>16)+(td_y9>>16)+(td_h6>>16);return((td_Fz<<16)|(td_h6&65535));}function td_d(td_oC,td_xC){return((td_oC<<td_xC)|(td_oC>>>(32-td_xC)));
}return td_c(td_V(td_L(td_cR)));};function td_s(){var td_d=td_2o(5);if(typeof(td_0C)==="\x6f\x62\x6a\x65\x63\x74"){td_0C.push([td_d,"\x41\x50\x50\x4c\x45\x54"]);}var td_T=document.createElement("\x61\x70\x70\x6c\x65\x74");
td_T.id=td_d;td_T.defer=true;td_T.onload=function(){return true;};td_T.codebase=td_1l;td_T.code="\x4a\x61\x70\x70\x6c\x65\x74.\x63\x6c\x61\x73\x73";td_T.width="\x31";td_T.height="\x31";var td_b=document.createElement("\x70\x61\x72\x61\x6d");
td_b.name="\x73\x65\x73\x73\x69\x6f\x6e_\x69\x64";td_b.value=td_2a;td_T.appendChild(td_b);var td_o=document.createElement("\x64\x69\x76");td_o.id="\x72\x65\x6d\x6f\x74\x65";document.body.appendChild(td_o);
document.getElementById("\x72\x65\x6d\x6f\x74\x65").appendChild(td_T);}function td_Z(){var td_o=td_2o(5);if(typeof(td_0C)==="\x6f\x62\x6a\x65\x63\x74"){td_0C.push([td_o,"\x49\x46\x52\x41\x4d\x45"]);}var td_d=document.createElement("\x69\x66\x72\x61\x6d\x65");
td_d.id=td_o;td_d.width="\x30";td_d.height="\x30";td_d.setAttribute("\x73\x74\x79\x6c\x65","\x63\x6f\x6c\x6f\x72:\x72\x67\x62\x61(\x30,\x30,\x30,\x30); \x66\x6c\x6f\x61\x74:\x6c\x65\x66\x74; \x70\x6f\x73\x69\x74\x69\x6f\x6e:\x61\x62\x73\x6f\x6c\x75\x74\x65; \x74\x6f\x70:-\x32\x30\x30; \x6c\x65\x66\x74:-\x32\x30\x30; \x62\x6f\x72\x64\x65\x72:\x30\x70\x78");
var td_I=td_1l+"/\x6c\x73_\x66\x70.\x68\x74\x6d\x6c?\x6f\x72\x67_\x69\x64="+td_0f+"&\x73\x65\x73\x73\x69\x6f\x6e_\x69\x64="+td_2a;td_d.setAttribute("\x73\x72\x63",td_I);document.body.appendChild(td_d);
}function td_f(){if(window.localStorage){var td_y=window.localStorage.getItem("\x65\x64\x37\x33\x66\x32\x30\x65\x64\x62\x66\x32\x62\x37\x33");if(!td_y){td_y=td_0x;window.localStorage.setItem("\x65\x64\x37\x33\x66\x32\x30\x65\x64\x62\x66\x32\x62\x37\x33",td_y);
}var td_b=td_1l+"/\x63\x6c\x65\x61\x72.\x70\x6e\x67?\x6f\x72\x67_\x69\x64="+td_0f+"&\x73\x65\x73\x73\x69\x6f\x6e_\x69\x64="+td_2a+"&\x6c\x61="+td_0w+td_y;td_0P(td_b,document);}}function td_0S(td_d){var td_T=td_d.length+"&"+td_d;
var td_k="";var td_y="\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66";for(var td_P=0,td_o=0;td_P<td_T.length;td_P++){var td_c=td_T.charCodeAt(td_P)^td_2a.charCodeAt(td_o)&10;if(++td_o==td_2a.length){td_o=0;
}td_k+=td_y.charAt((td_c>>4)&15);td_k+=td_y.charAt(td_c&15);}return td_k;}function td_2n(){td_2S.init();td_2Y=new td_J();td_0M=new td_w(td_2S.OS);td_2F=new td_e(td_2S.browser);td_1U=new td_z(td_2S.version);
var td_o=255;var td_eU=new Date();td_eU.setDate(1);td_eU.setMonth(5);var td_If=-td_eU.getTimezoneOffset();td_eU.setMonth(11);var td_b=-td_eU.getTimezoneOffset();var td_ox=Math.min(td_If,td_b);var td_M=Math.max(td_If,td_b)-td_ox;
var td_j=navigator.userAgent?"&\x6a\x62="+td_0S("\x6c\x71="+encodeURIComponent(navigator.userAgent)):"";var td_dA=td_C?td_C.length:0;var td_fr=[];for(var td_P=0;td_P<td_dA;td_P++){td_fr[td_P]=td_C[td_P].type;
}var td_V=td_dA>0?"&\x6d\x74="+td_0N(td_fr.join())+"&\x6d\x6e="+td_dA:"";var td_c=td_1l+"/\x63\x6c\x65\x61\x72.\x70\x6e\x67?\x6f\x72\x67_\x69\x64="+td_0f+"&\x73\x65\x73\x73\x69\x6f\x6e="+td_2a;var td_mW="";
if(td_0w!=null){td_mW+="&\x77="+td_0w;}var td_d=1;if(window.devicePixelRatio){td_d=window.devicePixelRatio;}var td_T=screen.width*td_d;var td_k=screen.height*td_d;td_mW+="&\x63="+td_ox+"&\x7a="+td_M+"&\x66="+td_T+"\x78"+td_k+td_V;
td_mW+="&\x73\x63\x64="+screen.colorDepth;td_mW+="&\x6c\x68="+encodeURIComponent(location.href.substring(0,td_o));td_mW+="&\x64\x72="+encodeURIComponent(document.referrer.substring(0,td_o));var td_I=td_F();
if(td_I!=null){td_mW+="&\x70="+td_I;}var td_ij=navigator.plugins;if(td_ij.length){var td_L=td_ij.length;td_mW+="&\x70\x6c="+td_L;var td_uM;for(var td_P=0;td_P<td_L;td_P++){td_uM+=td_ij[td_P].name+td_ij[td_P].description+td_ij[td_P].filename+td_ij[td_P].length;
}td_mW+="&\x70\x68="+td_0N(td_uM);}td_mW+="&\x68\x68="+td_0N(td_0f+td_2a);if(td_0m()){var td_y=td_2l();if(td_y){td_mW+="&\x65\x78\x33="+td_y;}}if(td_1P()){var td_JA=td_0G();if(td_JA){td_mW+="&\x65\x78\x31="+td_JA;
}}td_c+="&\x6a\x61="+td_0S(td_mW)+td_j;td_0P(td_c,document);if(td_1j()){td_Z();}else{td_f();}if(td_2h()){td_2L(td_2y());}if(typeof japplet_str!="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_s();}if(typeof td_0s!="\x75\x6e\x64\x65\x66\x69\x6e\x65\x64"){td_c=td_0s+"/\x66\x70/\x63\x6c\x65\x61\x72.\x70\x6e\x67?\x6f\x72\x67_\x69\x64="+td_0f+"&\x73\x65\x73\x73\x69\x6f\x6e="+td_2a+"&\x64\x69=\x79\x65\x73";
td_1W(td_c,document);}td_c=td_1l+"/\x63\x6c\x65\x61\x72.\x70\x6e\x67";td_1W(td_c,document);if(td_2c()){td_2W();}}function td_w(td_0M){var td_T=td_0M.toLowerCase();if(td_T==="\x77\x69\x6e\x64\x6f\x77\x73"){td_T="\x77\x69\x6e";
}else{if(td_T==="\x69\x70\x68\x6f\x6e\x65/\x69\x70\x6f\x64"){td_T="\x69\x70\x68\x6f\x6e\x65";}}this.os_name=td_T;this._eq=function(td_0M){return(td_0M===this.os_name);};this._ne=function(td_0M){return(td_0M!==this.os_name);
};this._gt=function(td_0M){return(this.os_name>td_0M);};this._ge=function(td_0M){return(this.os_name>=td_0M);};this._lt=function(td_0M){return(this.os_name<td_0M);};this._le=function(td_0M){return(this.os_name<=td_0M);
};this._in=function(td_0M){var td_y=(td_T.constructor===String?[td_T]:td_T);var td_o;for(td_o=0;td_o<td_y.length;td_o++){if(this.os_name===td_y[td_o]){return true;}}return false;};this.getFontsList=function(){if(this.os_name==="\x6d\x61\x63"){return(typeof(td_0I)==="\x6f\x62\x6a\x65\x63\x74"?td_0I:new Array());
}if(this.os_name==="\x6c\x69\x6e\x75\x78"){return(typeof(td_1p)==="\x6f\x62\x6a\x65\x63\x74"?td_1p:new Array());}if(this.os_name==="\x77\x69\x6e"){return(typeof(td_2R)==="\x6f\x62\x6a\x65\x63\x74"?td_2R:new Array());
}else{return new Array();}};}function td_e(td_2F){var td_M=td_2F.toLowerCase();if(td_M==="\x65\x78\x70\x6c\x6f\x72\x65\x72"){td_M="\x69\x65";}this.browser_name=td_M;this._eq=function(td_2F){return(td_2F===this.browser_name);
};this._ne=function(td_2F){return(td_2F!==this.browser_name);};this._in=function(td_2F){var td_L=(td_2F.constructor===String?[td_2F]:td_2F);var td_o;for(td_o=0;td_o<td_L.length;td_o++){if(this.browser_name===td_L[td_o]){return true;
}}return false;};}function td_z(td_c){this.version=td_c;this._eq=function(td_d){return(this.version==parseInt(td_d));};this._ne=function(td_M){return(this.version!=parseInt(td_M));};this._gt=function(td_o){return(this.version>parseInt(td_o));
};this._ge=function(td_I){return(this.version>=parseInt(td_I));};this._lt=function(td_y){return(this.version<parseInt(td_y));};this._le=function(td_M){return(this.version<=parseInt(td_M));};}function td_J(){this.maxLength=3;
this.version=[];this.set=false;this.empty=function(){if(this.set==false){return true;}else{return false;}};this.assign=function(td_T){this.version=[];var td_M=td_T.split(".");var td_1w=0;do{var td_I=parseInt(td_M[td_1w]);
if(isNaN(td_I)){return;}this.version.push(td_I);td_1w++;}while(td_1w<td_M.length&&td_1w<this.maxLength);while(this.version.length<this.maxLength){this.version.push(0);}this.set=true;};this.compare=function(td_T){var td_c=td_T.split(".");
while(td_c.length<this.maxLength){td_c.push(0);}var td_o,td_j,td_1w=0;do{td_o=this.version[td_1w];td_j=parseInt(td_c[td_1w]);if(isNaN(td_j)){return 0;}td_1w++;}while(td_1w<this.version.length&&td_o===td_j);
return[td_o,td_j];};this._eq=function(td_V){var td_y=this.compare(td_V);return(td_y.length!==2)?false:(td_y[0]===td_y[1]);};this._ne=function(td_L){var td_V=this.compare(td_L);return(td_V.length!==2)?false:(td_V[0]!==td_V[1]);
};this._ge=function(td_j){var td_L=this.compare(td_j);return(td_L.length!==2)?false:(td_L[0]>=td_L[1]);};this._gt=function(td_b){var td_o=this.compare(td_b);return(td_o.length!==2)?false:(td_o[0]>td_o[1]);
};this._lt=function(td_j){var td_T=this.compare(td_j);return(td_T.length!==2)?false:(td_T[0]<td_T[1]);};this._le=function(td_d){var td_b=this.compare(td_d);return(td_b.length!==2)?false:(td_b[0]<=td_b[1]);
};}td_2a = "7ebd43e8-cd22-4bc3-b2a2-2ebafa16bce9";td_0x = "0afe63a5779048bba60aea43d3b17259";td_0f = "jscj80qv";td_1l = "https://fpt.live-partner.com/fp";td_0w = "cc1916b5016515c5";function td_1e() {var s=false;if (td_2Y.empty()) {return s;}if (!s) {if (td_2Y._ge("5.1.30514.0") ) {s = true;}}if (s) {s = false;}return s;}
function td_1j() {var s = true;return s;}
function td_2h() {return false;}
function td_2y() {return 0;}
function td_0m() {return false;}
function td_1P() {return false;}
function td_2c() {return false;}
td_1a();