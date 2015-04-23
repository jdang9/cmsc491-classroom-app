/*
 * Collaboration Screen
 */
var Cloud = require('ti.cloud');

function createPost() {
	var window = Alloy.createController("Collab/CreatePost").getView();
	window.open();	
}


/*
 * 	This searches for all posts whose parentPost value is '' (basically they don't have a parent post)
 * 		This will create a list containing all main posts
 */
Cloud.Posts.query({
    where: {
        parentPost: ''
    }
}, function (e) {
    if (e.success) {
    	var posts = e.posts[0];	
        for (var i = 0; i < e.posts.length; i++) {
            var post = e.posts[i];
            
            var row = Ti.UI.createTableViewRow({  // Creates a table row
				title: post.title,
				textAlign: "center",
				id: post.id,
				font: {fontSize: 20}
			});

			$.mainThreadTable.appendRow(row);	// adds the row to the table with id 'mainThreadTable' which is created in the XML file
        }
    }
    else {
    	alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
    $.mainThreadTable.addEventListener("click",function(e){
		var clickedRowData = e.rowData;
		var clickedRow = e.row;
		
        var nextWindow = Alloy.createController("Collab/ViewPost", {
        	postID: clickedRowData.id
        }).getView();
 		nextWindow.open();
	});
});

