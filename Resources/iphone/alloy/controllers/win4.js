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
        var window = Alloy.createController("Collab/CreatePost").getView();
        window.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "win4";
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
    $.__views.myList = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        id: "myList",
        layout: "vertical"
    });
    $.__views.myList && $.addTopLevelView($.__views.myList);
    $.__views.mainThreadTable = Ti.UI.createTableView({
        height: "70%",
        width: "85%",
        top: "5%",
        layout: "vertical",
        align: "center",
        border: "2",
        borderColor: "white",
        id: "mainThreadTable"
    });
    $.__views.myList.add($.__views.mainThreadTable);
    $.__views.createPostButton = Ti.UI.createButton({
        title: "Create Post",
        id: "createPostButton"
    });
    $.__views.myList.add($.__views.createPostButton);
    createPost ? $.__views.createPostButton.addEventListener("click", createPost) : __defers["$.__views.createPostButton!click!createPost"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    Cloud.Posts.query({
        where: {
            parentPost: ""
        }
    }, function(e) {
        if (e.success) {
            {
                e.posts[0];
            }
            for (var i = 0; i < e.posts.length; i++) {
                var post = e.posts[i];
                var row = Ti.UI.createTableViewRow({
                    title: post.title,
                    textAlign: "center",
                    id: post.id,
                    font: {
                        fontSize: 20
                    }
                });
                $.mainThreadTable.appendRow(row);
            }
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        $.mainThreadTable.addEventListener("click", function(e) {
            var clickedRowData = e.rowData;
            e.row;
            var nextWindow = Alloy.createController("Collab/ViewPost", {
                postID: clickedRowData.id
            }).getView();
            nextWindow.open();
        });
    });
    __defers["$.__views.createPostButton!click!createPost"] && $.__views.createPostButton.addEventListener("click", createPost);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;