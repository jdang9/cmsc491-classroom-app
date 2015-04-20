function defineCloud(e){function t(e,t,i){if(void 0===t)throw"Argument "+e+" was not provided!";if(typeof t!=i)throw"Argument "+e+" was an unexpected type! Expected: "+i+", Received: "+typeof t}function i(t,i,r,o){e.debug&&Ti.API.info('ACS Request: { url: "'+t+'", verb: "'+i+'", data: '+JSON.stringify(r)+" })"),f.send(t,i,r,function(t){if(o){var i=t.response||{};t.meta&&"ok"==t.meta.status?(i.success=!0,i.error=!1,i.meta=t.meta,e.debug&&Ti.API.info(JSON.stringify(i))):(i.success=!1,i.error=!0,i.code=t.meta?t.meta.code:t.statusCode,i.message=t.meta?t.meta.message:t.message||t.statusText,e.debug&&Ti.API.error(i.code+": "+i.message)),o(i)}})}function r(e,r){t("data",e,"object"),t("callback",r,"function"),n(this),this.url||(this.url=this.restNamespace+"/"+this.restMethod+".json"),i(this.url,this.verb,e,r)}function o(){r.call(this,2==arguments.length?arguments[0]:{},2==arguments.length?arguments[1]:arguments[0])}function n(e){e.restNamespace||(e.restNamespace=e.property.toLowerCase()),e.restMethod||(e.restMethod=e.method.toLowerCase())}function a(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var i=Array(80),r=1732584193,o=-271733879,n=-1732584194,a=271733878,l=-1009589776,c=0;c<e.length;c+=16){for(var u=r,d=o,_=n,h=a,p=l,f=0;80>f;f++){i[f]=16>f?e[c+f]:(i[f-3]^i[f-8]^i[f-14]^i[f-16])<<1|(i[f-3]^i[f-8]^i[f-14]^i[f-16])>>>31;var y,g=r<<5|r>>>27;y=20>f?o&n|~o&a:40>f?o^n^a:60>f?o&n|o&a|n&a:o^n^a,g=s(s(g,y),s(s(l,i[f]),20>f?1518500249:40>f?1859775393:60>f?-1894007588:-899497514)),l=a,a=n,n=o<<30|o>>>2,o=r,r=g}r=s(r,u),o=s(o,d),n=s(n,_),a=s(a,h),l=s(l,p)}return[r,o,n,a,l]}function s(e,t){var i=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(i>>16)<<16|65535&i}function l(e){for(var t=[],i=(1<<p)-1,r=0;r<e.length*p;r+=p)t[r>>5]|=(e.charCodeAt(r/p)&i)<<32-p-r%32;return t}function c(e,t,i,r,o){var n=!1;return this.appKey=e,this.oauthKey=t,this.oauthSecret=i,this.apiBaseURL=r?r:u.sdk.url.baseURL,this.authBaseURL=o?o:u.sdk.url.authBaseURL,this.useThreeLegged=function(e){n=e,this.oauthKey||(this.oauthKey=this.appKey)},this.isThreeLegged=function(){return n},this}var u,d={PROPERTY_TYPE_ONLY_LATEST:0,PROPERTY_TYPE_SLASH_COMBINE:1,PROPERTY_TYPE_IGNORE:2};d.build=function y(e,t){var i,r=t.children||[];for(i in r)if(r.hasOwnProperty(i)){var o=r[i],n=o.propertyTypes||t.propertyTypes||{};n.children=d.PROPERTY_TYPE_IGNORE;for(var a in t)if(t.hasOwnProperty(a))switch(n[a]||d.PROPERTY_TYPE_ONLY_LATEST){case d.PROPERTY_TYPE_ONLY_LATEST:o[a]=void 0===o[a]?t[a]:o[a];break;case d.PROPERTY_TYPE_SLASH_COMBINE:var s=[];t[a]&&s.push(t[a]),o[a]&&s.push(o[a]),o[a]=s.join("/")}o.method&&!o.children?e[o.method]=function(e){return function(){return e.executor.apply(e,arguments)}}(o):o.property&&y(e[o.property]={},o)}},d.build(e,{verb:"GET",executor:r,children:[{method:"sendRequest",executor:function(e,r){t("params",e,"object"),t("url",e.url,"string"),t("method",e.method,"string"),t("callback",r,"function"),i(e.url,e.method,e.data?e.data:{},r)}},{method:"hasStoredSession",executor:function(){return Ti.API.warn("Cloud.hasStoredSession has been deprecated. Use Cloud.sessionId property"),f.hasStoredSession()}},{method:"retrieveStoredSession",executor:function(){return Ti.API.warn("Cloud.retrieveStoredSession has been deprecated. Use Cloud.sessionId property"),f.retrieveStoredSession()}},{property:"ACLs",children:[{method:"create",verb:"POST"},{method:"update",verb:"PUT"},{method:"show"},{method:"remove",restMethod:"delete",verb:"DELETE"},{method:"addUser",restMethod:"add",verb:"POST"},{method:"removeUser",restMethod:"remove",verb:"DELETE"},{method:"checkUser",restMethod:"check"}]},{property:"Chats",children:[{method:"create",verb:"POST"},{method:"query"},{method:"remove",restMethod:"delete",verb:"DELETE"},{method:"queryChatGroups",restMethod:"query_chat_groups",executor:o},{method:"getChatGroups",restMethod:"get_chat_groups",executor:o}]},{property:"Checkins",children:[{method:"create",verb:"POST"},{method:"query",executor:o},{method:"show"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Clients",children:[{method:"geolocate",executor:o}]},{property:"Objects",executor:function(e,i){var o;e&&"object"==typeof e&&(t("data.classname",e.classname,"string"),n(this),this.url=this.restNamespace+"/"+e.classname+"/"+this.restMethod+".json",o=e.classname,delete e.classname),r.call(this,e,i),e.classname=o},children:[{method:"create",verb:"POST"},{method:"show"},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"},{method:"query"}]},{property:"Emails",restNamespace:"custom_mailer",children:[{method:"send",verb:"POST",restMethod:"email_from_template"}]},{property:"Events",children:[{method:"create",verb:"POST"},{method:"show"},{method:"showOccurrences",restMethod:"show/occurrences"},{method:"query",executor:o},{method:"queryOccurrences",restMethod:"query/occurrences",executor:o},{method:"search",executor:o},{method:"searchOccurrences",restMethod:"search/occurrences",executor:o},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Files",children:[{method:"create",verb:"POST"},{method:"query",executor:o},{method:"show"},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Friends",children:[{method:"add",verb:"POST"},{method:"requests",executor:o},{method:"approve",verb:"PUT"},{method:"remove",verb:"DELETE"},{method:"search"}]},{property:"GeoFences",restNamespace:"geo_fences",children:[{method:"create",verb:"POST"},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"},{method:"query"}]},{property:"KeyValues",children:[{method:"set",verb:"PUT"},{method:"get"},{method:"append",verb:"PUT"},{method:"increment",restMethod:"incrby",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Likes",children:[{method:"create",verb:"POST"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Messages",children:[{method:"create",verb:"POST"},{method:"reply",verb:"POST"},{method:"show"},{method:"showInbox",restMethod:"show/inbox",executor:o},{method:"showSent",restMethod:"show/sent",executor:o},{method:"showThreads",restMethod:"show/threads",executor:o},{method:"showThread",restMethod:"show/thread"},{method:"remove",restMethod:"delete",verb:"DELETE"},{method:"removeThread",restMethod:"delete/thread",verb:"DELETE"}]},{property:"Photos",children:[{method:"create",verb:"POST"},{method:"show"},{method:"search"},{method:"query",executor:o},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"PhotoCollections",restNamespace:"collections",children:[{method:"create",verb:"POST"},{method:"show"},{method:"update",verb:"PUT"},{method:"search"},{method:"showSubcollections",restMethod:"show/subcollections"},{method:"showPhotos",restMethod:"show/photos"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Places",children:[{method:"create",verb:"POST"},{method:"search",executor:o},{method:"show"},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"},{method:"query",executor:o}]},{property:"Posts",children:[{method:"create",verb:"POST"},{method:"show"},{method:"query",executor:o},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"PushNotifications",restNamespace:"push_notification",verb:"POST",children:[{method:"subscribe"},{method:"unsubscribe",verb:"DELETE"},{method:"notify"},{method:"query",verb:"GET"},{method:"subscribeToken",restMethod:"subscribe_token"},{method:"unsubscribeToken",restMethod:"unsubscribe_token",verb:"DELETE"},{method:"updateSubscription",restMethod:"subscription/update",verb:"PUT"},{method:"notifyTokens",restMethod:"notify_tokens"},{method:"resetBadge",restMethod:"reset_badge",verb:"PUT"},{method:"setBadge",restMethod:"set_badge",verb:"PUT",executor:o},{method:"queryChannels",restMethod:"channels/query",verb:"GET",executor:o},{method:"showChannels",restMethod:"channels/show",verb:"GET"}]},{property:"PushSchedules",restNamespace:"push_schedules",children:[{method:"create",restMethod:"create",verb:"POST"},{method:"query",restMethod:"query",executor:o},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Reviews",children:[{method:"create",verb:"POST"},{method:"show"},{method:"query"},{method:"update",verb:"PUT"},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"SocialIntegrations",restNamespace:"users",children:[{method:"externalAccountLogin",restMethod:"external_account_login",verb:"POST"},{method:"externalAccountLink",restMethod:"external_account_link",verb:"POST"},{method:"externalAccountUnlink",restMethod:"external_account_unlink",verb:"DELETE"},{method:"searchFacebookFriends",restNamespace:"social",restMethod:"facebook/search_friends",executor:o}]},{property:"Statuses",children:[{method:"create",verb:"POST"},{method:"update",verb:"PUT"},{method:"show"},{method:"search"},{method:"query",executor:o},{method:"remove",restMethod:"delete",verb:"DELETE"}]},{property:"Users",children:[{method:"create",verb:"POST"},{method:"login",verb:"POST"},{method:"show"},{method:"showMe",restMethod:"show/me",executor:function(e){r.call(this,{},e)}},{method:"search",executor:o},{method:"query",executor:o},{method:"update",verb:"PUT"},{method:"logout",executor:function(e){r.call(this,{},function(t){f.reset(),e(t)})}},{method:"remove",restMethod:"delete",verb:"DELETE",executor:function(){var e=arguments;r.call(this,2==e.length?e[0]:{},function(t){f.reset(),(2==e.length?e[1]:e[0])(t)})}},{method:"requestResetPassword",restMethod:"request_reset_password"},{method:"resendConfirmation",restMethod:"resend_confirmation"}]}]});var _;null==_&&(_={}),_.setProperties=function(e,t){if(null!=e&&null!=t)for(var i in t)e[i]=t[i];return e},_.setProperties(_,{percentEncode:function(e){if(null==e)return"";if(e instanceof Array){for(var t="";0<e.length;++e)""!=t&&(t+="&"),t+=_.percentEncode(e[0]);return t}return e=encodeURIComponent(e),e=e.replace(/\!/g,"%21"),e=e.replace(/\*/g,"%2A"),e=e.replace(/\'/g,"%27"),e=e.replace(/\(/g,"%28"),e=e.replace(/\)/g,"%29")},decodePercent:function(e){return null!=e&&(e=e.replace(/\+/g," ")),decodeURIComponent(e)},getParameterList:function(e){if(null==e)return[];if("object"!=typeof e)return _.decodeForm(e+"");if(e instanceof Array)return e;var t,i=[];for(t in e)i.push([t,e[t]]);return i},getParameterMap:function(e){if(null==e)return{};if("object"!=typeof e)return _.getParameterMap(_.decodeForm(e+""));if(e instanceof Array){for(var t={},i=0;i<e.length;++i){var r=e[i][0];void 0===t[r]&&(t[r]=e[i][1])}return t}return e},getParameter:function(e,t){if(!(e instanceof Array))return _.getParameterMap(e)[t];for(var i=0;i<e.length;++i)if(e[i][0]==t)return e[i][1];return null},formEncode:function(e){for(var t="",e=_.getParameterList(e),i=0;i<e.length;++i){var r=e[i][1];null==r&&(r=""),""!=t&&(t+="&"),t+=_.percentEncode(e[i][0])+"="+_.percentEncode(r)}return t},decodeForm:function(e){for(var t=[],e=e.split("&"),i=0;i<e.length;++i){var r=e[i];if(""!=r){var o,n=r.indexOf("=");0>n?(o=_.decodePercent(r),r=null):(o=_.decodePercent(r.substring(0,n)),r=_.decodePercent(r.substring(n+1))),t.push([o,r])}}return t},setParameter:function(e,t,i){var r=e.parameters;if(r instanceof Array){for(e=0;e<r.length;++e)r[e][0]==t&&(void 0===i?r.splice(e,1):(r[e][1]=i,i=void 0));void 0!==i&&r.push([t,i])}else r=_.getParameterMap(r),r[t]=i,e.parameters=r},setParameters:function(e,t){for(var i=_.getParameterList(t),r=0;r<i.length;++r)_.setParameter(e,i[r][0],i[r][1])},completeRequest:function(e,t){null==e.method&&(e.method="GET");var i=_.getParameterMap(e.parameters);null==i.oauth_consumer_key&&_.setParameter(e,"oauth_consumer_key",t.consumerKey||""),null==i.oauth_token&&null!=t.token&&_.setParameter(e,"oauth_token",t.token),null==i.oauth_version&&_.setParameter(e,"oauth_version","1.0"),null==i.oauth_timestamp&&_.setParameter(e,"oauth_timestamp",_.timestamp()),null==i.oauth_nonce&&_.setParameter(e,"oauth_nonce",_.nonce(6)),_.SignatureMethod.sign(e,t)},setTimestampAndNonce:function(e){_.setParameter(e,"oauth_timestamp",_.timestamp()),_.setParameter(e,"oauth_nonce",_.nonce(6))},addToURL:function(e,t){if(newURL=e,null!=t){var i=_.formEncode(t);0<i.length&&(newURL=0>e.indexOf("?")?newURL+"?":newURL+"&",newURL+=i)}return newURL},getAuthorizationHeader:function(e,t){for(var i='OAuth realm="'+_.percentEncode(e)+'"',r=_.getParameterList(t),o=0;o<r.length;++o){var n=r[o],a=n[0];0==a.indexOf("oauth_")&&(i+=","+_.percentEncode(a)+'="'+_.percentEncode(n[1])+'"')}return i},correctTimestamp:function(e){_.timeCorrectionMsec=1e3*e-(new Date).getTime()},timeCorrectionMsec:0,timestamp:function(){var e=(new Date).getTime()+_.timeCorrectionMsec;return Math.floor(e/1e3)},nonce:function(e){for(var t=_.nonce.CHARS,i="",r=0;e>r;++r)var o=Math.floor(Math.random()*t.length),i=i+t.substring(o,o+1);return i}}),_.nonce.CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",_.declareClass=function(e,t,i){var r=e[t];if(e[t]=i,null!=i&&null!=r)for(var o in r)"prototype"!=o&&(i[o]=r[o]);return i},_.declareClass(_,"SignatureMethod",function(){}),_.setProperties(_.SignatureMethod.prototype,{sign:function(e){var t=this.getSignature(_.SignatureMethod.getBaseString(e));return _.setParameter(e,"oauth_signature",t),t},initialize:function(e,t){var i;i=null!=t.accessorSecret&&9<e.length&&"-Accessor"==e.substring(e.length-9)?t.accessorSecret:t.consumerSecret,this.key=_.percentEncode(i)+"&"+_.percentEncode(t.tokenSecret)}}),_.setProperties(_.SignatureMethod,{sign:function(e,t){var i=_.getParameterMap(e.parameters).oauth_signature_method;(null==i||""==i)&&(i="HMAC-SHA1",_.setParameter(e,"oauth_signature_method",i)),_.SignatureMethod.newMethod(i,t).sign(e)},newMethod:function(e,t){var i=_.SignatureMethod.REGISTERED[e];if(null!=i){var r=new i;return r.initialize(e,t),r}var i=Error("signature_method_rejected"),o="";for(r in _.SignatureMethod.REGISTERED)""!=o&&(o+="&"),o+=_.percentEncode(r);throw i.oauth_acceptable_signature_methods=o,i},REGISTERED:{},registerMethodClass:function(e,t){for(var i=0;i<e.length;++i)_.SignatureMethod.REGISTERED[e[i]]=t},makeSubclass:function(e){var t=_.SignatureMethod,i=function(){t.call(this)};return i.prototype=new t,i.prototype.getSignature=e,i.prototype.constructor=i},getBaseString:function(e){var t=e.action,i=t.indexOf("?");if(0>i)i=e.parameters;else for(var i=_.decodeForm(t.substring(i+1)),r=_.getParameterList(e.parameters),o=0;o<r.length;++o)i.push(r[o]);return _.percentEncode(e.method.toUpperCase())+"&"+_.percentEncode(_.SignatureMethod.normalizeUrl(t))+"&"+_.percentEncode(_.SignatureMethod.normalizeParameters(i))},normalizeUrl:function(e){var t=_.SignatureMethod.parseUri(e),e=t.protocol.toLowerCase(),i=t.authority.toLowerCase();if("http"==e&&80==t.port||"https"==e&&443==t.port){var r=i.lastIndexOf(":");r>=0&&(i=i.substring(0,r))}return(t=t.path)||(t="/"),e+"://"+i+t},parseUri:function(e){for(var t="source,protocol,authority,userInfo,user,password,host,port,relative,path,directory,file,query,anchor".split(","),e=/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),i={},r=14;r--;)i[t[r]]=e[r]||"";return i},normalizeParameters:function(e){if(null==e)return"";for(var t=_.getParameterList(e),e=[],i=0;i<t.length;++i){var r=t[i];"oauth_signature"!=r[0]&&e.push([_.percentEncode(r[0])+" "+_.percentEncode(r[1]),r])}for(e.sort(function(e,t){return e[0]<t[0]?-1:e[0]>t[0]?1:0}),t=[],i=0;i<e.length;++i)t.push(e[i][1]);return _.formEncode(t)}}),_.SignatureMethod.registerMethodClass(["PLAINTEXT","PLAINTEXT-Accessor"],_.SignatureMethod.makeSubclass(function(){return this.key})),_.SignatureMethod.registerMethodClass(["HMAC-SHA1","HMAC-SHA1-Accessor"],_.SignatureMethod.makeSubclass(function(e){h="=";var t=this.key,i=l(t);16<i.length&&(i=a(i,t.length*p));for(var r=Array(16),t=Array(16),o=0;16>o;o++)r[o]=909522486^i[o],t[o]=1549556828^i[o];for(e=a(r.concat(l(e)),512+e.length*p),e=a(t.concat(e),672),i="",t=0;t<4*e.length;t+=3)for(r=(e[t>>2]>>8*(3-t%4)&255)<<16|(e[t+1>>2]>>8*(3-(t+1)%4)&255)<<8|e[t+2>>2]>>8*(3-(t+2)%4)&255,o=0;4>o;o++)i=8*t+6*o>32*e.length?i+h:i+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(r>>6*(3-o)&63);return i}));var h="",p=8;c.prototype.sendRequest=function(e,t,i,r){var o=u.js.sdk.utils.getAuthType(this);if(o==u.constants.unknown)r(u.constants.noAppKeyError);else{var n=this.apiBaseURL+"/"+u.sdk.url.version+"/"+e,n=o==u.constants.app_key?n+(u.constants.keyParam+this.appKey):n+(u.constants.oauthKeyParam+this.oauthKey);if(null==i&&(i={}),t=t?t.toUpperCase():u.constants.get_method,i[u.constants.suppressCode]="true",!this.isThreeLegged()){var a=u.js.sdk.utils.getCookie(u.constants.sessionId);a||(a=this.session_id),a&&(n=-1!=n.indexOf("?")?n+("&"+u.constants.sessionId+"="+a):n+("?"+u.constants.sessionId+"="+a))}if(this.isThreeLegged()&&(!this.accessToken&&(a=this.getSession())&&(this.accessToken=a.access_token),this.accessToken&&(i[u.constants.accessToken]=this.accessToken)),a=i,Ti.App.analytics){var s=a.analytics||{};s.id=Ti.Platform.createUUID(),Ti.Platform.id&&(s.mid=Ti.Platform.id),s.aguid=Ti.App.guid,s.event="cloud."+e.replace(/\//g,".").replace(/\.json/,""),s.deploytype=Ti.App.deployType||"development",s.sid=Ti.App.sessionId,a.ti_analytics=JSON.stringify(s)}if(i=u.js.sdk.utils.cleanInvalidData(i),e=u.js.sdk.utils.getFileObject(i)){try{var l;if(l=e.toString().match(/TiFilesystemFile/)?e.read():e,!l)return void r(u.constants.fileLoadError);i[u.constants.file]?(delete i[u.constants.file],i[u.constants.file]=l):i[u.constants.photo]&&(delete i[u.constants.photo],i[u.constants.photo]=l)}catch(c){return void r(u.constants.fileLoadError)}l={},(o==u.constants.oauth||o==u.constants.three_legged_oauth)&&(o={method:t,action:n,parameters:[]},u.js.sdk.utils.populateOAuthParameters(o.parameters,this.oauthKey),this.oauthSecret&&_.completeRequest(o,{consumerSecret:this.oauthSecret}),l[u.constants.oauth_header]=_.getAuthorizationHeader("",o.parameters))}else if(l={},o==u.constants.oauth||o==u.constants.three_legged_oauth){var d,o={method:t,action:n,parameters:[]};for(d in i)i.hasOwnProperty(d)&&o.parameters.push([d,i[d]]);u.js.sdk.utils.populateOAuthParameters(o.parameters,this.oauthKey),this.oauthSecret&&_.completeRequest(o,{consumerSecret:this.oauthSecret}),l[u.constants.oauth_header]=_.getAuthorizationHeader("",o.parameters)}u.js.sdk.utils.sendAppceleratorRequest(n,t,i,l,r,this)}},c.prototype.sendAuthRequest=function(e){if(u.js.sdk.utils.getAuthType(this)!==u.constants.three_legged_oauth)alert("wrong authorization type!");else{var e=e||{},t=this.authBaseURL,t=t+"/oauth/authorize"+(u.constants.oauthKeyParam+this.oauthKey),t=t+(u.constants.clientIdParam+this.oauthKey),t=t+(u.constants.responseTypeParam+"token"),e=e.params||{};e.action="login",e.url=t;var i=this,r=e.cb;r&&delete e.cb,u.js.sdk.ui(e,function(e){i.saveSession(e),r&&r(e)})}},c.prototype.signUpRequest=function(e){if(u.js.sdk.utils.getAuthType(this)!==u.constants.three_legged_oauth)alert("wrong authorization type!");else{var e=e||{},t=this.authBaseURL,t=t+"/users/sign_up"+(u.constants.oauthKeyParam+this.oauthKey),t=t+(u.constants.clientIdParam+this.oauthKey),e=e.params||{};e.action="signup",e.url=t;var i=this,r=e.cb;r&&delete e.cb,u.js.sdk.ui(e,function(e){i.saveSession(e),r&&r(e)})}},c.prototype.saveSession=function(e){return e&&e.access_token?(u.js.sdk.utils.setCookie(u.constants.accessToken,e.access_token),u.js.sdk.utils.setCookie(u.constants.expiresIn,e.expires_in),this.accessToken=e.access_token,this.expiresIn=e.expires_in,this.authorized=!0):this.authorized=!1},c.prototype.getSession=function(){var e={};return e.access_token=u.js.sdk.utils.getCookie(u.constants.accessToken),e.expires_in=u.js.sdk.utils.getCookie(u.constants.expiresIn),e.access_token?(this.accessToken=e.access_token,this.expiresIn=e.expires_in,this.authorized=!0,e):this.authorized=!1},c.prototype.clearSession=function(){u.js.sdk.utils.setCookie(u.constants.accessToken,""),u.js.sdk.utils.setCookie(u.constants.expiresIn,""),delete this.accessToken,delete this.expiresIn,this.authorized=!1},c.prototype.checkStatus=function(){return this.getSession()?!0:!1},u=void 0,u={constants:{},js:{}},u.js.sdk={},u.js.sdk.utils={},u.sdk={},u.sdk.url={},u.sdk.url.baseURL="https://api.cloud.appcelerator.com",u.sdk.url.authBaseURL="https://secure-identity.cloud.appcelerator.com",u.sdk.url.version="v1",u.constants.get_method="GET",u.constants.post_method="POST",u.constants.put_method="PUT",u.constants.delete_method="DELETE",u.constants.app_key=1,u.constants.oauth=2,u.constants.three_legged_oauth=3,u.constants.unknown=-1,u.constants.keyParam="?key=",u.constants.oauthKeyParam="?oauth_consumer_key=",u.constants.clientIdParam="&client_id=",u.constants.redirectUriParam="&redirect_uri=",u.constants.responseTypeParam="&response_type=",u.constants.accessToken="access_token",u.constants.expiresIn="expires_in",u.constants.appKey="app_key",u.constants.json="json",u.constants.sessionId="_session_id",u.constants.sessionCookieName="Cookie",u.constants.responseCookieName="Set-Cookie",u.constants.file="file",u.constants.suppressCode="suppress_response_codes",u.constants.response_wrapper="response_wrapper",u.constants.photo="photo",u.constants.method="_method",u.constants.name="name",u.constants.value="value",u.constants.oauth_header="Authorization",u.constants.noAppKeyError={meta:{status:"fail",code:409,message:"Application key is not provided."}},u.constants.fileLoadError={meta:{status:"fail",code:400,message:"Unable to load file"}},u.js.sdk.utils.getSessionParams=function(){var e=null,t=u.js.sdk.utils.getCookie(u.constants.sessionId);return t&&(e=u.constants.sessionId+"="+t),e},u.js.sdk.utils.cookieMap=[],u.js.sdk.utils.cookieMap[u.constants.sessionId]="sessionId",u.js.sdk.utils.cookieMap[u.constants.accessToken]="accessToken",u.js.sdk.utils.cookieMap[u.constants.expiresIn]="expiresIn",u.js.sdk.utils.getCookie=function(t){return(t=u.js.sdk.utils.cookieMap[t])&&e[t]||null},u.js.sdk.utils.setCookie=function(t,i){var r=u.js.sdk.utils.cookieMap[t];r&&(""===i?delete e[r]:e[r]=i)},u.js.sdk.utils.deleteCookie=function(t){(t=u.js.sdk.utils.cookieMap[t])&&delete e[t]},u.js.sdk.utils.getAuthType=function(e){if(e){if(e.isThreeLegged())return u.constants.three_legged_oauth;if(e.appKey)return u.constants.app_key;if(e.oauthKey&&e.oauthSecret)return u.constants.oauth}return u.constants.unknown},u.js.sdk.utils.getFileObject=function(e){if(e)for(var t in e)if(e.hasOwnProperty(t)&&(t==u.constants.photo||t==u.constants.file))return e[t];return null},u.js.sdk.utils.cleanInvalidData=function(e){if(e){for(var t in e)if(e.hasOwnProperty(t)){if(null==e[t]&&delete e[t],"object"==typeof e[t]){if(t==u.constants.photo||t==u.constants.file)continue;e[t]=JSON.stringify(e[t])}(!0===e[t]||!1===e[t])&&(e[t]=e[t]?1:0)}return e}return{}},u.js.sdk.utils.uploadMessageCallback=function(e){return e&&e.data?JSON.parse(e.data):{}},u.js.sdk.utils.getOAuthParameters=function(e){var t="";if(e)for(var e=_.getParameterList(e),i=0;i<e.length;++i){var r=e[i],o=r[0];0==o.indexOf("oauth_")&&"oauth_token"!=o&&(t+="&"+_.percentEncode(o)+"="+_.percentEncode(r[1]))}return 0<t.length&&(t=t.substring(1)),t},u.js.sdk.utils.populateOAuthParameters=function(e,t){e&&t&&(e.push(["oauth_version","1.0"]),e.push(["oauth_consumer_key",t]),e.push(["oauth_signature_method","HMAC-SHA1"]),e.push(["oauth_nonce",_.nonce(15)]))},u.js.sdk.utils.sendAppceleratorRequest=function(t,i,r,o,n,a){var s=Ti.Network.createHTTPClient({timeout:6e4,onsendstream:function(i){e.onsendstream&&e.onsendstream({url:t,progress:i.progress})},ondatastream:function(i){e.ondatastream&&e.ondatastream({url:t,progress:i.progress})},onerror:function(e){var t={};if(this.responseText){var i=this.responseText;try{(i=i.trim())&&0<i.length&&(t=JSON.parse(i))}catch(r){t=r}}t.message||(t.message=e.error),t.error=!0,t.statusText=this.statusText,t.status=this.status,t.meta&&(t.metaString=JSON.stringify(t.meta)),n(t)},onload:function(){var e=JSON.parse(this.responseText);if(e&&e.meta&&(e.metaString=JSON.stringify(e.meta),e.meta.session_id)){var t=e.meta.session_id;u.js.sdk.utils.setCookie(u.constants.sessionId,t),a.session_id=t}n(e)}}),l=t;if(i.toUpperCase()==u.constants.get_method||i.toUpperCase()==u.constants.delete_method){var c,d="";for(c in r)r.hasOwnProperty(c)&&(d+="&"+c+"="+_.percentEncode(r[c]));0<d.length&&(l=0<t.indexOf("?")?l+d:l+("?"+d.substring(1)),r={})}if(e.debug&&(Ti.API.info(i+": "+l),Ti.API.info("header: "+JSON.stringify(o)),Ti.API.info("data: "+JSON.stringify(r))),s.open(i,l),"mobileweb"!=Ti.Platform.osname&&s.setRequestHeader("Accept-Encoding","gzip,deflate"),o)for(c in o)o.hasOwnProperty(c)&&s.setRequestHeader(c,o[c]);s.send(r)},u.js.sdk.utils.decodeQS=function(e){var t,i,r=decodeURIComponent,o={},e=e.split("&");for(t=0;t<e.length;t++)(i=e[t].split("=",2))&&i[0]&&(o[r(i[0])]=r(i[1]));return o},u.js.sdk.utils.guid=function(){return"f"+(1073741824*Math.random()).toString(16).replace(".","")},u.js.sdk.utils.copy=function(e,t,i,r){for(var o in t)(i||"undefined"==typeof e[o])&&(e[o]=r?r(t[o]):t[o]);return e};var f={session:null,fetchSetting:function(e,t){var i,r="production"==Ti.App.deployType.toLowerCase()?"production":"development";return(i=Ti.App.Properties.getString(e+"-"+r))&&"undefined"!=i||(i=Ti.App.Properties.getString(e))&&"undefined"!=i?i:t},fetchSession:function(){var e=f.fetchSetting("acs-api-key",null),t=f.fetchSetting("acs-base-url",u.sdk.url.baseURL),i=f.fetchSetting("acs-authbase-url",u.sdk.url.authBaseURL),r=f.fetchSetting("acs-oauth-key",null),o=f.fetchSetting("acs-oauth-secret",null);return new c(e,r,o,t,i)}};return f.getSession=function(){return null==f.session&&(f.session=f.fetchSession()),f.session},f.send=function(e,t,i,r){f.getSession().sendRequest(e,t,i,r)},f.hasStoredSession=function(){return!!u.js.sdk.utils.getCookie(u.constants.sessionId)},f.retrieveStoredSession=function(){return u.js.sdk.utils.getCookie(u.constants.sessionId)},f.reset=function(){u.js.sdk.utils.deleteCookie(u.constants.sessionId),f.session&&(f.session.clearSession(),f.session=null)},f.secureSend=function(e,t){var i=f.getSession();i.useThreeLegged(!0),"secureCreate"===e?i.signUpRequest(t):"secureLogin"===e&&i.sendAuthRequest(t)},f.checkStatus=function(){return f.getSession().checkStatus()},u.js.sdk.UIManager={redirect_uri:"acsconnect://success",displayModal:function(t){function i(e){var t=/^acsconnect:\/\/([^#]*)#(.*)/.exec(decodeURIComponent(e.url));if(t&&3==t.length){var l=null;if("success"==t[1])l=u.js.sdk.utils.decodeQS(t[2]);else if("cancel"!=t[1])return;a.removeEventListener("beforeload",i),a.removeEventListener("load",i),r=l,null!=o?o.close():n&&n.close()}s&&"load"==e.type&&(n.remove(s),s=null)}e.debug&&Ti.API.info("ThreeLegged Request url: "+t.url);var r,o=null,n=Ti.UI.createWindow({fullscreen:!1,title:t.params.title||"Appcelerator Cloud Service"}),a=Ti.UI.createWebView({url:t.url,scalesPageToFit:!1,showScrollbars:!0}),s=Ti.UI.createLabel({text:"Loading, please wait...",color:"black",width:Ti.UI.SIZE||"auto",height:Ti.UI.SIZE||"auto",zIndex:100});if(a.addEventListener("beforeload",i),a.addEventListener("load",i),n.addEventListener("close",function(){t&&(t.cb&&t.cb(r),a=n=s=t=r=null)}),"android"!=Ti.Platform.osname){var l=Ti.UI.createButton({title:"close",width:"50%",height:"20%"});l.addEventListener("click",function(){o.close()}),n.rightNavButton=l,("iphone"==Ti.Platform.osname||"ios"==Ti.Platform.osname)&&(o=Ti.UI.iOS.createNavigationWindow({window:n}))}n.add(a),n.add(s),null!=o?o.open({modal:!0}):n.open()},processParams:function(e,t){return{cb:t,url:e.url+u.constants.redirectUriParam+u.js.sdk.UIManager.redirect_uri,params:e}}},u.js.sdk.ui=function(e,t){if("mobileweb"===Ti.Platform.osname)alert("Three Legged OAuth is not currently supported on MobileWeb");else if(e.action){var i=u.js.sdk.UIManager.processParams(e,t);i&&u.js.sdk.UIManager.displayModal(i)}else alert('"action" is a required parameter for com.cocoafish.js.sdk.ui().')},e}defineCloud(exports);