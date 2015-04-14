/*
 * DashBoard screen
 */
var win1 = Ti.UI.createWindow({		//DashBoard
	backgroundColor: 'white',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Welcome to Classroom+ DashBoard!'
});

var args = arguments[0] || {};

function doClick(e) {
    alert($.label1.text);
}