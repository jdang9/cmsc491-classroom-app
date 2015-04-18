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
    this.__controllerPath = "win5";
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
    $.__views.win5 = Ti.UI.createWindow({
        id: "win5"
    });
    $.__views.win5 && $.addTopLevelView($.__views.win5);
    $.__views.label = Ti.UI.createLabel({
        text: "This is Check-in",
        id: "label"
    });
    $.__views.win5.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.createWindow({
        backgroundColor: "green",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Uilities"
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;