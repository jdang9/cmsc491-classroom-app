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
            alert(JSON.stringify(json));
        };
        xhr.onerror = function() {
            alert(this.error + ": " + this.statusText);
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
    $.__views.win5 = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        id: "win5"
    });
    $.__views.win5 && $.addTopLevelView($.__views.win5);
    $.__views.label = Ti.UI.createLabel({
        color: "#fff",
        text: "This is Check-in",
        id: "label"
    });
    $.__views.win5.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    Cloud.Users.showMe(function(e) {
        if (e.success) {
            var user = e.users[0];
            var uid = user.id;
            sendAttendance(uid, "http://jamesfreund.com/mobile/setAttendance.php");
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;