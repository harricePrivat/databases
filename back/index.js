const express= require('express')
const {models} = require('./database')
const { matchs, tournaments,teams } = models
const cors = require('cors')
// const auto= require('./sequelizequto')
const app = express()

//Middleware
app.use(express.json())
app.use(cors())


app.get("/nb-data",async (req,res)=>{
    try {
        const nbMatchs = await matchs.count();
        const nbTournois= await tournaments.count()
        const nbTeams= await teams.count()
        res.json({
          nbMatchs: nbMatchs,
          nbTournois: nbTournois,
          nbTeams: nbTeams

        });
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
      }
})

app.get("/teams",async (req,res)=>{
    try{
      const fiveTeams= await teams.findAll({
        limit: 3
      })
      // console.log(fiveTeams[0].dataValues)
      return res.status(200).json(fiveTeams)
    }catch(error){
      console.error("Erreur lors de la recuperation:", e)
      res.status(500).json({ message: 'Erreur serveur', error: error.message });    
    }

})

app.get("/five-matchs",async (req,res)=>{
  try{
    const fiveMatchs= await matchs.findAll({
      limit: 5,
      include: [
       {
        model: teams
       } 
      ]
    })
    return res.status(200).json(fiveMatchs)
  }catch(e){
    console.error("Erreur lors de la recuperation:", e)
    res.status(500).json({ message: 'Erreur serveur', error: error.message });    
  }
})

app.get("/five-tournaments",async (req,res)=>{
  try{
      const ft= await tournaments.findAll({
        limit: 5
      })
      res.status(200).json(ft)
  }catch(e){
    console.error("Erreur lors de la recuperation:", e)
    res.status(500).json({ message: 'Erreur serveur', error: error.message });    
  }
})

app.listen(3000,()=>{
    console.log("Serveur node JS sur le port 3000")
})
