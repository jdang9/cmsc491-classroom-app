function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.appcelerator.login/" + s : s.substring(0, index) + "/com.appcelerator.login/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0002,
    key: "loginLbl",
    style: {
        height: 25,
        color: "#606060",
        font: {
            fontSize: 12
        },
        shadowOffset: 1,
        shadowColor: "#363636"
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "loginLblTxt",
    style: {
        color: "#fff",
        height: 30,
        top: 10,
        left: 20,
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "loginTxt",
    style: {
        color: "#fff",
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0
    }
}, {
    isClass: true,
    priority: 10000.0006,
    key: "button",
    style: {
        height: 44,
        top: 0,
        backgroundColor: "#5A86AF",
        borderRadius: 5
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "buttonLabel",
    style: {
        color: "#fff",
        font: {
            fontSize: 14
        },
        textAlign: "center",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0016,
    key: "controlContainer",
    style: {
        top: 17,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0021,
    key: "separator",
    style: {
        top: 20,
        height: 1,
        width: "90%",
        backgroundColor: "#fff",
        opacity: .5
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "wrapper",
    style: {
        backgroundColor: "#000",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        navBarHidden: true
    }
}, {
    isId: true,
    priority: 100000.0009,
    key: "loginContainer",
    style: {
        backgroundColor: "#141925",
        width: 319,
        height: 164,
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.001,
    key: "bodyContainer",
    style: {
        top: 0,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "loginView",
    style: {
        top: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 0
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "passworReminderView",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 0,
        visible: false,
        top: 0
    }
}, {
    isId: true,
    priority: 100000.0013,
    key: "createAccountView",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        opacity: 0
    }
}, {
    isId: true,
    priority: 100000.0014,
    key: "header",
    style: {
        height: 140,
        width: Ti.UI.SIZE,
        top: 20,
        image: WPATH("/images/header.png")
    }
}, {
    isId: true,
    priority: 100000.0017,
    key: "loginBtn",
    style: {
        width: 100,
        right: 3
    }
}, {
    isId: true,
    priority: 100000.0018,
    key: "facebookOptionView",
    style: {
        width: Ti.UI.FILL,
        height: 100,
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0019,
    key: "facebookBtnWrapper",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.002,
    key: "facebookBtn",
    style: {
        top: 10,
        image: WPATH("/images/facebook-btn.png"),
        height: 41,
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0022,
    key: "helpImg",
    style: {
        height: 25,
        width: 25,
        top: 10,
        left: 0,
        image: WPATH("/images/help-btn.png")
    }
}, {
    isId: true,
    priority: 100000.0024,
    key: "forgotLbl",
    style: {
        top: 10,
        left: 26,
        color: "#999"
    }
}, {
    isId: true,
    priority: 100000.0026,
    key: "cancelBtn",
    style: {
        left: 3,
        width: 130,
        color: "#fff",
        backgroundColor: "#6a6a6a",
        borderRadius: 5
    }
}, {
    isId: true,
    priority: 100000.0027,
    key: "emailBtn",
    style: {
        width: 130,
        right: 3,
        color: "#fff"
    }
}, {
    isId: true,
    priority: 100000.0028,
    key: "usernameTxt",
    style: {
        top: 4,
        returnKeyType: Ti.UI.RETURNKEY_NEXT
    }
}, {
    isId: true,
    priority: 100000.0029,
    key: "passwordTxt",
    style: {
        top: 4,
        passwordMask: true
    }
}, {
    isId: true,
    priority: 100000.003,
    key: "emailTxt",
    style: {
        top: 4
    }
}, {
    isId: true,
    priority: 100000.0031,
    key: "usernameNew",
    style: {
        hintText: "Email"
    }
}, {
    isId: true,
    priority: 100000.0032,
    key: "passwordNew",
    style: {
        hintText: "Password",
        passwordMask: true
    }
}, {
    isId: true,
    priority: 100000.0033,
    key: "passwordConfirm",
    style: {
        hintText: "Confirm Password",
        passwordMask: true
    }
} ];