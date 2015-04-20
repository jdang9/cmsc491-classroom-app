function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function activityIndicator() {
        var style;
        style = Ti.UI.ActivityIndicatorStyle.DARK;
        return Ti.UI.createActivityIndicator({
            color: "#ffffff",
            style: style,
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE
        });
    }
    function forgotClick() {
        Ti.API.info("FORGOT CLICK");
        resetLoginForm();
        $.loginView.animate({
            opacity: 0,
            duration: 250
        }, function() {
            $.passworReminderView.visible = true;
            $.passworReminderView.animate({
                opacity: 1,
                duration: 250
            });
            false;
            $.loginContainer.height = "100%";
        });
    }
    function createAccountClick() {
        Ti.API.info("CREATE ACCOUNT CLICK");
        var window = Alloy.createController("signup").getView();
        window.open();
    }
    function remindClick() {
        if ($.emailTxt.value) {
            actInd || (actInd = activityIndicator());
            $.emailBtn.add(actInd);
            $.emailBtn.title = "";
            actIndParent = "emailBtn";
            actInd.show();
            settings.remindCallback && settings.remindCallback();
        } else alert("Please provide your email.");
    }
    function cancelClick() {
        $.passworReminderView.animate({
            opacity: 0,
            duration: 250
        }, function() {
            $.passworReminderView.visible = false;
            $.loginView.animate({
                opacity: 1,
                duration: 250
            });
            false;
            $.loginContainer.height = "100%";
        });
        resetEmailForm();
    }
    function resetEmailForm() {
        $.emailTxt.value = "";
    }
    function resetLoginForm() {
        $.text_username.value = "";
        $.text_password.value = "";
    }
    function focusStyle() {}
    function blurStyle() {}
    function focusPassword() {
        $.passwordTxt.focus();
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
    function loginClick() {
        Cloud.Users.login({
            login: $.text_username.value,
            password: $.text_password.value
        }, function(e) {
            if (e.success) {
                currentUser = e.users[0];
                Ti.App.Properties.setString("sessionid", e.meta.session_id);
                $.text_username.hide();
                $.text_password.hide();
                var window = Alloy.createController("main").getView();
                window.open();
            } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
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
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.loginContainer = Ti.UI.createView({
        backgroundColor: "#141925",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "loginContainer"
    });
    $.__views.index.add($.__views.loginContainer);
    $.__views.header = Ti.UI.createImageView({
        height: 300,
        width: Ti.UI.SIZE,
        top: 20,
        image: "/images/header_logo.png",
        id: "header"
    });
    $.__views.loginContainer.add($.__views.header);
    $.__views.bodyContainer = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        id: "bodyContainer"
    });
    $.__views.loginContainer.add($.__views.bodyContainer);
    $.__views.loginView = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 0,
        id: "loginView"
    });
    $.__views.bodyContainer.add($.__views.loginView);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Email",
        id: "__alloyId2"
    });
    $.__views.loginView.add($.__views.__alloyId2);
    $.__views.text_username = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        top: 4,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        id: "text_username"
    });
    $.__views.loginView.add($.__views.text_username);
    focusPassword ? $.__views.text_username.addEventListener("return", focusPassword) : __defers["$.__views.text_username!return!focusPassword"] = true;
    focusStyle ? $.__views.text_username.addEventListener("focus", focusStyle) : __defers["$.__views.text_username!focus!focusStyle"] = true;
    blurStyle ? $.__views.text_username.addEventListener("blur", blurStyle) : __defers["$.__views.text_username!blur!blurStyle"] = true;
    $.__views.__alloyId3 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Password",
        id: "__alloyId3"
    });
    $.__views.loginView.add($.__views.__alloyId3);
    $.__views.text_password = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        top: 4,
        passwordMask: true,
        id: "text_password"
    });
    $.__views.loginView.add($.__views.text_password);
    focusStyle ? $.__views.text_password.addEventListener("focus", focusStyle) : __defers["$.__views.text_password!focus!focusStyle"] = true;
    blurStyle ? $.__views.text_password.addEventListener("blur", blurStyle) : __defers["$.__views.text_password!blur!blurStyle"] = true;
    $.__views.__alloyId4 = Ti.UI.createView({
        top: 17,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "__alloyId4"
    });
    $.__views.loginView.add($.__views.__alloyId4);
    $.__views.helpImg = Ti.UI.createImageView({
        height: 25,
        width: 25,
        top: 10,
        left: 0,
        image: "images/help-btn.png",
        id: "helpImg"
    });
    $.__views.__alloyId4.add($.__views.helpImg);
    forgotClick ? $.__views.helpImg.addEventListener("click", forgotClick) : __defers["$.__views.helpImg!click!forgotClick"] = true;
    $.__views.forgotLbl = Ti.UI.createLabel({
        height: 25,
        color: "#999",
        font: {
            fontSize: 12
        },
        shadowOffset: 1,
        shadowColor: "#363636",
        top: 10,
        left: 26,
        text: "Forgot Password",
        id: "forgotLbl"
    });
    $.__views.__alloyId4.add($.__views.forgotLbl);
    forgotClick ? $.__views.forgotLbl.addEventListener("click", forgotClick) : __defers["$.__views.forgotLbl!click!forgotClick"] = true;
    $.__views.loginBtn = Ti.UI.createView({
        height: 44,
        top: 0,
        backgroundColor: "#5A86AF",
        borderRadius: 5,
        width: 100,
        right: 3,
        id: "loginBtn"
    });
    $.__views.__alloyId4.add($.__views.loginBtn);
    loginClick ? $.__views.loginBtn.addEventListener("click", loginClick) : __defers["$.__views.loginBtn!click!loginClick"] = true;
    $.__views.loginLbl = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 14
        },
        textAlign: "center",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "Login",
        id: "loginLbl"
    });
    $.__views.loginBtn.add($.__views.loginLbl);
    $.__views.__alloyId5 = Ti.UI.createView({
        top: 17,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "__alloyId5"
    });
    $.__views.loginView.add($.__views.__alloyId5);
    $.__views.accountBtn = Ti.UI.createButton({
        height: 44,
        top: 0,
        backgroundColor: "#5A86AF",
        borderRadius: 5,
        title: "Create Account",
        id: "accountBtn"
    });
    $.__views.__alloyId5.add($.__views.accountBtn);
    createAccountClick ? $.__views.accountBtn.addEventListener("click", createAccountClick) : __defers["$.__views.accountBtn!click!createAccountClick"] = true;
    $.__views.passworReminderView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 0,
        visible: false,
        top: 0,
        id: "passworReminderView"
    });
    $.__views.bodyContainer.add($.__views.passworReminderView);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Email",
        id: "__alloyId6"
    });
    $.__views.passworReminderView.add($.__views.__alloyId6);
    $.__views.emailTxt = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        top: 4,
        id: "emailTxt"
    });
    $.__views.passworReminderView.add($.__views.emailTxt);
    focusStyle ? $.__views.emailTxt.addEventListener("focus", focusStyle) : __defers["$.__views.emailTxt!focus!focusStyle"] = true;
    blurStyle ? $.__views.emailTxt.addEventListener("blur", blurStyle) : __defers["$.__views.emailTxt!blur!blurStyle"] = true;
    $.__views.__alloyId7 = Ti.UI.createView({
        top: 17,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "__alloyId7"
    });
    $.__views.passworReminderView.add($.__views.__alloyId7);
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
    $.__views.__alloyId7.add($.__views.emailBtn);
    remindClick ? $.__views.emailBtn.addEventListener("click", remindClick) : __defers["$.__views.emailBtn!click!remindClick"] = true;
    $.__views.resetLbl = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 14
        },
        textAlign: "center",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "Reset",
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
    $.__views.__alloyId7.add($.__views.cancelBtn);
    cancelClick ? $.__views.cancelBtn.addEventListener("click", cancelClick) : __defers["$.__views.cancelBtn!click!cancelClick"] = true;
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
    var settings = {};
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
        $.index.open();
        $.loginContainer.height = "100%";
        $.loginView.opacity = 1;
        Ti.API.info($.loginContainer.height);
    };
    $.close = function() {
        Ti.App.removeEventListener("keyboardframechanged", moveLoginContainer);
        $.destroy();
        Alloy.CFG.skipLogin = false;
    };
    $.open();
    __defers["$.__views.text_username!return!focusPassword"] && $.__views.text_username.addEventListener("return", focusPassword);
    __defers["$.__views.text_username!focus!focusStyle"] && $.__views.text_username.addEventListener("focus", focusStyle);
    __defers["$.__views.text_username!blur!blurStyle"] && $.__views.text_username.addEventListener("blur", blurStyle);
    __defers["$.__views.text_password!focus!focusStyle"] && $.__views.text_password.addEventListener("focus", focusStyle);
    __defers["$.__views.text_password!blur!blurStyle"] && $.__views.text_password.addEventListener("blur", blurStyle);
    __defers["$.__views.helpImg!click!forgotClick"] && $.__views.helpImg.addEventListener("click", forgotClick);
    __defers["$.__views.forgotLbl!click!forgotClick"] && $.__views.forgotLbl.addEventListener("click", forgotClick);
    __defers["$.__views.loginBtn!click!loginClick"] && $.__views.loginBtn.addEventListener("click", loginClick);
    __defers["$.__views.accountBtn!click!createAccountClick"] && $.__views.accountBtn.addEventListener("click", createAccountClick);
    __defers["$.__views.emailTxt!focus!focusStyle"] && $.__views.emailTxt.addEventListener("focus", focusStyle);
    __defers["$.__views.emailTxt!blur!blurStyle"] && $.__views.emailTxt.addEventListener("blur", blurStyle);
    __defers["$.__views.emailBtn!click!remindClick"] && $.__views.emailBtn.addEventListener("click", remindClick);
    __defers["$.__views.cancelBtn!click!cancelClick"] && $.__views.cancelBtn.addEventListener("click", cancelClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;