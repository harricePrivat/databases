const {Sequelize} = require('sequelize')
const { initModels } = require('./models/init-models')

const sq = new Sequelize('foot','dev','dev',{
    host: 'localhost',
    dialect: "mysql"
}) 

const models = initModels(sq)


try{
    sq.authenticate()
}catch(error){
    console.log("Voici l'erreur",error)
}


// const Personne = sequelize.define()

module.exports = { sq, models }