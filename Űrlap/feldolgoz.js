window.onload = feldolgoz;

function feldolgoz(){
    adatsor = "";
    kif = document.location.search;
    kif = kif.slice(1);
    szk = /\+/g;
    kif = kif.replace(szk," ");
    t = kif.split("&");
    var b = 0;

    for(var i=0; i<t.length;i++){
        t[i] = t[i].split("=");
        for(var j=0; j<t[i].length;j++){
            t[i][j] = unescape(t[i][j]);
            b = i;

        }
    }

    t[1][1] = parseInt(t[1][1]) + 1960;
    var kor = 2018 - parseInt(t[1][1]);
    valasz1p = document.getElementById("valasz1");
    valasz2p = document.getElementById("valasz2");
    valasz3p = document.getElementById("valasz3");
    valasz4p = document.getElementById("valasz4");

    document.getElementById("AdatKiir").innerHTML = adatsor;
    document.getElementById("neve").innerHTML = "Név: "+t[0][1];
    document.getElementById("kora").innerHTML = "Kor: "+ kor;

    //1. feladat
    var valasz1 = parseInt(t[2][1]);
    if (valasz1 == 7) { valasz1p.style.color = "#080";}
    else { valasz1p.style.color = "#F00";}
    document.getElementById("valasz1").innerHTML = "A megadott válasz: "+ t[2][1];

    //2. feladat
    if (t[3][1]=="kommutativitás") {
        valasz2p.style.color = "#080";
        document.getElementById("valasz2").innerHTML = "A megadott válasz: kommutativitás";
    } else {
        valasz2p.style.color = "#F00";
        document.getElementById("valasz2").innerHTML = "A megadott válasz: " + t[3][1];
    }

    //3. feladat
    var valasz3 = parseInt(t[4][1]);
    if (valasz3 == 5) { valasz3p.style.color = "#080";}
    else { valasz3p.style.color = "#F00"; }
    document.getElementById("valasz3").innerHTML = "A megadott válasz: "+ t[4][1];


    //4. feladat
    if ( b==5 ) {
        valasz4p.style.color = "#F00";
        document.getElementById("valasz4").innerHTML = "A megadott válasz: "+ t[5][0];
    } else if ( b==6) {
        if (t[5][0] == "RacionalisSzamok" && t[6][0] == "EgeszSzamok") {
            valasz4p.style.color = "#080";
            document.getElementById("valasz4").innerHTML = "A megadott válasz: "+ t[5][0] + ", " + t[6][0];
        } else {
            valasz4p.style.color = "#F00";
            document.getElementById("valasz4").innerHTML = "A megadott válasz: "+ t[5][0] + ", " + t[6][0];
        }
    } else if ( b==7 ) {
        valasz4p.style.color = "#F00";
        document.getElementById("valasz4").innerHTML = "A megadott válasz: "+ t[5][0] + ", " + t[6][0] + ", " + t[7][0];
    }


}
