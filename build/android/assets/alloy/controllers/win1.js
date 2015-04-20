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
    this.__controllerPath = "win1";
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
    $.__views.win1 = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    $.__views.label = Ti.UI.createLabel({
        color: "#fff",
        text: "This is the DashBoard",
        id: "label"
    });
    $.__views.win1.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Welcome to Classroom+ DashBoard!"
    });
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;