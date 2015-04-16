var username = $.text_userSignup.value.toString();
var password = $.text_passSignup.value.toString();
// var db = Ti.Database.open('ClassroomDatabase');
// db.execute('CREATE TABLE IF NOT EXISTS fugitives(username TEXT PRIMARY KEY, password TEXT);');
// db.execute('INSERT INTO ClassroomDatabase (username, password) VALUES (?,?)', username, password);
Ti.include("accounts.js");
var db = Ti.App.listDb;
db = Ti.Database.open('ClassroomDatabase');
var win = Ti.UI.createWindow({
	backgroundColor: "black"
});

 
var txtEmail = Titanium.UI.createTextField({
    color:'#336699',
    top:200,
    left:50,
    width:300,
    height:40,
    hintText:'Username',
});
win.add(txtEmail);
 
var txtPass = Titanium.UI.createTextField({
    color:'#336699',
    top:250,
    left:50,
    width:300,
    height:40,
    hintText:'Password',
    passwordMask:true,
});
win.add(txtPass);
 
var btnSignup = Titanium.UI.createButton({
    title:'Signup',
    top: 300,
    width:90,
    height:35,
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(btnSignup);

btnSignup.addEventListener('click',function(e){
  var data = {
    username:$.text_userSignup.value,
    password:$.text_passSignup.value
  };
  db.ClassroomDatabase.insert(username,password);
});

win.open();
// db.close();
