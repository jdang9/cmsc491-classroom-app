function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createPost() {
        Cloud.Posts.create({
            content: $.content_text.value,
            title: $.title_text.value,
            custom_fields: {
                parentPost: "",
                childPost: "",
                createdBy: userName
            }
        }, function(e) {
            if (e.success) {
                var post = e.posts[0];
                alert("Success:\nid: " + post.id + "\ntitle: " + post.title + "\ncontent: " + post.content + "\nupdated_at: " + post.updated_at);
                closeWindow();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function closeWindow() {
        var window = Alloy.createController("main").getView();
        window.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Collab/CreatePost";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.CreatePost = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        layout: "vertical",
        id: "CreatePost"
    });
    $.__views.CreatePost && $.addTopLevelView($.__views.CreatePost);
    $.__views.title_text = Ti.UI.createTextArea({
        color: "#fff",
        height: 50,
        width: "50%",
        align: "center",
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 1,
        borderColor: "white",
        id: "title_text",
        hintText: "Title"
    });
    $.__views.CreatePost.add($.__views.title_text);
    $.__views.__alloyId46 = Ti.UI.createView({
        height: "20",
        width: "100%",
        id: "__alloyId46"
    });
    $.__views.CreatePost.add($.__views.__alloyId46);
    $.__views.content_text = Ti.UI.createTextArea({
        color: "#fff",
        height: 300,
        width: "80%",
        align: "center",
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 1,
        borderColor: "white",
        id: "content_text",
        hintText: "Post Contents"
    });
    $.__views.CreatePost.add($.__views.content_text);
    var __alloyId48 = [];
    $.__views.__alloyId49 = Ti.UI.createTableViewRow({
        layout: "horizontal",
        align: "center",
        id: "__alloyId49"
    });
    __alloyId48.push($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createView({
        height: "auto",
        width: "50%",
        id: "__alloyId50"
    });
    $.__views.__alloyId49.add($.__views.__alloyId50);
    $.__views.postButton = Ti.UI.createButton({
        title: "Post",
        id: "postButton",
        align: "right"
    });
    $.__views.__alloyId50.add($.__views.postButton);
    createPost ? $.__views.postButton.addEventListener("click", createPost) : __defers["$.__views.postButton!click!createPost"] = true;
    $.__views.__alloyId51 = Ti.UI.createView({
        height: "auto",
        width: "50%",
        id: "__alloyId51"
    });
    $.__views.__alloyId49.add($.__views.__alloyId51);
    $.__views.cancelButton = Ti.UI.createButton({
        title: "Cancel",
        id: "cancelButton",
        align: "left"
    });
    $.__views.__alloyId51.add($.__views.cancelButton);
    closeWindow ? $.__views.cancelButton.addEventListener("click", closeWindow) : __defers["$.__views.cancelButton!click!closeWindow"] = true;
    $.__views.__alloyId47 = Ti.UI.createTableView({
        data: __alloyId48,
        id: "__alloyId47"
    });
    $.__views.CreatePost.add($.__views.__alloyId47);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    var win = Ti.UI.createWindow({
        backgroundColor: "blue",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Join the Team"
    });
    var userName;
    Cloud.Users.showMe(function(e) {
        if (e.success) {
            var user = e.users[0];
            userName = user.username;
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    win.open({
        activityEnterAnimation: Ti.Android.R.anim.fade_in,
        activityExitAnimation: Ti.Android.R.anim.fade_out
    });
    __defers["$.__views.postButton!click!createPost"] && $.__views.postButton.addEventListener("click", createPost);
    __defers["$.__views.cancelButton!click!closeWindow"] && $.__views.cancelButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;