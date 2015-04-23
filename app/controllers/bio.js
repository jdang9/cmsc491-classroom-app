var Cloud = require("ti.cloud");
function cancel() {
 var window = Alloy.createController("main").getView();
  window.open();
}
var bio;
function submit() {
 Cloud.Users.update({
    custom_fields: {
       userBio: $.bioTextField.value
    }
  }, function (e) {
      if (e.success) {
          var user = e.users[0];
          ("Just updated bio as: " + user.custom_fields.userBio);
          cancel();
      } else {
          ('Error:\n' +
              ((e.error && e.message) || JSON.stringify(e)));
      }
  });
}