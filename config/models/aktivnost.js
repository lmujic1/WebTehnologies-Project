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

module.exports = aktivnost;