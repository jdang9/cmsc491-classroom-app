function __processArg(e,t){var i=null;return e&&(i=e[t]||null,delete e[t]),i}function Controller(){function e(){var e=Alloy.createController("Collab/CreatePost").getView();e.open()}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="win4",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var t=this,i={},r={};t.__views.myList=Ti.UI.createWindow({backgroundColor:"#141925",color:"white",id:"myList",layout:"vertical"}),t.__views.myList&&t.addTopLevelView(t.__views.myList),t.__views.tableView1=Ti.UI.createTableView({height:"70%",width:"80%",top:"10%",layout:"vertical",align:"center",border:"2",borderColor:"white",id:"tableView1"}),t.__views.myList.add(t.__views.tableView1),t.__views.createPostButton=Ti.UI.createButton({title:"Create Post",id:"createPostButton"}),t.__views.myList.add(t.__views.createPostButton),e?t.__views.createPostButton.addEventListener("click",e):r["$.__views.createPostButton!click!createPost"]=!0,i.destroy=function(){},_.extend(t,t.__views);var o=require("ti.cloud");o.Posts.query({where:{parentPost:""}},function(e){if(e.success){e.posts[0];for(var i=0;i<e.posts.length;i++){var r=e.posts[i],o=Ti.UI.createTableViewRow({title:r.title,textAlign:"center",id:r.id});t.tableView1.appendRow(o)}}else alert("Error:\n"+(e.error&&e.message||JSON.stringify(e)));t.tableView1.addEventListener("click",function(e){var t=e.rowData;e.row;var i=Alloy.createController("Collab/ViewPost",{postID:t.id}).getView();i.open()})}),r["$.__views.createPostButton!click!createPost"]&&t.__views.createPostButton.addEventListener("click",e),_.extend(t,i)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;