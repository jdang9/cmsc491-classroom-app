var args = arguments[0] || {};	// args.postID  will return the ID of the current parent post
var Cloud = require('ti.cloud');

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
			text: posts.title,
			height: "auto",
			width: "20%",
			padding: 5
		});
		var labelTwo = Ti.UI.createLabel({
			text: posts.content,
			height: "auto",
			width: "80%",
			padding: 5
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
					bottom: 5,
					
				});
				var newView = Ti.UI.createView({
					layout: "horizontal"
				});
				var labelOne = Ti.UI.createLabel({
					text: "",
					height: "auto",
					width: "20%",
					padding: 5
				});
				var labelTwo = Ti.UI.createLabel({
					text: post.content,
					height: "auto",
					width: "80%",
					padding: 5
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
		    parentPost: args.postID,
		    childPost: ''
		}
		}, function (e) {
		    if (e.success) {
		        var post = e.posts[0];
	
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

// function getUserName() {
	// Cloud.Users.showMe(function (e) {
	    // if (e.success) {
	        // var user = e.users[0];
	        // return user.username;
	    // } else {
	        // alert('Error:\n' +
	            // ((e.error && e.message) || JSON.stringify(e)));
	    // }
	// });
// }
