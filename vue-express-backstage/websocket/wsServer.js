let webSocketServer = require('websocket').server;
let http = require('http');
let server = http.createServer((req,res)=>{
    console.log('received request from '+req.url);
    res.end();
})
server.listen(8090, function() {
    console.log((new Date()) + ' Server is listening on port 8090');
});

let wsServer = new webSocketServer({
    httpServer:server,
    autoAcceptConnections:false
})
function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}
wsServer.on('request',function(request){
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    let connection = request.accept('',request.origin);
    connection.on('message',(message)=>{
        debugger
        if(message.type=='utf8'){
            connection.sendUTF(message.utf8Data);
            console.log('server accept message:'+message.utf8Data);
        }else{
            connection.send(message);
        }
    })
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
})
