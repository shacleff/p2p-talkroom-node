exports.signup = function (socket, data, users) {
    var username = data.username;
    if(!users[username]){
        users[username] = socket;
        var send = {
           protocal: 'signup',
           code: 1000,
           username: username,
           message: '注册成功' 
        }
        socket.username = username;
        socket.write(JSON.stringify(send));
    }else{
        var send = {
            protocal: 'signup',
            code: 1001,
            message: '用户名已经被占用，请重新输入用户名'
        }
        socket.write(JSON.stringify(send));
    }
}