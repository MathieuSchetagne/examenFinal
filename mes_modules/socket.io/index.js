let socketio = require('socket.io');

module.exports.listen = function(server){
    let io = socketio.listen(server);

    // ------------------------------ Traitement du socket
    let objUtilisateur = {};
    io.on('connection', function(socket){
    console.log(socket.id);

    socket.on('ajouterUtilisateur', function(data){
      objUtilisateur[socket.id] = data.user;
      io.emit('nouvelUtilisateur', data);
  
    })

    socket.on('ajouterMessage', function(data, couleur){
      socket.broadcast.emit('nouveauMessage', data, '#FF0000')
      socket.emit('nouveauMessage', data, "#00A676");
    })

    

    socket.on('deconnection', function(data){
      let message = data.nom + " c'est déconnecté";
      data.message = message;
      data.id = socket.id;
      io.emit('deconnection', data);
      socket.disconnect();
      delete objUtilisateur[socket.id];
    })
    // .......
   })
 return io
}
