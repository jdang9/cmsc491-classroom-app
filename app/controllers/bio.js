var Cloud = require("ti.cloud");
function cancel() {
	var window = Alloy.createController("win2").getView();
 	window.open();
}
var bio;
function submit() {
	Cloud.Users.update({
	  role: $.bioTextField.value
 }, function (e) {
     if (e.success) {
         var user = e.users[0];
         // alert('Success:\n' +
             // 'id: ' + post.id + '\n' +
             // 'title: ' + post.title + '\n' +
             // 'content: ' + post.content + '\n' +
             // 'updated_at: ' + post.updated_at);
             alert("Just updated bio as: " + user.role);
         cancel();
     } else {
         alert('Error:\n' +
             ((e.error && e.message) || JSON.stringify(e)));
     }
 });
}
