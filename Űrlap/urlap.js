var check3mod = false;
var urlapv;

if (typeof window.addEventListener != "undefined") {
    window.addEventListener("load", init, true);
} else if (typeof window.attachEvent != "undefined"){
    window.attachEvent("onload", init);
} else {
    window.onload = init;
}

function init(){
    urlapv = document.getElementById("urlap");
    var torolv = document.getElementById("torol");
    szuldatum();
    var evv = document.getElementById("ev");
    if (typeof window.addEventListener != "undefined") {
        urlapv.addEventListener("submit", kuldes, false);
        torolv.addEventListener("click", torles, false);
    } else if (typeof window.attachEvent != "undefined"){
        urlapv.attachEvent("onsubmit", kuldes);
        torolv.attachEvent("onclick", torles);
    } else {
        urlapv.onsubmit = kuldes;
        torolv.onclick = torles;
    }
} // init()

function torles(){
    var tor = confirm("Biztosan mindent törölni akarsz?");
    if (tor) {
        document.getElementById("urlap").reset();
        alert("Most mar mindent visszaallitottam!");
    }
    return tor;
} // torles()

function szuldatum() {
    var szuletesv = document.getElementById("szuletes");
    var balSpan = document.createElement("span");
    balSpan.className = "bal";
    var evek = document.createTextNode("Év: ");
    var evekLabel = document.createElement("label");
    evekLabel.setAttribute("for","ev");
    evekLabel.appendChild(evek);
    balSpan.appendChild(evekLabel);

    var evBr = document.createElement("br");
    balSpan.appendChild(evBr);
    var evSelect = document.createElement("select");
    evSelect.className = "bali";
    evSelect.id = "ev";
    evSelect.name = "ev";
    var evektomb = new Array(2005-1960+1);
    for(i=0;i<evektomb.length; i++){
        evektomb[i] = 0+1960;
    }
    for(i=0; i<evektomb.length; i++){
        var evv = document.createTextNode(evektomb[i]+i);
        var evOpt = document.createElement("option");
        evOpt.className = "evn";
        evOpt.value = i;
        evOpt.appendChild(evv);
        evSelect.appendChild(evOpt);
    }
    balSpan.appendChild(evSelect);
    szuletesv.appendChild(balSpan);
}

function check3elhagy(){
    if (!check3mod){
        check3();
    }
    check3mod = false;
    return false;
}

function check3() {
    var x = document.getElementById("ot");
    var xertek = parseInt(x.value);
    if (isNaN(xertek)) {
        alert("Kérlek számot adj meg!");
        setTimeout(function(){x.focus()}, 100);
        setTimeout(function(){x.select()}, 100);
        return false;
    }
}

function checkb(){
    var checkTomb = getElementsByClass("che");
    var checkTombaMax = checkTomb.length;
    var szamol = 0;
    for (i=0; i < checkTombaMax; i++) {
        if (checkTomb[i].checked) {
            szamol++;
        }
    }
    if (szamol<1){
        alert("A negyedik feladatnál nem jelöltél be semmit sem!");
        return false;
    }
    return true;
}

function kuldes(esemeny){
    var elkuld = true;

    elkuld = elkuld && radio();
    elkuld = elkuld && validateForm();
    elkuld = elkuld && checkb();
    elkuld = elkuld && validateForm2();
    elkuld = elkuld && confirm("Biztosan elküldöd?");
    if(!elkuld){
        if (typeof esemeny.preventDefault != "undefined"){
            esemeny.preventDefault();
        } else if(typeof window.event.returnValue != "undefined"){
            window.event.returnValue = false;
        } else { return false; }
    }
}

function getElementsByClass(classN,node,tag) {
    var classElemek = new Array();
    if (!node) node = document;
    if (!tag) tag = "*";
    var tagok = node.getElementsByTagName(tag);
    var pattern = new RegExp('(^|\\s)'+classN+'(\\s|$)');
    for (i = 0, j = 0; i < tagok.length; i++) {
        if ( pattern.test(tagok[i].className) ) {
            classElemek[j] = tagok[i];
            j++;
        } // if
    } // for
    return classElemek;
}

function validateForm() {
    var empt = urlapv.szoveg.value;
    var empt2 = urlapv.ot.value;

    if (empt == "") {
        alert("A második feladathoz nem írtál semmit sem!");
        return false;
    }

    if (empt2 == ""){
        alert("A harmadik feladathoz nem írtál semmit sem!");
        return false;
    }
    return true;
}

function validateForm2(){
    var holaneved = urlapv.uid.value;
    if (holaneved == ""){
        alert("#holaneved");
        return false;
    }
    return true;
}

function radio(){
    var hetv=0;
    for (var i=0; i < urlapv.het.length; i++) {
        if (urlapv.het[i].checked) {
            hetv++;
        }
    }
    if (hetv<1){
        alert("Az első feladatot üresen hagytad!");
        return false;
    } else {
        return true;
    }
}