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

function forgotClick(e) {
	Ti.API.info('FORGOT CLICK');
	resetLoginForm();
	$.loginView.animate({ opacity:0.0, duration:250 }, function() {
		$.passworReminderView.visible = true;
		$.passworReminderView.animate({ opacity:1.0, duration:250 });
		OS_BLACKBERRY && ($.passworReminderView.opacity=1.0) && ($.passworReminderView.visible=true);
			
		$.loginContainer.height = 500;
	});
}

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

function createAccountClick() {
	Ti.API.info('CREATE ACCOUNT CLICK');
	var window = Alloy.createController("signup").getView();
	window.open();
}

function remindClick(e) {
	if ($.emailTxt.value) {
		if(!actInd){
	      actInd = activityIndicator();  
	    }
		$.emailBtn.add(actInd);
		$.emailBtn.title = "";
		actIndParent = 'emailBtn';
		actInd.show();

		settings.remindCallback && settings.remindCallback();
	} else {
		alert("Please provide your email.");
	}
}

function cancelAccountClick(e) {
	
	$.createAccountView.animate({ opacity:0.0, duration:250 }, function() {
		$.createAccountView.visible = false;
		$.loginView.animate({ opacity:1.0, duration:250 });
			
		OS_BLACKBERRY && ($.loginView.opacity=1.0) && ($.loginView.visible=true);
			
		$.loginContainer.height = 500; 
	});

	resetEmailForm();
}

function cancelClick(e) {
	
	$.passworReminderView.animate({ opacity:0.0, duration:250 }, function() {
		$.passworReminderView.visible = false;
		$.loginView.animate({ opacity:1.0, duration:250 });
			
		OS_BLACKBERRY && ($.loginView.opacity=1.0) && ($.loginView.visible=true);
			
		$.loginContainer.height = 500; 
	});

	resetEmailForm();
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
	
	$.index.open();	

	if(OS_IOS){
		setTimeout(function() {
				// timeout only to delay initial animation (fake start)
				$.loginContainer.animate({
					height: 500,
					duration: 250
				}, function() {
					$.loginView.animate({ opacity:1.0, duration:250 });
					//$.divider.animate({ opacity:1.0, duration: 250 });
					$.loginContainer.height = 500;
				});
		}, 1000);
	} else {
		$.loginContainer.height  = 500; 
		$.loginView.opacity = 1.0;
		//$.divider.opacity =1.0;
	}
	
	Ti.API.info($.loginContainer.height);
};

$.close = function(){
	
	Ti.App.removeEventListener("keyboardframechanged",moveLoginContainer);
	$.destroy();
	Alloy.CFG.skipLogin = false;
};

function loginClick() {
	Cloud.Users.login({
	    login: $.text_username.value,
	    password: $.text_password.value
	}, function (e) {
	    if (e.success) {
	    	currentUser = e.users[0];
	    	// alert(currentUser);	    	
	    	Ti.App.Properties.setString('sessionid',e.meta.session_id);
	    	$.text_username.hide();
	    	$.text_password.hide();
	    	var window = Alloy.createController("main").getView();
			window.open();
	    } else {
	        Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
}

$.open();