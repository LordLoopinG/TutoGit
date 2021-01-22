var monJson = [{nom : "Zlatan",
    niveau : 17,
    PV_max : 100,
    PV_actuel : 100,
    attack : [{
        nom : "coupDeNez",
        puissance : 30,
        type : "feu",
        PP_max : 10,
        PP_actuel : 8,
    },
    {nom : "PowerTir",
        puissance : 50,
        type : "tenebre",
        PP_max : 25,
        PP_actuel : 22,
    },
    {nom : "Missile",
        puissance : 40,
        type : "tenebre",
        PP_max : 25,
        PP_actuel : 22,
    },
    {nom : "Akrobatik",
        puissance : 70,
        type : "tenebre",
        PP_max : 5,
        PP_actuel : 5,
    }],
    statut : "rien",
    dresseur : "PSG",
    KO : false,
    type : "feu",
    },

    { 
        nom : "Steve",
        niveau : 3,
        PV_max : 80,
        PV_actuel : 80,
        attack : [{
            nom : "merdik",
            puissance : 5,
            type : "clochard",
            PP_max : 10,
            PP_actuel : 8
        },
        {nom : "thauvin",
            puissance : 6,
            type : "aLaRue",
            PP_max : 25,
            PP_actuel : 22},
        {nom : "payet",
            puissance : 8,
            type : "aLaRue",
            PP_max : 5,
            PP_actuel : 5}]
        ,
        statut : "rien",
        dresseur : "Olympique Merdik",
        KO : false,
        type : "feu",}
    ] ;

var btnAttack1 = document.getElementById('btnAttack1') ;
var btnAttack2 = document.getElementById('btnAttack2') ;
var btnAttack3 = document.getElementById('btnAttack3') ;
var btnAttack4 = document.getElementById('btnAttack4') ;
var progressZlatan = document.getElementById('progressZlatan') ;
var progressSteve = document.getElementById('progressSteve')

localStorage.setItem("monJson", JSON.stringify(monJson))
var monJson = JSON.parse(localStorage.getItem('monJson'))

progressZlatan.style.width = (monJson[0].PV_actuel / monJson[0].PV_max)*100 +"%"         // init progress barre Zlatan
progressSteve.style.width = (monJson[1].PV_actuel / monJson[1].PV_max)*100 + "%"         // init progress barre Steve


// debut boucle


if ((monJson[0].PV_actuel <=0) || (monJson[1].PV_actuel <=0)) {alert ("Combat impossible, un pokemon est deja mort")} // verifie que les 2 pokemon ont encore de la vie

// Combat de Zlatan Attk 1
btnAttack1.addEventListener("click", function() {          // bouton pour lancer l'attaque
    
    if (monJson[0].attack[0].PP_actuel = 0) {alert("PP vide, selectionnez une autre attaque")}
    else {
    monJson[1].PV_actuel = monJson[1].PV_actuel - monJson[0].attack[0].puissance
    monJson[0].attack[0].PP_actuel = monJson[0].attack[0].PP_actuel - 1
    localStorage.setItem(monJson[0].attack[0].PP_actuel, monJson[1].PV_actuel)
    }
        progressSteve.style.width = (monJson[1].PV_actuel / monJson[1].PV_max)*100 + "%"// Changer la barre de vie
    })

// Combat de Zlatan Attk 2
btnAttack2.addEventListener("click", function() {          // bouton pour lancer l'attaque
    if (monJson[0].attack[0].PP_actuel = 0) {alert("PP vide, selectionnez une autre attaque")}
    else {
    monJson[1].PV_actuel = monJson[1].PV_actuel - monJson[0].attack[1].puissance
    monJson[0].attack[0].PP_actuel = monJson[0].attack[1].PP_actuel - 1
    localStorage.setItem(monJson[0].attack[1].PP_actuel, monJson[1].PV_actuel)
    }
        progressSteve.style.width = (monJson[1].PV_actuel / monJson[1].PV_max)*100 + "%"// Changer la barre de vie
    })

// Combat de Zlatan Attk 3
btnAttack3.addEventListener("click", function() {          // bouton pour lancer l'attaque
    if (monJson[0].attack[0].PP_actuel = 0) {alert("PP vide, selectionnez une autre attaque")}
    else {
    monJson[1].PV_actuel = monJson[1].PV_actuel - monJson[0].attack[2].puissance
    monJson[0].attack[0].PP_actuel = monJson[0].attack[2].PP_actuel - 1
    localStorage.setItem(monJson[0].attack[2].PP_actuel, monJson[1].PV_actuel)
    }
        progressSteve.style.width = (monJson[1].PV_actuel / monJson[1].PV_max)*100 + "%"// Changer la barre de vie
    })

// Combat de Zlatan Attk 4
btnAttack4.addEventListener("click", function() {          // bouton pour lancer l'attaque
    if (monJson[0].attack[0].PP_actuel = 0) {alert("PP vide, selectionnez une autre attaque")}
    else {
    monJson[1].PV_actuel = monJson[1].PV_actuel - monJson[0].attack[3].puissance
    monJson[0].attack[0].PP_actuel = monJson[0].attack[3].PP_actuel - 1
    localStorage.setItem(monJson[0].attack[3].PP_actuel, monJson[1].PV_actuel)
    }
        progressSteve.style.width = (monJson[1].PV_actuel / monJson[1].PV_max)*100 + "%"// Changer la barre de vie
    })

if (monJson[1].PV_actuel <= 0) {alert("Combat gagné par Zlatan")}  // Victoire

//function SteveAttack () {
//    randomValue = Math.floor(Math.random() * Math.floor(1))
//    monJson[0].PV_actuel = monJson[0].PV_actuel - monJson[0].attack[randomValue].puissance
//   monJson[1].attack[randomValue].PP_actuel = monJson[0].attack[randomValue].PP_actuel - 1
//    localStorage.setItem(monJson[0].attack[randomValue].PP_actuel, monJson[0].PV_actuel)
//    }
//        progressZlatan.style.width = (monJson[0].PV_actuel / monJson[10.PV_max)*100 + "%"// Changer la barre de vie
//    })

//if (monJson[0].PV_actuel <= 0) {alert("Combat gagné par Steve")}
//}



//retour boucle
