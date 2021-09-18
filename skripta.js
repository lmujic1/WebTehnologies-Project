const express = require('express');
const bodyParser = require('body-parser');
var dbConn = require('./database');
var Provjera = require('./dbCheck');
const db = require('./config/relations');
const { Op } = require('sequelize');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//SPIRALA 4
//MODEL: PREDMET
{
    app.get('/v2/predmet', function(req, res) {
        dbConn.query("SELECT * FROM predmet", function(err, results, fields) {
            if (err) result(err, null);
            else {
                res.json(results);
            }
        })
    });
    app.get('/v2/predmet/:id', function(req, res) {
        db.predmet.findOne({ where: { id: req.params["id"] } }).then(function(result) {
            if (result != null) res.json(result);
            else res.json([]);
        })
    });
    app.post('/v2/predmet', function(req, res) {
        var naziv = req.body["naziv"];
        db.predmet.findOne({ where: { naziv: naziv } }).then(function(result) {
            if (result == null) {
                dbConn.query("INSERT INTO predmet (naziv) VALUES (?)", naziv, function(err, results, fields) {
                    if (err) res.json({ message: 'GREŠKA' });
                    else res.json({ message: 'Uspješno dodan predmet' });
                });
            }
        });
    });
    app.put('/v2/predmet/:id', function(req, res) {
        var naziv = req.body["naziv"];
        var id = req.params["id"];
        db.predmet.findOne({ where: { naziv: naziv } }).then(function(result) {
            if (result == null) {
                dbConn.query("UPDATE predmet SET naziv = ? WHERE id = ?", [naziv, id], function(err, results, fields) {
                    if (err) res.json({ message: "Greška prilikom ažuriranja" });
                    else res.json({ message: 'Uspješno ažurirano' });
                });
            }
        });
    });
    app.delete('/v2/predmet/:id', function(req, res) {
        var id = req.params["id"];
        Provjera.azurirajAktivnostPredmet(id);
        Provjera.azurirajStudentiGrupe(id);
        dbConn.query("DELETE FROM grupa WHERE predmetId = ? ", id, function(err, result, field) {
            if (!err) {
                dbConn.query("DELETE FROM predmet WHERE id = ?", id, function(err, results, fields) {
                    if (err) res.json({ message: 'Greška prilikom brisanja predmeta' })
                    res.json({ message: 'Uspješno obrisan predmet' });
                });
            }
        })
    });
    app.delete('/v2/predmet', function(req, res) {
        Provjera.azurirajAktivnostPredmet(-1);
        Provjera.azurirajStudentiGrupe(-1);
        dbConn.query("DELETE FROM grupa WHERE 1", function(err, result, field) {
            if (!err) {
                dbConn.query("DELETE FROM predmet WHERE 1", function(err, results, fields) {
                    if (err) res.json({ message: 'Greška prilikom brisanja predmeta' })
                    res.json({ message: 'Uspješno obrisani predmeti' });
                });
            }
        })
    })
}
//MODEL DAN
{
    app.get('/v2/dan', function(req, res) {
        dbConn.query("SELECT * FROM dan", function(err, results) {
            if (err) result(err, null);
            else {
                res.json(results);
            }
        })
    });
    app.get('/v2/dan/:id', function(req, res) {
        db.dan.findOne({ where: { id: req.params["id"] } }).then(function(result) {
            if (result != null) res.json(result);
            else res.json([]);
        })
    });
    app.post('/v2/dan', function(req, res) {
        var naziv = req.body["naziv"];
        db.dan.findOne({ where: { naziv: naziv } }).then(function(result) {
            if (result == null) {
                dbConn.query("INSERT INTO dan (naziv) VALUES (?)", naziv, function(err, results, fields) {
                    if (err) res.json({ message: 'GREŠKA' });
                    else res.json({ message: 'Uspješno dodan dan' });
                });
            }
        })
    });
    app.put('/v2/dan/:id', function(req, res) {
        var naziv = req.body["naziv"];
        var id = req.params["id"];
        db.dan.findOne({ where: { naziv: naziv } }).then(function(result) {
            if (result == null) {
                dbConn.query("UPDATE dan SET naziv = ? WHERE id = ?", [naziv, id], function(err, results, fields) {
                    if (err) res.json({ message: "Greška prilikom ažuriranja" });
                    else res.json({ message: 'Uspješno ažurirano' });
                });
            }
        });
    })
    app.delete('/v2/dan/:id', function(req, res) {
        var id = req.params["id"];
        Provjera.azurirajAktivnostDan(id);
        dbConn.query("DELETE FROM dan WHERE id = ?", id, function(err, results, fields) {
            if (err) res.json({ message: 'Greška prilikom brisanja dana' });
            res.json({ message: 'Uspješno obrisan dan' });
        });
    });

    app.delete('/v2/dan', function(req, res) {
        Provjera.azurirajAktivnostDan(-1);
        dbConn.query("DELETE FROM dan WHERE id 1", function(err, results, fields) {
            if (err) res.json({ message: 'Greška prilikom brisanja dana' });
            res.json({ message: 'Uspješno obrisan dan' });
        });
    });
}
//MODEL TIP
{
    app.get('/v2/tip', function(req, res) {
        dbConn.query("SELECT * FROM tip", function(err, results, fields) {
            if (err) result(err, null);
            else {
                res.json(results);
            }
        })
    });
    app.get('/v2/tip/:id', function(req, res) {
        db.tip.findOne({ where: { id: req.params["id"] } }).then(function(result) {
            if (result != null) res.json(result);
            else res.json([]);
        })
    });
    app.post('/v2/tip', function(req, res) {
        var naziv = req.body["naziv"];
        db.tip.findOne({ where: { naziv: naziv } }).then(function(result) {
            if (result == null) {
                dbConn.query("INSERT INTO tip (naziv) VALUES (?)", naziv, function(err, results, fields) {
                    if (err) res.json({ message: 'GREŠKA' });
                    else res.json({ message: 'Uspješno dodan tip' });
                });
            }
        });
    });
    app.put('/v2/tip/:id', function(req, res) {
        var naziv = req.body["naziv"];
        var id = req.params["id"];
        db.tip.findOne({ where: { naziv: naziv } }).then(function(result) {
            if (result == null) {
                dbConn.query("UPDATE tip SET naziv = ? WHERE id = ?", [naziv, id], function(err, results, fields) {
                    if (err) res.json({ message: "Greška prilikom ažuriranja tipa" });
                    else res.json({ message: 'Uspješno ažuriran tip' });
                });
            }
        });
    });
    app.delete('/v2/tip/:id', function(req, res) {
        var id = req.params["id"];
        Provjera.azurirajAktivnostTip(id);
        dbConn.query("DELETE FROM tip WHERE id = ?", id, function(err, result, fields) {
            if (err) res.json({ message: 'Greška prilikom brisanja tipa' })
            res.json({ message: 'Uspješno obrisan tip' });
        });
    });

    app.delete('/v2/tip', function(req, res) {
        Provjera.azurirajAktivnostTip(-1);
        dbConn.query("DELETE FROM tip WHERE 1", function(err, result, fields) {
            if (err) res.json({ message: 'Greška prilikom brisanja tipova' })
            res.json({ message: 'Uspješno obrisan tip' });
        });
    });
}
//MODEL STUDENT
{

    app.get('/v2/student', function(req, res) {
        dbConn.query("SELECT * FROM student", function(err, results, fields) {
            if (err) result(err, null);
            else {
                res.json(results);
            }
        })
    });
    app.get('/v2/student/:id', function(req, res) {
        db.student.findOne({ where: { id: req.params["id"] } }).then(function(result) {
            if (result != null) res.json(result);
            res.json([]);
        })
    });
    app.post('/v2/student', function(req, res) {
        var ime = req.body["ime"];
        var index = req.body["index"];
        var grupa = req.body["grupa"];
        var predmet = req.body["predmet"];

        if (grupa != null && grupa != '' && predmet != null && predmet != '')
            Provjera.provjeriStudentiGrupe(grupa, predmet);

        db.student.findAll({
            where: {
                [Op.or]: { index: index, ime: ime }
            }
        }).then(function(result) {
            if (result.length == 0) { //"INSERT INTO tip (naziv) VALUES (?)"
                var qry = "INSERT INTO student (ime,`index`) VALUES (?,?)";
                dbConn.query(qry, [ime, index], function(err, results, fields) {
                    if (err) res.json({ message: 'GREŠKA' + err + " " + results });
                    else {
                        Provjera.unesiUStudentiGrupe(ime, index, grupa);
                        res.status(200)
                        res.json([]);
                    }
                });
            } else {
                var poruka = "";
                result.forEach(e => {
                    if (e.index == index && e.ime == ime) {
                        Provjera.promijeniGrupu(e.id, grupa);
                    } else if (e.index == index) {
                        poruka += "Student " + ime + " nije kreiran jer postoji student " + e.ime + " sa istim indeksom " + e.index + "\n";
                    }
                });
                res.json({ message: poruka });
            }
        });

    });

    app.put('/v2/student/:id', function(req, res) {
        var id = req.params["id"];
        var ime = req.body["ime"];
        var index = req.body["index"];
        var grupa = req.body["grupa"];
        var predmet = req.body["predmet"];
        if (grupa != null && grupa != '' && predmet != null && predmet != '')
            Provjera.provjeriStudentiGrupe(index, grupa, predmet);
        db.student.findOne({ where: { index: index, ime: ime } }).then(function(result) {
            if (result == null) {
                dbConn.query("UPDATE student SET ime = ?, `index` = ? WHERE id = ?", [ime, index, id], function(err, results, fields) {
                    if (err) res.json({ message: "Greška prilikom ažuriranja studenta" });
                    else res.json({ message: 'Uspješno ažurirani podaci za studenta' });
                })
            }
        })
    });

    app.delete('/v2/student/:id', function(req, res) {
        var id = req.params["id"];
        dbConn.query("DELETE FROM studentigrupe WHERE studentId = ? ", id, function(err, result1, fields1) {
            if (err) throw err;
            else {
                dbConn.query("DELETE FROM student WHERE id = ?", id, function(err, result, fields) {
                    if (err) throw err;
                    else res.json({ message: 'Uspješno obrisan student' });
                });
            }
        })

    });

    app.delete('/v2/student', function(req, res) {
        dbConn.query("DELETE FROM studentigrupe WHERE 1 ", function(err, result1, fields1) {
            if (err) throw err;
            else {
                dbConn.query("DELETE FROM student WHERE 1", function(err, result, fields) {
                    if (err) throw err;
                    else res.json({ message: 'Uspješno obrisani studenti' });
                });
            }
        })
    })
}
//MODEL GRUPA
{
    app.get('/v2/grupa', function(req, res) {
        dbConn.query("SELECT * FROM grupa", function(err, results, fields) {
            if (err) result(err, null);
            else {
                res.json(results);
            }
        })
    });
    app.get('/v2/grupa/:id', function(req, res) {
        db.grupa.findOne({ where: { id: req.params["id"] } }).then(function(result) {
            if (result != null) res.json(result);
            else res.json([]);
        })
    });
    app.post('/v2/grupa', function(req, res) {
        var naziv = req.body["naziv"];
        var predmet = req.body["predmet"];

        db.predmet.findOrCreate({ where: { naziv: predmet } });
        var predmetIDqry = "(SELECT id FROM predmet WHERE naziv = '" + predmet + "')";
        var qry = "INSERT INTO grupa (naziv,predmetId) VALUES (?, " + predmetIDqry + ")";

        db.grupa.findAll({ where: { naziv: naziv } }).then(function(result) {
            if (result.length == 0) {
                dbConn.query(qry, naziv, function(err, results, fields) {
                    if (err) res.json({ message: 'GREŠKA' });
                    else res.json({ message: 'Uspješno dodna grupa' });
                });
            } else {
                res.json({ message: 'Postoji grupa sa ovim nazivom!' });
            }
        })

    });
    app.put('/v2/grupa/:id', function(req, res) {
        var id = req.params["id"];
        var naziv = req.body["naziv"];
        var predmet = req.body["predmet"];

        db.predmet.findOrCreate({ where: { naziv: predmet } });
        var predmetIDqry = "(SELECT id FROM predmet WHERE naziv = '" + predmet + "')";

        db.grupa.findAll({ where: { naziv: naziv } }).then(function(result) {
            if (result.length == 0) {
                dbConn.query("UPDATE grupa SET naziv = ?, predmetId = " + predmetIDqry + " WHERE id = ?", [naziv, id], function(err, results, fields) {
                    if (err) res.json({ message: /*"Greška prilikom ažuriranja grupe" */ err });
                    else res.json({ message: 'Uspješno ažurirana grupa' });
                })

            } else {
                res.json({ message: 'Postoji grupa sa ovim nazivom!' });
            }
        });
    });
    app.delete('/v2/grupa/:id', function(req, res) {
        var id = req.params["id"];
        Provjera.azurirajAktivnostGrupa(id);
        dbConn.query("DELETE FROM studentigrupe WHERE grupaId = ? ", id, function(err, result1, fields1) {
            dbConn.query("DELETE FROM grupa WHERE id = ?", id, function(err, results, fields) {
                if (err) res.json({ message: 'Greška prilikom brisanja grupe' });
                res.json({ message: 'Uspješno obrisana grupa' });
            });
        });
    });

    app.delete('/v2/grupa', function(req, res) {
        Provjera.azurirajAktivnostGrupa(-1);
        //azuriranje tabele studentiGrupe
        dbConn.query("DELETE FROM studentigrupe WHERE 1", function(err, result1, fields1) {
            dbConn.query("DELETE FROM grupa WHERE 1", function(err, results, fields) {
                if (err) res.json({ message: 'Greška prilikom brisanja grupa' });
                res.json({ message: 'Uspješno obrisane grupe' });
            });
        });
    });
}
//MODEL AKTIVNOST 
{
    app.get('/v2/aktivnost', function(req, res) {
        dbConn.query("SELECT * FROM aktivnost", function(err, results, fields) {
            if (err) result(err, null);
            else {
                res.json(results);
            }
        })
    });
    app.get('/v2/aktivnost/:id', function(req, res) {
        db.aktivnost.findOne({ where: { id: req.params["id"] } }).then(function(result) {
            if (result != null) res.json(result);
            else res.json([]);
        })
    });
    app.post('/v2/aktivnost', function(req, res) {
        var naziv = req.body["naziv"];
        var pocetak = Number(req.body["pocetak"]);
        var kraj = Number(req.body["kraj"]);
        var predmet = req.body["predmet"];
        var grupa = req.body["grupa"];
        var dan = req.body["dan"];
        var tip = req.body["tip"];

        db.predmet.findOrCreate({ where: { naziv: predmet } });
        if (grupa != null) db.grupa.findOrCreate({ where: { naziv: grupa } });
        db.dan.findOrCreate({ where: { naziv: dan } });
        db.tip.findOrCreate({ where: { naziv: tip } });


        var predmetIDqry = "(SELECT id FROM predmet WHERE naziv = '" + predmet + "')";
        var grupaIDqry = "(SELECT id FROM grupa WHERE naziv = '" + grupa + "')";
        var danIDqry = "(SELECT id FROM dan WHERE naziv = '" + dan + "')";
        var tipIDqry = "(SELECT id FROM tip WHERE naziv = '" + tip + "')";
        var qry = "INSERT INTO aktivnost (naziv,pocetak,kraj,predmetId,grupaId,danId,tipId) VALUES (?,?,?," + predmetIDqry + "," + grupaIDqry + "," + danIDqry + "," + tipIDqry + ")";

        db.dan.findOne({ where: { naziv: dan } }).then(function(d) {
            db.aktivnost.findAll().then(function(results) {
                var brojTermina = 0;
                if (pocetak < 8 || kraj < 8 || pocetak > 20 || kraj > 20 || kraj < pocetak) brojTermina++;
                results.forEach(element => {

                    if ((element.pocetak < pocetak && (element.kraj >= pocetak && element.kraj <= kraj)) ||
                        (element.kraj > kraj && (element.pocetak >= pocetak && element.pocetak <= kraj)) ||
                        ((element.pocetak >= pocetak && element.pocetak <= kraj) && (element.kraj >= pocetak && element.kraj <= kraj))) {
                        if (d.id == element.danId) {
                            brojTermina++;
                            if (element.kraj == pocetak) brojTermina--;
                            else if (element.pocetak == kraj) brojTermina--;
                        }
                    }
                });
                if (brojTermina == 0) {
                    dbConn.query(qry, [naziv, pocetak, kraj], function(err, results, fields) {
                        if (err) { res.json({ message: err }) } else res.status(200).json({ message: 'Uspješno dodana aktivnost' });

                    });
                } else {
                    res.json({ message: 'Nevalidan termin aktivnosti' });
                }
            });
        });
    });

    app.put('/v2/aktivnost/:id', function(req, res) {
        var naziv = req.body["naziv"];
        var pocetak = req.body["pocetak"];
        var kraj = req.body["kraj"];
        var predmet = req.body["predmet"];
        var grupa = req.body["grupa"];
        var dan = req.body["dan"];
        var tip = req.body["tip"];
        var id = req.params["id"];

        db.predmet.findOrCreate({ where: { naziv: predmet } });
        if (grupa != null) {
            db.predmet.findOne({ where: { naziv: predmet } }).then(function(result) {
                db.grupa.findOrCreate({ where: { naziv: grupa, predmetId: result.id } });
            })
        }
        db.dan.findOrCreate({ where: { naziv: dan } });
        db.tip.findOrCreate({ where: { naziv: tip } });

        var predmetIDqry = "(SELECT id FROM predmet WHERE naziv = '" + predmet + "')";
        var grupaIDqry = "(SELECT id FROM grupa WHERE naziv = '" + grupa + "')";
        var danIDqry = "(SELECT id FROM dan WHERE naziv = '" + dan + "')";
        var tipIDqry = "(SELECT id FROM tip WHERE naziv = '" + tip + "')";
        var qry = "UPDATE aktivnost SET naziv = ?, pocetak = ?, kraj = ?, predmetId = " + predmetIDqry + ", grupaId = " + grupaIDqry + ", danId= " + danIDqry + ", tipId= " + tipIDqry + " WHERE id=?"

        db.dan.findOne({ where: { naziv: dan } }).then(function(d) {
            db.aktivnost.findAll().then(function(results) {
                var brojTermina = 0;
                //validiranje unosa vremena
                if (pocetak < 8 || kraj < 8 || pocetak > 20 || kraj > 20 || kraj < pocetak ||
                    (pocetak - Math.trunc(pocetak) != 0 && pocetak - Math.trunc(pocetak) != 0.5) ||
                    (kraj - Math.trunc(kraj) != 0 && kraj - Math.trunc(kraj) != 0.5)) brojTermina++;

                //provjera da li postoji preklapanje ukoliko je uneseno validno vrijeme
                if (brojTermina == 0)
                    results.forEach(element => {
                        if ((element.pocetak < pocetak && (element.kraj >= pocetak && element.kraj <= kraj)) ||
                            (element.kraj > kraj && (element.pocetak >= pocetak && element.pocetak <= kraj)) ||
                            ((element.pocetak >= pocetak && element.pocetak <= kraj) && (element.kraj >= pocetak && element.kraj <= kraj))) {
                            if (d.id == element.danId && element.id != id) {
                                brojTermina++;
                                if (element.kraj == pocetak) brojTermina--;
                                else if (element.pocetak == kraj) brojTermina--;
                            }
                        }
                    });
                //unos ukoliko nea preklapanja i vrijeme je validno
                if (brojTermina == 0) {
                    dbConn.query(qry, [naziv, pocetak, kraj, id], function(err, results, fields) {
                        if (err) res.json({ message: 'Greška prilikom ažuriranja aktivnosti' });
                        else res.json({ message: 'Uspješno ažurirana aktivnost' });
                    });
                } else res.json({ message: 'Nevalidan termin aktivnosti' })
            });
        });
    });

    app.delete('/v2/aktivnost/:id', function(req, res) {
        var id = req.params["id"];
        dbConn.query("DELETE FROM aktivnost WHERE id = ?", id, function(err, results, fields) {
            if (err) res.json({ message: 'Greška prilikom brisanja aktivnosti' });
            res.json({ message: 'Uspješno obrisana aktivnost' });
        });
    });

    app.delete('/v2/aktivnost', function(req, res) {
        dbConn.query("DELETE FROM aktivnost WHERE 1", function(err, results, fields) {
            if (err) res.json({ message: 'Greška prilikom brisanja aktivnosti' });
            res.json({ message: 'Uspješno obrisana aktivnost' });
        });
    });
}


//SPIRALA 3
app.get('/v1/predmeti', function(req, res) {
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

app.get('/v1/aktivnosti', function(req, res) {
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

app.get('/v1/predmet/:naziv/aktivnost', function(req, res) {
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

app.post('/v1/predmet', function(req, res) {
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

app.post('/v1/aktivnost', function(req, res) {

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

app.delete('/v1/aktivnost/:naziv', function(req, res) {
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

app.delete('/v1/predmet/:naziv', function(req, res) {
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

app.delete('/v1/all', function(req, res) {
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