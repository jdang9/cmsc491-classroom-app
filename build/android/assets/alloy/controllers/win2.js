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
    $.__views.win2 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "win2"
    });
    $.__views.win2 && $.addTopLevelView($.__views.win2);
    $.__views.profileContainer = Ti.UI.createView({
        top: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "profileContainer"
    });
    $.__views.win2.add($.__views.profileContainer);
    $.__views.profileHorizontal = Ti.UI.createView({
        top: 0,
        width: Ti.UI.SIZE,
        height: "50%",
        layout: "horizontal",
        id: "profileHorizontal"
    });
    $.__views.profileContainer.add($.__views.profileHorizontal);
    $.__views.profileImage = Ti.UI.createView({
        height: "100%",
        width: "50%",
        pd: "10",
        backgroundColor: "red",
        id: "profileImage"
    });
    $.__views.profileHorizontal.add($.__views.profileImage);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        color: "#000",
        text: "Profile Image",
        id: "__alloyId27"
    });
    $.__views.profileImage.add($.__views.__alloyId27);
    $.__views.profileBasic = Ti.UI.createView({
        height: "100%",
        width: "50%",
        pd: "10",
        backgroundColor: "yellow",
        id: "profileBasic"
    });
    $.__views.profileHorizontal.add($.__views.profileBasic);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        color: "#000",
        text: "Profile Basic Info",
        id: "__alloyId28"
    });
    $.__views.profileBasic.add($.__views.__alloyId28);
    $.__views.profileVertical = Ti.UI.createView({
        top: "50%",
        width: Ti.UI.SIZE,
        height: "50%",
        layout: "vertical",
        id: "profileVertical"
    });
    $.__views.profileContainer.add($.__views.profileVertical);
    $.__views.profileSpecific = Ti.UI.createView({
        height: "50%",
        width: "100%",
        pd: "10",
        backgroundColor: "green",
        id: "profileSpecific"
    });
    $.__views.profileVertical.add($.__views.profileSpecific);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        color: "#000",
        text: "Profile Specific Info",
        id: "__alloyId29"
    });
    $.__views.profileSpecific.add($.__views.__alloyId29);
    $.__views.profileClasses = Ti.UI.createView({
        height: "50%",
        width: "100%",
        pd: "10",
        backgroundColor: "blue",
        id: "profileClasses"
    });
    $.__views.profileVertical.add($.__views.profileClasses);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        color: "#000",
        text: "Classes",
        id: "__alloyId30"
    });
    $.__views.profileClasses.add($.__views.__alloyId30);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Your Profile"
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;