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
    this.__controllerPath = "win3";
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
    $.__views.win3 = Ti.UI.createWindow({
        id: "win3"
    });
    $.__views.win3 && $.addTopLevelView($.__views.win3);
    $.__views.label = Ti.UI.createLabel({
        text: "This is Course",
        id: "label"
    });
    $.__views.win3.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Your Courses",
        navBarHidden: false
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;