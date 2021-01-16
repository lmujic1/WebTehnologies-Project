const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.aktivnost = require('./models/aktivnost.js')(sequelize, Sequelize);
db.dan = require('./models/dan.js')(sequelize, Sequelize);
db.grupa = require('./models/grupa.js')(sequelize, Sequelize);
db.predmet = require('./models/predmet.js')(sequelize, Sequelize);
db.student = require('./models/student.js')(sequelize, Sequelize);
db.tip = require('./models/tip.js')(sequelize, Sequelize);


//relacije
db.predmet.hasMany(db.grupa, { foreignKey: { allowNull: false } }); //Predmet 1-N Grupa
db.grupa.belongsTo(db.predmet);

db.predmet.hasMany(db.aktivnost, { foreignKey: { allowNull: false } }); //Predmet 1-N Grupa
db.aktivnost.belongsTo(db.predmet);

// Aktivnost N-0 Grupa
db.aktivnost.belongsTo(db.grupa);
db.grupa.hasMany(db.aktivnost);

db.dan.hasMany(db.aktivnost, { foreignKey: { allowNull: false } }); //Aktivnost N-1 Dan
db.aktivnost.belongsTo(db.dan);

db.tip.hasMany(db.aktivnost, { foreignKey: { allowNull: false } }); //Aktivnost N-1 Tip
db.aktivnost.belongsTo(db.tip);

//n-m Student N-M Grupa
db.studentiGrupe = db.student.belongsToMany(db.grupa, { as: 'grupe', through: 'studentiGrupe', foreignKey: 'studentId' });
db.grupa.belongsToMany(db.student, { as: 'studenti', through: 'studentiGrupe', foreignKey: 'grupaId' });




module.exports = db;