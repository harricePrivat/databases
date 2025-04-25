const express= require('express')
const {models} = require('./database')
const { Matchs, Teams, Tournaments, Scores } = models

// const auto= require('./sequelizequto')
const app = express()

app.use(express.json())

app.get("/hello",(req,res)=>{
    res.json({
        message: "Mioty"
    })
})

app.get("/tournois",async (req,res)=>{
    try {
        const matchs = await Matchs.findAll({
          include: [
            { model: Teams, as: 'home_team' },
            { model: Teams, as: 'away_team' },
            { model: Tournaments },
            { model: Scores }
          ]
        });
        res.json(matchs);
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
      }
})

app.listen(3000,()=>{
    console.log("Serveur node JS sur le port 3000")
})
