function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeWindow() {
        $.win3.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bluewin";
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
    $.__views.win3 = Ti.UI.createWindow({
        id: "win3",
        title: "Blue Window",
        backgroundColor: "blue"
    });
    $.__views.win3 && $.addTopLevelView($.__views.win3);
    $.__views.__alloyId0 = Ti.UI.createButton({
        title: "Close Window",
        id: "__alloyId0"
    });
    $.__views.win3.add($.__views.__alloyId0);
    closeWindow ? $.__views.__alloyId0.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId0!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId0!click!closeWindow"] && $.__views.__alloyId0.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;