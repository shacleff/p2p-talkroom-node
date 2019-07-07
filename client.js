var net = require('net');
var config = require('./config');

var client = net.createConnection({
    port: config.port,
    host: config.host
});

var username = "";
client.on("connect", function () {
    console.log("请输入用户名:");
    process.stdin.on("data", function (data) {
        data = data.toString().trim();
        if(!username){
            var send = {
                protocal: 'signup',
                username: data
            }
            client.write(JSON.stringify(send));
            return;
        }

        var matches = data.split(":");
        if(matches.length >= 2){
            var from = username;
            var to = matches[0].trim();
            var message = matches[1].trim();
            var send = {
                protocal: 'p2p',
                from: username,
                to: to,
                message: message
            }
            client.write(JSON.stringify(send));
        }else{
            var send = {
                protocal: 'broadcast',
                from: username,
                message: data
            }
            client.write(JSON.stringify(send));
        }
    });
});

client.on("data", function (data) {
    data = JSON.parse(data);
    switch (data.protocal) {
        case 'signup':
            var code = data.code;
            switch (code) {
                case 1000:
                    username = data.username;
                    console.log(data.message);
                    break;
                case 1001:
                    console.log(data.message);
                    break;
                default:
                    break;
            }
            break;
    
        case 'broadcast':
            console.log(data.message);
            break;
        case 'p2p':
            var code = data.code;
            switch (code) {
                case 2000:
                    var from =  data.from;
                    var message = data.message;
                    message = from + '对你说:' + message; 
                    console.log(message);
                    break;
                case 2001:
                    console.log(data.message);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});