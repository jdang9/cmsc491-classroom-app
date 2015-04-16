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
    this.__controllerPath = "main";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
    var __alloyId7 = [];
    $.__views.win1 = Alloy.createController("win1", {
        id: "win1",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.win1.getViewEx({
            recurse: true
        }),
        title: "DashBoard",
        id: "__alloyId8"
    });
    __alloyId7.push($.__views.__alloyId8);
    $.__views.win2 = Alloy.createController("win2", {
        id: "win2",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId10 = Ti.UI.createTab({
        window: $.__views.win2.getViewEx({
            recurse: true
        }),
        title: "Info",
        id: "__alloyId10"
    });
    __alloyId7.push($.__views.__alloyId10);
    $.__views.win3 = Alloy.createController("win3", {
        id: "win3",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId12 = Ti.UI.createTab({
        window: $.__views.win3.getViewEx({
            recurse: true
        }),
        title: "Courses",
        id: "__alloyId12"
    });
    __alloyId7.push($.__views.__alloyId12);
    $.__views.win4 = Alloy.createController("win4", {
        id: "win4",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.win4.getViewEx({
            recurse: true
        }),
        title: "Collaboration",
        id: "__alloyId14"
    });
    __alloyId7.push($.__views.__alloyId14);
    $.__views.win5 = Alloy.createController("win5", {
        id: "win5",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId16 = Ti.UI.createTab({
        window: $.__views.win5.getViewEx({
            recurse: true
        }),
        title: "Check-in",
        id: "__alloyId16"
    });
    __alloyId7.push($.__views.__alloyId16);
    $.__views.main = Ti.UI.createTabGroup({
        tabs: __alloyId7,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    doopen ? $.__views.main.addEventListener("open", doopen) : __defers["$.__views.main!open!doopen"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.main.open();
    __defers["$.__views.main!open!doopen"] && $.__views.main.addEventListener("open", doopen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;