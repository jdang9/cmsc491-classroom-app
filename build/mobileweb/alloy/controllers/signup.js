function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createUser() {
        Cloud.Users.create({
            username: $.username.value,
            password: $.password.value,
            password_confirmation: $.password.value,
            email: $.email.value,
            first_name: $.first_name.value,
            last_name: $.last_name.value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                alert("Success:\nid: " + user.id + "\nsessionId: " + Cloud.sessionId + "\n");
                var window = Alloy.createController("main").getView();
                window.open;
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function cancel() {
        var window = Alloy.createController("index").getView();
        window.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "signup";
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
    $.__views.signup = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "signup"
    });
    $.__views.signup && $.addTopLevelView($.__views.signup);
    var __alloyId17 = [];
    $.__views.textFields = Ti.UI.createTableViewSection({
        separatorColor: "white",
        divider: "white",
        id: "textFields",
        layout: "vertical"
    });
    __alloyId17.push($.__views.textFields);
    $.__views.__alloyId18 = Ti.UI.createTableViewRow({
        height: "80",
        width: "62%",
        align: "center",
        id: "__alloyId18"
    });
    $.__views.textFields.add($.__views.__alloyId18);
    $.__views.username = Ti.UI.createTextField({
        textColor: "black",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "username",
        hintText: "Enter a user name"
    });
    $.__views.__alloyId18.add($.__views.username);
    $.__views.__alloyId19 = Ti.UI.createTableViewRow({
        height: "80",
        width: "62%",
        align: "center",
        id: "__alloyId19"
    });
    $.__views.textFields.add($.__views.__alloyId19);
    $.__views.password = Ti.UI.createTextField({
        textColor: "black",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "password",
        passwordMask: "true",
        hintText: "Enter your password"
    });
    $.__views.__alloyId19.add($.__views.password);
    $.__views.__alloyId20 = Ti.UI.createTableViewRow({
        height: "80",
        width: "62%",
        align: "center",
        id: "__alloyId20"
    });
    $.__views.textFields.add($.__views.__alloyId20);
    $.__views.email = Ti.UI.createTextField({
        textColor: "black",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "email",
        hintText: "Enter your e-mail"
    });
    $.__views.__alloyId20.add($.__views.email);
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        height: "80",
        width: "62%",
        align: "center",
        id: "__alloyId21"
    });
    $.__views.textFields.add($.__views.__alloyId21);
    $.__views.first_name = Ti.UI.createTextField({
        textColor: "black",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "first_name",
        hintText: "Enter your first name"
    });
    $.__views.__alloyId21.add($.__views.first_name);
    $.__views.__alloyId22 = Ti.UI.createTableViewRow({
        height: "80",
        width: "62%",
        align: "center",
        id: "__alloyId22"
    });
    $.__views.textFields.add($.__views.__alloyId22);
    $.__views.last_name = Ti.UI.createTextField({
        textColor: "black",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "last_name",
        hintText: "Enter your last name"
    });
    $.__views.__alloyId22.add($.__views.last_name);
    $.__views.__alloyId23 = Ti.UI.createTableViewRow({
        height: "100",
        width: "62%",
        align: "center",
        id: "__alloyId23"
    });
    $.__views.textFields.add($.__views.__alloyId23);
    $.__views.newUserSubmit = Ti.UI.createButton({
        backgroundColor: "#457AB1",
        color: "white",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        id: "newUserSubmit",
        title: "Submit"
    });
    $.__views.__alloyId23.add($.__views.newUserSubmit);
    $.__views.__alloyId24 = Ti.UI.createTableViewRow({
        height: "100",
        width: "62%",
        align: "center",
        id: "__alloyId24"
    });
    $.__views.textFields.add($.__views.__alloyId24);
    $.__views.newUserCancel = Ti.UI.createButton({
        backgroundColor: "#457AB1",
        color: "white",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        id: "newUserCancel",
        title: "Cancel"
    });
    $.__views.__alloyId24.add($.__views.newUserCancel);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId17,
        id: "table",
        separatorColor: "white"
    });
    $.__views.signup.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    $.newUserSubmit.addEventListener("click", createUser);
    $.newUserCancel.addEventListener("click", cancel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;