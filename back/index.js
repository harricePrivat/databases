const express= require('express')
const {models} = require('./database')
const { matchs, tournaments,teams } = models
const cors = require('cors')
// const auto= require('./sequelizequto')
const app = express()

//Middleware
app.use(express.json())
app.use(cors())


app.get("/tournois",async (req,res)=>{
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

app.listen(3000,()=>{
    console.log("Serveur node JS sur le port 3000")
})
