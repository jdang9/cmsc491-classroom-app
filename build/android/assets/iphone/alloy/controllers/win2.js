function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doClick() {
        Titanium.API.info("You clicked the button");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "win2";
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
        backgroundColor: "#fff",
        id: "win2"
    });
    $.__views.win2 && $.addTopLevelView($.__views.win2);
    $.__views.label = Ti.UI.createLabel({
        color: "#000",
        text: "This is Info",
        id: "label"
    });
    $.__views.win2.add($.__views.label);
    $.__views.weekAtGlance = Ti.UI.createButton({
        backgroundColor: "#6699CC",
        color: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: "85%",
        bottom: "50dp",
        title: "Week At a Glance",
        id: "weekAtGlance"
    });
    $.__views.win2.add($.__views.weekAtGlance);
    doClick ? $.__views.weekAtGlance.addEventListener("click", doClick) : __defers["$.__views.weekAtGlance!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win2 = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Your Profile"
    });
    var weekAtGlance = Ti.UI.createButton({
        window: win2
    });
    weekAtGlance.addEventListener("click", function() {
        Ti.API.info("You clicked Week At a Glance Button");
    });
    win2.add(weekAtGlance);
    __defers["$.__views.weekAtGlance!click!doClick"] && $.__views.weekAtGlance.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;