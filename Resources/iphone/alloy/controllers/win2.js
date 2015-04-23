function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function uploadPhoto() {
        var uid;
        Cloud.Users.showMe(function(e) {
            if (e.success) {
                var user = e.users[0];
                uid = user.id;
            } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
        Titanium.Media.openPhotoGallery({
            success: function(e) {
                if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    image = e.media;
                    Ti.API.info(image);
                    Cloud.Photos.create({
                        photo: image,
                        name: "profile" + uid,
                        user_id: uid
                    }, function(e) {
                        if (e.success) {
                            var photo = e.photos[0];
                            Ti.API.info("Success:\nid: " + photo.id + "\nfilename: " + photo.filename + "\nsize: " + photo.size, "updated_at: " + photo.updated_at);
                        } else {
                            Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                            Ti.API.info("Code: " + e.code);
                        }
                    });
                }
            },
            cancel: function() {},
            error: function(err) {
                Ti.API.info("ERROR: " + err);
            },
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    function searchPhoto() {
        var uid;
        Cloud.Users.showMe(function(e) {
            if (e.success) {
                var user = e.users[0];
                uid = user.id;
            } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
        Cloud.Photos.search({
            user_id: uid
        }, function(e) {
            if (e.success) {
                for (var i = 0; i < e.photos.length; i++) {
                    var photo = e.photos[i];
                    filename = photo.urls.original;
                }
                Ti.API.info(filename);
                var pPicture = $.UI.create("ImageView", {
                    height: "100%",
                    id: "pPicture",
                    image: filename,
                    layout: "vertical"
                });
                $.profilePicture.add(pPicture);
            } else {
                Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                filename = "/images/avatar.jpeg";
                var pImage = Ti.UI.createImageView({
                    width: "200px",
                    height: "200px",
                    image: filename
                });
                $.profilePicture.add(pImage);
            }
        });
    }
    function addUploadButton() {
        var uploadPhotoButton = $.UI.create("View", {
            classes: [ "button" ],
            id: "uploadBtn"
        });
        var uploadButtonLabel = $.UI.create("Label", {
            text: "Upload Photo",
            classes: [ "buttonLabel" ],
            id: "Lbl"
        });
        uploadPhotoButton.add(uploadButtonLabel);
        $.uploadPictureButton.add(uploadPhotoButton);
        uploadPhotoButton.addEventListener("click", function() {
            uploadPhoto();
        });
    }
    function createDocument(database, collection, data) {
        var url = "https://api.mongolab.com/api/1/databases/" + database + "/collections/" + collection + "?apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + JSON.parse(this.responseText));
                Ti.API.info("success 1");
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                Ti.API.info(e.error);
            },
            timeout: 15e3
        });
        client.open("POST", url, false);
        var send = JSON.stringify(data);
        client.setRequestHeader("Content-Type", "application/json");
        client.send(send);
    }
    function getUserInfo() {
        Cloud.Users.showMe(function(e) {
            if (e.success) {
                var user = e.users[0];
                username = user.username;
                firstname = user.first_name;
                lastname = user.last_name;
                email = user.email;
                userID = user.id;
                userBio = firstname + " lived the life others wish they had.";
                userData = {
                    _id: userID,
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    userID: userID,
                    userBio: userBio
                };
                createDocument("mobileapp", "data", userData);
                var database = "mobileapp";
                var collection = "data";
                var query = "/" + userID + "?";
                var url = "https://api.mongolab.com/api/1/databases/" + database + "/collections/" + collection + query + "apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
                var json;
                var client = Ti.Network.createHTTPClient();
                client.onload = function() {
                    json = JSON.parse(this.responseText);
                    Ti.API.info(json);
                };
                client.open("GET", url);
                client.send();
                $.username.text = "Username: " + user.username;
                $.firstname.text = "First Name: " + user.first_name;
                $.lastname.text = "Last Name: " + user.last_name;
                $.email.text = "Email: " + user.email;
                $.userID.text = "User ID: " + user.id;
            } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function init() {
        getUserInfo();
        searchPhoto();
        addUploadButton();
    }
    function addBioButton() {
        var uploadBioButton = $.UI.create("View", {
            classes: [ "button" ],
            id: "btnRight"
        });
        var uploadBioLabel = $.UI.create("Label", {
            text: "Edit Bio",
            classes: [ "buttonLabel" ],
            id: "Lbl"
        });
        uploadBioButton.add(uploadBioLabel);
        $.specificProfile.add(uploadBioButton);
        uploadBioButton.addEventListener("click", function() {
            var window = Alloy.createController("bio").getView();
            window.open();
        });
    }
    function updateUserBio() {
        Cloud.Users.showMe(function(e) {
            if (e.success) {
                var user = e.users[0];
                var row = Ti.UI.createTableViewRow({
                    title: user.custom_fields.userBio,
                    textAlign: "left",
                    font: {
                        fontSize: 14
                    },
                    textColor: "white"
                });
                $.bioText.appendRow(row);
            } else Ti.API.info("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function getCourses() {
        var url = "http://jamesfreund.com/mobile/getThings.php";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var json = JSON.parse(this.responseText);
                if (json.courses) for (var i = 0; i < json.courses.length; i++) {
                    var row = Ti.UI.createTableViewRow({
                        textAlign: "center",
                        border: 10,
                        borderColor: "red",
                        id: json.courses[i].id
                    });
                    var newView = Ti.UI.createView({
                        layout: "horizontal"
                    });
                    var labelOne = Ti.UI.createLabel({
                        text: " " + json.courses[i].courseNumber,
                        width: "15%",
                        height: "auto",
                        font: {
                            fontSize: 14
                        }
                    });
                    var labelTwo = Ti.UI.createLabel({
                        text: "|	" + json.courses[i].courseName,
                        width: "85%",
                        height: "auto",
                        font: {
                            fontSize: 14
                        }
                    });
                    newView.add(labelOne);
                    newView.add(labelTwo);
                    row.add(newView);
                    $.courseList.appendRow(row);
                }
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                Ti.API.info("error");
            },
            timeout: 55e3
        });
        client.open("GET", url, true);
        client.send();
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
    $.__views.win2 = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
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
        layout: "vertical",
        id: "profileImage"
    });
    $.__views.profileHorizontal.add($.__views.profileImage);
    $.__views.__alloyId27 = Ti.UI.createView({
        height: "15%",
        width: Ti.UI.FILL,
        id: "__alloyId27"
    });
    $.__views.profileImage.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        color: "#fff",
        height: 25,
        font: {
            fontSize: 16
        },
        shadowOffset: 1,
        shadowColor: "#363636",
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Profile Image",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.profilePicture = Ti.UI.createView({
        height: "65%",
        width: "100%",
        layout: "vertical",
        id: "profilePicture"
    });
    $.__views.profileImage.add($.__views.profilePicture);
    $.__views.uploadPictureButton = Ti.UI.createView({
        height: "20%",
        width: "100%",
        layout: "vertical",
        id: "uploadPictureButton"
    });
    $.__views.profileImage.add($.__views.uploadPictureButton);
    $.__views.profileBasic = Ti.UI.createView({
        height: "100%",
        width: "50%",
        pd: "10",
        layout: "vertical",
        id: "profileBasic"
    });
    $.__views.profileHorizontal.add($.__views.profileBasic);
    $.__views.__alloyId29 = Ti.UI.createView({
        height: "15%",
        width: Ti.UI.FILL,
        id: "__alloyId29"
    });
    $.__views.profileBasic.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        color: "#fff",
        height: 25,
        font: {
            fontSize: 16
        },
        shadowOffset: 1,
        shadowColor: "#363636",
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Basic Info",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createView({
        height: "80%",
        width: "80%",
        backgroundColor: "#2D3442",
        layout: "vertical",
        id: "__alloyId31"
    });
    $.__views.profileBasic.add($.__views.__alloyId31);
    $.__views.username = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        id: "username"
    });
    $.__views.__alloyId31.add($.__views.username);
    $.__views.firstname = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        id: "firstname"
    });
    $.__views.__alloyId31.add($.__views.firstname);
    $.__views.lastname = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        id: "lastname"
    });
    $.__views.__alloyId31.add($.__views.lastname);
    $.__views.email = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        id: "email"
    });
    $.__views.__alloyId31.add($.__views.email);
    $.__views.userID = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 12
        },
        height: 30,
        top: 2,
        left: 20,
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        id: "userID"
    });
    $.__views.__alloyId31.add($.__views.userID);
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
        layout: "vertical",
        id: "profileSpecific"
    });
    $.__views.profileVertical.add($.__views.profileSpecific);
    $.__views.__alloyId32 = Ti.UI.createView({
        height: "15%",
        width: Ti.UI.FILL,
        id: "__alloyId32"
    });
    $.__views.profileSpecific.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        color: "#fff",
        height: 25,
        font: {
            fontSize: 16
        },
        shadowOffset: 1,
        shadowColor: "#363636",
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Profile Specific Info",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.specificProfile = Ti.UI.createView({
        height: "85%",
        width: "80%",
        id: "specificProfile"
    });
    $.__views.profileSpecific.add($.__views.specificProfile);
    $.__views.bioText = Ti.UI.createTableView({
        text: "white",
        height: Ti.UI.SIZE,
        width: "80%",
        left: 0,
        backgroundColor: "#2D3442",
        id: "bioText"
    });
    $.__views.specificProfile.add($.__views.bioText);
    $.__views.profileClasses = Ti.UI.createView({
        height: "50%",
        width: "100%",
        pd: "10",
        layout: "vertical",
        id: "profileClasses"
    });
    $.__views.profileVertical.add($.__views.profileClasses);
    $.__views.__alloyId34 = Ti.UI.createView({
        height: "15%",
        width: Ti.UI.FILL,
        id: "__alloyId34"
    });
    $.__views.profileClasses.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        color: "#fff",
        height: 25,
        font: {
            fontSize: 16
        },
        shadowOffset: 1,
        shadowColor: "#363636",
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Classes",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        height: "80%",
        width: "80%",
        backgroundColor: "#2D3442",
        layout: "vertical",
        id: "__alloyId36"
    });
    $.__views.profileClasses.add($.__views.__alloyId36);
    $.__views.courseList = Ti.UI.createTableView({
        id: "courseList"
    });
    $.__views.__alloyId36.add($.__views.courseList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.response = "";
    var Cloud = require("ti.cloud");
    var userBio;
    var filename;
    var username;
    var firstname;
    var lastname;
    var email;
    var userID;
    var image;
    init();
    addBioButton();
    updateUserBio();
    getCourses();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;