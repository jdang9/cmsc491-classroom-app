function __processArg(e,t){var i=null;return e&&(i=e[t]||null,delete e[t]),i}function Controller(){function e(e){var t=e.source.getActivity();t.onCreateOptionsMenu=function(e){var t,r;switch(r=e.menu,r.clear(),Alloy.Globals.currentTab){case 0:t=e.menu.add({title:"Invite",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS,icon:Ti.Android.R.drawable.ic_menu_search}),t.addEventListener("click",function(){i.win1.label.text="You clicked the magnifying glass"});break;case 1:item1=e.menu.add({title:"Share",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS,icon:Ti.Android.R.drawable.ic_menu_edit}),item2=e.menu.add({title:"Share",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS,icon:Ti.Android.R.drawable.ic_menu_add}),item2.addEventListener("click",function(){i.win2.label.text="You clicked the add class button"})}},Alloy.Globals.tabGroup.addEventListener("focus",function(e){"undefined"!=typeof e.main&&(t.invalidateOptionsMenu(),Alloy.Globals.currentTab=e.main)})}if(require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="main",arguments[0]){var t=__processArg(arguments[0],"__parentSymbol");__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate")}var i=this,r={},n={},o=[];i.__views.win1=Alloy.createController("win1",{id:"win1",__parentSymbol:t}),i.__views.__alloyId9=Ti.UI.createTab({width:"20%",window:i.__views.win1.getViewEx({recurse:!0}),title:"",icon:"images/dash.png",id:"__alloyId9"}),o.push(i.__views.__alloyId9),i.__views.win2=Alloy.createController("win2",{id:"win2",__parentSymbol:t}),i.__views.__alloyId11=Ti.UI.createTab({width:"20%",window:i.__views.win2.getViewEx({recurse:!0}),title:"",icon:"images/profile.png",id:"__alloyId11"}),o.push(i.__views.__alloyId11),i.__views.win3=Alloy.createController("win3",{id:"win3",__parentSymbol:t}),i.__views.__alloyId13=Ti.UI.createTab({width:"20%",window:i.__views.win3.getViewEx({recurse:!0}),title:"",icon:"images/courses.png",id:"__alloyId13"}),o.push(i.__views.__alloyId13),i.__views.win4=Alloy.createController("win4",{id:"win4",__parentSymbol:t}),i.__views.__alloyId15=Ti.UI.createTab({width:"20%",window:i.__views.win4.getViewEx({recurse:!0}),title:"",icon:"images/collab.png",id:"__alloyId15"}),o.push(i.__views.__alloyId15),i.__views.win5=Alloy.createController("win5",{id:"win5",__parentSymbol:t}),i.__views.__alloyId16=Ti.UI.createTab({width:"20%",window:i.__views.win5.getViewEx({recurse:!0}),title:"",icon:"images/check.png",id:"__alloyId16"}),o.push(i.__views.__alloyId16),i.__views.main=Ti.UI.createTabGroup({tabs:o,id:"main"}),i.__views.main&&i.addTopLevelView(i.__views.main),e?i.__views.main.addEventListener("open",e):n["$.__views.main!open!doopen"]=!0,r.destroy=function(){},_.extend(i,i.__views),Alloy.Globals.tabGroup=i.main,Alloy.Globals.currentTab=0,i.main.open(),n["$.__views.main!open!doopen"]&&i.__views.main.addEventListener("open",e),_.extend(i,r)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;