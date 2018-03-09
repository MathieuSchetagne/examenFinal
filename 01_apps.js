
const express = require('express');
const app = express();
const fs = require('fs');
const server = require('http').createServer(app);
const io = require('./mes_modules/socket.io').listen(server);
app.set('view engine', 'ejs'); 
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));
const ObjectID = require('mongodb').ObjectID;
var util = require("util");



////////////////// i18n /////////////////////

const i18n = require('i18n');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
i18n.configure({ 
    locales : ['fr', 'en'],
    cookie : 'langueChoisie', 
    directory : __dirname + '/locales' }
)

    app.use(i18n.init);
   

//////////////////////////////////////

var db // variable qui contiendra le lien sur la BD

app.set('view engine', 'ejs');

const peupler = require('./mes_modules/peupler');

////////////////// CHANGEMENT DE LANGUE /////////////////////


app.get('/:locale(en|fr)', (req,res) => {

    console.log("req.params.local + " + req.params.locale)

    res.cookie('langueChoisie', req.params.locale);

    res.setLocale(req.params.locale)
   
    console.log(res.__('prenom'));

    res.redirect(req.headers.referer);
})
////////////////// PEUPLER /////////////////////

app.get('/peupler', (req,res) => {

    let resultat = peupler(); 
    console.log('début boucle')
    db.collection('adresse').insert(resultat, (err, result) => {
        if (err) return console.log(err);
        res.redirect('/');
        })
})


////////////////// FORMULAIRE /////////////////////

app.get('/formulaire', (req, res) => {
    res.sendFile(__dirname + '/public/html' + "/01_html.htm")
})

////////////////// ACCUEIL /////////////////////

app.get('/accueil', (req, res) => {
    res.sendFile(__dirname + '/public/html' + "/02_html.htm")
})

////////////////// VIDER /////////////////////

app.get('/vider', (req, res) => {
    db.collection('adresse').drop((err,result) =>{
        if (err) return console.log(err);
    res.redirect('/');
    })

})

////////////////// CHAT /////////////////////

app.get('/chat', (req, res) => {
  
    res.render('clavarder.ejs', {message : ""})
   

})


////////////////// AJOUTER /////////////////////

app.post('/ajouter', (req, res) => {
    db.collection('adresse').save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.redirect('/');
    })
})

////////////////// AJOUTER AJAX /////////////////////

app.post('/ajax_ajouter', (req, res) => {
    console.log('dasda');
    db.collection('adresse').save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.send(JSON.stringify(req.body));
    })
})

////////////////// RECHERCHER /////////////////////

app.post('/rechercher', (req, res) => {

    db.collection('adresse').find( {prenom: req.body.prenom} ).toArray((err, resultat) => {

        if (err) return console.log(err)
        res.render('gabarit.ejs', {adresses: resultat, ordre:'asc'})  
    }) 
   
})

////////////////// PROFIL /////////////////////

app.get('/profil/:id', (req, res) => {

    db.collection('adresse').find( {_id: ObjectID(req.params.id)} ).toArray((err, resultat) => {

        if (err) return console.log(err)
        res.render('profil.ejs', {adresses: resultat[0], ordre:'asc'})  
    }) 
})


////////////////// MODIFIER /////////////////////

app.post('/modifier', (req,res) =>{

        console.log(req.body);

        if (req.body['_id'] != undefined){ 
        console.log('sauvegarde') 
        var oModif = {
        "_id": ObjectID(req.body['_id']), 
        nom: req.body.nom,
        prenom:req.body.prenom, 
        telephone:req.body.telephone,
        courriel:req.body.courriel
        }

    db.collection('adresse').save(oModif, (err, result) => {
        if (err) return console.log(err)
        console.log('sauvegarder dans la BD')
        res.redirect('/')
        })
    }
})

////////////////// MODIFIER AJAX /////////////////////

app.post('/ajax_modifier', (req,res) =>{
    
    if (req.body['_id'] != undefined){ 
        console.log('sauvegarde') 
        var oModif = {
        "_id": ObjectID(req.body['_id']), 
        nom: req.body.nom,
        prenom:req.body.prenom, 
        telephone:req.body.telephone,
        courriel:req.body.courriel
        }

    db.collection('adresse').save(oModif, (err, result) => {
        if (err) return console.log(err)
        console.log('sauvegarder dans la BD')
        res.send(JSON.stringify(req.body))
        })
    }

   
})

////////////////// DÉTRUIRE /////////////////////

app.get('/detruire/:_id', (req, res) => {

    db.collection('adresse').findOneAndDelete( {_id: ObjectID(req.params._id)} ,(err, resultat) => {

        if (err) return console.log(err)

        res.redirect('/');
    }) 
})

////////////////// DÉTRUIRE AJAX /////////////////////

app.post('/ajax_detruire', (req, res) => {


    db.collection('adresse').findOneAndDelete( {_id: ObjectID(req.body._id)} ,(err, resultat) => {

        if (err) return console.log(err)

        res.send(JSON.stringify(req.body));
    }) 
})

////////////////// TRIER /////////////////////

app.get('/trier/:clef/:ordre', (req, res) => {

    let clef = req.params.clef
    let ordre = (req.params.ordre == 'asc' ? 1 : -1)
    let cursor = db.collection('adresse').find().sort(clef,ordre).toArray(function(err, resultat){

        if (err) return console.log(err)
        ordre = (req.params.ordre == 'asc' ? 'des' : 'asc');
        res.render('gabarit.ejs', {adresses: resultat, clef, ordre:ordre});
    })
})

////////////////// ADRESSES /////////////////////

app.get('/',  (req, res) => {

    console.log(req.cookies.langueChoisie);
    console.log(res.__('prenom'));

    var cursor = db.collection('adresse')
    .find().toArray(function(err, resultat){
    if (err) return console.log(err)
    // transfert du contenu vers la vue index.ejs (renders)
    // affiche le contenu de la BD           
    res.render('gabarit.ejs', {adresses: resultat, ordre:'asc'})  
    });
})

////////////////// CONNECTION /////////////////////

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse');
// lancement du serveur Express sur le port 8081
 server.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})

