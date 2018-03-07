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
    });
}
/* ---------------------------------------------------------- */
function enregistrement() {
    var elmUser = document.querySelector('#enregistrement input')
    console.log(elmUser.value)

    socket.emit('ajouterUtilisateur', {
        user: elmUser.value
    })
}

function ajouter(personne){
    var user = document.createElement("p");
    user.innerHTML = personne;
    var element = document.getElementById("list_user");
    element.appendChild(user);  
}

