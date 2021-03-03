/*A FAIRE :
        fonction : register, login, search, playlist, profil

    barre de lexture Bootstrap :    <figure class="fixed-bottom">  
                                        <audio controls src="src/Ice Cube   Smoke Some Weed Instrumental.mp3"></audio>
                                    </figure>

    BONUS : add mp3
    */

$(document).ready(function () {

    var login = false

    // recup sessionStorage s'il existe, sinon ouvre la modale de Login
    if (!sessionStorage.getItem('sessionUser')) {
        $("#modalLogin").show()
    } else {
        var jsonUser = JSON.parse(sessionStorage.getItem('sessionUser'))
        login = true
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
        var email = $("#myEmail").val()
        var pseudo = $("#myPseudo").val()
        var MdP1 = $("#myPassword1").val()
        var MdP2 = $("#myPassword2").val()

        if (email == "" || pseudo == "" || MdP1 == "" || MdP2 == "") {                      //controle que tous les champs sont remplis
            alert("Merci de remplir tous les champs")
        } else {
            if (MdP1 != MdP2) {                                                             //controle que les 2 mots de passe sont identiques  
                $("#myPassword1").val("")
                $("#myPassword2").val("")
                alert ("Mots de passe différents, veuillez recommencer")
            } else {                                                                        //controle le formet du mot de passe avec la Regex
                MdP = MdP1
                var MdPReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\&\#\-\_\+\=\@\{\}\[\]\(\)])[A-Za-z\d\&\#\-\_\+\=\@\{\}\[\]\(\)]{6,}$/)
                var validMdP = MdPReg.test(MdP)
                if (!validMdP) {
                    alert("Votre mot de passe n'est pas au bon format. Il doit avoir 6 caractères a minimun, au moins un chiffre et un caractére spécial &#{([-_@)]=+}. Merci d'en choisir un à ce format")
                } else {inputRegister = true}
            }
        }
        if (inputRegister == true) {register(email, pseudo, MdP)}
    }  
    

    //Fonction REGISTER
    function register () {
        console.log("Fonction register enclenchée")
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