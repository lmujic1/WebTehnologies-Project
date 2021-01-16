const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Tip = sequelize.define("tip", {

        naziv: Sequelize.STRING
    }, {
        timestamps: false,
        tableName: 'Tip'
    })
    return Tip;
};