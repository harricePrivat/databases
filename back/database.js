const {Sequelize} = require('sequelize')
const { initModels } = require('./models/init-models')

const sequelize = new Sequelize('football','dev','dev',{
    host: 'localhost',
    dialect: "mysql"
}) 

const models = initModels(sequelize)

try{
    sequelize.authenticate()
}catch(e){
    console.log("Voici l'erreur",e)
}


// const Personne = sequelize.define()

module.exports = { sequelize, models }