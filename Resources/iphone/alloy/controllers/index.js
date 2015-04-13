function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openBlueWindow() {
        var win3 = Alloy.createController("bluewin").getView();
        $.win1.openWindow(win3);
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
    $.__views.win2 = Ti.UI.createWindow({
        background: "black",
        id: "win2",
        title: "Red Window",
        backgroundColor: "red"
    });
    $.__views.button = Ti.UI.createButton({
        title: "Open Blue Window",
        id: "button"
    });
    $.__views.win2.add($.__views.button);
    openBlueWindow ? $.__views.button.addEventListener("click", openBlueWindow) : __defers["$.__views.button!click!openBlueWindow"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        background: "white",
        window: $.__views.win2,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win2 = Titanium.UI.createWindow({
        backgroundColor: "red",
        title: "Red Window"
    });
    var win1 = Titanium.UI.iOS.createNavigationWindow({
        window: win2
    });
    var win3 = Titanium.UI.createWindow({
        backgroundColor: "blue",
        title: "Blue Window"
    });
    var button = Titanium.UI.createButton({
        title: "Open Blue Window"
    });
    button.addEventListener("click", function() {
        win1.openWindow(win3, {
            animated: true
        });
    });
    win2.add(button);
    var button2 = Titanium.UI.createButton({
        title: "Close Blue Window"
    });
    button2.addEventListener("click", function() {
        win1.closeWindow(win3, {
            animated: false
        });
    });
    win3.add(button2);
    win1.open();
    $.win1.open();
    __defers["$.__views.button!click!openBlueWindow"] && $.__views.button.addEventListener("click", openBlueWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;