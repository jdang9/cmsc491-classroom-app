//windows view to separate each window layout
//the color is to just make sure the 
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
var label1 = Ti.UI.createLabel({
	color: '#900',
  	font: { fontSize:48 },
  	shadowColor: '#aaa',
  	shadowOffset: {x:5, y:5},
  	shadowRadius: 3,
  	text: 'This is a DashBoard!',
  	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  	top: 30,
  	width: Ti.UI.SIZE, height: Ti.UI.SIZE
});


/*
 * Info Screen
 */
var win2 = Ti.UI.createWindow({		//Info
	backgroundColor: 'black',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Your Profile'
});
var weekAtGlance = Ti.UI.createButton({
	window: win2,
	title: "Week At a Glance",
	backgroundColor: "#6699CC",
	color: "white",
	height: 50,
	width: 200,
	top: 50
});
weekAtGlance.addEventListener('click', function(e){
	Ti.API.info("You clicked Week At a Glance Button");
});


/*
 * Course Screen
 */
var win3 = Ti.UI.createWindow({		//Courses
	backgroundColor: 'blue',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Your Courses'
});

/*
 * Collaboration Screen
 */
var win4 = Ti.UI.createWindow({		//Collaboration
	backgroundColor: 'red',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Join the Team'
});

/*
 * Check-in Screen
 */
var win5 = Ti.UI.createWindow({		//Check-in
	backgroundColor: 'green',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Uilities'
});


//tab group for user to select tab
var tabGroup = Ti.UI.createTabGroup({});
//each tab define different function/screen
var tab1 = Ti.UI.createTab({
	window: win1,
	title: 'Dashboard'
});
var tab2 = Ti.UI.createTab({
	window: win2,
	title: 'Info'
});
var tab3 = Ti.UI.createTab({
	window: win3,
	title: 'Courses'
});
var tab4 = Ti.UI.createTab({
	window: win4,
	title: 'Collaborate'
});
var tab5 = Ti.UI.createTab({
	window: win5,
	title: 'Check-in'
});

tabGroup.setActiveTab(0);	//set Dashboard to be default screen
//add all screens into tabGroup
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);
win1.add(label1);
win2.add(weekAtGlance);
tabGroup.open();
