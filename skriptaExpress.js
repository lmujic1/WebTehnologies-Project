const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/predmeti', function(req, res) {
    const fs = require('fs');
    var predmeti = [];
    fs.readFile('predmeti.txt', 'utf8', function(err, data) {
        if (err) throw err;
        else {

            const redoviPodataka = data.split(/\r?\n/);
            for (let i = 0; i < redoviPodataka.length; i++) {
                var podatak = redoviPodataka[i].split(",");
                let predmet = {
                    naziv: podatak[0]
                };
                predmeti.push(predmet);
            }
            res.json(predmeti);
        }
    });

});

app.get('/aktivnosti', function(req, res) {
    const fs = require('fs');
    var aktivnosti = [];
    fs.readFile('aktivnosti.txt', 'utf8', function(err, data) {
        if (err) throw err;
        else {
            const redoviPodataka = data.split(/\r?\n/);
            for (let i = 0; i < redoviPodataka.length; i++) {
                var podatak = redoviPodataka[i].split(",");
                let aktivnost = {
                    naziv: podatak[0],
                    tip: podatak[1],
                    pocetak: podatak[2],
                    kraj: podatak[3],
                    dan: podatak[4]
                };
                aktivnosti.push(aktivnost);
            }
            res.json(aktivnosti);
        }
    });
});

app.get('/predmet/:naziv/aktivnost', function(req, res) {
    var naziv1 = req.params["naziv"];
    const fs = require('fs');
    var aktivnosti = [];
    fs.readFile('aktivnosti.txt', 'utf8', function(err, data) {
        if (err) throw err;
        else {
            const redoviPodataka = data.split(/\r?\n/);
            for (let i = 0; i < redoviPodataka.length; i++) {
                var podatak = redoviPodataka[i].split(",");
                if (podatak[0] == naziv1) {
                    let aktivnost = {
                        naziv: podatak[0],
                        tip: podatak[1],
                        pocetak: podatak[2],
                        kraj: podatak[3],
                        dan: podatak[4]
                    };
                    aktivnosti.push(aktivnost);
                }
            }
            res.json(aktivnosti);
        }
    });

});

app.post('/predmet', function(req, res) {
    let tijelo = req.body;
    var naziv = tijelo["naziv"];
    let novaLinija = "\n" + tijelo["naziv"];
    const fs = require('fs');
    fs.readFile('predmeti.txt', 'utf8', function(err, data) {
        if (err) throw err;
        else {
            const redoviPodataka = data.split(/\r?\n/);
            for (let i = 0; i < redoviPodataka.length; i++) {
                var podatak = redoviPodataka[i].split(",");
                if (podatak[0] == naziv) {
                    res.json({ message: "Naziv predmeta postoji!" });
                }
            }
        }
    });
    fs.appendFile('./predmeti.txt', novaLinija, function(err) {
        if (err) throw err;
        res.json({ message: "Uspješno dodan predmet!" })
    });
});

app.post('/aktivnost', function(req, res) {
    let tijelo = req.body;
    let novaLinija = "\n" + tijelo["naziv"] + "," + tijelo["tip"] + "," + tijelo["pocetak"] + "," + tijelo["kraj"] + "," + tijelo["dan"];
    let pocetak = tijelo["pocetak"];
    let kraj = tijelo["kraj"];
    let dan = tijelo["dan"];
    const fs = require('fs');

    fs.readFile('aktivnosti.txt', 'utf8', function(err, data) {
        var validna = 1;
        if (err) throw err;
        else {

            const redoviPodataka = data.split(/\r?\n/);
            for (let i = 0; i < redoviPodataka.length; i++) {
                var podatak = redoviPodataka[i].split(",");
                if (!(((pocetak < podatak[2] && pocetak < podatak[3] && kraj <= podatak[2]) ||
                        ((pocetak > podatak[2] && pocetak >= podatak[3] && kraj > podatak[2]))) && pocetak != kraj) && podatak[4] == dan) {
                    validna = 0;
                }
            }

            if (validna == 0) res.json({ message: "Aktivnost nije validna!" });
            else {
                fs.appendFile('./aktivnosti.txt', novaLinija, function(err) {
                    if (err) throw err;
                    res.json({ message: "Uspješno dodana aktivnost!" })
                });
            }
        }
    });


});


app.delete('/aktivnost/:naziv', function(req, res) {
    let naziv = req.params["naziv"];
    const fs = require('fs');
    fs.readFile('aktivnosti.txt', 'utf8', function(err, data) {
        if (err) throw err;
        else {
            const redoviPodataka = data.split(/\r?\n/);
            for (let i = 0; i < redoviPodataka.length; i++) {
                var podatak = redoviPodataka[i].split(",");
                if (podatak[0] == naziv) {
                    redoviPodataka.splice(i, 1);
                    if (i != 0) i--;
                }
            }

            var writeToAktivnosti = "";
            for (var i = 0; i < redoviPodataka.length; i++) {
                if (redoviPodataka[0].length > 2) {
                    writeToAktivnosti += redoviPodataka[i] + "\n";
                }
            }

            fs.writeFile('aktivnosti.txt', writeToAktivnosti, function(err) {
                if (err) res.json({ message: "Greška - aktivnost nije obrisana!" });
                else res.json({ message: "Uspješno obrisana aktivnost!" });
            });
        }
    });
});

app.delete('/predmet/:naziv', function(req, res) {
    let naziv = req.params["naziv"];
    const fs = require('fs');
    fs.readFile('predmeti.txt', 'utf8', function(err, data) {
        if (err) throw err;
        else {
            const redoviPodataka = data.split(/\r?\n/);
            for (let i = 0; i < redoviPodataka.length; i++) {
                var podatak = redoviPodataka[i].split(",");
                if (podatak[0] == naziv) {
                    redoviPodataka.splice(i, 1);
                    if (i != 0) i--;
                }
            }

            var writeToPredmeti = "";
            for (var i = 0; i < redoviPodataka.length; i++) {
                if (redoviPodataka[0].length > 2) {
                    writeToPredmeti += redoviPodataka[i] + "\n";
                }
            }

            fs.writeFile('predmeti.txt', writeToPredmeti, function(err) {
                if (err) res.json({ message: "Greška - predmet nije obrisan!" });
                else res.json({ message: "Uspješno obrisan predmet!" });
            });
        }
    });
});
app.delete('/all', function(req, res) {
    const fs = require('fs');
    fs.writeFile('predmeti.txt', '', function(err) {
        if (err) res.json({ message: "Greška - sadržaj datoteka nije moguće obrisati!" });
        else {
            const fs1 = require('fs');
            fs1.writeFile('aktivnosti.txt', '', function(err) {
                if (err) res.json({ message: "Greška - sadržaj datoteka nije moguće obrisati!" });
                else {
                    res.json({ message: "Uspješno obrisan sadržaj datoteka!" });
                }
            });
        }
    });
});
app.listen(3000);