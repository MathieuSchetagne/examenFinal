window.onload = () => {
    socket = io()
    console.log(socket.id);
    socket.on('connect', function () {
        console.log('Le socket id = ' + socket.id);
        /* l'événement ackUser a été transmis par le serveur */
        socket.on('ackUser', function (data) {
            console.log('data en provenance du serveur = ' + data.user)
        })
        socket.on('nouvelUtilisateur', function (data) {

            console.log(data);
            ajouter(data.user);
        })

        socket.on('nouveauMessage', function (data) {

            console.log(data);
            ajouterMessage(data.user,data.message);
        })

        socket.on('deconnection', function (data) {

            console.log(data);
            ajouterMessage(data.nom, data.message);
            
            
        })
    });
}
/* ---------------------------------------------------------- */
function enregistrement() {
    var elmUser = document.querySelector('#enregistrement input')
    console.log(elmUser.value)
    socket.nom = elmUser.value;
    var user = document.getElementById("utilisateur");
    user.innerHTML = "Utilisateur actif : " + elmUser.value;
    var section = document.getElementById("enregistrement");
    section.style.display = "none";
    socket.emit('ajouterUtilisateur', {
        user: elmUser.value
    })
}


function deconnecter() {
    socket.emit('deconnection',  {id:socket.id, nom:socket.nom})
    cacher();
    
}


function transmettre() {
    var elmUser = document.querySelector('#enregistrement input')
    var message = document.querySelector('#message_a_transmette input');

   

    console.log(message.value)

    socket.emit('ajouterMessage', {
        user : elmUser.value,
        message: message.value
    })
}

function ajouter(personne){
    var user = document.getElementById("utilisateur");
    var listeUser = document.createElement("p");
    listeUser.innerHTML = personne;
   // user.innerHTML = "Utilisateur actif : " + personne;
    var element = document.getElementById("list_user");
    var element2 = document.getElementById("chat");
    element2.appendChild(user);  
    element.appendChild(listeUser); 
   
}

function ajouterMessage(user, message){
    var messageText = document.createElement("p");
    messageText.innerHTML = user + " - " + message;
    var element = document.getElementById("message");
    element.appendChild(messageText);  
}

function cacher(){
    var user = document.getElementById("utilisateur");
    user.style.display = "none";
}



