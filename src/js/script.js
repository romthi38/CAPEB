// Script de changement de couleur
window.addEventListener("load", function(){
    for(var i=0; i<document.getElementsByClassName('couleur').length; i++){
        document.getElementsByClassName('couleur')[i].addEventListener("click", changeColor, false);
        document.getElementsByClassName('couleur')[i].addEventListener("touchstart", changeColor, false);
    }
    
    function changeColor(evenement){
        switch(evenement.target.id) {
            case 'default':
                document.getElementById("stylesheet").setAttribute("href", "default.css");
                break;
            case 'rose':
                document.getElementById("stylesheet").setAttribute("href", "rose.css");
                break;
            case 'vert':
                document.getElementById("stylesheet").setAttribute("href", "vert.css");
                break;
            case 'jaune':
                document.getElementById("stylesheet").setAttribute("href", "jaune.css");
                break;
            default:
                break;
        }
    }
})
