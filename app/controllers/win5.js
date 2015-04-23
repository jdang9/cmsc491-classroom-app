/*
 * Check-in Screen
 */
// load the Scandit SDK module


var Cloud = require("ti.cloud");
var scanditsdk = require("com.mirasense.scanditsdk");

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
  
  Ti.API.info(JSON.stringify(json)); 
   
 }; 
 
 // this method will be called if there is an error 
 xhr.onerror = function()
 {
  Ti.API.info(this.error + ': ' + this.statusText);
  return false;
 };

 xhr.send({'uid': data});
}





// disable the status bar for the camera view on the iphone and ipad
if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
        Titanium.UI.iPhone.statusBarHidden = true;
    }
var picker;
// Create a window to add the picker to and display it. 
var window = Titanium.UI.createWindow({  
        title:'Scandit SDK',
        navBarHidden:true
});
// Sets up the scanner and starts it in a new window.
var openScanner = function() {
	
    // Instantiate the Scandit SDK Barcode Picker view
    picker = scanditsdk.createView({
        width:"100%",
        height:"100%"
    });
    // Initialize the barcode picker, remember to paste your own app key here.
    picker.init("ZYr6Br/YZOH0Pk/zacqAjruQSpvJz30BmNRM9AvI9hI", 0);
    
    
    picker.showSearchBar(true);
    // add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
    picker.showToolBar(true);
    // Set callback functions for when scanning succeedes and for when the 
    // scanning is canceled.
    picker.setSuccessCallback(function(e) {
        
        if (e.barcode == 'http://jamesfreund.com/mobile/setAttendance.php') {
        	alert("You have been checked in!");
        }
        else {
        	alert('checkin failed');
        }
        Cloud.Users.showMe(function(e){
			 if (e.success) {
			  var user = e.users[0];   
			  var uid = user.id;
			  sendAttendance(uid, 'http://jamesfreund.com/mobile/setAttendance.php');
			  var window = Alloy.createController("main").getView();
			  window.open();
			 } 
			 else {
			   Ti.API.info('Error:\n' +
			   ((e.error && e.message) || JSON.stringify(e)));
			 } 
			});
       });
        
    picker.setCancelCallback(function(e) {
        closeScanner();
    });
    window.add(picker);
    window.addEventListener('open', function(e) {
        // Adjust to the current orientation.
        // since window.orientation returns 'undefined' on ios devices 
        // we are using Ti.UI.orientation (which is deprecated and no longer 
        // working on Android devices.)
        if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
            picker.setOrientation(Ti.UI.orientation);
        }   
        else {
            picker.setOrientation(window.orientation);
        }
        
        picker.setSize(Ti.Platform.displayCaps.platformWidth, 
                       Ti.Platform.displayCaps.platformHeight);
        picker.startScanning();     // startScanning() has to be called after the window is opened. 
    });
    window.open();
};
// Stops the scanner, removes it from the window and closes the latter.
var closeScanner = function() {
    if (picker != null) {
        picker.stopScanning();
        window.remove(picker);
    }
    window.close();
};
// Changes the picker dimensions and the video feed orientation when the
// orientation of the device changes.
Ti.Gesture.addEventListener('orientationchange', function(e) {
    window.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, 
                   Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
    if (picker != null) {
        picker.setOrientation(e.orientation);
        picker.setSize(Ti.Platform.displayCaps.platformWidth, 
                Ti.Platform.displayCaps.platformHeight);
        // You can also adjust the interface here if landscape should look
        // different than portrait.
    }
});