exports.broadcast = function (data, users) {
    var from = data.from;
    var message = data.message;
    message = from + ' 说:' + message;

    var send = {
        protocal: 'broadcast',
        message: message
    }

    // send = new Buffer.from(JSON.stringify(send));
    send = JSON.stringify(send);
    for(var username in users){
        var s = users[username];
        s.write(send);
    }
}