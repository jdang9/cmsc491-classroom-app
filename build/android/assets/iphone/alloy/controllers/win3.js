function __processArg(e,t){var i=null;return e&&(i=e[t]||null,delete e[t]),i}function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="win3",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var e=this,t={};e.__views.win3=Ti.UI.createWindow({id:"win3"}),e.__views.win3&&e.addTopLevelView(e.__views.win3),e.__views.label=Ti.UI.createLabel({text:"This is Course",id:"label"}),e.__views.win3.add(e.__views.label),t.destroy=function(){},_.extend(e,e.__views),Ti.UI.createWindow({backgroundColor:"white",exitOnClose:!0,fullscreen:!1,layout:"vertical",title:"Your Courses",navBarHidden:!1}),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;