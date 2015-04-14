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
    var __alloyId0 = [];
    $.__views.win = Ti.UI.createWindow({
        id: "win"
    });
    $.__views.label = Ti.UI.createLabel({
        id: "label"
    });
    $.__views.win.add($.__views.label);
    $.__views.tab = Ti.UI.createTab({
        window: $.__views.win,
        id: "tab",
        title: "Hello"
    });
    __alloyId0.push($.__views.tab);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Classroom+"
    });
    var label1 = Ti.UI.createLabel({
        color: "#900",
        font: {
            fontSize: 48
        },
        shadowColor: "#aaa",
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowRadius: 3,
        text: "A simple label",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: 30,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    var tabGroup = Ti.UI.createTabGroup({
        title: "Tab Group"
    });
    var tab = Ti.UI.createTab({
        window: win,
        title: "Home"
    });
    tabGroup.addTab(tab);
    win.add(label1);
    tabGroup.add(win);
    win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;