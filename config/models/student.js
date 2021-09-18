const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Student = sequelize.define("student", {
        ime: Sequelize.STRING,
        index: Sequelize.STRING
    }, {
        timestamps: false,
        tableName: 'Student'
    })
    return Student;
};