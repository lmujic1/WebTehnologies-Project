var naziv, tip, dan;
var pocetak, kraj;
var nazivLista;

window.onload = function() {
    naziv = document.getElementById("naziv");
    nazivLista = document.getElementById("nazivLista");
    tip = document.getElementById("tip");
    pocetak = document.getElementById("pocetak");
    kraj = document.getElementById("kraj");
    dan = document.getElementById("dan");
};

var nazivi = '';
var brojClickNaziv = 0;

function loadDoc() {
    if (brojClickNaziv == 0) {
        brojClickNaziv = 1;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                nazivLista = vratiNazive(this.responseText);
                ucitajAktivnosti();
            }
        };
        xhttp.open("GET", "http://localhost:3000/v2/predmet", true);
        xhttp.send();
    } else document.getElementById("nazivLista").innerHTML = nazivi;
}

function ucitajAktivnosti() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Ucitane aktivnosti iz baze");
        }
    };
    xhttp.open("GET", "http://localhost:3000/v2/aktivnost", true);
    xhttp.send();
}


function vratiNazive(content) {
    const redoviPodataka = JSON.parse(content);
    for (var i = 0; i < redoviPodataka.length; ++i) {
        nazivi += '<option value="' + redoviPodataka[i].naziv + '" />'; // Storing options in variable
    }
    return nazivi;
}

function dodajPredmetIAktivnost() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tekst = xhttp.responseText;
            var p = JSON.parse(tekst)
            var poruka = p.message;
            alert(poruka);
        }
    };
    var zahtjev = ucitajZahtjev();

    xhttp.open("POST", "http://localhost:3000/v2/aktivnost", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(zahtjev));
}


function ucitajZahtjev() {
    var n = naziv.value
    var t = tip.options[tip.selectedIndex].value;
    var p = vratiBrojSati(pocetak.value);
    var k = vratiBrojSati(kraj.value);
    var d = dan.options[dan.selectedIndex].value;

    var nazivAktivnosti = n + " " + t;
    return {
        naziv: nazivAktivnosti,
        predmet: n,
        tip: t,
        grupa: null,
        pocetak: p,
        kraj: k,
        dan: d
    }
}

function vratiBrojSati(sati) {
    var p = sati.split(':');
    var h = Number(p[0]);
    var min = Number(p[1]) / 60;
    h += min;
    return h;
}