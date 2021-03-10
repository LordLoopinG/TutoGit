/*A FAIRE :
        fonction : register, login, deconnexion, search, playlist, profil

    BONUS : add mp3
    */

$(document).ready(function () {

    affichage()

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

    // recup les listes (Playlists, Favoris) du localStorage
    var jsonLists
    if (!localStorage.getItem("preferences")) {
        jsonLists = {"users": []}
    } else {
        jsonLists = JSON.parse(localStorage.getItem("preferences"))
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

    $("#formSearch").submit(function(event) {
        event.preventDefault()
        var inputSearch = $("#mySearch").val()
        search(inputSearch)
    })

    $("#accueilMenu").click(function () {
        affichage()
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
    
    //Fonction REGISTER
    function register (emailRegister, pseudoRegister, MdPRegister) {
        let emailExist = false
        let pseudoExist = false
        var urlIcon
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

            $("#modalRegister").hide()
            $("#modalProfil").show()

            //choix de l'image de profil
            $(".icon").click(function () {
                urlIcon=$(this).attr("src")
                $("#modalProfil").hide()
            
            var newUser = {
                "id" : idUser,
                "email" : emailRegister,
                "pseudo" : pseudoRegister,
                "mdp" : MdPRegister,
                "photo" : urlIcon
            }

            var newUserPreference = {
                "id" : idUser,
                "playlist" : [{ "id" : "",
                                "name" : "",
                                "songs" : []
                            }],
                "favoris" : []
            }
                
            //pousse le nouvel utilisateur dans le JSON et l'enregistre dans le localStorage
            jsonUsers.users.push(newUser)   
            localStorage.setItem("accounts", JSON.stringify(jsonUsers))

            jsonLists.users.push(newUserPreference)
            localStorage.setItem("preferences", JSON.stringify(jsonLists))


            //pousse le nouvel utilisateur dans le sessionStorage
            myUser.user.push(newUser)
            sessionStorage.setItem("sessionUser", JSON.stringify(myUser))
            
            alert('Bienvenue à toi '+ pseudoRegister)

            })
        }
    }
    
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
                    pseudoExist = true
                    break
                }
            }
        }
        if (pseudoExist) {
            if (MdP == monUser.mdp) {				  //MdP correspond au pseudo
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

    //AFFICHAGE DE TOUS LES TITRES
    function affichage() {
    var templateTitre = `
    <div class="card" id="%id%">
        <div class="card-body row">
            <div class="col-1 d-flex align-items-center">
                <button type="button" class="btn btn-danger btnLecture">Ecouter</button>
            </div>
            <div class="col-2">
                <img src="%imageUrl%" class="w-50" alt="pochetteAlbum">
            </div>
            <div class="col-3 d-flex align-items-center">
                    <h3>%artist%</h3>
            </div>
            <div class="col-4 d-flex align-items-center">
                    <h4>%name%</h4>
            </div>
            <div class="col-1 d-flex align-items-center" id="iconFav">
                <i class="fas fa-heart"></i>
            </div>
            <div class="col-1 d-flex align-items-center">
                <button type="button" class="btn btn-primary btnAddToPlaylist">+</button>
            </div>
        </div>
    </div>
    `

    var urlJsonMusique = "https://raw.githubusercontent.com/LordLoopinG/TutoGit/master/CCP1/jsonMusique.json"

        $.getJSON(urlJsonMusique, function (data){
            let x
            for (x in data.songs) {
                var titre = templateTitre
                titre = titre.replace(/%id%/g, data.songs[x].id)
                titre = titre.replace(/%imageUrl%/g, data.songs[x].image)
                titre = titre.replace(/%artist%/g, data.songs[x].artist)
                titre = titre.replace(/%name%/g, data.songs[x].name)
               
                $(".btnLecture").unbind("click")
                $(".btnLecture").click(lecture)
                $(".btnPlaylist").unbind("click")
                $(".btnPlaylist").click(addToPlaylist)
                $("#accueil").append(titre)
            }       
        })  
    }   

    // PLAYLIST
    $("#btnNewPlaylist").click(function () {
        $("#modalMyPlaylist").hide()
        $("#modalNewPlaylist").show()		
    })

    $("#btnCloseModalMyPlaylist").click(function () {		
        $("#modalMyPlaylist").hide()
    })

    $("#btnCloseModalNewPlaylist").click(function () {
        $("#modalNewPlaylist").hide()		
        $("#modalMyPlaylist").show()
    })

    $("#formNewPlaylist").submit(function(event) {
        event.preventDefault()
        createPlaylist()
    })

    function createPlaylist() {
        
        var newName = $("#inputNamePlaylist").val()
        if (newName == "") {		                	//verif que l'input nom playlist est rempli
            alert("Merci de donner un nom à votre nouvelle playlist")
        } else {
            var monId = myUser.user[0].id
            let x
            for (x in jsonLists.users) {
                if (monId == jsonLists.users[x].id) {
                    var monUser = jsonLists.users[x]      
                }
            }
        }

        let nameOK = true
        let a = 1
        for (a in monUser.playlist) {
            if (newName == monUser.playlist[a].name) {
                    alert("Nom de playlist déja existant")
                    nameOK = false
            }
        }

        if (nameOK) {
            var newObjPlaylist = {  "id" : uuidv4(),
                                        "name" : newName,
                                        "songs" : []
                                    }
            monUser.playlist.push(newObjPlaylist)
            localStorage.setItem("preferences", JSON.stringify(jsonLists))
            afficheMyPlaylist()
            $("#modalNewPlaylist").hide()		
            $("#modalMyPlaylist").show()
        }       
    }   

    function addToPlaylist() {
        $("#modalMyPlaylist").show()
        var idSong = $(this).parent().parent().parent().attr("id")
        afficheMyPlaylist()

        $(".btnPlaylist").click(function() {
            var idPlaylist = $(this).parent().parent().attr("id")
            console.log(idPlaylist)
            var monId = myUser.user[0].id
            let x
            for (x in jsonLists.users) {
                if (monId == jsonLists.users[x].id) {
                    var monUser = jsonLists.users[x]      
                }
            }
            let a
            for (a in monUser.playlist) {
                if (idPlaylist == monUser.playlist[a].id) {
                    var maPlaylist = monUser.playlist[a]
                }
            }
            console.log(idSong)
            maPlaylist.songs.push(idSong)
            localStorage.setItem("preferences", JSON.stringify(jsonLists))
        
            $("#modalMyPlaylist").hide()
            alert("Votre titre a bien été ajouté a la playlist")
        })
    }

    function afficheMyPlaylist () {
        var templatePlaylist = `
            <div class="row m-1" id="%id%">
                <div class="col-1 d-flex align-items-center">
                    <button type="button" class="btn btn-primary btnPlaylist">+</button>
                </div>
                <div class="col-11 d-flex align-items-center">
                    <h5 class="col-8">%namePlaylist%</h5>
                </div>            
            </div>
            `
        var monId = myUser.user[0].id
        $("#myPlaylist").text("")
        let x
        for (x in jsonLists.users) {
            if (monId == jsonLists.users[x].id) {
                var monUser = jsonLists.users[x]      
            }
        }
        let a                                       // BUG a corriger: ne pas afficher la playlist [0] qui est vide, affiche un btn +
        for (a in monUser.playlist) {
            var texte = templatePlaylist
            texte = texte.replace(/%namePlaylist%/g, monUser.playlist[a].name)
            texte = texte.replace(/%id%/g, monUser.playlist[a].id)
            $("#myPlaylist").append(texte)
        }
    }

    
    function search(recherche) {                //Ne fonctionne que si la recherche est exactement identique  au titre ou a l'artiste

        var urlJsonMusique = "https://raw.githubusercontent.com/LordLoopinG/TutoGit/master/CCP1/jsonMusique.json"
        //var exemple = '/"'+recherche+'"/i';
        $.getJSON(urlJsonMusique, function (data) {
            $.each(data.songs, function(key, val) {
               
            if (val.name.search(recherche) !=-1 || val.artist.search(recherche) !=-1) {
                alert(val.name + " de " + val.artist)
            }    
            })      
        })  
    }

    //Fonction LECTURE
    function lecture() {
        var songId = $(this).parent().parent().parent().attr("id")
        var urlJsonMusique = "https://raw.githubusercontent.com/LordLoopinG/TutoGit/master/CCP1/jsonMusique.json"
        var audio = new Audio

        $.getJSON(urlJsonMusique, function (data){
            let x
            for (x in data.songs) {
                if (songId == data.songs[x].id) {
                    var urlSong = data.songs[x].song
                    
                audio.setAttribute("src", urlSong)
                audio.play()
                }
            }       
        })  

        $("#btnPause").click (function() {
            audio.pause()
        })

        $("#btnPlay").click (function() {
            audio.play()
        })

        $("#btnback").click (function() {})
            
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }


})