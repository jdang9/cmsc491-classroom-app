function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doopen(evt) {
        var activity = evt.source.getActivity();
        activity.onCreateOptionsMenu = function(e) {
            var item, menu;
            menu = e.menu;
            menu.clear();
            switch (Alloy.Globals.currentTab) {
              case 0:
                item = e.menu.add({
                    title: "Invite",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: Ti.Android.R.drawable.ic_menu_search
                });
                item.addEventListener("click", function() {
                    $.win1.label.text = "You clicked the magnifying glass";
                });
                break;

              case 1:
                item = e.menu.add({
                    title: "Setting",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: Ti.Android.R.drawable.ic_menu_search
                });
                item.addEventListener("click", function() {
                    $.win2.label.text = "You clicked the setting button";
                });
                break;

              case 2:
                item = e.menu.add({
                    title: "Share",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: Ti.Android.R.drawable.ic_menu_edit
                });
                item = e.menu.add({
                    title: "Share",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: Ti.Android.R.drawable.ic_menu_add
                });
                item.addEventListener("click", function() {
                    $.win3.label.text = "You clicked the add class button";
                });
            }
        };
        Alloy.Globals.tabGroup.addEventListener("focus", function(evt) {
            if ("undefined" != typeof evt.index) {
                activity.invalidateOptionsMenu();
                Alloy.Globals.currentTab = evt.index;
            }
        });
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
    var __alloyId0 = [];
    $.__views.win1 = Alloy.createController("win1", {
        id: "win1"
    });
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.win1.getViewEx({
            recurse: true
        }),
        title: "DashBoard",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.win2 = Alloy.createController("win2", {
        id: "win2"
    });
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.win2.getViewEx({
            recurse: true
        }),
        title: "Info",
        id: "__alloyId3"
    });
    __alloyId0.push($.__views.__alloyId3);
    $.__views.win3 = Alloy.createController("win3", {
        id: "win3"
    });
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.win3.getViewEx({
            recurse: true
        }),
        title: "Courses",
        id: "__alloyId5"
    });
    __alloyId0.push($.__views.__alloyId5);
    $.__views.win4 = Alloy.createController("win4", {
        id: "win4"
    });
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.win4.getViewEx({
            recurse: true
        }),
        title: "Collaboration",
        id: "__alloyId7"
    });
    __alloyId0.push($.__views.__alloyId7);
    $.__views.win5 = Alloy.createController("win5", {
        id: "win5"
    });
    $.__views.__alloyId9 = Ti.UI.createTab({
        window: $.__views.win5.getViewEx({
            recurse: true
        }),
        title: "Check-in",
        id: "__alloyId9"
    });
    __alloyId0.push($.__views.__alloyId9);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    doopen ? $.__views.index.addEventListener("open", doopen) : __defers["$.__views.index!open!doopen"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabGroup = $.index;
    Alloy.Globals.currentTab = 0;
    $.index.open();
    __defers["$.__views.index!open!doopen"] && $.__views.index.addEventListener("open", doopen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;