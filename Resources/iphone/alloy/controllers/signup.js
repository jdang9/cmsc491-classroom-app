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
    this.__controllerPath = "signup";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("ti.cloud.Server");
    Titanium.UI.setBackgroundImage("shared/bkg_login.jpg");
    var win = Titanium.UI.createWindow();
    var txtEmail = Titanium.UI.createTextField({
        color: "#336699",
        top: 200,
        left: 50,
        width: 300,
        height: 40,
        hintText: "Username",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    win.add(txtEmail);
    var txtPass = Titanium.UI.createTextField({
        color: "#336699",
        top: 250,
        left: 50,
        width: 300,
        height: 40,
        hintText: "Password",
        passwordMask: true,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    win.add(txtPass);
    var btnSignup = Titanium.UI.createButton({
        title: "Signup",
        top: 300,
        width: 90,
        height: 35,
        borderRadius: 1,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 14
        }
    });
    win.add(btnSignup);
    btnSignup.addEventListener("click", function() {
        var httpClient = Ti.Network.createHTTPClient({
            timeout: 1e4
        });
        httpClient.onload = function() {
            Titanium.API.log("onload");
            var res = JSON.parse(httpClient.responseText);
            Titanium.API.log(res);
            Titanium.App.Properties.setString("loginID", res.id);
            win.close();
            Alloy.createController("dashboard").getView();
        };
        httpClient.onerror = function() {
            Titanium.API.log("error");
            alert("I'm sorry, sign up was not successful");
            Alloy.createController("index").getView();
        };
        var data = {
            email: txtEmail.value,
            password: txtPass.value,
            role: "student"
        };
        httpClient.open("POST", "http://localhost:8080/api/signup");
        httpClient.setRequestHeader("Content-Type", "application/json");
        httpClient.send(JSON.stringify(data));
    });
    win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;