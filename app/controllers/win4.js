/*
 * Collaboration Screen
 */
var Cloud = require('ti.cloud');

function createPost() {
	var window = Alloy.createController("Collab/CreatePost").getView();
	window.open();	
}

Cloud.Posts.query({
    where: {
        parentPost: ''
    }
}, function (e) {
    if (e.success) {
    	var posts = e.posts[0];	
        for (var i = 0; i < e.posts.length; i++) {
            var post = e.posts[i];
            // alert('id: ' + post.id + '\n' +
                // 'id: ' + post.id + '\n' +
                // 'title: ' + post.title + '\n' +
                // 'content: ' + post.content + '\n' +
                // 'updated_at: ' + post.updated_at);
            var row = Ti.UI.createTableViewRow({
				title: post.title,
				textAlign: "center",
				id: post.id
			});

			$.tableView1.appendRow(row);
        }
    }
    else {
    	alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));s
    }
    $.tableView1.addEventListener("click",function(e){
		var clickedRowData = e.rowData;
		var clickedRow = e.row;
		
        var nextWindow = Alloy.createController("Collab/ViewPost", {
        	postID: clickedRowData.id
        }).getView();
 		nextWindow.open();
	});
});

