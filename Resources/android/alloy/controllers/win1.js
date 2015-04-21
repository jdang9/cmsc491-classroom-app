function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addLabel(title, fontsize, fontcolor, textalign, classes, id, layout) {
        var label = $.UI.create("Label", {
            text: title,
            font: {
                fontSize: fontsize
            },
            color: fontcolor,
            textAlign: textalign,
            classes: [ classes ],
            id: id,
            layout: layout
        });
        return label;
    }
    function getToday() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var day = today.getDay();
        var dayName = "";
        10 > dd && (dd = "0" + dd);
        10 > mm && (mm = "0" + mm);
        today = mm + "/" + dd + "/" + yyyy;
        0 == day && (dayName = "sunday");
        1 == day && (dayName = "monday");
        2 == day && (dayName = "tuesday");
        3 == day && (dayName = "wednesday");
        4 == day && (dayName = "thursday");
        5 == day && (dayName = "friday");
        6 == day && (dayName = "saturday");
        var todayImage = Ti.UI.createImageView({
            image: "/images/" + dayName + ".png",
            height: "100%"
        });
        $.date.add(addLabel(today, "32px", "white", "center", "", "currentDate", "vertical"));
        $.today.add(todayImage);
    }
    function getAnnouncements() {
        var url = "http://jamesfreund.com/mobile/getAnnouncements.php";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var json = JSON.parse(this.responseText);
                if (json.announcements) for (var i = json.announcements.length - 1; i >= 0; i--) {
                    var row = Ti.UI.createTableViewRow({
                        textAlign: "center",
                        top: 50,
                        border: 10,
                        borderColor: "red",
                        id: json.announcements[i].id
                    });
                    var newView = Ti.UI.createView({
                        layout: "horizontal"
                    });
                    {
                        Ti.UI.createView({
                            layout: "horizontal"
                        });
                    }
                    var labelOne = Ti.UI.createLabel({
                        text: " " + json.announcements[i].regDate,
                        width: "25%",
                        height: "auto",
                        font: {
                            fontSize: 20
                        }
                    });
                    var labelTwo = Ti.UI.createLabel({
                        text: "|	" + json.announcements[i].courseName,
                        width: "40%",
                        height: "auto",
                        font: {
                            fontSize: 14
                        }
                    });
                    var labelThree = Ti.UI.createLabel({
                        textAlign: "right",
                        text: json.announcements[i].courseNumber,
                        width: "35%",
                        height: "auto",
                        font: {
                            fontSize: 14
                        }
                    });
                    var labelFour = Ti.UI.createLabel({
                        text: "",
                        width: "100%",
                        height: "2px",
                        backgroundColor: "white",
                        font: {
                            fontSize: 14
                        }
                    });
                    var labelFive = Ti.UI.createLabel({
                        text: json.announcements[i].message,
                        top: "10px",
                        bottom: "50px",
                        width: "100%",
                        height: "auto",
                        font: {
                            fontSize: 14
                        }
                    });
                    newView.add(labelOne);
                    newView.add(labelTwo);
                    newView.add(labelThree);
                    newView.add(labelFour);
                    newView.add(labelFive);
                    row.add(newView);
                    $.announcementList.appendRow(row);
                }
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 55e3
        });
        client.open("GET", url, true);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "win1";
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
    $.__views.win1 = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    $.__views.dashboardContainer = Ti.UI.createView({
        top: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "dashboardContainer"
    });
    $.__views.win1.add($.__views.dashboardContainer);
    $.__views.date = Ti.UI.createView({
        height: "50px",
        width: Ti.UI.FILL,
        id: "date"
    });
    $.__views.dashboardContainer.add($.__views.date);
    $.__views.today = Ti.UI.createView({
        height: "75px",
        width: Ti.UI.SIZE,
        id: "today"
    });
    $.__views.dashboardContainer.add($.__views.today);
    $.__views.__alloyId25 = Ti.UI.createView({
        height: "50px",
        width: Ti.UI.FILL,
        id: "__alloyId25"
    });
    $.__views.dashboardContainer.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        color: "#fff",
        height: 25,
        font: {
            fontSize: 16
        },
        shadowOffset: 1,
        shadowColor: "#363636",
        width: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Announcements",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.announcementsCountainer = Ti.UI.createView({
        pd: 20,
        width: "80%",
        id: "announcementsCountainer"
    });
    $.__views.dashboardContainer.add($.__views.announcementsCountainer);
    $.__views.announcementList = Ti.UI.createTableView({
        id: "announcementList"
    });
    $.__views.announcementsCountainer.add($.__views.announcementList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    getToday();
    getAnnouncements();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;