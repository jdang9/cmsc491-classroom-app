function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
        layout: "horizontal",
        id: "signup"
    });
    $.__views.signup && $.addTopLevelView($.__views.signup);
    $.__views.signup = Ti.UI.createView({
        id: "signup"
    });
    $.__views.signup.add($.__views.signup);
    $.__views.text_userSignup = Ti.UI.createTextField({
        textColor: "#FFFFFF",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "text_userSignup",
        value: "Enter a user name"
    });
    $.__views.signup.add($.__views.text_userSignup);
    $.__views.text_passSignup = Ti.UI.createTextField({
        textColor: "#FFFFFF",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "text_passSignup",
        passwordMask: "true",
        value: "Enter your password"
    });
    $.__views.signup.add($.__views.text_passSignup);
    $.__views.text_passSignupConfirm = Ti.UI.createTextField({
        textColor: "#FFFFFF",
        textAlign: "center",
        font: "Helvetica Neue Light",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: "10",
        bottom: "10",
        maxLength: "16",
        id: "text_passSignupConfirm",
        passwordMask: "true",
        value: "Re-enter your password"
    });
    $.__views.signup.add($.__views.text_passSignupConfirm);
    $.__views.newUserSubmit = Ti.UI.createButton({
        backgroundColor: "#457AB1",
        color: "white",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        id: "newUserSubmit",
        title: "Submit"
    });
    $.__views.signup.add($.__views.newUserSubmit);
    $.__views.newUserCancel = Ti.UI.createButton({
        backgroundColor: "#457AB1",
        color: "white",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        id: "newUserCancel",
        title: "Cancel"
    });
    $.__views.signup.add($.__views.newUserCancel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var username = $.text_userSignup.value.toString();
    var password = $.text_passSignup.value.toString();
    Ti.include("accounts.js");
    var db = Ti.App.listDb;
    db = Ti.Database.open("ClassroomDatabase");
    var win = Ti.UI.createWindow({
        backgroundColor: "black"
    });
    var txtEmail = Titanium.UI.createTextField({
        color: "#336699",
        top: 200,
        left: 50,
        width: 300,
        height: 40,
        hintText: "Username"
    });
    win.add(txtEmail);
    var txtPass = Titanium.UI.createTextField({
        color: "#336699",
        top: 250,
        left: 50,
        width: 300,
        height: 40,
        hintText: "Password",
        passwordMask: true
    });
    win.add(txtPass);
    var btnSignup = Titanium.UI.createButton({
        title: "Signup",
        top: 300,
        width: 90,
        height: 35,
        borderRadius: 1,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 14
        }
    });
    win.add(btnSignup);
    btnSignup.addEventListener("click", function() {
        ({
            username: $.text_userSignup.value,
            password: $.text_passSignup.value
        });
        db.ClassroomDatabase.insert(username, password);
    });
    win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;