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

    socket.on('ajouterMessage', function(data){
      console.log(data.message);
      io.emit('nouveauMessage', data);
    })

    socket.on('deconnection', function(data){
      console.log(data.id);
      let message = data.nom + " c'est déconnecté";
      data.message = message;
      io.emit('deconnection', data);
      socket.disconnect();
    })
    // .......
   })
 return io
}
