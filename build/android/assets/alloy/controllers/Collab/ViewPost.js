function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
                        text: "",
                        height: "auto",
                        width: "20%",
                        padding: 5
                    });
                    var labelTwo = Ti.UI.createLabel({
                        text: post.content,
                        height: "auto",
                        width: "80%",
                        padding: 5
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
                childPost: ""
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
        id: "ViewPost"
    });
    $.__views.ViewPost && $.addTopLevelView($.__views.ViewPost);
    $.__views.view1 = Ti.UI.createView({
        width: "100%",
        height: "70%",
        id: "view1"
    });
    $.__views.ViewPost.add($.__views.view1);
    $.__views.tableView1 = Ti.UI.createTableView({
        height: "70%",
        width: "80%",
        top: "10%",
        layout: "vertical",
        align: "center",
        border: "2",
        borderColor: "white",
        id: "tableView1",
        scrollable: "true"
    });
    $.__views.view1.add($.__views.tableView1);
    var __alloyId37 = [];
    $.__views.tableView2 = Ti.UI.createTableViewRow({
        id: "tableView2",
        layout: "vertical"
    });
    __alloyId37.push($.__views.tableView2);
    $.__views.commentTextField = Ti.UI.createTextArea({
        height: 100,
        width: "60%",
        hintText: "Add Comment Here",
        textAlign: "left",
        align: "center",
        borderColor: "white",
        borderWidth: 2,
        id: "commentTextField"
    });
    $.__views.tableView2.add($.__views.commentTextField);
    $.__views.postComment = Ti.UI.createButton({
        title: "Post",
        id: "postComment"
    });
    $.__views.tableView2.add($.__views.postComment);
    postComment ? $.__views.postComment.addEventListener("click", postComment) : __defers["$.__views.postComment!click!postComment"] = true;
    $.__views.__alloyId36 = Ti.UI.createTableView({
        data: __alloyId37,
        id: "__alloyId36"
    });
    $.__views.ViewPost.add($.__views.__alloyId36);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var Cloud = require("ti.cloud");
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
                text: posts.title,
                height: "auto",
                width: "20%",
                padding: 5
            });
            var labelTwo = Ti.UI.createLabel({
                text: posts.content,
                height: "auto",
                width: "80%",
                padding: 5
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
    __defers["$.__views.postComment!click!postComment"] && $.__views.postComment.addEventListener("click", postComment);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;