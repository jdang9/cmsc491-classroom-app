/*
 * Course Screen
 */

function getCourses() {
	//var url = "http://johnkuiphoff.com/courses/mobilecomputing/things/getthings.php";
	var url = "http://jamesfreund.com/mobile/getThings.php";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			// parse json coming from the server
			var json = JSON.parse(this.responseText);
			// Ti.API.info('success 9' + JSON.stringify(json));
			
			// if things are returned
	 		if(json.courses)
			{
		 		// loop through all of our things
		 		for (var i = 0; i < json.courses.length; i++) 
		 		{
					// Ti.API.info(json.courses[i].courseName);
					var row = Ti.UI.createTableViewRow({
						textAlign: "center",
						border: 10,
						// borderColor: "#141925",
						borderColor: "red",
						id: json.courses[i].id
					});
					var newView = Ti.UI.createView({
						layout: "horizontal"
					});
					var labelOne = Ti.UI.createLabel({
						text: " " + json.courses[i].courseNumber,
						width: "25%",
						height: "auto",
						font: {fontSize: 20}
					});
					var labelTwo = Ti.UI.createLabel({
						text: "|\t" + json.courses[i].courseName,
						width: "75%",
						height: "auto",
						font: {fontSize: 20}
					});
					// Ti.API.info("Course Number: " + json.courses[i].courseNumber + "\nCourse Name: " + json.courses[i].courseName);
					newView.add(labelOne);
					newView.add(labelTwo);
					row.add(newView);
					$.courseList.appendRow(row);
				}
			}
			},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info('error');
		},
		timeout : 55000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url, true);
	// Send the request.
	client.send();
}

function viewCourse(courseNum) {
	var url = "http://jamesfreund.com/mobile/getThings.php";
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var json = JSON.parse(this.responseText);
			
	 		if(json.courses) {
		 		for (var i = 0; i < json.courses.length; i++) {
					if (json.courses[i].id == courseNum) {
						$.label_number.setText(json.courses[i].courseNumber);
						$.label_name.setText(json.courses[i].courseName);
						$.label_instructor.setText(json.courses[i].instructorName);
						$.label_time.setText(json.courses[i].courseTime);
						$.label_days.setText(json.courses[i].courseDays);
					}
				}
			}
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info('error');
		},
		timeout : 55000  // in milliseconds
	});
	client.open("GET", url, true);
	client.send();
}

getCourses();

$.courseList.addEventListener("click",function(e){
	var clickedRowData = e.rowData;
	var postID = clickedRowData.id;
	viewCourse(postID);
});
