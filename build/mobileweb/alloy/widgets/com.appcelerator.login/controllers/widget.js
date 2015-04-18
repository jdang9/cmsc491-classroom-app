function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.appcelerator.login/" + s : s.substring(0, index) + "/com.appcelerator.login/" + s.substring(index + 1);
    return path;
}

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
    function loginClick() {
        if ($.usernameTxt.value && $.passwordTxt.value) {
            $.usernameTxt.blur();
            $.passwordTxt.blur();
            actInd || (actInd = activityIndicator());
            $.loginBtn.add(actInd);
            actIndParent = "loginBtn";
            actInd.show();
            settings.loginCallback && settings.loginCallback({
                username: $.usernameTxt.value,
                password: $.passwordTxt.value
            });
        } else alert("Please provide your credentials.");
    }
    function loginFacebook() {
        $.facebookBtn.image = WPATH("/images/facebook-btn-loading.png");
        actInd || (actInd = activityIndicator());
        $.facebookBtnWrapper.add(actInd);
        actIndParent = "facebookBtnWrapper";
        actInd.top = 20;
        actInd.show();
        if (settings.allowFacebook && facebook) {
            facebook.addEventListener("login", function(e) {
                e.success && settings.loginCallback && settings.loginCallback({
                    accessToken: facebook.accessToken,
                    success: e.success
                });
            });
            facebook.authorize();
        }
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
            $.loginContainer.height = 337;
        });
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
            $.loginContainer.height = 440;
        });
        resetEmailForm();
    }
    function resetEmailForm() {
        $.emailTxt.value = "";
    }
    function resetLoginForm() {
        $.usernameTxt.value = "";
        $.passwordTxt.value = "";
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
    new (require("alloy/widget"))("com.appcelerator.login");
    this.__widgetId = "com.appcelerator.login";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.wrapper = Ti.UI.createWindow({
        backgroundColor: "#000",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        navBarHidden: true,
        id: "wrapper"
    });
    $.__views.wrapper && $.addTopLevelView($.__views.wrapper);
    $.__views.loginContainer = Ti.UI.createView({
        backgroundColor: "#141925",
        width: 319,
        height: 164,
        layout: "vertical",
        id: "loginContainer"
    });
    $.__views.wrapper.add($.__views.loginContainer);
    $.__views.header = Ti.UI.createImageView({
        height: 140,
        width: Ti.UI.SIZE,
        top: 20,
        image: WPATH("/images/header.png"),
        id: "header"
    });
    $.__views.loginContainer.add($.__views.header);
    $.__views.bodyContainer = Ti.UI.createView({
        top: 0,
        height: Ti.UI.SIZE,
        id: "bodyContainer"
    });
    $.__views.loginContainer.add($.__views.bodyContainer);
    $.__views.loginView = Ti.UI.createView({
        top: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 0,
        id: "loginView"
    });
    $.__views.bodyContainer.add($.__views.loginView);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Email",
        id: "__alloyId0"
    });
    $.__views.loginView.add($.__views.__alloyId0);
    $.__views.usernameTxt = Ti.UI.createTextField({
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
        id: "usernameTxt"
    });
    $.__views.loginView.add($.__views.usernameTxt);
    focusPassword ? $.__views.usernameTxt.addEventListener("return", focusPassword) : __defers["$.__views.usernameTxt!return!focusPassword"] = true;
    focusStyle ? $.__views.usernameTxt.addEventListener("focus", focusStyle) : __defers["$.__views.usernameTxt!focus!focusStyle"] = true;
    blurStyle ? $.__views.usernameTxt.addEventListener("blur", blurStyle) : __defers["$.__views.usernameTxt!blur!blurStyle"] = true;
    $.__views.__alloyId1 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Password",
        id: "__alloyId1"
    });
    $.__views.loginView.add($.__views.__alloyId1);
    $.__views.passwordTxt = Ti.UI.createTextField({
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
        id: "passwordTxt"
    });
    $.__views.loginView.add($.__views.passwordTxt);
    focusStyle ? $.__views.passwordTxt.addEventListener("focus", focusStyle) : __defers["$.__views.passwordTxt!focus!focusStyle"] = true;
    blurStyle ? $.__views.passwordTxt.addEventListener("blur", blurStyle) : __defers["$.__views.passwordTxt!blur!blurStyle"] = true;
    $.__views.__alloyId2 = Ti.UI.createView({
        top: 17,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "__alloyId2"
    });
    $.__views.loginView.add($.__views.__alloyId2);
    $.__views.helpImg = Ti.UI.createImageView({
        height: 25,
        width: 25,
        top: 10,
        left: 0,
        image: WPATH("/images/help-btn.png"),
        id: "helpImg"
    });
    $.__views.__alloyId2.add($.__views.helpImg);
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
    $.__views.__alloyId2.add($.__views.forgotLbl);
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
    $.__views.__alloyId2.add($.__views.loginBtn);
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
    $.__views.facebookOptionView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 100,
        layout: "vertical",
        id: "facebookOptionView",
        visible: "false"
    });
    $.__views.loginView.add($.__views.facebookOptionView);
    $.__views.__alloyId3 = Ti.UI.createView({
        top: 20,
        height: 1,
        width: "90%",
        backgroundColor: "#fff",
        opacity: .5,
        id: "__alloyId3"
    });
    $.__views.facebookOptionView.add($.__views.__alloyId3);
    $.__views.facebookBtnWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "facebookBtnWrapper"
    });
    $.__views.facebookOptionView.add($.__views.facebookBtnWrapper);
    $.__views.facebookBtn = Ti.UI.createImageView({
        top: 10,
        image: WPATH("/images/facebook-btn.png"),
        height: 41,
        width: Ti.UI.SIZE,
        id: "facebookBtn"
    });
    $.__views.facebookBtnWrapper.add($.__views.facebookBtn);
    loginFacebook ? $.__views.facebookBtn.addEventListener("click", loginFacebook) : __defers["$.__views.facebookBtn!click!loginFacebook"] = true;
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
    $.__views.__alloyId4 = Ti.UI.createLabel({
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE,
        text: "Email",
        id: "__alloyId4"
    });
    $.__views.passworReminderView.add($.__views.__alloyId4);
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
    $.__views.__alloyId5 = Ti.UI.createView({
        top: 17,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        id: "__alloyId5"
    });
    $.__views.passworReminderView.add($.__views.__alloyId5);
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
    $.__views.__alloyId5.add($.__views.emailBtn);
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
    $.__views.__alloyId5.add($.__views.cancelBtn);
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
    var _args = arguments[0] || {};
    var settings = {};
    var actInd;
    var actIndParent;
    var facebook = void 0;
    try {
        facebook = require("facebook");
    } catch (e) {
        Ti.API.info("Facebook module is not available.");
    }
    $.init = function(params) {
        settings.loginCallback = params.loginCallback;
        settings.remindCallback = params.remindCallback;
        settings.createCallback = params.createCallback;
        settings.allowFacebook = params.facebookAppId && params.facebookPermissions ? true : false;
        settings.facebookAppId = params.facebookAppId || null;
        settings.facebookPermissions = params.facebookPermissions || null;
        settings.facebookAppId && (facebook.appid = settings.facebookAppId);
        settings.facebookPermissions && (facebook.permissions = settings.facebookPermissions);
    };
    $.init(_args);
    $.loginClick = function() {
        loginClick();
    };
    $.hideActivityIndicator = function() {
        null != actInd && $[actIndParent].remove(actInd);
    };
    Ti.App.addEventListener("keyboardframechanged", moveLoginContainer);
    $.open = function() {
        $.wrapper.open();
        settings.allowFacebook && ($.facebookOptionView.visible = true);
        $.loginContainer.height = settings.allowFacebook ? 500 : 440;
        $.loginView.opacity = 1;
        Ti.API.info($.loginContainer.height);
    };
    $.close = function() {
        Ti.App.removeEventListener("keyboardframechanged", moveLoginContainer);
        $.destroy();
        Alloy.CFG.skipLogin = false;
    };
    $.open();
    __defers["$.__views.usernameTxt!return!focusPassword"] && $.__views.usernameTxt.addEventListener("return", focusPassword);
    __defers["$.__views.usernameTxt!focus!focusStyle"] && $.__views.usernameTxt.addEventListener("focus", focusStyle);
    __defers["$.__views.usernameTxt!blur!blurStyle"] && $.__views.usernameTxt.addEventListener("blur", blurStyle);
    __defers["$.__views.passwordTxt!focus!focusStyle"] && $.__views.passwordTxt.addEventListener("focus", focusStyle);
    __defers["$.__views.passwordTxt!blur!blurStyle"] && $.__views.passwordTxt.addEventListener("blur", blurStyle);
    __defers["$.__views.helpImg!click!forgotClick"] && $.__views.helpImg.addEventListener("click", forgotClick);
    __defers["$.__views.forgotLbl!click!forgotClick"] && $.__views.forgotLbl.addEventListener("click", forgotClick);
    __defers["$.__views.loginBtn!click!loginClick"] && $.__views.loginBtn.addEventListener("click", loginClick);
    __defers["$.__views.facebookBtn!click!loginFacebook"] && $.__views.facebookBtn.addEventListener("click", loginFacebook);
    __defers["$.__views.emailTxt!focus!focusStyle"] && $.__views.emailTxt.addEventListener("focus", focusStyle);
    __defers["$.__views.emailTxt!blur!blurStyle"] && $.__views.emailTxt.addEventListener("blur", blurStyle);
    __defers["$.__views.emailBtn!click!remindClick"] && $.__views.emailBtn.addEventListener("click", remindClick);
    __defers["$.__views.cancelBtn!click!cancelClick"] && $.__views.cancelBtn.addEventListener("click", cancelClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;