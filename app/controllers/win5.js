/*
 * Check-in Screen
 */
var Cloud = require('ti.cloud');

function sendAttendance(data, url)
{
	// create the httpRequest 
	var xhr = Titanium.Network.createHTTPClient(); 
	
	// open the httpRequest 
	xhr.open('POST',url); 
	
	// this method will be called when the request is complete
	xhr.onload = function() 
	{ 
		
		// parse json response
		var json = JSON.parse(this.responseText);
		
		alert(JSON.stringify(json));
		/*if(json.status == 'success')
		{
			// display a confirmation
			alert('Your thing has been saved');
			
		} else {
			
			// display an error
			alert('A thing is required ' + data);
		}*/
		
		 
	}; 
	
	// this method will be called if there is an error 
	xhr.onerror = function()
	{
		alert(this.error + ': ' + this.statusText);
		return false;
	};

	xhr.send({'uid': data});
}

Cloud.Users.showMe(function(e){
	if (e.success) {
		var user = e.users[0];			
		var uid = user.id;
		sendAttendance(uid, 'http://jamesfreund.com/mobile/setAttendance.php');
	} 
	else {
			alert('Error:\n' +
			((e.error && e.message) || JSON.stringify(e)));
	} 
});