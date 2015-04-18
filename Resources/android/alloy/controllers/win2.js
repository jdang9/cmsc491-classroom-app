function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getUserInfo() {
        Cloud.Users.showMe(function(e) {
            if (e.success) {
                user = e.users[0];
                username = user.username;
                firstname = user.first_name;
                lastname = user.last_name;
                email = user.email;
                school = user.school;
                major = user.major;
                classification = user.classification;
                userID = user.id;
                $.username.text = "Username: " + user.username;
                $.firstname.text = "First Name: " + user.first_name;
                $.lastname.text = "Last Name: " + user.last_name;
                $.email.text = "Email: " + user.email;
                $.userID.text = "User ID: " + user.id;
                alert("Success:\nid: " + user.id + "\nfirst name: " + user.first_name + "\nlast name: " + user.last_name);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function uploadPhoto() {
        Titanium.Media.openPhotoGallery({
            success: function(e) {
                if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    image = e.media;
                    alert(image);
                    Cloud.Photos.create({
                        photo: image,
                        name: "profile" + userID,
                        user_id: userID
                    }, function(e) {
                        if (e.success) {
                            var photo = e.photos[0];
                            alert("Success:\nid: " + photo.id + "\nfilename: " + photo.filename + "\nsize: " + photo.size, "updated_at: " + photo.updated_at);
                        } else {
                            alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                            alert("Code: " + e.code);
                        }
                    });
                }
            },
            cancel: function() {},
            error: function(err) {
                alert("ERROR: " + err);
            },
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    function searchPhoto() {
        Cloud.Photos.search({
            user_id: userID
        }, function(e) {
            if (e.success) {
                for (var i = 0; i < e.photos.length; i++) {
                    var photo = e.photos[i];
                    filename = photo.urls.original;
                }
                alert(filename);
                var pImage = Ti.UI.createImageView({
                    width: "50%",
                    height: "50%",
                    image: filename
                });
                $.profileImage.add(pImage);
            } else {
                alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                filename = "/images/avatar.jpeg";
                var pImage = Ti.UI.createImageView({
                    width: "50%",
                    height: "50%",
                    image: filename
                });
                $.profileImage.add(pImage);
            }
        });
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
        layout: "vertical",
        id: "profileImage"
    });
    $.__views.profileHorizontal.add($.__views.profileImage);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Profile Image",
        id: "__alloyId27"
    });
    $.__views.profileImage.add($.__views.__alloyId27);
    $.__views.upload = Ti.UI.createButton({
        title: "Upload image",
        id: "upload"
    });
    $.__views.profileImage.add($.__views.upload);
    uploadPhoto ? $.__views.upload.addEventListener("click", uploadPhoto) : __defers["$.__views.upload!click!uploadPhoto"] = true;
    $.__views.upload = Ti.UI.createButton({
        title: "Search Photo",
        id: "upload"
    });
    $.__views.profileImage.add($.__views.upload);
    searchPhoto ? $.__views.upload.addEventListener("click", searchPhoto) : __defers["$.__views.upload!click!searchPhoto"] = true;
    $.__views.profileBasic = Ti.UI.createView({
        height: "100%",
        width: "50%",
        pd: "10",
        backgroundColor: "yellow",
        layout: "vertical",
        id: "profileBasic"
    });
    $.__views.profileHorizontal.add($.__views.profileBasic);
    $.__views.username = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "username"
    });
    $.__views.profileBasic.add($.__views.username);
    $.__views.firstname = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "firstname"
    });
    $.__views.profileBasic.add($.__views.firstname);
    $.__views.lastname = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "lastname"
    });
    $.__views.profileBasic.add($.__views.lastname);
    $.__views.email = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "email"
    });
    $.__views.profileBasic.add($.__views.email);
    $.__views.userID = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "userID"
    });
    $.__views.profileBasic.add($.__views.userID);
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
    $.__views.__alloyId28 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Profile Specific Info",
        id: "__alloyId28"
    });
    $.__views.profileSpecific.add($.__views.__alloyId28);
    $.__views.profileClasses = Ti.UI.createView({
        height: "50%",
        width: "100%",
        pd: "10",
        backgroundColor: "blue",
        id: "profileClasses"
    });
    $.__views.profileVertical.add($.__views.profileClasses);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Classes",
        id: "__alloyId29"
    });
    $.__views.profileClasses.add($.__views.__alloyId29);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Your Profile"
    });
    var filename;
    var username;
    var firstname;
    var lastname;
    var email;
    var school;
    var major;
    var classification;
    var userID;
    var image;
    getUserInfo();
    __defers["$.__views.upload!click!uploadPhoto"] && $.__views.upload.addEventListener("click", uploadPhoto);
    __defers["$.__views.upload!click!searchPhoto"] && $.__views.upload.addEventListener("click", searchPhoto);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;