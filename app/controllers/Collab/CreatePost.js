var Cloud = require('ti.cloud');

var win = Ti.UI.createWindow({		//Collaboration
	backgroundColor: 'blue',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Join the Team'
});

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

function createPost() {
	Cloud.Posts.create({
    content: $.content_text.value,
    title: $.title_text.value,
    custom_fields: {
        parentPost: '',
        childPost: '',
        createdBy: userName
    }
	}, function (e) {
	    if (e.success) {
	        var post = e.posts[0];
	        alert('Success:\n' +
	            'id: ' + post.id + '\n' +
	            'title: ' + post.title + '\n' +
	            'content: ' + post.content + '\n' +
	            'updated_at: ' + post.updated_at);
	        closeWindow();
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function closeWindow(){
    var window = Alloy.createController("main").getView();
	window.open();	
}

win.open({
	activityEnterAnimation: Ti.Android.R.anim.fade_in,
    activityExitAnimation: Ti.Android.R.anim.fade_out
});
