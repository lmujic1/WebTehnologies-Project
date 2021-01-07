const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/predmeti', function(req, res) {
    const fs = require('fs');
    var predmeti = [];

    fs.readFile('predmeti.txt', 'utf8', function(err, data) {
        if (err) throw err;
        else {
            const redoviPodataka = data.split(/\r?\n/);
            if (redoviPodataka[0].length == 0) res.json(predmeti);
            else {
                for (let i = 0; i < redoviPodataka.length; i++) {
                    if (redoviPodataka[i].length != 0) {
                        var podatak = redoviPodataka[i].split(",");
                        let predmet = {
                            naziv: podatak[0]
                        };
                        predmeti.push(predmet);
                    }
                }
                res.json(predmeti);
            }
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
            if (redoviPodataka[0].length == 0) res.json(aktivnosti);
            else {
                for (let i = 0; i < redoviPodataka.length; i++) {
                    if (redoviPodataka[i].length != 0) {
                        var podatak = redoviPodataka[i].split(",");
                        let aktivnost = {
                            naziv: podatak[0],
                            tip: podatak[1],
                            pocetak: Number(podatak[2]),
                            kraj: Number(podatak[3]),
                            dan: podatak[4]
                        };
                        aktivnosti.push(aktivnost);
                    }
                }
                res.json(aktivnosti);
            }
        }
    });
});

app.get('/predmet/:naziv/aktivnost', function(req, res) {
    var naziv = req.params["naziv"];
    const fs = require('fs');
    var aktivnosti = [];
    if (naziv == "") res.json(aktivnosti);
    else {
        fs.readFile('aktivnosti.txt', 'utf8', function(err, data) {
            if (err) throw err;
            else {
                const redoviPodataka = data.split(/\r?\n/);
                for (let i = 0; i < redoviPodataka.length; i++) {
                    var podatak = redoviPodataka[i].split(",");
                    if (podatak.length != 0 && podatak[0] == naziv) {
                        let aktivnost = {
                            naziv: podatak[0],
                            tip: podatak[1],
                            pocetak: Number(podatak[2]),
                            kraj: Number(podatak[3]),
                            dan: podatak[4]
                        };
                        aktivnosti.push(aktivnost);
                    }
                }
                res.json(aktivnosti);
            }
        });
    }
});

app.post('/predmet', function(req, res) {
    let tijelo = req.body;
    var naziv = tijelo["naziv"];
    let novaLinija = tijelo["naziv"] + "\n";
    const fs = require('fs');
    const content = fs.readFileSync('predmeti.txt', 'utf8', function(err, data) {});
    //if (err) throw err;
    //else {
    var postoji = 0;
    const redoviPodataka = content.split(/\r?\n/);
    for (let i = 0; i < redoviPodataka.length; i++) {
        var podatak = redoviPodataka[i].split(",");
        if (podatak[0] == naziv) {
            postoji = 1;
            break;
        }
    }
    //}
    if (postoji == 1 || naziv == '') res.json({ message: "Naziv predmeta postoji!" });
    else {
        fs.appendFile('./predmeti.txt', novaLinija, function(err) {
            if (err) throw err;
            res.json({ message: "Uspješno dodan predmet!" });
        });
    }
});

app.post('/aktivnost', function(req, res) {

    let tijelo = req.body;
    let novaLinija = tijelo["naziv"] + "," + tijelo["tip"] + "," + tijelo["pocetak"] + "," + tijelo["kraj"] + "," + tijelo["dan"] + "\n";
    let dan = tijelo["dan"];
    if (tijelo["naziv"] == "" || tijelo["tip"] == "" || tijelo["pocetak"] == "" || tijelo["kraj"] == "" || tijelo["dan"] == "") res.json({ message: "Aktivnost nije validna!" });
    else {
        //provjera za sate
        let pocetak = Number(tijelo["pocetak"]);
        let kraj = Number(tijelo["kraj"]);
        var validna = 1;
        if ((pocetak - Math.trunc(pocetak) != 0 && pocetak - Math.trunc(pocetak) != 0.5) ||
            (kraj - Math.trunc(kraj) != 0 && kraj - Math.trunc(kraj) != 0.5) ||
            kraj <= pocetak ||
            pocetak < 8 ||
            pocetak > 20 ||
            kraj < 8 ||
            kraj > 20
        ) validna = 0;

        const fs = require('fs');
        const content = fs.readFileSync('aktivnosti.txt', 'utf8', function(err, data) {});
        const redoviPodataka = content.split(/\r?\n/);
        for (let i = 0; i < redoviPodataka.length; i++) {
            var podatak = redoviPodataka[i].split(",");
            var poc = Number(podatak[2]);
            var kr = Number(podatak[3]);
            if (!((pocetak < poc && pocetak < kr && kraj <= poc) ||
                    ((pocetak > poc && pocetak >= kr && kraj > kr))) && podatak[4] == dan) {
                validna = 0;
                break;
            }
        }

        if (validna == 0) res.json({ message: "Aktivnost nije validna!" });
        else {
            fs.appendFile('./aktivnosti.txt', novaLinija, function(err) {
                if (err) throw err;
                res.json({ message: "Uspješno dodana aktivnost!" })
            });
        }
        // }
    }
});



app.delete('/aktivnost/:naziv', function(req, res) {
    let naziv = req.params["naziv"];
    const fs = require('fs');
    const content = fs.readFileSync('aktivnosti.txt', 'utf8', function(err, data) {})
        // if (err) throw err;
        //else {
    var postoji = 0;
    const redoviPodataka = content.split(/\r?\n/);
    for (let i = 0; i < redoviPodataka.length; i++) {
        var podatak = redoviPodataka[i].split(",");
        if (podatak.length != 0 && podatak[0] == naziv) {

            postoji = 1;
            redoviPodataka.splice(i, 1);
            if (i != 0) i--;
        }
    }
    if (postoji == 0) res.json({ message: "Greška - aktivnost nije obrisana!" });
    else {
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
    // }
    // });
});

app.delete('/predmet/:naziv', function(req, res) {
    let naziv = req.params["naziv"];
    const fs = require('fs');
    const content = fs.readFileSync('predmeti.txt', 'utf8', function(err, data) {});
    //  if (err) throw err;
    //  else {
    var postoji = 0;
    const redoviPodataka = content.split(/\r?\n/);
    for (let i = 0; i < redoviPodataka.length; i++) {
        var podatak = redoviPodataka[i].split(",");
        if (podatak.length != 0 && podatak[0] == naziv) {
            postoji = 1;
            redoviPodataka.splice(i, 1);
            if (i != 0) i--;
        }
    }
    if (postoji == 0) {
        res.json({ message: "Greška - predmet nije obrisan!" });
    } else {
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
    //    }
    // });
});
app.delete('/all', function(req, res) {
    const fs = require('fs');
    fs.writeFile('predmeti.txt', '', function(err) {
        if (err) res.json({ message: 'Greška - sadržaj datoteka nije moguće obrisati!' });
        else {
            const fs1 = require('fs');
            fs1.writeFile('aktivnosti.txt', '', function(err) {
                if (err) res.json({ message: 'Greška - sadržaj datoteka nije moguće obrisati!' });
                else {
                    res.json({ message: "Uspješno obrisan sadržaj datoteka!" });
                }
            });
        }
    });
});
app.listen(3000);

module.exports = app;