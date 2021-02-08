var btn = document.getElementById("button_DarkMode");
btn.addEventListener("click",  modDark, false);

$("#button_DarkMode").click(modDark)

function modDark() {
    document.body.style.backgroundImage = "url(src/background/fond_9.jpg)";
    document.getElementsByTagName("section").style.backgroundColor = "black";
    document.getElementsByTagName("section").style.color = "white";

}