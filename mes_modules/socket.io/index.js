let socketio = require('socket.io');

module.exports.listen = function(server){
    let io = socketio.listen(server);

    // ------------------------------ Traitement du socket
    let objUtilisateur = {};
    io.on('connection', function(socket){
    console.log(socket.id);

    socket.on('ajouterUtilisateur', function(data){
      console.log(data.user);
      io.emit('nouvelUtilisateur', data);
    })
    // .......
   })
 return io
}
