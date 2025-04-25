const express= require('express')
const {models} = require('./database')
const { matchs} = models

// const auto= require('./sequelizequto')
const app = express()

app.use(express.json())

app.get("/tournois",async (req,res)=>{
    try {
        const m = await matchs.findOne();
        res.json(m);
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
      }
})

app.listen(3000,()=>{
    console.log("Serveur node JS sur le port 3000")
})
