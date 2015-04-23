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
                item1 = e.menu.add({
                    title: "Share",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: Ti.Android.R.drawable.ic_menu_edit
                });
                item2 = e.menu.add({
                    title: "Share",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: Ti.Android.R.drawable.ic_menu_add
                });
                item2.addEventListener("click", function() {
                    $.win2.label.text = "You clicked the add class button";
                });
            }
        };
        Alloy.Globals.tabGroup.addEventListener("focus", function(evt) {
            if ("undefined" != typeof evt.main) {
                activity.invalidateOptionsMenu();
                Alloy.Globals.currentTab = evt.main;
            }
        });
    }
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
    var __alloyId8 = [];
    $.__views.win1 = Alloy.createController("win1", {
        id: "win1",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId9 = Ti.UI.createTab({
        width: "20%",
        window: $.__views.win1.getViewEx({
            recurse: true
        }),
        title: "",
        icon: "images/dash.png",
        id: "__alloyId9"
    });
    __alloyId8.push($.__views.__alloyId9);
    $.__views.win2 = Alloy.createController("win2", {
        id: "win2",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId11 = Ti.UI.createTab({
        width: "20%",
        window: $.__views.win2.getViewEx({
            recurse: true
        }),
        title: "",
        icon: "images/profile.png",
        id: "__alloyId11"
    });
    __alloyId8.push($.__views.__alloyId11);
    $.__views.win3 = Alloy.createController("win3", {
        id: "win3",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId13 = Ti.UI.createTab({
        width: "20%",
        window: $.__views.win3.getViewEx({
            recurse: true
        }),
        title: "",
        icon: "images/courses.png",
        id: "__alloyId13"
    });
    __alloyId8.push($.__views.__alloyId13);
    $.__views.win4 = Alloy.createController("win4", {
        id: "win4",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId15 = Ti.UI.createTab({
        width: "20%",
        window: $.__views.win4.getViewEx({
            recurse: true
        }),
        title: "",
        icon: "images/collab.png",
        id: "__alloyId15"
    });
    __alloyId8.push($.__views.__alloyId15);
    $.__views.win5 = Alloy.createController("win5", {
        id: "win5",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId16 = Ti.UI.createTab({
        width: "20%",
        window: $.__views.win5.getViewEx({
            recurse: true
        }),
        title: "",
        icon: "images/check.png",
        id: "__alloyId16"
    });
    __alloyId8.push($.__views.__alloyId16);
    $.__views.main = Ti.UI.createTabGroup({
        tabs: __alloyId8,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    doopen ? $.__views.main.addEventListener("open", doopen) : __defers["$.__views.main!open!doopen"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabGroup = $.main;
    Alloy.Globals.currentTab = 0;
    $.main.open();
    __defers["$.__views.main!open!doopen"] && $.__views.main.addEventListener("open", doopen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;