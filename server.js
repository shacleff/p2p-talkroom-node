var net = require("net");
var config = require("./config");
var broadcast = require("./broadcast");
var p2p = require("./p2p");
var signup = require("./signup");

var server = net.createServer();

var users = {};
server.on("connection", function (socket) {
    socket.on('data', function (data) {
        data = JSON.parse(data);
        switch(data.protocal){
            case 'signup':
                signup.signup(socket, data, users);
                break;
            case 'broadcast':
                broadcast.broadcast(data, users);
                break;
            case 'p2p':
                p2p.p2p(socket, data, users);
                break;
            default: 
                break;
        }
    });

    socket.on('error', function () {
        var username = socket.username;
        if(username){
            users[username] = null;
            delete users[username];
            console.log('已经注册客户端username=', socket.username, "断开连接");
        }else{
            console.log('未注册客户端socket断开连接');
        }
        
    });
});

server.listen(config.port, config.host, function () {
    console.log('server listen at port=', config.port);
});
