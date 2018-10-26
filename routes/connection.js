module.exports = function(io){
    io.on('connection', function (socket) {
        console.log("=======",socket);
        
        setInterval(function(){
            socket.emit('event', { hello: 'world' });

        },1000);
        socket.on('otherEvent', function (data) {
          console.log(data);
        });
      });
      
}