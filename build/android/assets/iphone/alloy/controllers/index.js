function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function login() {
        var username = $.txtLogin.value.toString();
        var password = $.txtPass.value.toString();
        if ("admin" == username && "hunter" == password) {
            var window = Alloy.createController("main").getView();
            window.open();
        } else alert("Incorrect password, please try again.");
    }
    function signup() {
        alert("Function is coming!");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    var __alloyId0 = [];
    $.__views.aboveLogo = Ti.UI.createTableViewSection({
        separatorColor: "white",
        divider: "white",
        id: "aboveLogo"
    });
    __alloyId0.push($.__views.aboveLogo);
    $.__views.__alloyId1 = Ti.UI.createTableViewRow({
        height: "15%",
        width: "100%",
        id: "__alloyId1"
    });
    $.__views.aboveLogo.add($.__views.__alloyId1);
    $.__views.logo = Ti.UI.createTableViewSection({
        separatorColor: "white",
        divider: "white",
        id: "logo"
    });
    __alloyId0.push($.__views.logo);
    $.__views.__alloyId2 = Ti.UI.createTableViewRow({
        height: "300",
        width: "100%",
        id: "__alloyId2"
    });
    $.__views.logo.add($.__views.__alloyId2);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: "https://i.imgur.com/NfLRcfN.png",
        height: "100%",
        width: "300"
    });
    $.__views.__alloyId2.add($.__views.image);
    $.__views.textFields = Ti.UI.createTableViewSection({
        separatorColor: "white",
        divider: "white",
        id: "textFields",
        layout: "vertical"
    });
    __alloyId0.push($.__views.textFields);
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        height: "80",
        width: "62%",
        align: "center",
        id: "__alloyId3"
    });
    $.__views.textFields.add($.__views.__alloyId3);
    $.__views.txtLogin = Ti.UI.createTextField({
        textColor: "#FFFFFF",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "txtLogin",
        hintText: "Email / Username",
        paddingLeft: "100",
        align: "center",
        width: "100%",
        height: "60"
    });
    $.__views.__alloyId3.add($.__views.txtLogin);
    $.__views.__alloyId4 = Ti.UI.createTableViewRow({
        height: "80",
        width: "62%",
        align: "center",
        id: "__alloyId4"
    });
    $.__views.textFields.add($.__views.__alloyId4);
    $.__views.txtPass = Ti.UI.createTextField({
        textColor: "#FFFFFF",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "txtPass",
        hintText: "Password",
        passwordMask: "true",
        paddingLeft: "100",
        width: "100%",
        height: "60"
    });
    $.__views.__alloyId4.add($.__views.txtPass);
    $.__views.__alloyId5 = Ti.UI.createTableViewRow({
        height: "100",
        width: "62%",
        align: "center",
        id: "__alloyId5"
    });
    $.__views.textFields.add($.__views.__alloyId5);
    $.__views.btnLogin = Ti.UI.createButton({
        backgroundColor: "#457AB1",
        color: "white",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        id: "btnLogin",
        title: "Login",
        top: "10",
        width: "100%",
        height: "88"
    });
    $.__views.__alloyId5.add($.__views.btnLogin);
    login ? $.__views.btnLogin.addEventListener("click", login) : __defers["$.__views.btnLogin!click!login"] = true;
    $.__views.__alloyId6 = Ti.UI.createTableViewRow({
        height: "100",
        width: "62%",
        align: "center",
        id: "__alloyId6"
    });
    $.__views.textFields.add($.__views.__alloyId6);
    $.__views.btnSignup = Ti.UI.createButton({
        backgroundColor: "#457AB1",
        color: "white",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        id: "btnSignup",
        title: "Sign up",
        top: "20",
        width: "100%",
        height: "88"
    });
    $.__views.__alloyId6.add($.__views.btnSignup);
    signup ? $.__views.btnSignup.addEventListener("click", signup) : __defers["$.__views.btnSignup!click!signup"] = true;
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId0,
        id: "table",
        separatorColor: "white"
    });
    $.__views.index.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.btnLogin!click!login"] && $.__views.btnLogin.addEventListener("click", login);
    __defers["$.__views.btnSignup!click!signup"] && $.__views.btnSignup.addEventListener("click", signup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;