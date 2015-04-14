//// IGNORE THIS, LOOK AT THE PART AFTER THE COMMENT
//windows view to separate each window layout
//the color is to just make sure the 
// /*
 // * DashBoard screen
 // */
// var win1 = Ti.UI.createWindow({		//DashBoard
	// backgroundColor: 'white',
  	// exitOnClose: true,
  	// fullscreen: false,
  	// layout: 'vertical',
  	// title: 'Welcome to Classroom+ DashBoard!'
// });
// var label1 = Ti.UI.createLabel({
	// color: '#900',
  	// font: { fontSize:48 },
  	// shadowColor: '#aaa',
  	// shadowOffset: {x:5, y:5},
  	// shadowRadius: 3,
  	// text: 'This is a DashBoard!',
  	// textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  	// top: 30,
  	// width: Ti.UI.SIZE, height: Ti.UI.SIZE
// });


// /*
 // * Info Screen
 // */
// var win2 = Ti.UI.createWindow({		//Info
	// backgroundColor: 'white',
  	// exitOnClose: true,
  	// fullscreen: false,
  	// layout: 'vertical',
  	// title: 'Your Profile'
// });
// var weekAtGlance = Ti.UI.createButton({
	// window: win2,
	// title: "Week At a Glance",
	// backgroundColor: "#6699CC",
	// color: "white",
	// height: Ti.UI.SIZE,
	// width: Ti.UI.SIZE,
	// top: '85%',
	// bottom: '50dp'
// });
// weekAtGlance.addEventListener('click', function(e){
	// Ti.API.info("You clicked Week At a Glance Button");
// });


// /*
 // * Course Screen
 // */
// var win3 = Ti.UI.createWindow({		//Courses
	// backgroundColor: 'white',
  	// exitOnClose: true,
  	// fullscreen: false,
  	// layout: 'vertical',
  	// title: 'Your Courses',
  	// navBarHidden: false
// });
 
// var actionBar;
// win3.addEventListener("open", function() {
    // if (Ti.Platform.osname === "android") {
        // if (! win3.activity) {
            // Ti.API.error("Can't access action bar on a lightweight window.");
        // } else {
            // actionBar = win3.activity.actionBar;
            // if (actionBar) {
                // actionBar.backgroundImage = "/bg.png";
                // actionBar.title = "New Title";
                // actionBar.onHomeIconItemSelected = function() {
                    // Ti.API.info("Home icon clicked!");
                // };
            // }
        // }
    // }
// });

// /*
 // * Collaboration Screen
 // */
// var win4 = Ti.UI.createWindow({		//Collaboration
	// backgroundColor: 'red',
  	// exitOnClose: true,
  	// fullscreen: false,
  	// layout: 'vertical',
  	// title: 'Join the Team'
// });

// /*
 // * Check-in Screen
 // */
// var win5 = Ti.UI.createWindow({		//Check-in
	// backgroundColor: 'green',
  	// exitOnClose: true,
  	// fullscreen: false,
  	// layout: 'vertical',
  	// title: 'Uilities'
// });


// //tab group for user to select tab
// var tabGroup = Ti.UI.createTabGroup({
	// width: Ti.UI.SIZE,
	// height: Ti.UI.SIZE
// });
// //each tab define different function/screen
// var tab1 = Ti.UI.createTab({
	// window: win1,
	// title: 'Dashboard'
// });
// var tab2 = Ti.UI.createTab({
	// window: win2,
	// title: 'Info'
// });
// var tab3 = Ti.UI.createTab({
	// window: win3,
	// title: 'Courses'
// });
// var tab4 = Ti.UI.createTab({
	// window: win4,
	// title: 'Collaborate'
// });
// var tab5 = Ti.UI.createTab({
	// window: win5,
	// title: 'Check-in'
// });
// Alloy.Globals.tabGroup=$.index;
// Alloy.Globals.currentTab=0;
// 
// function doopen(evt){
	// var activity = evt.source.getActivity();
// 
	// activity.onCreateOptionsMenu = function(e) {
		// var item, menu;
		// menu = e.menu;
		// menu.clear();
// 		
		// switch(Alloy.Globals.currentTab){
			// case 0:
				// item = e.menu.add({
					// title : "Invite",
					// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					// icon : Ti.Android.R.drawable.ic_menu_search
				// });
// 
				// item.addEventListener("click", function(e) {
					// $.win1.label.text='You clicked the magnifying glass';
				// });
// 				
				// break;
			// case 1:
				// item1 = e.menu.add({
					// title : "Share",
					// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					// icon : Ti.Android.R.drawable.ic_menu_edit
				// });
// 
				// item2 = e.menu.add({
					// title : "Share",
					// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					// icon : Ti.Android.R.drawable.ic_menu_send
				// });
				// item2.addEventListener("click", function(e) {					
					// $.win2.label.text='You clicked the send button';
				// });
// 				
				// break;
		// }
	// };
// 
	// Alloy.Globals.tabGroup.addEventListener("focus", function(evt) {
		// if (typeof evt.index !== "undefined"){
			// activity.invalidateOptionsMenu();
			// Alloy.Globals.currentTab=evt.index;	
		// } 
	// });
// }
// 
// $.index.open();
// tabGroup.setActiveTab(0);	//set Dashboard to be default screen
//add all screens into tabGroup
// tabGroup.addTab(tab1);
// tabGroup.addTab(tab2);
// tabGroup.addTab(tab3);
// tabGroup.addTab(tab4);
// tabGroup.addTab(tab5);
// win1.add(label1);
// win2.add(weekAtGlance);

// tabGroup.open();
/////////////////////////////////////////////////




Alloy.Globals.tabGroup=$.index;
Alloy.Globals.currentTab=0;
function doopen(evt){
	var activity = evt.source.getActivity();

	activity.onCreateOptionsMenu = function(e) {
		var item, menu;
		menu = e.menu;
		menu.clear();
		
		switch(Alloy.Globals.currentTab){
			case 0:
				item = e.menu.add({
					title : "Invite",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					icon : Ti.Android.R.drawable.ic_menu_search
				});

				item.addEventListener("click", function(e) {
					$.win1.label.text='You clicked the magnifying glass';
				});
				
				break;
			case 1:
				item1 = e.menu.add({
					title : "Share",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					icon : Ti.Android.R.drawable.ic_menu_edit
				});

				item2 = e.menu.add({
					title : "Share",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					icon : Ti.Android.R.drawable.ic_menu_add
				});
				item2.addEventListener("click", function(e) {					
					$.win2.label.text='You clicked the add class button';
				});
				
				break;
		}
	};

	Alloy.Globals.tabGroup.addEventListener("focus", function(evt) {
		if (typeof evt.index !== "undefined"){
			activity.invalidateOptionsMenu();
			Alloy.Globals.currentTab=evt.index;	
		} 
	});
}

$.index.open();
