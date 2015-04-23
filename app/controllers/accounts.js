var count = 0;
 
module.exports = function(args){
    increaseCounter();
    return Ti.UI.createWindow(args || {});
};
 
function increaseCounter(){
    count++;
}

Ti.App.listDb = function(){
  var conn = Ti.Database.install('ClassroomDatabase.sqlite','ClassroomDatabase.sqlite');
  return {
    ClassroomDatabase : {
      createTable : function(){
        conn.execute('CREATE TABLE IF NOT EXISTS ClassroomDatabase (username TEXT PRIMARY KEY, password TEXT)');
      },
      dropTable: function(){
        conn.execute('DROP TABLE ClassroomDatabase');
      },
      deleteAll:function(){
        conn.execute('DELETE FROM ClassroomDatabase');
      },
      getAll:function(){
        var results = [];
        var resultSet = conn.execute('SELECT * FROM ClassroomDatabase');
        while (resultSet.isValidRow()) {
          results.push({
            password: resultSet.fieldByName('password'),
            username: resultSet.fieldByName('username')
          });
          resultSet.next();
        }
        resultSet.close();

        return results;
      },
      get : function(password) {
        var result = null;
        var resultSet = conn.execute('SELECT * FROM ClassroomDatabase WHERE password = ?', password);
        if (resultSet.isValidRow()) {
          result = {
            password: resultSet.fieldByName("password"),
            username: resultSet.fieldByName("username")
          };
        }
        resultSet.close();
        return result;
      },
      remove:function(password){
        conn.execute("DELETE FROM ClassroomDatabase WHERE password = ?", password);
        return conn.rowsAffected;
      },
      update:function(item) {
        conn.execute("UPDATE ClassroomDatabase SET username = ? WHERE password = ?", item.username, item.password);
        return conn.rowsAffected;
      },
      count:function(){
        var count =0, 
            rows  = conn.execute('select count(*) as count from ClassroomDatabase');
        while (rows.isValidRow())
        {
          count = rows.fieldByName("count");
          rows.next();
        }
        rows.close();
        return count;
      },
      insert:function(username,password){
        conn.execute('INSERT INTO ClassroomDatabase (username,password) VALUES(?,?)',username,password);
        return conn.lastInsertRowId;
      }
    }
  };
};