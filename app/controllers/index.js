function login() {

	var username = $.text_username.value.toString();
	var password = $.text_password.value.toString();
	
	if (username=="admin" && password=="hunter") {
		var window = Alloy.createController("main").getView();
		window.open();
	}
	else {
		alert("Incorrect password, please try again.");
	}
}
$.index.open();