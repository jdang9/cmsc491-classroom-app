/*
 * DashBoard screen
 */
/////////////////////////
// Courses Section
////////////////////////
function addLabel(title, fontsize, fontcolor, textalign, classes, id, layout) {
	//var count = labelCount;
	
	var label = $.UI.create('Label', {
	   text: title,
	   font: {fontSize: fontsize},
	   color:fontcolor,
	   textAlign: textalign,
	   classes: [classes],
	   id: id,
	   layout: layout
	});
	
	return label;
}

function getToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if(dd<10) {
	    dd='0'+dd
	} 
	
	if(mm<10) {
	    mm='0'+mm
	} 
	
	today = mm+'/'+dd+'/'+yyyy;
	
	var todayImage = Ti.UI.createImageView({
		image:'/images/monday.png',
		height:'30%'
	});
	
	$.date.add(addLabel(today, '32px', 'white', 'center', '', 'currentDate', 'vertical'));
	$.today.add(todayImage);
}

getToday();

function getAnnouncements() {
	var url = "http://jamesfreund.com/mobile/getAnnouncements.php";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			// parse json coming from the server
			var json = JSON.parse(this.responseText);
			// alert('success 9' + JSON.stringify(json));
			
			// if things are returned
	 		if(json.announcements)
			{
		 		// loop through all of our things
		 		for (var i = (json.announcements.length - 1); i >= 0; i--) 
		 		{
					// alert(json.courses[i].courseName);
					var row = Ti.UI.createTableViewRow({
						textAlign: "center",
						top: 50,
						border: 10,
						// borderColor: "#141925",
						borderColor: "red",
						id: json.announcements[i].id
					});
					var newView = Ti.UI.createView({
						layout: "horizontal"
					});
					var newView2 = Ti.UI.createView({
						layout: "horizontal"
					});
					var labelOne = Ti.UI.createLabel({
						text: " " + json.announcements[i].regDate,
						width: "15%",
						height: "auto",
						font: {fontSize: 20}
					});
					var labelTwo = Ti.UI.createLabel({
						text: "|\t" + json.announcements[i].courseName,
						width: "50%",
						height: "auto",
						font: {fontSize: 14}
					});
					var labelThree = Ti.UI.createLabel({
						textAlign:'right',
						text: json.announcements[i].courseNumber,
						width: "35%",
						height: "auto",
						font: {fontSize: 14}
					});
					var labelFour = Ti.UI.createLabel({
						text: "",
						width: "100%",
						height: "2px",
						backgroundColor:'white',
						font: {fontSize: 14}
					});
					var labelFive = Ti.UI.createLabel({
						text: json.announcements[i].message,
						top:"10px",
						bottom:"50px",
						width: "100%",
						height: "auto",
						font: {fontSize: 14}
					});
					// alert("Course Number: " + json.courses[i].courseNumber + "\nCourse Name: " + json.courses[i].courseName);
					newView.add(labelOne);
					newView.add(labelTwo);
					newView.add(labelThree);
					newView.add(labelFour);
					newView.add(labelFive);
					row.add(newView);
					
					$.announcementList.appendRow(row);
				}
			}
			},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 55000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url, true);
	// Send the request.
	client.send();
}

getAnnouncements();
