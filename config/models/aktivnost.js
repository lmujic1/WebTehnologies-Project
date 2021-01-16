const Sequelize = require("sequelize");

var aktivnost = function(sequelize, DataTypes) {
    const Aktivnost = sequelize.define("aktivnost", {
        naziv: Sequelize.STRING,
        pocetak: Sequelize.FLOAT,
        kraj: Sequelize.FLOAT
    }, {
        timestamps: false,
        tableName: 'Aktivnost'
    })
    return Aktivnost;
};

/*aktivnost.create = function(nova, result) {
    dbConn.query("INSERT INTO aktivnost set ?", nova, function(err, res) {
        if (err) result(err, null);
        else {
            result(null, res.insertId);
        }
    })
};

aktivnost.readById = function(id, result) {
    dbConn.query("SELECT * FROM aktivnost WHERE id = ?", id, function(err, res) {
        if (err) result(err, null);
        else result(null, res);
    });
};

aktivnost.readAll = function(result) {
    dbConn.query("SELECT * FROM aktivnost", function(err, res) {
        if (err) result(err, null);
        else result(null, res);
    });
};
aktivnost.update = function(id, nova, result) {
    dbConn.query("UPDATE aktivnost SET naziv=?,pocetak=?,kraj=? WHERE id=?", [nova.naziv, nova.pocetak, nova.kraj, id], function(err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

aktivnost.deleteById = function(id, result) {
    dbConn.query("DELETE FROM aktivnost WHERE id = ?", [id], function(err, res) {
        if (err) result(null, err);
        else result(null, res);
    })
};

aktivnost.deleteAll = function(result) {
    dbConn.query("DELETE FROM aktivnost WHERE 1", function(err, res) {
        if (err) result(null, err);
        else result(null, res);
    })
};
*/
module.exports = aktivnost;