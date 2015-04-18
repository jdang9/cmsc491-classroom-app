var Cloud = require('ti.cloud');

var _args = arguments[0] || {};

var settings = {};
var actInd;
var actIndParent;

$.loginClick = function() {
  loginClick();
};

//Create activity indicator for buttons
function activityIndicator(){
	var style;
	if (OS_IOS){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	return Ti.UI.createActivityIndicator({
		color:"#ffffff",
	  	style:style,
	  	height:Ti.UI.SIZE,
	  	width:Ti.UI.SIZE
	});
	 
}


//Hide the activity indicator placed on the login button.
$.hideActivityIndicator = function(){
   if(actInd != null){
       $[actIndParent].remove(actInd);
   } 
};

/*function createAccountClick(e) {
	Ti.API.info('CREATE ACCOUNT CLICK');
	resetLoginForm();
	$.loginView.animate({ opacity:0.0, duration:250 }, function() {
		$.createAccountView.visible = true;
		$.createAccountView.animate({ opacity:1.0, duration:250 });
		OS_BLACKBERRY && ($.createAccountView.opacity=1.0) && ($.createAccountView.visible=true);
			
		$.loginContainer.height = 500;
	});
}*/

/*function createAccountClick() {
	Ti.API.info('CREATE ACCOUNT CLICK');
	var window = Alloy.createController("signup").getView();
	window.open();
}*/

function cancelAccountClick(e) {
	
	Ti.API.info('CANCEL ACCOUNT CLICK');
	var window = Alloy.createController("index").getView();
	window.open();
}


function resetEmailForm(){
	$.emailTxt.value = '';
}

function resetAccountForm(){
	$.accountLbl.text = '';
	$.usernameNew.value = '';
	$.passwordNew.value = '';
	$.passwordConfirm.value = '';
}

function resetLoginForm(){
	$.text_username.value = '';
	$.text_password.value = '';
}

function focusStyle(evt){
	//evt.source.backgroundImage = WPATH("/images/field-bg-focused.png");
	
}

function blurStyle(evt){
	//evt.source.backgroundImage =  WPATH("/images/field-bg.png");
}

function focusPassword(){
    $.passwordTxt.focus();
}

Ti.App.addEventListener("keyboardframechanged",moveLoginContainer);

function moveLoginContainer(evt){
	if (Ti.App.keyboardVisible) {
		$.loginContainer.animate({
			center: {
				x: Ti.Platform.displayCaps.platformWidth / 2,
				// Accomodate status bar height on iPad...
				y: (Ti.Platform.osname === "ipad") ? ((Ti.Platform.displayCaps.platformHeight - evt.keyboardFrame.height) / 2) - 10 : ((Ti.Platform.displayCaps.platformHeight - evt.keyboardFrame.height) / 2)
			}, 
			duration: 250
		});
	} else{
		$.loginContainer.animate({
			center: {
				x: Ti.Platform.displayCaps.platformWidth / 2,
				y: Ti.Platform.displayCaps.platformHeight / 2
			},
			duration: 250
		});
	}
}

$.open = function(){
	
	$.signup.open();	

	if(OS_IOS){
		setTimeout(function() {
				// timeout only to delay initial animation (fake start)
				$.loginContainer.animate({
					height: 500,
					duration: 250
				}, function() {
					$.createAccountView.animate({ opacity:1.0, duration:250 });
					//$.divider.animate({ opacity:1.0, duration: 250 });
					$.loginContainer.height = 500;
				});
		}, 1000);
	} else {
		$.loginContainer.height  = 500; 
		$.createAccountView.opacity = 1.0;
		//$.divider.opacity =1.0;
	}
	
	Ti.API.info($.loginContainer.height);
};

$.close = function(){
	
	Ti.App.removeEventListener("keyboardframechanged",moveLoginContainer);
	$.destroy();
	Alloy.CFG.skipLogin = false;
};

function createClick() {
	Cloud.Users.create({
	username: $.username_create.value,
	password: $.password_create.value,
	password_confirmation: $.password_confirm_create.value,
	email: $.email_create.value,
	first_name: $.first_name.value,
	last_name: $.last_name.value,
	school: $.school_create.value,
	major: $.major_create.value,
	classification: $.classification_create.value
	
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        alert('Success:\n' +
	        'id: ' + user.id + '\n' +
	        'sessionId: ' + Cloud.sessionId + '\n');
	        var window = Alloy.createController("main").getView();
	        window.open;
	} else {
	    alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

/*function cancel() {
	var window = Alloy.createController("index").getView();
	window.open();
}*/

// $.newUserSubmit.addEventListener('click', createUser);

// $.newUserCancel.addEventListener('click', cancel);

$.open();
