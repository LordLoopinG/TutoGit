var btn = document.getElementById("button_DarkMode");
btn.addEventListener("click",  modDark, false);


function modDark() {
    document.body.style.backgroundImage = "url(src/background/fond_9.jpg)";
    document.getElementsByTagName("section").style.backgroundColor = "black";
    document.getElementsByTagName("section").style.color = "white";

}