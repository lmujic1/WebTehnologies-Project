const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Grupa = sequelize.define("grupa", {

        naziv: Sequelize.STRING
    }, {
        timestamps: false,
        tableName: 'Grupa'
    })
    return Grupa;
};