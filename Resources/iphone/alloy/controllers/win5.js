function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function sendAttendance(data, url) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.open("POST", url);
        xhr.onload = function() {
            var json = JSON.parse(this.responseText);
            Ti.API.info(JSON.stringify(json));
        };
        xhr.onerror = function() {
            Ti.API.info(this.error + ": " + this.statusText);
            return false;
        };
        xhr.send({
            uid: data
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "win5";
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
    $.__views.win5 = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        id: "win5"
    });
    $.__views.win5 && $.addTopLevelView($.__views.win5);
    openScanner ? $.__views.win5.addEventListener("click", openScanner) : __defers["$.__views.win5!click!openScanner"] = true;
    $.__views.__alloyId45 = Ti.UI.createLabel({
        text: "Tap any where to begin check-in",
        id: "__alloyId45"
    });
    $.__views.win5.add($.__views.__alloyId45);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    var scanditsdk = require("com.mirasense.scanditsdk");
    ("iphone" == Ti.Platform.osname || "ipad" == Ti.Platform.osname) && (Titanium.UI.iPhone.statusBarHidden = true);
    var picker;
    var window = Titanium.UI.createWindow({
        title: "Scandit SDK",
        navBarHidden: true
    });
    var openScanner = function() {
        picker = scanditsdk.createView({
            width: "100%",
            height: "100%"
        });
        picker.init("ZYr6Br/YZOH0Pk/zacqAjruQSpvJz30BmNRM9AvI9hI", 0);
        picker.showSearchBar(true);
        picker.showToolBar(true);
        picker.setSuccessCallback(function(e) {
            alert("http://jamesfreund.com/mobile/setAttendance.php" == e.barcode ? "You have been checked in!" : "checkin failed");
            Cloud.Users.showMe(function(e) {
                if (e.success) {
                    var user = e.users[0];
                    var uid = user.id;
                    sendAttendance(uid, "http://jamesfreund.com/mobile/setAttendance.php");
                    var window = Alloy.createController("main").getView();
                    window.open();
                } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        });
        picker.setCancelCallback(function() {
            closeScanner();
        });
        window.add(picker);
        window.addEventListener("open", function() {
            picker.setOrientation("iphone" == Ti.Platform.osname || "ipad" == Ti.Platform.osname ? Ti.UI.orientation : window.orientation);
            picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
            picker.startScanning();
        });
        window.open();
    };
    var closeScanner = function() {
        if (null != picker) {
            picker.stopScanning();
            window.remove(picker);
        }
        window.close();
    };
    Ti.Gesture.addEventListener("orientationchange", function(e) {
        window.orientationModes = [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ];
        if (null != picker) {
            picker.setOrientation(e.orientation);
            picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
        }
    });
    __defers["$.__views.win5!click!openScanner"] && $.__views.win5.addEventListener("click", openScanner);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;