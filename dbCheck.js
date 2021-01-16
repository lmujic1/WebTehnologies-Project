const db = require('./config/relations.js');
const connection = require('./database.js');
const { Op } = require('sequelize');
const { response } = require('express');


function provjeriStudentGrupa(grupa, predmet) {
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
                        connection.query("UPDATE studentigrupe SET grupaId = ? WHERE studentId = ? AND grupaId = ?", [e.id, studentId, gr.id], function(err, result, field) {
                            //do somethnig
                        })
                    }
                });
            }
        })
    })
}


module.exports = { provjeriStudentGrupa, unesiUStudentiGrupe, promijeniGrupu };