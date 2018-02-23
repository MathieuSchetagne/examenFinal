// Le fichier index.js utilise le module tableau.js

let faireListe = ()=>{
    const tableau = require('./tableau');
    let liste = [];
    for( i=0 ; i<10 ; i++){
            let personne = {};
            personne.prenom =  tableau.prenom[Math.floor(Math.random() * tableau.prenom.length)];
    }
}



let longTabNom = tableau.Nom.length
let longTabPrenom = tableau.tabPrenom.length

...
// fonction locale
const genere_telephone = ()=> {...}

// la fonction à exporter
const peupler_json = ()=> {...}
...

// on exporte la fonction peupler_json
module.exports = peupler_json;