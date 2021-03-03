/*A FAIRE :
        fonction : register, login, search, playlist, profil

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

    var jsonUsers
    if (!localStorage.getItem("accounts")) {
        jsonUsers = {"user": []}
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

    //Controle des champs du formulaire d'inscription
    function controleInputRegister () {
        var inputRegister = false
        var emailRegister = $("#myEmail").val()
        var pseudoRegister = $("#myPseudo").val()
        var MdP1 = $("#myPassword1").val()
        var MdP2 = $("#myPassword2").val()

        if (emailRegister == "" || pseudoRegister == "" || MdP1 == "" || MdP2 == "") {                      //controle que tous les champs sont remplis
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

    //Fonction REGISTER
    function register (emailRegister, pseudoRegister, MdPRegister) {
        let emailExist = false
        let pseudoExist = false
        var idUser = uuidv4()
        let x
        for (x in jsonUsers.user) {
            if (jsonUsers.user[x].email == emailRegister) {
                emailExist = true
                break
            }
            if (jsonUsers.user[x].pseudo == pseudoRegister) {
                pseudoExist = true
                break
            }
            if (jsonUsers.user[x].id == idUser) {               //a reecrire (c tres peu probable que 2 uuidv4 soit deja utilisés, deja 1 c pas de bol, mais c pas secure a 100%)
                idUser = uuidv4()
            }           
        }
        if (emailExist) {
            alert("Email déja utilisé, merci de vous connecter ou d'utiliser un autre email")
        }
        if (pseudoExist) {
            alert("Pseudo déja utilisé, merci d'en choisir un autre")
        }
        if (!emailExist && !pseudoExist) {
            var newUser = {
                id : idUser,
                email : emailRegister,
                pseudo : pseudoRegister,
                mdp : MdPRegister,
            }

            jsonUsers.user.push(newUser)
            myUser.user.push(newUser)
            localStorage.setItem("accounts", JSON.stringify(jsonUsers))
            sessionStorage.setItem("sessionUser", JSON.stringify(myUser))
            $("#modalRegister").hide()
            alert('Bienvenue à toi '+ pseudoRegister)

        }
    }

    //Fin REGISTER

    //Fonction LOGIN

    //Fin Login

    

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

})