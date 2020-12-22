const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('movitronic', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // operatorsAliases: false,
  

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db





// aws rds connection
// var con = mysql.createConnection({
//     host: "movitronicdev.cfhmyjhlp9pe.eu-north-1.rds.amazonaws.com/", 
//     user: "admin", 
//     password: "RDS8849ASpw ", 
//     database: "movitronicdev" 
//   });