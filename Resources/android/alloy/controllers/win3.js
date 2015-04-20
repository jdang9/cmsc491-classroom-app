function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
                            fontSize: 20
                        }
                    });
                    var labelTwo = Ti.UI.createLabel({
                        text: "|	" + json.courses[i].courseName,
                        width: "85%",
                        height: "auto",
                        font: {
                            fontSize: 20
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
                alert("error");
            },
            timeout: 55e3
        });
        client.open("GET", url, true);
        client.send();
    }
    function viewCourse(courseNum) {
        var url = "http://jamesfreund.com/mobile/getThings.php";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var json = JSON.parse(this.responseText);
                if (json.courses) for (var i = 0; i < json.courses.length; i++) if (json.courses[i].id == courseNum) {
                    $.label_number.setText(json.courses[i].courseNumber);
                    $.label_name.setText(json.courses[i].courseName);
                    $.label_instructor.setText(json.courses[i].instructorName);
                    $.label_time.setText(json.courses[i].courseTime);
                    $.label_days.setText(json.courses[i].courseDays);
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
    this.__controllerPath = "win3";
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
    $.__views.win3 = Ti.UI.createWindow({
        backgroundColor: "#141925",
        color: "#fff",
        id: "win3"
    });
    $.__views.win3 && $.addTopLevelView($.__views.win3);
    $.__views.courseList = Ti.UI.createTableView({
        top: "5%",
        height: "50%",
        width: "85%",
        layout: "vertical",
        align: "center",
        border: "1",
        borderColor: "white",
        id: "courseList"
    });
    $.__views.win3.add($.__views.courseList);
    $.__views.__alloyId35 = Ti.UI.createView({
        bottom: "5%",
        width: "50%",
        height: "30%",
        align: "center",
        layout: "horizontal",
        id: "__alloyId35"
    });
    $.__views.win3.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        width: "50%",
        height: "100%",
        border: 2,
        borderColor: "white",
        layout: "vertical",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        text: "Course Number:",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        text: "Course Name:",
        id: "__alloyId38"
    });
    $.__views.__alloyId36.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        text: "Instructor:",
        id: "__alloyId39"
    });
    $.__views.__alloyId36.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        text: "Class Time:",
        id: "__alloyId40"
    });
    $.__views.__alloyId36.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        text: "Class Days:",
        id: "__alloyId41"
    });
    $.__views.__alloyId36.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        width: "50%",
        height: "100%",
        border: 2,
        borderColor: "white",
        layout: "vertical",
        id: "__alloyId42"
    });
    $.__views.__alloyId35.add($.__views.__alloyId42);
    $.__views.label_number = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        id: "label_number"
    });
    $.__views.__alloyId42.add($.__views.label_number);
    $.__views.label_name = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        id: "label_name"
    });
    $.__views.__alloyId42.add($.__views.label_name);
    $.__views.label_instructor = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        id: "label_instructor"
    });
    $.__views.__alloyId42.add($.__views.label_instructor);
    $.__views.label_time = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        id: "label_time"
    });
    $.__views.__alloyId42.add($.__views.label_time);
    $.__views.label_days = Ti.UI.createLabel({
        height: "20%",
        width: "100%",
        border: 5,
        borderColor: "#141925",
        textAlign: "center",
        id: "label_days"
    });
    $.__views.__alloyId42.add($.__views.label_days);
    exports.destroy = function() {};
    _.extend($, $.__views);
    getCourses();
    $.courseList.addEventListener("click", function(e) {
        var clickedRowData = e.rowData;
        var postID = clickedRowData.id;
        viewCourse(postID);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;