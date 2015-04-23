function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cancel() {
        var window = Alloy.createController("main").getView();
        window.open();
    }
    function submit() {
        Cloud.Users.update({
            custom_fields: {
                userBio: $.bioTextField.value
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                "Just updated bio as: " + user.custom_fields.userBio;
                cancel();
            } else "Error:\n" + (e.error && e.message || JSON.stringify(e));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bio";
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
    $.__views.bio = Ti.UI.createWindow({
        id: "bio"
    });
    $.__views.bio && $.addTopLevelView($.__views.bio);
    $.__views.profileContainer = Ti.UI.createView({
        id: "profileContainer"
    });
    $.__views.bio.add($.__views.profileContainer);
    $.__views.bioChange = Ti.UI.createView({
        id: "bioChange"
    });
    $.__views.profileContainer.add($.__views.bioChange);
    $.__views.bioTextField = Ti.UI.createTextArea({
        height: "20%",
        width: "60%",
        hintText: "Enter Bio Here",
        id: "bioTextField"
    });
    $.__views.bioChange.add($.__views.bioTextField);
    var __alloyId1 = [];
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row",
        layout: "horizontal"
    });
    __alloyId1.push($.__views.row);
    $.__views.submitBio = Ti.UI.createButton({
        title: "Submit",
        id: "submitBio"
    });
    $.__views.row.add($.__views.submitBio);
    submit ? $.__views.submitBio.addEventListener("click", submit) : __defers["$.__views.submitBio!click!submit"] = true;
    $.__views.cancelBio = Ti.UI.createButton({
        title: "Cancel",
        id: "cancelBio"
    });
    $.__views.row.add($.__views.cancelBio);
    cancel ? $.__views.cancelBio.addEventListener("click", cancel) : __defers["$.__views.cancelBio!click!cancel"] = true;
    $.__views.__alloyId0 = Ti.UI.createTableView({
        data: __alloyId1,
        id: "__alloyId0"
    });
    $.__views.bioChange.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    __defers["$.__views.submitBio!click!submit"] && $.__views.submitBio.addEventListener("click", submit);
    __defers["$.__views.cancelBio!click!cancel"] && $.__views.cancelBio.addEventListener("click", cancel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;