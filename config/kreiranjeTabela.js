const db = require('./relations');
db.sequelize.sync({ force: true })