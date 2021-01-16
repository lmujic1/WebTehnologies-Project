var student;
var grupa;
var ispis = "";
var velicina = 0;
var prviPutUcitano = 0;
window.onload = function() {
    student = document.getElementById('student');
    grupa = document.getElementById('grupa');

}

function ucitajGrupe() {
    console.log(prviPutUcitano);
    if (prviPutUcitano == 0) {
        prviPutUcitano = 1;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var rez = xhttp.responseText;
                var grupe = JSON.parse(rez);
                for (var i = 0; i < grupe.length; i++) {
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(grupe[i].naziv));
                    opt.value = grupe[i].naziv;
                    grupa.appendChild(opt);
                }
            }
        };

        xhttp.open("GET", "http://localhost:3000/v2/grupa", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    }
}

function unosStudenta() {
    var studenti = podaciOStudentu();
    velicina = studenti.length;
    for (var i = 0; i < studenti.length; i++) {
        unesi(studenti[i], i);
    }
}

function unesi(student, i) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var tekst = xhttp.responseText;
            var p = JSON.parse(tekst);
            if (p.message != undefined)
                ispis += p.message + '\n';
            if (i == velicina - 1) {
                document.getElementById('student').value = ispis;
            }
        }
    };

    xhttp.open("POST", "http://localhost:3000/v2/student", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(student));
}

function podaciOStudentu() {
    var studenti = [];
    var podaci = (student.value).split('\n');
    for (var i = 0; i < podaci.length; i++) {
        var podatak = podaci[i].split(',');
        var s = {
            ime: podatak[0],
            index: podatak[1],
            grupa: grupa.value
        }
        studenti.push(s);
    }
    console.log(studenti);
    return studenti;
}