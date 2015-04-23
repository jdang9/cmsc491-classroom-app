var args = arguments[0] || {};	// args.postID  will return the ID of the current parent post
var Cloud = require('ti.cloud');

function goBack() {
	var window = Alloy.createController("main").getView();
	window.open();	
}

// Get current user's info
var userName;
Cloud.Users.showMe(function (e) {
    if (e.success) {
        var user = e.users[0];
        userName = user.username;
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

// Load the parent post + content
Cloud.Posts.query({
    where: {
        id: args.postID
    }
}, function (e) {
    if (e.success) {
    	var posts = e.posts[0];
			
		var row = Ti.UI.createTableViewRow({
			
			textAlign: "center"
		});
		var newView = Ti.UI.createView({
			layout: "horizontal"
		});
		var labelOne = Ti.UI.createLabel({
			text: " " + posts.custom_fields.createdBy + ":",
			classes: ['nameLabel'],
			width: "15%",
			height: "auto",
			padding: 10,
			font: {fontSize: 20}
		});
		var labelTwo = Ti.UI.createLabel({
			classes: ['nameLabel'],
			text: posts.content,
			width: "85%",
			height: "auto",
			padding: 10,
			font: {fontSize: 20}
		});

		newView.add(labelOne);
		newView.add(labelTwo);
		row.add(newView);
		$.tableView1.appendRow(row);
		secondOutput();
    }
    else {
    	alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));s
    }
});

// Load child comments
function secondOutput() {
	Cloud.Posts.query({
	    where: {
	        parentPost: args.postID
	    }
	}, function (e) {
	    if (e.success) {
	    	var posts = e.posts[0];	
	        for (var i = e.posts.length-1; i >= 0; i--) {
	            var post = e.posts[i];	
	            var row = Ti.UI.createTableViewRow({
					textAlign: "center",
					top: 5,
					bottom: 5
				});
				var newView = Ti.UI.createView({
					layout: "horizontal"
				});
				var labelOne = Ti.UI.createLabel({
					classes: ['nameLabel'],
					text: " " + post.custom_fields.createdBy + ":",
					width: "15%",
					height: "auto",
					padding: 10,
					font: {fontSize: 20}
				});
				var labelTwo = Ti.UI.createLabel({
					classes: ['contentLabel'],
					text: post.content,
					width: "85%",
					height: "auto",
					padding: 10,
					font: {fontSize: 20}
				});
				newView.add(labelOne);
				newView.add(labelTwo);
				row.add(newView);
				$.tableView1.appendRow(row);
	        }
	    }
	    else {
	    	alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));s
	    }
	});
}

function postComment() {
	Cloud.Posts.create({
		title: '',
		content: $.commentTextField.value,
		childPost: '',
	    custom_fields: {
		  "parentPost": args.postID,
		  "childPost": '',
		  "createdBy": userName
		}
		}, function (e) {
		    if (e.success) {
		        var post = e.posts[0];
		        // alert("USER: " + post.createdBy + "\nUSER2: " + post.custom_fields.createdBy + "\nUSERNAME: " + userName);
		        var nextWindow = Alloy.createController("Collab/ViewPost", {
		        	postID: args.postID
		        }).getView();
		 		nextWindow.open();
		} else {
		    alert('Error:\n' +
	            	((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

$.commentTextField.addEventListener('return', function(e) {
	Ti.API.info(' Return key  Detected');
	postComment();
});

$.commentTextField.addEventListener('click', function() {
    $.commentTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
    $.commentTextField.focus();
});

$.commentTextField.addEventListener('blur', function() {
    $.commentTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
});
