function S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function guid(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()}function Sync(e,t,i){var r=t.config.adapter.collection_name?t.config.adapter.collection_name:"default",o=new RegExp("^("+r+")\\-(.+)$"),n=null;if("read"===e)if(i.parse){var a=[];_.each(TAP.listProperties(),function(e){var t=e.match(o);null!==t&&a.push(TAP.getObject(e))}),n=a}else{var s=TAP.getObject(r+"-"+t.id);t.set(s),n=t.toJSON()}else"create"===e||"update"===e?(t.id||(t.id=guid(),t.set(t.idAttribute,t.id)),TAP.setObject(r+"-"+t.id,t.toJSON()||{}),n=t.toJSON()):"delete"===e&&(TAP.removeProperty(r+"-"+t.id),t.clear(),n=t.toJSON());n?(_.isFunction(i.success)&&i.success(n),"read"===e&&t.trigger("fetch")):_.isFunction(i.error)&&i.error(n)}var Alloy=require("alloy"),_=require("alloy/underscore")._,TAP=Ti.App.Properties;module.exports.sync=Sync,module.exports.beforeModelCreate=function(e){return e=e||{},e.columns=e.columns||{},e.defaults=e.defaults||{},("undefined"==typeof e.columns.id||null===e.columns.id)&&(e.columns.id="String"),e};