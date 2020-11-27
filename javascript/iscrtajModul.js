let IscrtajModul = (function() {
    var pocetak, kraj, brojKolona;

    let iscrtajRaspored = function(div, dani, satPocetak, satKraj) {
        div.className = "okvir";
        if (!Number.isInteger(satPocetak) || !Number.isInteger(satKraj) || satPocetak >= satKraj || satPocetak < 0 || satPocetak >= 24 || satKraj <= 0 || satKraj > 24) {
            div.textContent = "Greška";
        } else {
            pocetak = satPocetak;
            kraj = satKraj;

            var table = document.createElement("table");
            var numRow = dani.length + 1;
            var numCol = (satKraj - satPocetak) * 2 + 1;

            brojKolona = numCol;

            var d = 0;
            var pomocniSat = satPocetak;


            for (let i = 1; i <= numRow; i++) {
                var tr = document.createElement("tr");
                for (let j = 1; j <= numCol; j++) {
                    var th = document.createElement("th");
                    if (i == 1) {
                        th.className = "vrijeme"
                        1;
                        if (pomocniSat < 14 && (j % 2 == 1 && pomocniSat % 2 == 0)) {
                            th.colSpan = "2";
                            var hour = dajSateString(pomocniSat);
                            th.textContent = hour;
                            j++;
                        } else if (pomocniSat > 14 && (j % 2 == 1 && pomocniSat % 2 == 1) && j < numCol) {
                            th.colSpan = "2";
                            var hour = dajSateString(pomocniSat);
                            th.textContent = hour;
                            j++;
                        }
                    } else {
                        if (j == 1) {
                            th.textContent = dani[d];
                            d++;
                        }
                    }
                    tr.appendChild(th);
                    if (j % 2 == 0) pomocniSat++;
                }
                table.appendChild(tr);
            }
            div.appendChild(table);
        }
    }

    let dodajAktivnost = function(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
        if (!raspored || raspored.getElementsByTagName("table").length == 0) {
            alert("Greška - raspored nije kreiran");
            return ("Greška - raspored nije kreiran");
        } else {
            var table = raspored.getElementsByTagName('table')[0];
            var numRow = table.rows.length;

            //pronađi koji je dan
            var radniRed;
            for (var i = 1; i < numRow; i++) {
                var r = table.rows[i];
                if (r.cells[0].innerHTML === dan) {
                    radniRed = table.rows[i];
                    break;
                }
            }
            if (!radniRed || vrijemePocetak < pocetak ||
                vrijemePocetak > kraj || vrijemeKraj <= vrijemePocetak ||
                vrijemeKraj > kraj || vrijemeKraj < pocetak) {
                alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
                return "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
            }

            var start = (vrijemePocetak - pocetak) * 2 + 1;
            var end = (vrijemeKraj - pocetak) * 2 + 1;
            var numColspan = (vrijemeKraj - vrijemePocetak) * 2;

            //dodaj aktivnost
            var div = document.createElement("div");
            div.innerHTML = naziv + "<br>" + tip;

            for (var j = 1; j < brojKolona; j++) {
                console.log(j + "j + " + start + "start");
                if (radniRed.cells[j].colSpan != 1) {
                    if ((j == start || (j + radniRed.cells[j].colSpan > start)) && radniRed.cells[j].innerHTML != "") {
                        alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
                        return "Greška - već postoji termin u rasporedu u zadanom vremenu";
                    } else start -= radniRed.cells[j].colSpan - 1;
                }
                if (j == start) {
                    if (radniRed.cells[j].innerHTML != "") {
                        alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
                        return "Greška - već postoji termin u rasporedu u zadanom vremenu";
                    } else {
                        radniRed.cells[j].className = "rasp";
                        radniRed.cells[j].colSpan = numColspan;
                        radniRed.cells[j].appendChild(div);
                        if (imaAktivnostPoslije(radniRed, j + 1)) {
                            ispraviNakonDodavanjaAktivnosti(raspored, i, j);
                            izbrisiKolone(radniRed, numColspan);
                        } else {
                            izbrisiKolone(radniRed, numColspan);
                            ispraviNakonDodavanjaAktivnosti(raspored, i, j);
                        }
                        break;
                    }
                }
            }
        }
    }
    let imaAktivnostPoslije = function(red, poz) {
        for (var i = poz; i < red.cells.length; i++) {
            if (red.cells[i].innerHTML != "")
                return true;
        }
        return false;
    }

    let izbrisiKolone = function(red, numColspan) {
        var vel = red.cells.length;
        for (var i = vel - 1; i > vel - numColspan; i--) {
            if (red.cells[i].innerHTML != "") {
                numColspan++;
            } else
                red.deleteCell(i);
        }
    }

    let ispraviNakonDodavanjaAktivnosti = function(raspored, brojReda, brojKolone) {
        var table = raspored.getElementsByTagName('table')[0];
        var redovi = table.getElementsByTagName('tr')[brojReda];

        var brojKol = redovi.cells.length;

        for (var i = brojKolone; i < brojKol; i++) {
            if (i % 2 == 0) {
                if (redovi.cells[i].colSpan != 1) {
                    if (redovi.cells[i].colSpan % 2 == 0) {
                        redovi.cells[i].style.borderRight = "1px dashed black";
                        redovi.cells[i].style.borderLeft = "1px dashed black";
                    } else {
                        redovi.cells[i].style.border = "1px dashed black";
                    }
                } else {
                    if (brojKol % 2 == 0) {
                        redovi.cells[i].style.border = "1px solid black";
                        redovi.cells[i].style.borderRight = "1px dashed black";
                    } else {
                        redovi.cells[i].style.border = "1px solid black";
                        redovi.cells[i].style.borderLeft = "1px dashed black";
                    }
                }
            } else {
                if (redovi.cells[i].colSpan != 1) {
                    if (redovi.cells[i].colSpan % 2 == 0) {
                        redovi.cells[i].style.borderRight = "1px solid black";
                    } else {
                        //redovi.cells[i].style.borderRight = "4px solid black";
                        redovi.cells[i].style.borderLeft = "1px dashed black";
                    }
                } else {
                    if (brojKol % 2 == 0) {
                        redovi.cells[i].style.borderLeft = "1px dashed black";
                        redovi.cells[i].style.borderRight = "1px solid black";
                    } else {

                        redovi.cells[i].style.border = "1px solid black";
                        redovi.cells[i].style.borderRight = "1px dashed black";

                    }
                }
            }
        }
    }

    let dajSateString = function(h) {
        if (h < 10) return "0" + h.toString() + ":00";
        return h.toString() + ":00";
    }
    return {
        iscrtajRaspored: iscrtajRaspored,
        dodajAktivnost: dodajAktivnost,
    }
}());