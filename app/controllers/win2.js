/*
 * Info Screen
 */

var Cloud = require('ti.cloud');

var win2 = Ti.UI.createWindow({		//Info
	backgroundColor: 'white',
  	exitOnClose: true,
  	fullscreen: false,
  	layout: 'vertical',
  	title: 'Your Profile'
});

var filename;		// global variableused to store filename url of profile picture
var username;		// user data
var firstname;		// user data
var lastname;		// user data
var email;			// user data
var school;			// user data
var major;			// user data
var classification;	// user data
var userID;			// user data
var image;			// global variable used to store profile picture object

/*
var profileTableRow1 = Ti.UI.createTableViewRow({ height: "50%" });
var profileTableRow2 = Ti.UI.createTableViewRow({ height: "25%" });
var profileTableRow3 = Ti.UI.createTableViewRow({ height: "25%" });
var profileImage = Ti.UI.createView({left:0, width:"50%",height:Ti.UI.Size,backgroundColor:"blue"});
var profileBasic = Ti.UI.createView({left:"50%", width:"50%", height:Ti.UI.Size, backgroundColor:"green"  });
var profileSpecific = Ti.UI.createView({left:0, width:Ti.UI.Size, height:Ti.UI.Size, backgroundColor:"yellow"  });
var profileClasses = Ti.UI.createView({left:0, width:Ti.UI.Size, height:Ti.UI.Size, backgroundColor:"red"  });

profileTableRow1.add(profileImage);
profileTableRow1.add(profileBasic);
profileTableRow2.add(profileSpecific);
profileTableRow3.add(profileClasses);

// Set Table Data
$.profileTableRow1.setData(profileTableRow1);
$.profileTableRow2.setData(profileTableRow2);
$.profileTableRow3.setData(profileTableRow3);
*/


// gets the user info needed to present data
function getUserInfo(e) {
  Cloud.Users.showMe(function(e){
      if (e.success) {
          user = e.users[0];
          username = user.username;
          firstname = user.first_name;
          lastname = user.last_name;
          email = user.email;
          school = user.school;
          major = user.major;
          classification = user.classification;
          userID = user.id;
          
          
          $.username.text = "Username: " + user.username;
          $.firstname.text = "First Name: " + user.first_name;
          $.lastname.text = "Last Name: " + user.last_name;
          $.email.text = "Email: " + user.email;
          $.userID.text = "User ID: " + user.id;
          
          alert('Success:\n' +
            'id: ' + user.id + '\n' +
            'first name: ' + user.first_name + '\n' +
            'last name: ' + user.last_name);
      } else {
          alert('Error:\n' +
              ((e.error && e.message) || JSON.stringify(e)));
      } 
  });
}

// sets the user info global variables
getUserInfo();

// allows a user to upload their profile picture at any time
function uploadPhoto(){
Titanium.Media.openPhotoGallery({
    success: function(e){
    //  alert(e.mediaType);
        if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
           image = e.media;
           alert(image);

           Cloud.Photos.create({
                photo: image,
                name: 'profile' + userID,
                user_id: userID
            }, function(e){
                if(e.success){
                    var photo = e.photos[0];
                    alert('Success:\n' +
                        'id: ' + photo.id + '\n' +
                        'filename: ' + photo.filename + '\n' +
                        'size: ' + photo.size,
                        'updated_at: ' + photo.updated_at);
                }else{
                    alert('Error:\n' +
                    ((e.error && e.message) || JSON.stringify(e)));
                    alert("Code: "+e.code);
                }
            });
       }
    },
    cancel: function(){

    },
    error: function(err){
        alert("ERROR: "+err);
    },
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});
}

// searches for your profile picture and sets it
function searchPhoto() {
	Cloud.Photos.search({
	    user_id: userID
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.photos.length; i++) {
	            var photo = e.photos[i];
	            /*alert('id: ' + photo.id + '\n' +
	                  'name: ' + photo.name + '\n' +
	                  'filename: ' + photo.filename + '\n' +
	                  'updated_at: ' + photo.updated_at + '\n' +
	                  'url: ' + photo.urls.original + '\n' +
	                  'userID: ' + photo.user_id);*/
				filename = photo.urls.original;
	        }
	        
	        alert(filename);
	        
	        var pImage = Ti.UI.createImageView({
				width:"50%",
				height:"50%",
				image:filename
			});
			
			$.profileImage.add(pImage);
	        
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
			filename = '/images/avatar.jpeg';
			
			var pImage = Ti.UI.createImageView({
				width:"50%",
				height:"50%",
				image:filename
			});
			
			$.profileImage.add(pImage);
	    }
	});
}
