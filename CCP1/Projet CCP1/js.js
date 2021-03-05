/*A FAIRE :
        fonction : register, login, deconnexion, search, playlist, profil

    barre de lexture Bootstrap :    <figure class="fixed-bottom">  
                                        <audio controls src="src/Ice Cube   Smoke Some Weed Instrumental.mp3"></audio>
                                    </figure>

    BONUS : add mp3
    */

$(document).ready(function () {

    var myUser
    // recup sessionStorage s'il existe, sinon ouvre la modale de Login
    if (!sessionStorage.getItem("sessionUser")) {
        myUser = {"user": []}
        $("#modalLogin").show()
    } else {
        myUser = JSON.parse(sessionStorage.getItem("sessionUser"))
    }

    // recup les comptes d'utilisateurs du localStorage
    var jsonUsers
    if (!localStorage.getItem("accounts")) {
        jsonUsers = {"users": []}
    } else {
        jsonUsers = JSON.parse(localStorage.getItem("accounts"))
    }
   
    $("#btnRegister").click(function () {
        $("#modalLogin").hide()
        $("#modalRegister").show()
    })

    $("#btnCloseRegister").click(function () {
        $("#modalRegister").hide()		
        $("#modalLogin").show()
    })

    $("#formLogin").submit(function(event) {
        event.preventDefault()
        var pseudo = $("#myID").val()
        var MdP = $("#myPassword").val()
        login(pseudo, MdP)		
    })

    $("#formRegister").submit(function(event) {
        event.preventDefault()
        controleInputRegister()
    })

    $("#deconnex").click(function() {
        sessionStorage.clear()
        location.reload()
    })

    //Fonction Controle des champs du formulaire d'inscription
    function controleInputRegister () {
        var inputRegister = false
        var emailRegister = $("#myEmail").val()
        var pseudoRegister = $("#myPseudo").val()
        var MdP1 = $("#myPassword1").val()
        var MdP2 = $("#myPassword2").val()

        if (emailRegister == "" || pseudoRegister == "" || MdP1 == "" || MdP2 == "") {      //controle que tous les champs sont remplis
            alert("Merci de remplir tous les champs")
        } else {
            if (MdP1 != MdP2) {                                                             //controle que les 2 mots de passe sont identiques  
                $("#myPassword1").val("")
                $("#myPassword2").val("")
                alert ("Mots de passe différents, veuillez recommencer")
            } else {                                                                        //controle le format du mot de passe avec la Regex
                MdPRegister = MdP1
                var MdPReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\&\#\-\_\+\=\@\{\}\[\]\(\)])[A-Za-z\d\&\#\-\_\+\=\@\{\}\[\]\(\)]{6,}$/)
                var validMdP = MdPReg.test(MdPRegister)
                if (!validMdP) {
                    alert("Votre mot de passe n'est pas au bon format. Il doit avoir 6 caractères a minimun, au moins un chiffre et un caractére spécial &#{([-_@)]=+}. Merci d'en choisir un à ce format")
                } else {inputRegister = true}
            }
        }
        if (inputRegister == true) {register(emailRegister, pseudoRegister, MdPRegister)}
    }
    //Fin CONTROLE CHAMPS

    //Fonction REGISTER
    function register (emailRegister, pseudoRegister, MdPRegister) {
        let emailExist = false
        let pseudoExist = false
        var idUser = uuidv4()
        let x
        for (x in jsonUsers.users) {                             //controle que l'email n'est pas deja utilisé
            if (jsonUsers.users[x].email == emailRegister) {
                emailExist = true
                break
            }
            if (jsonUsers.users[x].pseudo == pseudoRegister) {   //controle que le pseudo n'est pas deja utilisé
                pseudoExist = true
                break
            }
            if (jsonUsers.users[x].id == idUser) {               //a reecrire (c tres peu probable que 2 uuidv4 soit deja utilisés, deja 1 c pas de bol, mais c pas secure a 100%)
                idUser = uuidv4()
            }           
        }
        if (emailExist) {
            alert("Email déja utilisé, merci de vous connecter ou d'utiliser un autre email")
        }
        if (pseudoExist) {
            alert("Pseudo déja utilisé, merci d'en choisir un autre")
        }
        if (!emailExist && !pseudoExist) {                      //si l'email et le pseudo ne sont pas utilisé, créé l'utilisateur
            var newUser = {
                "id" : idUser,
                "email" : emailRegister,
                "pseudo" : pseudoRegister,
                "mdp" : MdPRegister,
                "photo" : ""
            }

            //pousse le nouvel utilisateur dans le JSON et l'enregistre dans le localStorage
            jsonUsers.users.push(newUser)   
            localStorage.setItem("accounts", JSON.stringify(jsonUsers))

            //pousse le nouvel utilisateur dans le sessionStorage
            myUser.user.push(newUser)
            sessionStorage.setItem("sessionUser", JSON.stringify(myUser))
            $("#modalRegister").hide()
            alert('Bienvenue à toi '+ pseudoRegister)
        }
    }
    //Fin REGISTER

    //Fonction LOGIN
    function login(pseudo, MdP) {

        if (pseudo == "" || MdP == "") {			//verif que les input pseudo et mot de passe sont rempli
            alert("Merci de remplir les 2 champs")
        } else {
            var pseudoExist = false
            let x									//recherche du pseudo dans le Json
            for (x in jsonUsers.users) {
                if (pseudo == jsonUsers.users[x].pseudo || pseudo == jsonUsers.users[x].email) {	//pseudo OK
                    var monUser = jsonUsers.users[x]
                    console.log(monUser)
                    pseudoExist = true
                    break
                }
            }
        }
        if (pseudoExist) {
            if (MdP == monUser.mdp) {				    //MdP correspond au pseudo
                    alert("Content de vous revoir " + monUser.pseudo)
                    myUser.user.push(monUser)
                    sessionStorage.setItem("sessionUser", JSON.stringify(myUser))   //Stockage de l'user dans le sessionStorage
                    $("#modalLogin").hide()
            } else {
                alert("Mauvaise identification, essayez encore")
                location.reload()
            }
        }
    }
    //Fin LOGIN

    //AFFICHAGE DE TOUS LES TITRES

    $("#btnAffichage").click(function () {
        affichage()
    })

    function affichage() {
        console.log("affichage enclenché")
    var templateTitre = `
    <div class="card">
        <div class="card-body row">
            <div class="col-1 d-flex align-items-center">
                <img src="src/Play-icon.png" class="w-50" alt="play">
            </div>
            <div class="col-2">
                <img src="%imageUrl%" class="w-50" alt="pochetteAlbum">
            </div>
            <div class="col-4 d-flex align-items-center">
                    <h3>%artist%</h3>
            </div>
            <div class="col-5 d-flex align-items-center">
                    <h4>%name%</h4>
            </div>
        </div>
    </div>
    `
    var urlJsonMusique = "https://raw.githubusercontent.com/LordLoopinG/TutoGit/master/CCP1/jsonMusique.json"

        $.getJSON(urlJsonMusique, function (data){
            console.log(data)
            let x
            for (x in data.songs) {
                var titre = templateTitre
                titre = titre.replace(/%imageUrl%/g, data.songs[x].image)
                titre = titre.replace(/%artist%/g, data.songs[x].artist)
                titre = titre.replace(/%name%/g, data.songs[x].name)

        
                $("#accueil").prepend(titre)
            }       
        })
    }   

    //Fin AFFICHAGE


    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }


})