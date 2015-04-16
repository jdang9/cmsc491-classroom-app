var username = $.text_username.value.toString();
var password = $.text_password.value.toString();



$.button_signup.addEventListener('click', function(e){ 
 	var signupPage = Alloy.createController('signup');
 	signupPage.getView();
   });

$.button_login.addEventListener('click',function(e)
{
   Titanium.API.info("Login Button Clicked");
   if($.text_username.value == "" || $.text_password.value == ""){
   	 alert("Please fill out your username and password!");
	}else{		
		
	}
});

$.index.open();