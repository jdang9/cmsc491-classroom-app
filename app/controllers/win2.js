/*
 * Info Screen
 */

Alloy.Globals.response='';

var Cloud = require('ti.cloud');

var window2 = {response:'test'};

var userBio;  //user data

var filename;		// global variableused to store filename url of profile picture
var username;		// user data
var firstname;		// user data
var lastname;		// user data
var email;			// user data
var userID;			// user data
var image;			// global variable used to store profile picture object
var labelCount = 0;	// label counter
var label = [];	// label array

var responseGlobal;

// gets the user ID
function getUserID() {
	alert(userID);
	Ti.API.info('User ID: (get user ID) ' + document.userID);
	return userID;
}

// allows a user to upload their profile picture at any time
function uploadPhoto(){
	var uid;
	Cloud.Users.showMe(function(e){
		if (e.success) {
			var user = e.users[0];			
			uid = user.id;
		} 
		else {
				alert('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
		} 
	});
	
	Titanium.Media.openPhotoGallery({
	    success: function(e){
	    //  alert(e.mediaType);
	        if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
	           image = e.media;
	           alert(image);
	
	           Cloud.Photos.create({
	                photo: image,
	                name: 'profile' + uid,
	                user_id: uid
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
	var uid;
	Cloud.Users.showMe(function(e){
		if (e.success) {
			var user = e.users[0];			
			uid = user.id;
		} 
		else {
				alert('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
		} 
	});
	
	Cloud.Photos.search({
	    user_id: uid
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
				//filename = '/images/avatar.jpeg';
	        }
	        
	        alert(filename);
	        
	       // $.picture.image = filename;
	        
	        var pPicture = $.UI.create('ImageView', {
	        	height: '100%',
				id: 'pPicture',
				image:filename,
				layout: 'vertical'
			});
			
			$.profilePicture.add(pPicture);
	        
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
			filename = '/images/avatar.jpeg';
			
			var pImage = Ti.UI.createImageView({
				width:"200px",
				height:"200px",
				image:filename
			});
			
			$.profilePicture.add(pImage);
	    }
	});
}

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
	
	//label[count] = label;
	
	//labelCount = labelCount + 1;
	
	return label;
}

function addUploadButton() {
	var uploadPhotoButton = $.UI.create('View', {
	   classes: ["button"],
	   id: 'uploadBtn'
	});
	
	var uploadButtonLabel = $.UI.create('Label', {
	   text: 'Upload Photo',
	   classes: ["buttonLabel"],
	   id: 'Lbl'
	});
	
	uploadPhotoButton.add(uploadButtonLabel);
	$.uploadPictureButton.add(uploadPhotoButton);
	
	uploadPhotoButton.addEventListener('click', function(){
	    uploadPhoto();
	});	
}

function addDataButton() {
	var uploadDataButton = $.UI.create('View', {
	   classes: ["button"],
	   id: 'Btn'
	});
	
	var uploadDataLabel = $.UI.create('Label', {
	   text: 'Upload Photo',
	   classes: ["buttonLabel"],
	   id: 'Lbl'
	});
	
	uploadDataButton.add(uploadDataLabel);
	$.profileSpecific.add(uploadDataButton);
	
	uploadDataButton.addEventListener('click', function(){
	    createDocument('mobileapp', 'data', document);
	});	
}

function getDatabases() {
	var url = "https://api.mongolab.com/api/1/databases?apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + JSON.parse(this.responseText));
			alert('success');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

function getCollections() {
	var url = "https://api.mongolab.com/api/1/databases/mobileapp/collections?apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + JSON.parse(this.responseText));
			alert('success');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}


function responseCallback(data) {
	alert(data);
}


function getDocuments(database, collection, query) {
	var url = "https://api.mongolab.com/api/1/databases/" + database + "/collections/" + collection + query + "apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var json;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			json = this.responseText;
			responseCallback(json);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

function createDocument(database, collection, data) {
	var url = 
	"https://api.mongolab.com/api/1/databases/"+database+"/collections/"+collection+"?apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + JSON.parse(this.responseText));
			alert('success 1');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert(e.error);
		},
		timeout : 15000  // in milliseconds
	});
	client.open('POST',url,false);
	
	var send = JSON.stringify(data);
	
	client.setRequestHeader('Content-Type','application/json');
	
	client.send(send);
}

// gets the user info needed to present data
function getUserInfo(e) {
	Cloud.Users.showMe(function(e){
		if (e.success) {
			var user = e.users[0];
			username = user.username;
			firstname = user.first_name;
			lastname = user.last_name;
			email = user.email;
			userID = user.id;
			userBio = firstname + " lived the life others wish they had.";
			
			userData = {
				'_id':userID,
				'username':username,
				'firstname':firstname,
				'lastname':lastname, 
				'email':email,
				'userID':userID,
				'userBio':userBio
			};
			
			createDocument('mobileapp', 'data', userData);
			
			var database = 'mobileapp';
			var collection = 'data';
			var query = '/'+userID+'?';
			
			var url = "https://api.mongolab.com/api/1/databases/" + database + "/collections/" + collection + query + "apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
			var json;
			var client = Ti.Network.createHTTPClient();
			
			client.onload = function(e) {
				json = JSON.parse(this.responseText);
				alert(json);
				/*if (userData.userID != json.userID) {
					createDocument('mobileapp', 'data', userData);
				}*/
			};
			// Prepare the connection.
			client.open("GET", url);
			// Send the request.
			client.send();
			
			
			
			
			
			/*getDocuments('mobileapp', 'data', '/'+userID+'?');
			alert(window2.response);*/

			/*if (getDocuments('mobileapp', 'data', '/'+userID+'?') != null) {
				createDocument('mobileapp', 'data', userData);
			} */
			  
			  
			$.username.text = "Username: " + user.username;
			$.firstname.text = "First Name: " + user.first_name;
			$.lastname.text = "Last Name: " + user.last_name;
			$.email.text = "Email: " + user.email;
			$.userID.text = "User ID: " + user.id;
			
		} 
		else {
				alert('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
		} 
	});
}

function init() {
	getUserInfo();
	searchPhoto();
	addUploadButton();
	//$.profileImage.add(addLabel('test', '20px', 'blue', 'left', 'custom', 'custom1', 'vertical'));
}

init();

/////////////////////////
// Bio Section
////////////////////////

function addBioButton() {
	var uploadBioButton = $.UI.create('View', {
	   classes: ["button"],
	   id: 'btnRight'
	});
	
	var uploadBioLabel = $.UI.create('Label', {
	   text: 'Edit Bio',
	   classes: ["buttonLabel"],
	   id: 'Lbl'
	});
	
	uploadBioButton.add(uploadBioLabel);
	$.specificProfile.add(uploadBioButton);
	 
	uploadBioButton.addEventListener('click', function(){
		var window = Alloy.createController("bio").getView();
		window.open();
	});
}

addBioButton();
    
function updateUserBio(e) {
 
 Cloud.Users.showMe(function (e) {
     if (e.success) {
         var user = e.users[0];
         var row = Ti.UI.createTableViewRow({
          title: user.custom_fields.userBio,
       textAlign: "left",
       font: {fontSize: 20},
       textColor: "white"
   });
   $.bioText.appendRow(row);
     } else {
         alert('Error:\n' +
             ((e.error && e.message) || JSON.stringify(e)));
     }
 });

}

updateUserBio();