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
        xhttp.open("GET", "http://localhost:3000/predmeti", true);
        xhttp.send();
    } else document.getElementById("nazivLista").innerHTML = nazivi;
}

function ucitajAktivnosti() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Ucitane aktivnosti iz aktivnosti.txt");
        }
    };
    xhttp.open("GET", "http://localhost:3000/aktivnosti", true);
    xhttp.send();
}


function vratiNazive(content) {
    const redoviPodataka = content.split(/\r?,/);
    //console.log(redoviPodataka);
    for (var i = 0; i < redoviPodataka.length; ++i) {
        var podatak = redoviPodataka[i];
        podatak = podatak.split("[").join('');
        podatak = podatak.split("]").join('');
        var obj = JSON.parse(podatak);
        nazivi += '<option value="' + obj.naziv + '" />'; // Storing options in variable
    }
    return nazivi;
}
var uspjesnoDodanaAktivnost = 0,
    uspjesnoDodanPredmet = 0;

function dodajPredmetIAktivnost() {
    dodajPredmet();
    dodajAktivnost();
    if (uspjesnoDodanaAktivnost == 0 && uspjesnoDodanPredmet == 1) {
        izbrisiPredmet();
    } else {
        alert("AKTIVNOST JE USPJEŠNO DODANA!");
    }
}

function izbrisiPredmet() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tekst = xhttp.responseText;
            if (tekst.includes('Uspješno dodan predmet!')) {
                uspjesnoDodanPredmet = 1;
                //console.log(tekst);
            }
        }
    };
    var url = "http://localhost:3000/predmet" + "/" + naziv.valueM
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}

function dodajPredmet() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tekst = xhttp.responseText;
            if (tekst.includes('Uspješno dodan predmet!')) {
                uspjesnoDodanPredmet = 1;
            }
        }
    };
    var n = { naziv: naziv.value };
    xhttp.open("POST", "http://localhost:3000/predmet", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(n));
}


function dodajAktivnost() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tekst = xhttp.responseText;
            if (tekst.includes('Uspješno dodana aktivnost!')) {
                uspjesnoDodanaAktivnost = 1;
            }

        }
    };
    var zahtjev = ucitajZahtjev();
    xhttp.open("POST", "http://localhost:3000/aktivnost", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(zahtjev));
}

function ucitajZahtjev() {
    var n = naziv.value
    var t = tip.options[tip.selectedIndex].value;
    var p = vratiBrojSati(pocetak.value);
    var k = vratiBrojSati(kraj.value);
    var d = dan.options[dan.selectedIndex].value;
    return {
        naziv: n,
        tip: t,
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