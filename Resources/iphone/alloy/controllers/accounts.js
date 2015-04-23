function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function increaseCounter() {
        count++;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "accounts";
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
    var count = 0;
    module.exports = function(args) {
        increaseCounter();
        return Ti.UI.createWindow(args || {});
    };
    Ti.App.listDb = function() {
        var conn = Ti.Database.install("ClassroomDatabase.sqlite", "ClassroomDatabase.sqlite");
        return {
            ClassroomDatabase: {
                createTable: function() {
                    conn.execute("CREATE TABLE IF NOT EXISTS ClassroomDatabase (username TEXT PRIMARY KEY, password TEXT)");
                },
                dropTable: function() {
                    conn.execute("DROP TABLE ClassroomDatabase");
                },
                deleteAll: function() {
                    conn.execute("DELETE FROM ClassroomDatabase");
                },
                getAll: function() {
                    var results = [];
                    var resultSet = conn.execute("SELECT * FROM ClassroomDatabase");
                    while (resultSet.isValidRow()) {
                        results.push({
                            password: resultSet.fieldByName("password"),
                            username: resultSet.fieldByName("username")
                        });
                        resultSet.next();
                    }
                    resultSet.close();
                    return results;
                },
                get: function(password) {
                    var result = null;
                    var resultSet = conn.execute("SELECT * FROM ClassroomDatabase WHERE password = ?", password);
                    resultSet.isValidRow() && (result = {
                        password: resultSet.fieldByName("password"),
                        username: resultSet.fieldByName("username")
                    });
                    resultSet.close();
                    return result;
                },
                remove: function(password) {
                    conn.execute("DELETE FROM ClassroomDatabase WHERE password = ?", password);
                    return conn.rowsAffected;
                },
                update: function(item) {
                    conn.execute("UPDATE ClassroomDatabase SET username = ? WHERE password = ?", item.username, item.password);
                    return conn.rowsAffected;
                },
                count: function() {
                    var count = 0, rows = conn.execute("select count(*) as count from ClassroomDatabase");
                    while (rows.isValidRow()) {
                        count = rows.fieldByName("count");
                        rows.next();
                    }
                    rows.close();
                    return count;
                },
                insert: function(username, password) {
                    conn.execute("INSERT INTO ClassroomDatabase (username,password) VALUES(?,?)", username, password);
                    return conn.lastInsertRowId;
                }
            }
        };
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;