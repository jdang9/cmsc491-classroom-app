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
    $.__views.win1 = Ti.UI.createWindow({
        id: "win1"
    });
    $.__views.weekAtGlance = Ti.UI.createButton({
        backgroundColor: "#6699CC",
        color: "white",
        bottom: "10px",
        id: "weekAtGlance"
    });
    $.__views.win1.add($.__views.weekAtGlance);
    $.__views.tab = Ti.UI.createTab({
        window: $.__views.win1,
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
    var win1 = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Welcome to Classroom+ DashBoard!"
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
        text: "This is a DashBoard!",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: 30,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    var win2 = Ti.UI.createWindow({
        backgroundColor: "black",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Your Profile"
    });
    var weekAtGlance = Ti.UI.createButton({
        window: win2,
        title: "Week At a Glance",
        backgroundColor: "#6699CC",
        color: "white",
        height: 50,
        width: 200,
        top: 50
    });
    weekAtGlance.addEventListener("click", function() {
        Ti.API.info("You clicked Week At a Glance Button");
    });
    var win3 = Ti.UI.createWindow({
        backgroundColor: "blue",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Your Courses"
    });
    var win4 = Ti.UI.createWindow({
        backgroundColor: "red",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Join the Team"
    });
    var win5 = Ti.UI.createWindow({
        backgroundColor: "green",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Uilities"
    });
    var tabGroup = Ti.UI.createTabGroup({});
    var tab1 = Ti.UI.createTab({
        window: win1,
        title: "Dashboard"
    });
    var tab2 = Ti.UI.createTab({
        window: win2,
        title: "Info"
    });
    var tab3 = Ti.UI.createTab({
        window: win3,
        title: "Courses"
    });
    var tab4 = Ti.UI.createTab({
        window: win4,
        title: "Collaborate"
    });
    var tab5 = Ti.UI.createTab({
        window: win5,
        title: "Check-in"
    });
    tabGroup.setActiveTab(0);
    tabGroup.addTab(tab1);
    tabGroup.addTab(tab2);
    tabGroup.addTab(tab3);
    tabGroup.addTab(tab4);
    tabGroup.addTab(tab5);
    win1.add(label1);
    win2.add(weekAtGlance);
    tabGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;