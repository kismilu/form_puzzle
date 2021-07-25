
var egerX, egerY, Xpoz, Ypoz, XStartPoz, YStartPoz;
var esemeny, aktualis, bd;
var mozgat = false;
var darab1Xpoz, darab1Ypoz, darab2Xpoz, darab2Ypoz,darab3Xpoz, darab3Ypoz,darab4Xpoz, darab4Ypoz;

if (typeof window.addEventListener !== "undefined") {
    window.addEventListener("load", init, true);
} else if (typeof window.attachEvent !== "undefined"){
    window.attachEvent("onload", init);
} else {
    window.onload = init;
}

function init(){
    var keretp = document.getElementById("keret");
    bd = document.getElementsByTagName("body")[0];

    if (typeof keretp.addEventListener !== "undefined") {
        keretp.addEventListener("mousedown", gombLe, true);
        keretp.addEventListener("mouseup", gombFel, true);
        keretp.addEventListener("mousemove", gMozog, true);
        bd.addEventListener("keydown", bMozgat, true);
        bd.addEventListener("keypress", bMozgat, true);
    } else if (typeof keretp.attachEvent !== "undefined"){
        keretp.attachEvent("onmousedown", gombLe);
        keretp.attachEvent("onmouseup", gombFel);
        keretp.attachEvent("onmousemove", gMozog);
        bd.attachEvent("onkeydown", bMozgat);
        bd.attachEvent("onkeypress", bMozgat);
    } else {
        keretp.onmousedown = gombLe;
        keretp.onmouseup = gombFel;
        keretp.onmousemove = gMozog;
        document.onkeydown = bMozgat;
        document.onkeypress = bMozgat;
    }

    //gombLe
}function gombLe(esemeny){
    if (typeof esemeny.target !== "undefined") {
        aktualis = esemeny.target;
    } else if (typeof window.event.srcElement !== "undefined"){
        aktualis = window.event.srcElement; // IE <= 8
    } else {
        aktualis = document.getElementById("keret");
    }
    if (aktualis.className !== "darab")
        aktualis = aktualis.parentNode;
    if (aktualis.className !== "darab") return true;
    mozgat = true;
    egerX = esemeny.clientX;
    egerY = esemeny.clientY;
    Xpoz = parseInt(aktualis.offsetLeft);
    Ypoz = parseInt(aktualis.offsetTop);
    aktualis.style.left = Xpoz + "px";
    aktualis.style.top = Ypoz + "px";
    aktualis.style.zIndex = 2;
    XStartPoz = Xpoz;
    YStartPoz = Ypoz;
    if (typeof esemeny.preventDefault !== "undefined"){
        esemeny.preventDefault();
    } else { return false; }
}

    //gombLe
function gMozog(esemeny){
    var XMozdul, YMozdul;
    if (mozgat===true){
        xx = esemeny.clientX;
        yy = esemeny.clientY;
        XMozdul = xx - egerX;
        YMozdul = yy - egerY;
        Xpoz = XStartPoz + XMozdul;
        Ypoz = YStartPoz + YMozdul;
        aktualis.style.left = Xpoz + "px";
        aktualis.style.top = Ypoz + "px";
        if(typeof window.event.returnValue !== "undefined"){
            window.event.returnValue = false;
        } else { return false; }
    }
}
    //gombFel
function gombFel(esemeny){
    mozgat = false;
    aktualis.style.zIndex = 1;

    igazit();
    ellenoriz();
}
//darabok igazitasa billentyuzettel
function bMozgat(e){
    var bill;
    if (e.keyCode>0){
        bill = e.keyCode;
    } else {
        bill = e.which;
    }
    var deltaX = 0;
    var deltaY = 0;
    switch(bill){
        case 39: deltaX = 1; break;
        case 38: deltaY = -1; break;
        case 37: deltaX = -1; break;
        case 40: deltaY = 1; break;
        case 32: alert("Stop");
    }
    Xpoz = Xpoz + deltaX;
    Ypoz = Ypoz + deltaY;
    aktualis.style.left = Xpoz + "px";
    aktualis.style.top = Ypoz + "px";
    ellenoriz();
}

//tablazathoz valo igazitas, a tablazat poziciojahoz kepest
function igazit(){

    var tablaPoz = document.getElementById("tabla");
    var tablaXpoz = parseInt(tablaPoz.offsetLeft);
    var tablaYpoz = parseInt(tablaPoz.offsetTop);

    if ( aktualis.style.left < tablaXpoz + 160 + "px" && tablaXpoz - 160 + "px" < aktualis.style.left ) {
        if (aktualis.style.top < tablaYpoz + 100 + "px" && tablaYpoz - 100 + "px" < aktualis.style.top ) {
            aktualis.style.left = tablaXpoz + "px";
            aktualis.style.top = tablaYpoz + "px";
        } else if (aktualis.style.top > tablaYpoz + 100 + "px" && aktualis.style.top < tablaYpoz + 500 + "px"){
            aktualis.style.left = tablaXpoz + "px";
            aktualis.style.top = tablaYpoz + 200 + "px";
        }
    }

    if (  tablaXpoz + 160 + "px" < aktualis.style.left && aktualis.style.left < tablaXpoz + 800 + "px" ) {
        if (aktualis.style.top < tablaYpoz + 100 + "px" && aktualis.style.top > tablaYpoz - 100 + "px") {
            aktualis.style.left = tablaXpoz + 320 + "px";
            aktualis.style.top = tablaYpoz + "px";
        } else {
            aktualis.style.left = tablaXpoz  + 320 + "px";
            aktualis.style.top = tablaYpoz + 200 + "px";
        }
    }
}

//az ellenoriz fuggveny ellenorzi hogy a darabok a megfelelo pozicioban vannak-e.
function ellenoriz() {

    var tablaPoz = document.getElementById("tabla");
    var tablaXpoz = parseInt(tablaPoz.offsetLeft);
    var tablaYpoz = parseInt(tablaPoz.offsetTop);

    var darab1Poz = document.getElementById("darab1");
    darab1Xpoz = parseInt(darab1Poz.offsetLeft);
    darab1Ypoz = parseInt(darab1Poz.offsetTop);

    var darab2Poz = document.getElementById("darab2");
    darab2Xpoz = parseInt(darab2Poz.offsetLeft);
    darab2Ypoz = parseInt(darab2Poz.offsetTop);

    var darab3Poz = document.getElementById("darab3");
    darab3Xpoz = parseInt(darab3Poz.offsetLeft);
    darab3Ypoz = parseInt(darab3Poz.offsetTop);

    var darab4Poz = document.getElementById("darab4");
    darab4Xpoz = parseInt(darab4Poz.offsetLeft);
    darab4Ypoz = parseInt(darab4Poz.offsetTop);

    if ( darab1Xpoz === tablaXpoz && darab1Ypoz === tablaYpoz) {
        console.log("kesz1");
    }
    if ( darab2Xpoz === tablaXpoz+320 && darab2Ypoz === tablaYpoz) {
        console.log("kesz2");
    }
    if ( darab3Xpoz === tablaXpoz && darab3Ypoz === tablaYpoz+200) {
        console.log("kesz3");
    }
    if ( darab4Xpoz === tablaXpoz + 320 && darab4Ypoz === tablaYpoz+200) {
        console.log("kesz4");
    }

    if ( darab1Xpoz === tablaXpoz && darab1Ypoz === tablaYpoz && darab2Xpoz === tablaXpoz+320 && darab2Ypoz === tablaYpoz &&
        darab3Xpoz === tablaXpoz && darab3Ypoz === tablaYpoz+200 && darab4Xpoz === tablaXpoz + 320 && darab4Ypoz === tablaYpoz+200){


        //formazott kisméretű ablak mely a kirakott kep utan eltunik 5sec mulva
        document.getElementById("myDIV").style.display="block";
        setTimeout(function(){
            document.getElementById("myDIV").style.display="none";
            window.location.replace("index.html")
        }, 5000);
    }
}