/*
 * Info Screen
 */
var win2 = Ti.UI.createWindow({		//Info
	backgroundColor: 'white',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Your Profile'
});
var weekAtGlance = Ti.UI.createButton({
	window: win2,
});
weekAtGlance.addEventListener('click', function(e){
	Ti.API.info("You clicked Week At a Glance Button");
});
win2.add(weekAtGlance);

function doClick(e){
    Titanium.API.info("You clicked the button");
};
