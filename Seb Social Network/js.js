$(document).ready(function () {

    /*JSON 1 User
    
    var allUsers = {
        users : [{id : 1,
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

    $("#btnHome").click(() => {
        location.reload()
    })

    $("#formRegister").submit(function (event) {
        event.preventDefault()
        var pseudo = $("#pseudoRegister").val()
        var MdP = $("#mdpRegister").val()
        var verifMdP = $("#mdpRegister2").val()
        register(pseudo, MdP, verifMdP)
    })

    $("#formLogin").submit(function (event) {
        event.preventDefault()
        var pseudo = $("#pseudoLogin").val()
        var MdP = $("#mdpLogin").val()
        login(pseudo, MdP)
    })

    function register(pseudo, MdP, verifMdP) {
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
                    $("#userNamel").text(pseudo)
                    $("#idConnectUser").text(monUser.id)
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
                if (pseudoExist) {
                    alert("Le pseudo existe déja, prend un autre")
                } else if (MdP != verifMdP) {
                    alert("Mot de passe incorrecte")
                } else {
                    alert("Inscription terminée. Bienvenu sur meilleur réseau social anomyne. Petit rappel : c'est pas parce c'est anomyme que c'est freestyle, vous êtes responsable de vos publications")
                    newId = monJsonUsers.users[monJsonUsers.users.length - 1].id + 1
                    objNewUser = {"id": newId, "pseudo": pseudo, "MdP": MdP}
                    monJsonUsers.users.push(objNewUser)
                    saveLocalStorage("localUsers", monJsonUsers)
                    $("#userName").text(pseudo)
                    $("#idConnectUser").text(monUser.id)
                    toTheWall()
                }
            }
        }
    }

    function login(pseudo, MdP) {
        if (pseudo == "" || MdP == "") {
            alert("Rempli les 2 champs d'identification, bouffon(ne) !")
        } else {
            var pseudoExist = false
            let x
            for (x in monJsonUsers.users) {
                if (pseudo == monJsonUsers.users[x].pseudo) {
                    var monUser = monJsonUsers.users[x]
                    pseudoExist = true
                    break
                }
            }
        }
        if (pseudoExist) {
            if (MdP == monUser.MdP) {
                alert("Content de te revoir " + monUser.pseudo)
                $("#userName").text(monUser.pseudo)
                $("#idConnectUser").text(monUser.id)
                toTheWall()
            } else {
                alert("Mauvaise identification, essaye encore")
                location.reload()
            }
        }
    }

    function saveLocalStorage(local, json) {
        localStorage.setItem(local, JSON.stringify(json))
    }

    function toTheWall() {
        $("#divLogin").show()
        $("#divRegister").hide()
        $("#divLogin").html(`<div class="m-auto" id="videoIntro"><video class="modal-fullscreen" autoplay>
                                <source src="src/LogoAnim.mp4" type="video/mp4">
                                </video></div>`)
        $("#videoIntro").click(() => {
            $("#divLogin").hide()
            $("#container").show()
            affichage()
            allUsers()
        })
    }

    // The Wall

    //Nouveau post
    $("#btnNewPost").click(() => {
        $(".overlay").show()
        $("#container").show()
        //$("#newPostUser").text(user)
    })

    $(".closeMe").click(() => {
        $(".overlay").hide()
        $("#container").show()
    })

    $("#btnUrlOk").click(() => {
        $("#imgNewPost").attr("src", $("#urlNewPost").val())
    })

    $("#validPost").click(Post)

    function Post() {
        var user = $("#userName").text()
        let textNewPost = $("#textNewPost").val()
        let urlNewPost = $("#urlNewPost").val()
        let date = new Date()                   // Attention, faire des manip sur le format
        console.log(date)

        if (textNewPost == "" && urlNewPost == "") {
            alert("Tu postes du vide !!! Recommences")
        }
        if (monJsonPosts.posts.length == 0) {
            var idPost = 1
        } else {
            var idPost = monJsonPosts.posts[monJsonPosts.posts.length - 1].idPost + 1
        }
        var objNewPost = {
            "idPost": idPost,
            "idAuteur": user,
            "url": urlNewPost,
            "text": textNewPost,
            "date" : date,
            "likes": [],
            "coms": []
        }
        monJsonPosts.posts.push(objNewPost)
        localStorage.setItem("localPosts", JSON.stringify(monJsonPosts))
        textNewPost
        $(".overlay").hide()
        $("#container").show()
        affichage()
    }

    //Affichage du Mur
    function affichage(dataId = false) {
        $("#wall").html("")
        if (dataId == false) {
            var user = $("#userName").text()
            $("#wallUser").text(user)
        } else {
            for (i in monJsonUsers.users) {
                let idUser = monJsonUsers.users[i].id
                if (dataId == idUser) {
                    var user = monJsonUsers.users[i].pseudo
                    $("#wallUser").text(user)
                    break
                }
            }
        }
        let x
        for (x in monJsonPosts.posts) {
            var post = monJsonPosts.posts[x]
            if (user == post.idAuteur) {
                let monId = post.idPost
                let monText = post.text
                let monUrl = post.url
                let numberLikes = post.likes.length
                let numberComs = post.coms.length
                let maDate = post.date

                $("#wall").prepend(`
                <div class="border border-5 border-danger mb-5" id=${monId}>
                    <p class="bg-white m-0">Posté le <span>${maDate}</span></p>
                    <p class="bg-white m-0">${monText}</p>
                    <div class="container-md">
                        <img class="img-fluid" src="${monUrl}">
                    </div>
                    <a class="colorWhite col-1"><span>${numberLikes}</span> Like(s)</a>
                    <input type="button" class="col-1 btn-danger btnLikes" value="Like">
                    <a class="col-3 btnComs"><span>${numberComs}</span> commentaire(s)</a>
                    <br>
                </div>`)
            }
        }

        $(".btnLikes").unbind("click",likes)
        $(".btnLikes").click(likes)
        $(".btnComs").unbind("click", commentaires)
        $(".btnComs").click(commentaires)
    }

    //Affichage de tout les users
    function allUsers() {
        let x
        for (x in monJsonUsers.users) {
            let user = monJsonUsers.users[x].pseudo
            let idUser = monJsonUsers.users[x].id
            $("#listAllUsers").prepend(`
                <li class="navigation" data-id="${idUser}">${user}</li>
            `)
        }

        $(".navigation").click(function () {
            var dataId = $(this).attr("data-id")
            affichage(dataId)
        })
    }

    //Gestion des Likes
    function likes() {
        let monId = $(this).parent.id     //ne fonctionne pas
        console.log(monId)
    }

    //Gestion des commentaires
    function commentaires() {

    }

})