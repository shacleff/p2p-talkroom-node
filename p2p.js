exports.p2p = function (socket, data, users) {
    var from = data.from;
    var to = data.to;
    var message = data.message;
    var receiver = users[to];
    if(!receiver){
        var send = {
            protocal: 'p2p',
            code: 2001,
            message: '用户名不存在'
        }
        socket.write(new Buffer.from(JSON.stringify(send)));
    }else{
        var send = {
            protocal: 'p2p',
            code: 2000,
            from: data.from,
            message: message
        }
        receiver.write(new Buffer.from(JSON.stringify(send)));
    }
}