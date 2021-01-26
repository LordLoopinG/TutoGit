$(document).ready(function () {

    /*JSON 1 User
    
    var allUsers = {
        users : [{idUser : 1,
                pseudo : "zlatan",
                mdp : "123456"
                },
                {idUser : 2,
                pseudo : "marco",
                mpd : "654321"}]
    }
    
    //JSON 2 Post
    
    var allPosts = {
        posts : [{idPost : 1,
                idAuteur : 1,                    // =idUser
                date : "21/01/2021",
                url : "url de l'image",          //verif a faire lors de la soumission, au moins url ou text (sinon post vide!)
                text : "ceci est mon 1er post",
                likes : [1,3,...,7],             //correspond a l'idUser qui a like
                coms : [{idUser : 2,
                        dateCom : "21/01/2021",
                        contenuCom : "J'adore ton post"}]
        }]
    }
    */

    //Declaration des variables

    //recup de JSON USERS
    var monJsonUsers
    if (!localStorage.getItem("localUsers")) {
        monJsonUsers = {"users": []}
    } else {
        monJsonUsers = JSON.parse(localStorage.getItem("localUsers"))
    }

    //recup de JSON POSTS
    var monJsonPosts
    if (!localStorage.getItem("localPosts")) {
        monJsonPosts = {"posts": []}
    } else {
        monJsonPosts = JSON.parse(localStorage.getItem("localPosts"))
    }

    $("#newUser").click(() => {
        $("#divRegister").show()
        $("#divLogin").hide()
    })

    $("#btnHome").click(()=>{
        location.reload()
    })

    $("#formRegister").submit(function (event) {
        event.preventDefault()
        var pseudo = $("#pseudoRegister").val()
        var MdP = $("#mdpRegister").val()
        var verifMdP = $("#mdpRegister2").val()
        register(pseudo, MdP, verifMdP)
    })

    function register(pseudo, MdP, verifMdP) {
        console.log(pseudo,MdP, verifMdP)
        if (pseudo == "" || MdP == "" || verifMdP == "") {
            alert("Merci de completer tous les champs, bouffon(ne)")
        } else {
            if (monJsonUsers.users.length == 0) {
                if (MdP != verifMdP) {
                    alert("Mot de passe incorrect")
                } else {
                    alert("Inscription terminée. Bienvenu sur meilleur réseau social anomyne. Petit rappel : c'est pas parce c'est anomyme que c'est freestyle, vous êtes responsable de vos publications")
                    newId = 1
                    objNewUser = {"id": newId, "pseudo": pseudo, "MdP": MdP}
                    monJsonUsers.users.push(objNewUser)
                    saveLocalStorage("localUsers", monJsonUsers)
                    toTheWall()
                }
            } else {
                let pseudoExist = false
                let x
                for (x in monJsonUsers.users) {
                    if (pseudo == monJsonUsers.users[x].pseudo) {
                        pseudoExist = true
                        break
                    }
                }
                if (pseudoExist){
                    alert("Le pseudo existe déja, prend un autre")
                }else if (MdP != verifMdP) {
                    alert("Mot de passe incorrecte")
                } else {
                    alert("Inscription terminée. Bienvenu sur meilleur réseau social anomyne. Petit rappel : c'est pas parce c'est anomyme que c'est freestyle, vous êtes responsable de vos publications")
                    newId = monJsonUsers.users[monJsonUsers.users.length - 1].id + 1
                    objNewUser = {"id": newId, "pseudo": pseudo, "MdP": MdP}
                    monJsonUsers.users.push(objNewUser)
                    saveLocalStorage("localUsers", monJsonUsers)
                    toTheWall()
                }
            }
        }
    }

    function saveLocalStorage(local, json) {
        localStorage.setItem(local, JSON.stringify(json))
    }

    function toTheWall() {
        $("#divLogin").html(`<div class="m-auto " id="videoIntro"><video class="modal-fullscreen" id="videoIntro" autoplay>
                            <source src="src/LogoAnim.mp4" type="video/mp4">
                            </video></div>`)
    }

    $("#videoIntro").click(() => {
        $("#divLogin").hide
        $("#divRegister").hide
        $("#container").show

    })

    function login(pseudo, Mdp) {
        $("#formLogin").submit(function (event) {
            event.preventDefault
            if ($("#pseudo").val() == "" || $("#MdP").val() == "") {
                alert("Rempli les 2 champs d'identification, bouffon(e) !")
            } else {
                let X
                for (x in monJsonUsers.users) {
                    let monUser = monJsonUsers.users[x]
                    if ($("#pseudo").val() == monUser.pseudo) {
                        if (($("#MdP").val() == monUser.MdP)) {
                            alert("Content de te revoir " + monUser.pseudo)
                            $("#divLogin").hide()
                            $("#container").show()
                            $("#divProfil").html(monUser.pseudo)
                        } else {
                            alert("Mauvaise identification, essaye encore")
                        }
                    }
                }
            }
        })
    }
})
