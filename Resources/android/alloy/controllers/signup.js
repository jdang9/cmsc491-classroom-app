function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cancelAccountClick() {
        Ti.API.info("CANCEL ACCOUNT CLICK");
        var window = Alloy.createController("index").getView();
        window.open();
    }
    function moveLoginContainer(evt) {
        $.loginContainer.animate(Ti.App.keyboardVisible ? {
            center: {
                x: Ti.Platform.displayCaps.platformWidth / 2,
                y: (Ti.Platform.displayCaps.platformHeight - evt.keyboardFrame.height) / 2
            },
            duration: 250
        } : {
            center: {
                x: Ti.Platform.displayCaps.platformWidth / 2,
                y: Ti.Platform.displayCaps.platformHeight / 2
            },
            duration: 250
        });
    }
    function createClick() {
        Cloud.Users.create({
            username: $.username_create.value,
            password: $.password_create.value,
            password_confirmation: $.password_confirm_create.value,
            email: $.email_create.value,
            first_name: $.first_name.value,
            last_name: $.last_name.value
        }, function(e) {
            if (e.success) {
                {
                    e.users[0];
                }
                var window = Alloy.createController("main").getView();
                window.open;
            } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
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
    var __defers = {};
    $.__views.signup = Ti.UI.createWindow({
        layout: "vertical",
        id: "signup"
    });
    $.__views.signup && $.addTopLevelView($.__views.signup);
    $.__views.loginContainer = Ti.UI.createView({
        backgroundColor: "#141925",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "loginContainer"
    });
    $.__views.signup.add($.__views.loginContainer);
    $.__views.bodyContainer = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        id: "bodyContainer"
    });
    $.__views.loginContainer.add($.__views.bodyContainer);
    $.__views.createAccountView = Ti.UI.createView({
        pd: 20,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 1,
        id: "createAccountView"
    });
    $.__views.bodyContainer.add($.__views.createAccountView);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%",
        width: "100%"
    });
    $.__views.createAccountView.add($.__views.scrollView);
    $.__views.createAccountView = Ti.UI.createView({
        pd: 20,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 1,
        id: "createAccountView"
    });
    $.__views.scrollView.add($.__views.createAccountView);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Username",
        id: "__alloyId18"
    });
    $.__views.createAccountView.add($.__views.__alloyId18);
    $.__views.username_create = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        hintText: "Username",
        id: "username_create"
    });
    $.__views.createAccountView.add($.__views.username_create);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Password",
        id: "__alloyId19"
    });
    $.__views.createAccountView.add($.__views.__alloyId19);
    $.__views.password_create = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        hintText: "Password",
        passwordMask: true,
        id: "password_create"
    });
    $.__views.createAccountView.add($.__views.password_create);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Password Confirmation",
        id: "__alloyId20"
    });
    $.__views.createAccountView.add($.__views.__alloyId20);
    $.__views.password_confirm_create = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        hintText: "Confirm Password",
        passwordMask: true,
        id: "password_confirm_create"
    });
    $.__views.createAccountView.add($.__views.password_confirm_create);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Email",
        id: "__alloyId21"
    });
    $.__views.createAccountView.add($.__views.__alloyId21);
    $.__views.email_create = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        hintText: "Email",
        id: "email_create"
    });
    $.__views.createAccountView.add($.__views.email_create);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "First Name",
        id: "__alloyId22"
    });
    $.__views.createAccountView.add($.__views.__alloyId22);
    $.__views.first_name = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        hintText: "First Name",
        id: "first_name"
    });
    $.__views.createAccountView.add($.__views.first_name);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Last Name",
        id: "__alloyId23"
    });
    $.__views.createAccountView.add($.__views.__alloyId23);
    $.__views.last_name = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        hintText: "Last Name",
        id: "last_name"
    });
    $.__views.createAccountView.add($.__views.last_name);
    $.__views.__alloyId24 = Ti.UI.createView({
        top: 17,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "__alloyId24"
    });
    $.__views.createAccountView.add($.__views.__alloyId24);
    $.__views.emailBtn = Ti.UI.createView({
        height: 44,
        top: 0,
        backgroundColor: "#5A86AF",
        borderRadius: 5,
        width: 130,
        right: 3,
        color: "#fff",
        id: "emailBtn"
    });
    $.__views.__alloyId24.add($.__views.emailBtn);
    createClick ? $.__views.emailBtn.addEventListener("click", createClick) : __defers["$.__views.emailBtn!click!createClick"] = true;
    $.__views.resetLbl = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 14
        },
        textAlign: "center",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "Create Account",
        id: "resetLbl"
    });
    $.__views.emailBtn.add($.__views.resetLbl);
    $.__views.cancelBtn = Ti.UI.createView({
        height: 44,
        top: 0,
        backgroundColor: "#6a6a6a",
        borderRadius: 5,
        left: 3,
        width: 130,
        color: "#fff",
        id: "cancelBtn"
    });
    $.__views.__alloyId24.add($.__views.cancelBtn);
    cancelAccountClick ? $.__views.cancelBtn.addEventListener("click", cancelAccountClick) : __defers["$.__views.cancelBtn!click!cancelAccountClick"] = true;
    $.__views.cancelLbl = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 14
        },
        textAlign: "center",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "Cancel",
        id: "cancelLbl"
    });
    $.__views.cancelBtn.add($.__views.cancelLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    arguments[0] || {};
    var actInd;
    var actIndParent;
    $.loginClick = function() {
        loginClick();
    };
    $.hideActivityIndicator = function() {
        null != actInd && $[actIndParent].remove(actInd);
    };
    Ti.App.addEventListener("keyboardframechanged", moveLoginContainer);
    $.open = function() {
        $.signup.open();
        $.loginContainer.height = "100%";
        $.createAccountView.opacity = 1;
    };
    $.close = function() {
        Ti.App.removeEventListener("keyboardframechanged", moveLoginContainer);
        $.destroy();
        Alloy.CFG.skipLogin = false;
    };
    $.open();
    __defers["$.__views.emailBtn!click!createClick"] && $.__views.emailBtn.addEventListener("click", createClick);
    __defers["$.__views.cancelBtn!click!cancelAccountClick"] && $.__views.cancelBtn.addEventListener("click", cancelAccountClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;