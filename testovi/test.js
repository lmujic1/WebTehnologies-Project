window.alert = function() {};
let assert = chai.assert;
describe('IscrtajModul', function() {
    describe('iscrtajRaspored(div, dani, satPocetak, satKraj)', function() {
        var div = document.getElementById("div");
        beforeEach(function() {
            if (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        });
        it('Kreiranje rasporeda od 7 kolona kada su parametri 9 i 12', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 12);
            let table = div.getElementsByTagName("table")[0];
            let tr = table.getElementsByTagName("tr")[1];
            var brojKolona = tr.cells.length;
            assert.equal(brojKolona, 7, "Broj kolona treba biti 7");
        });
        it('Kreiranje rasporeda od 6 redova', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 12);
            let table = div.getElementsByTagName("table")[0];
            let brojRedova = table.rows.length;
            assert.equal(brojRedova, 6, "Broj redova treba biti 3");
        });
        it('Test - pogrešno uneseno vrijeme (početak veći od kraja)', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 15, 9);
            assert.equal(div.innerHTML, "Greška", "Potrebno je unijeti ispravno vrijeme");
        });
        it('Test - pogrešno uneseno vrijeme (neispravan format)', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 0.5, 9);
            assert.equal(div.innerHTML, "Greška", "Potrebno je unijeti ispravno vrijeme");
        });
        it('Test - pogrešno uneseno vrijeme (nevalidni sati)', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 0, 25);
            assert.equal(div.innerHTML, "Greška", "Potrebno je unijeti ispravno vrijeme");
        });
        it('Test - pogrešno uneseno vrijeme (negativni sati)', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], -7, 13);
            assert.equal(div.innerHTML, "Greška", "Potrebno je unijeti ispravno vrijeme");
        });
        it('Test - prikaz zadnjeg sata u tabeli', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 7, 23);
            var table = div.getElementsByTagName("table")[0];
            var rows = table.getElementsByTagName("tr");
            assert.equal(rows[0].lastChild.innerHTML, "", "Zadnji sat u tabeli se ne prikazuje");
        });
        it('Test - prikaz neparnih sati prije 12:00', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 24);
            var table = div.getElementsByTagName("table")[0];
            var row = table.getElementsByTagName("tr")[0];
            assert.equal(row.cells[2].innerHTML, "", "Zadnji sat u tabeli se ne prikazuje");
        });
        it('Test - prikaz parnih sati prije 12:00', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 24);
            var table = div.getElementsByTagName("table")[0];
            var row = table.getElementsByTagName("tr")[0];
            assert.equal(row.cells[2].innerHTML, "", "Zadnji sat u tabeli se ne prikazuje");
        });
        it('Test - prikaz 14:00', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            var table = div.getElementsByTagName("table")[0];
            var row = table.getElementsByTagName("tr")[0];
            var vel = row.cells.length;
            assert.equal(row.cells[vel - 1].innerHTML, "", "14:00 se ne prikazuje u rasporedu");
        });
        it('Test - prikaz 13:00', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            var table = div.getElementsByTagName("table")[0];
            var row = table.getElementsByTagName("tr")[0];
            var vel = row.cells.length;
            assert.equal(row.cells[vel - 2].innerHTML, "", "13:00 se ne prikazuje u rasporedu");
        });
    });
    describe('dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan)', function() {
        beforeEach(function() {
            if (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        });
        it('Test - raspored nije kreiran', function() {
            //var div = document.createElement("div");
            let greska = IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 13, 15, "Ponedjeljak");
            assert.equal(greska, "Greška - raspored nije kreiran", "Raspored treba biti kreiran");
        });
        it('Test - nevalidan dan', function() {
            // var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            let greska = IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 13, 15, "PonedjeljakKK");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Nema podudaranja dana niti sa jendim danom u rasporedu");
        });
        it('Test - neispravno vrijeme (vrijemePocetak >= vrijemeKraj)', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            let greska = IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 15, 15, "Ponedjeljak");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Vrijeme početka ne može biti jednako vremenu kraja aktivnosti");
        });
        it('Test - neispravno vrijeme (vrijemePocetak >= vrijemePocetakRaspored)', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            let greska = IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 9, 15, "Ponedjeljak");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Vrijeme početka aktivnsoti ne može biti prije vremena početka rasporeda");
        });
        it('Test - neispravno vrijeme (vrijemeKraj >= vrijemeKrajRaspored)', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            let greska = IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 10, 16, "Ponedjeljak");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Vrijeme kraja aktivnsoti ne može biti nakon vremena kraja rasporeda");
        });
        it('Test - potpuno preklapanje dvije aktivnosti', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            IscrtajModul.dodajAktivnost(div, "RPR", "predavanje", 11, 14, "Ponedjeljak");
            let greska = IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 11, 14, "Ponedjeljak");
            assert.equal(greska, "Greška - već postoji termin u rasporedu u zadanom vremenu", "Ne smije biti preklapanja aktivnosti");
        });
        it('Test - djelimično preklapanje dvije aktivnosti', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            IscrtajModul.dodajAktivnost(div, "RPR", "predavanje", 11, 14, "Ponedjeljak");
            let greska = IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 13, 14.5, "Ponedjeljak");
            assert.equal(greska, "Greška - već postoji termin u rasporedu u zadanom vremenu", "Ne smije biti preklapanja aktivnosti");
        });
        it('Test - jedna aktivnost tokom čitavog  dana', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            IscrtajModul.dodajAktivnost(div, "RPR", "predavanje", 10, 15, "Ponedjeljak");
            var table = div.getElementsByTagName("table")[0];
            var row = table.getElementsByTagName("tr")[1];
            var pred = row.cells[1].innerHTML;
            var pred2 = row.lastChild.innerHTML;
            assert.equal(pred, pred2, "Predavanje treba biti dodano");
        });
        it('Test - dodavanje aktivnosti na početak rasporeda', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 10, 13, "Ponedjeljak");
            var table = div.getElementsByTagName("table")[0];
            var row = table.getElementsByTagName("tr")[1];
            assert.equal(row.cells[1].innerHTML, "<div>WT<br>predavanje</div>", "Predavanje treba biti dodano");
        });
        it('Test - dodavanje aktivnosti na kraj rasporeda', function() {
            //var div = document.createElement("div");
            IscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 15);
            IscrtajModul.dodajAktivnost(div, "WT", "predavanje", 13, 15, "Ponedjeljak");
            var table = div.getElementsByTagName("table")[0];
            var row = table.getElementsByTagName("tr")[1];
            assert.equal(row.lastChild.innerHTML, "<div>WT<br>predavanje</div>", "Predavanje treba biti dodano");
        });

    });

});