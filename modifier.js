
let boutons = document.querySelectorAll('.modifier');

console.log(boutons);

for(bouton of boutons){
    bouton.addEventListener('click', function(){

let laLigne = this.parentNode.parentNode
let id = laLigne.children[0].innerHTML
let nom = laLigne.children[1].innerHTML
let prenom = laLigne.children[2].innerHTML
let telephone = laLigne.children[3].innerHTML
console.log(laLigne);

//let elmForm = document.getElementById('mon_formulaire')
//console.log(elmForm.tagName)
//let elmInput = elmForm.querySelectorAll('input')
//elmInput[0].value = id
//elmInput[1].value = nom
//elmInput[2].value = prenom
//elmInput[3].value = telephone

//elmForm.submit()

    })
}


