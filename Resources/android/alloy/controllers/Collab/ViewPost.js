function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goBack() {
        var window = Alloy.createController("main").getView();
        window.open();
    }
    function secondOutput() {
        Cloud.Posts.query({
            where: {
                parentPost: args.postID
            }
        }, function(e) {
            if (e.success) {
                {
                    e.posts[0];
                }
                for (var i = e.posts.length - 1; i >= 0; i--) {
                    var post = e.posts[i];
                    var row = Ti.UI.createTableViewRow({
                        textAlign: "center",
                        top: 5,
                        bottom: 5
                    });
                    var newView = Ti.UI.createView({
                        layout: "horizontal"
                    });
                    var labelOne = Ti.UI.createLabel({
                        classes: [ "nameLabel" ],
                        text: " " + post.custom_fields.createdBy + ":",
                        width: "15%",
                        height: "auto",
                        padding: 10,
                        font: {
                            fontSize: 20
                        }
                    });
                    var labelTwo = Ti.UI.createLabel({
                        classes: [ "contentLabel" ],
                        text: post.content,
                        width: "85%",
                        height: "auto",
                        padding: 10,
                        font: {
                            fontSize: 20
                        }
                    });
                    newView.add(labelOne);
                    newView.add(labelTwo);
                    row.add(newView);
                    $.tableView1.appendRow(row);
                }
            } else {
                alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                s;
            }
        });
    }
    function postComment() {
        Cloud.Posts.create({
            title: "",
            content: $.commentTextField.value,
            childPost: "",
            custom_fields: {
                parentPost: args.postID,
                childPost: "",
                createdBy: userName
            }
        }, function(e) {
            if (e.success) {
                {
                    e.posts[0];
                }
                var nextWindow = Alloy.createController("Collab/ViewPost", {
                    postID: args.postID
                }).getView();
                nextWindow.open();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Collab/ViewPost";
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
    $.__views.ViewPost = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        layout: "vertical",
        id: "ViewPost"
    });
    $.__views.ViewPost && $.addTopLevelView($.__views.ViewPost);
    $.__views.tableView1 = Ti.UI.createTableView({
        top: "5%",
        height: "60%",
        width: "85%",
        layout: "vertical",
        align: "center",
        border: "2",
        borderColor: "white",
        id: "tableView1"
    });
    $.__views.ViewPost.add($.__views.tableView1);
    $.__views.__alloyId52 = Ti.UI.createView({
        height: "10",
        width: "100%",
        id: "__alloyId52"
    });
    $.__views.ViewPost.add($.__views.__alloyId52);
    $.__views.commentTextField = Ti.UI.createTextArea({
        height: 150,
        width: "50%",
        hintText: "Add Comment Here",
        textAlign: "left",
        borderColor: "white",
        borderWidth: 2,
        softKeyBoardOnFocus: "Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS",
        id: "commentTextField"
    });
    $.__views.ViewPost.add($.__views.commentTextField);
    $.__views.mainView = Ti.UI.createView({
        height: "10%",
        width: "50%",
        align: "center",
        layout: "horizontal",
        id: "mainView"
    });
    $.__views.ViewPost.add($.__views.mainView);
    $.__views.__alloyId53 = Ti.UI.createView({
        height: "100%",
        width: "50%",
        id: "__alloyId53"
    });
    $.__views.mainView.add($.__views.__alloyId53);
    $.__views.postComment = Ti.UI.createButton({
        align: "center",
        title: "Post",
        id: "postComment"
    });
    $.__views.__alloyId53.add($.__views.postComment);
    postComment ? $.__views.postComment.addEventListener("click", postComment) : __defers["$.__views.postComment!click!postComment"] = true;
    $.__views.__alloyId54 = Ti.UI.createView({
        height: "100%",
        width: "50%",
        id: "__alloyId54"
    });
    $.__views.mainView.add($.__views.__alloyId54);
    $.__views.returnToMain = Ti.UI.createButton({
        align: "center",
        title: "Back",
        id: "returnToMain"
    });
    $.__views.__alloyId54.add($.__views.returnToMain);
    goBack ? $.__views.returnToMain.addEventListener("click", goBack) : __defers["$.__views.returnToMain!click!goBack"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var Cloud = require("ti.cloud");
    var userName;
    Cloud.Users.showMe(function(e) {
        if (e.success) {
            var user = e.users[0];
            userName = user.username;
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    Cloud.Posts.query({
        where: {
            id: args.postID
        }
    }, function(e) {
        if (e.success) {
            var posts = e.posts[0];
            var row = Ti.UI.createTableViewRow({
                textAlign: "center"
            });
            var newView = Ti.UI.createView({
                layout: "horizontal"
            });
            var labelOne = Ti.UI.createLabel({
                text: " " + posts.custom_fields.createdBy + ":",
                classes: [ "nameLabel" ],
                width: "15%",
                height: "auto",
                padding: 10,
                font: {
                    fontSize: 20
                }
            });
            var labelTwo = Ti.UI.createLabel({
                classes: [ "nameLabel" ],
                text: posts.content,
                width: "85%",
                height: "auto",
                padding: 10,
                font: {
                    fontSize: 20
                }
            });
            newView.add(labelOne);
            newView.add(labelTwo);
            row.add(newView);
            $.tableView1.appendRow(row);
            secondOutput();
        } else {
            alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            s;
        }
    });
    $.commentTextField.addEventListener("return", function() {
        Ti.API.info(" Return key  Detected");
        postComment();
    });
    $.commentTextField.addEventListener("click", function() {
        $.commentTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
        $.commentTextField.focus();
    });
    $.commentTextField.addEventListener("blur", function() {
        $.commentTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
    });
    __defers["$.__views.postComment!click!postComment"] && $.__views.postComment.addEventListener("click", postComment);
    __defers["$.__views.returnToMain!click!goBack"] && $.__views.returnToMain.addEventListener("click", goBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;