const db = require('./config/relations.js');
const connection = require('./database.js');
const { Op } = require('sequelize');
const { response } = require('express');


function provjeriGrupaPredmet(grupa, predmet) {
    db.predmet.findOrCreate({ where: { naziv: predmet } }).then(function(result1) {
        db.grupa.findOrCreate({ where: { naziv: grupa, predmetId: result1.id } }).then(function(finalresult) {})
    })
}


function unesiUStudentiGrupe(ime, index, grupa) {
    if (!Number.isInteger(grupa)) {
        db.grupa.findOne({ where: { naziv: grupa } }).then(function(group) {
            db.student.findOne({ where: { ime: ime, index: index } }).then(function(stud) {
                connection.query("INSERT INTO studentigrupe (studentId,grupaId) VALUE (?,?)", [stud.id, group.id], function(err, results, fields) {})
            })
        })
    }


}

function promijeniGrupu(studentId, grupa) {
    db.grupa.findOne({ where: { naziv: grupa } }).then(function(gr) {
        db.grupa.findAll({ where: { predmetId: gr.predmetId } }).then(function(gr1) {
            if (gr1 != null) {
                var brojPromjena = 0;
                gr1.forEach(e => {
                    if (e.id != gr.id && brojPromjena == 0) {
                        brojPromjena += 1;
                        connection.query("SELECT * FROM studentigrupe WHERE studentId = ? AND grupaId = ?", [studentId, gr.id], function(err, rezultat, fields) {

                            if (rezultat.length != 0) {
                                connection.query("UPDATE studentigrupe SET grupaId = ? WHERE studentId = ? AND grupaId = ?", [e.id, studentId, gr.id], function(err, result, field) {
                                    //do somethnig
                                })
                            } else {
                                connection.query("INSERT studentigrupe (studentId,grupaId) VALUE (?,?)", [studentId, gr.id], function(err, result, field) {
                                    //do somethnig
                                })
                            }
                        })
                    }
                });
            }
        })
    })
}

function azurirajStudentiGrupe(predmetId) {
    if (predmetId != -1) {

        db.grupa.findAll({ where: { predmetId: predmetId } }).then(function(result) {
            if (result.length != 0) {
                result.forEach(g => {
                    connection.query("DELETE FROM studentigrupe WHERE grupaId = ?", g.id, function(err, result, field) {
                        //do somethnig
                    })
                })
            }
        })
    } else {
        connection.query("DELETE FROM studentigrupe WHERE 1", function(err, result, field) {
            //do somethnig
        })
    }
}

function azurirajAktivnostPredmet(predmetId) {
    if (predmetId != -1) {
        connection.query("DELETE FROM aktivnost WHERE predmetId = ?", predmetId, function(err, result, field) {
            //do somethnig
        })
    } else {
        connection.query("DELETE FROM aktivnost WHERE 1", function(err, result, field) {
            //do somethnig
        })
    }
}

function azurirajAktivnostGrupa(grupaId) {
    if (grupaId != -1) {
        connection.query("DELETE FROM aktivnost WHERE grupaId = ?", grupaId, function(err, result, field) {
            //do somethnig
        })
    } else {
        connection.query("DELETE FROM aktivnost WHERE 1", function(err, result, field) {
            //do somethnig
        })
    }
}


function azurirajAktivnostDan(danId) {
    if (danId != -1) {
        connection.query("DELETE FROM aktivnost WHERE danId = ?", danId, function(err, result, field) {
            //do somethnig
        })
    } else {
        connection.query("DELETE FROM aktivnost WHERE 1", function(err, result, field) {
            //do somethnig
        })
    }
}

function azurirajAktivnostTip(tipId) {
    if (tipId != -1) {
        connection.query("DELETE FROM aktivnost WHERE tipId = ?", tipId, function(err, result, field) {
            //do somethnig
        })
    } else {
        connection.query("DELETE FROM aktivnost WHERE 1", function(err, result, field) {
            //do somethnig
        })
    }
}
module.exports = { provjeriGrupaPredmet, unesiUStudentiGrupe, promijeniGrupu, azurirajStudentiGrupe, azurirajAktivnostPredmet, azurirajAktivnostGrupa, azurirajAktivnostDan, azurirajAktivnostTip };