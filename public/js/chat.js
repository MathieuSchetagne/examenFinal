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
            ajouter(data.user, data.id);
        })

     

        socket.on('nouveauMessage', function (data, couleur) {

            console.log(data);
            ajouterMessage(data.user,data.message,couleur);
        })

         

        socket.on('deconnection', function (data) {

            console.log(data);
            ajouterMessage(data.nom, data.message);
            cacherUser(data.id);
           
            
            
            
        })
    });
}
/* ---------------------------------------------------------- */
function enregistrement() {
    var elmUser = document.querySelector('#enregistrement input')
 
    socket.id = socket.id;
    socket.nom = elmUser.value;
    var user = document.getElementById("utilisateur");
    user.innerHTML = "Utilisateur actif : " + elmUser.value;
    var section = document.getElementById("enregistrement");
    section.style.display = "none";
    user.setAttribute("class",socket.id);
    socket.emit('ajouterUtilisateur', {
        id: socket.id,
        user: elmUser.value
    })
}


function deconnecter() {
    socket.emit('deconnection',  {id:socket.id, nom:socket.nom})
  
    
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

function ajouter(personne, id){
    var user = document.getElementById("utilisateur");
    var listeUser = document.createElement("p");
    listeUser.innerHTML = personne;
  // user.innerHTML = "Utilisateur actif : " + personne;
    var element = document.getElementById("list_user");
    var element2 = document.getElementById("chat");
 // element2.appendChild(user);  
  var nomUser =   element.appendChild(listeUser); 
  nomUser.setAttribute("class", id);
   

   
}

function ajouterMessage(user, message, couleur){
    var messageText = document.createElement("p");
    messageText.innerHTML = user + " - " + message;
    var element = document.getElementById("message");
    element.appendChild(messageText);  
    messageText.style.color = couleur;
}





function cacherUser(id){
    var pUser = document.getElementsByClassName(id);
    console.log(pUser);
    pUser[0].parentNode.removeChild(pUser[0]);
   pUser[0].parentNode.removeChild(pUser[0]);
    var login = document.getElementById("utiActif");
    login.style.display = "none";
    
       
}



