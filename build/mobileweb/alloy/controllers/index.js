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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.loginView = Alloy.createWidget("com.appcelerator.login", "widget", {
        id: "loginView",
        __parentSymbol: $.__views.index
    });
    $.__views.loginView.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    var loginWidget = Alloy.createWidget("com.appcelerator.login", null, {
        loginCallback: function() {
            Cloud.Users.login({
                login: $.username.value,
                password: $.password.value
            }, function(e) {
                if (e.success) {
                    currentUser = e.users[0];
                    alert(currentUser);
                    Ti.App.Properties.setString("sessionid", e.meta.session_id);
                    $.username.hide();
                    $.password.hide();
                    var window = Alloy.createController("main").getView();
                    window.open();
                } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        },
        createCallback: function() {},
        remindCallback: function() {}
    });
    loginWidget.open();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;