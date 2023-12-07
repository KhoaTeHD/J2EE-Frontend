

Pusher.logToConsole = true;

var pusher = new Pusher('7c9f018d64bec3a78677', {
    cluster: 'ap3'
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
    alert(JSON.stringify(data));
});