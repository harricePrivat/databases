const express= require('express')
const {models, sq} = require('./database')
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
      var datas= []
      const fiveTeams= await teams.findAll({
        limit: 3
      })
      // console.log(fiveTeams[0].dataValues)
      for(fiveteam of fiveTeams){

         await sq.query("SET @result=0")
         await sq.query("SET @victoire=0")

         await sq.query(`CALL CountMatchs(:team,@result)`,{
          replacements: {team: fiveteam.dataValues.name} 
         })
        const [{ victoire : victoire}]= await sq.query('CALL NombreVictoire(:team,@victoire)',{
          replacements: {team: fiveteam.dataValues.name}
         })
         console.log(victoire)

         const  [[{ '@result': matchCount }]] = await sq.query("SELECT @result")
         datas.push({
          id_team: fiveteam.dataValues.id_team,
          name: fiveteam.dataValues.name,
          nbMatch: matchCount,
          victoire: victoire
         })
      }
      return res.status(200).json(datas)
    }catch(error){
      console.error("Erreur lors de la recuperation:", error)
      res.status(500).json({ message: 'Erreur serveur', error: error.message });    
    }

})

app.get("/five-matchs",async (req,res)=>{
  try{
   const result= await sq.query("CALL GetFiveMatchs()")
   console.log(result)
   res.status(200).json(result)
  }catch(e){
    console.log("Voici l'erreur",e)
    res.status(500).json({
      error: e,
      message:"Erreur de serveur 500"
    })

  }
})

app.listen(3000,()=>{
    console.log("Serveur node JS sur le port 3000")
})
