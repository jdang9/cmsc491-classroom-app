var win2 = Titanium.UI.createWindow({
    backgroundColor: 'red',
    title: 'Red Window'
});

var win1 = Titanium.UI.iOS.createNavigationWindow({
   window: win2
});

var win3 = Titanium.UI.createWindow({
    backgroundColor: 'blue',
    title: 'Blue Window'
});

var button = Titanium.UI.createButton({
    title: 'Open Blue Window'
});
button.addEventListener('click', function(){
    win1.openWindow(win3, {animated:true});
});

win2.add(button);
var button2 = Titanium.UI.createButton({
    title: 'Close Blue Window'
});
button2.addEventListener('click', function(){
    win1.closeWindow(win3, {animated:false}); //win3.close() will also work!!
});

win3.add(button2);
win1.open();

function openBlueWindow(e) {
    var win3 = Alloy.createController('bluewin').getView();
    $.win1.openWindow(win3);
}

$.win1.open();