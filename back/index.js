const express= require('express')
const {models, sq} = require('./database')
const { matchs, tournaments,teams } = models
const cors = require('cors')
//  const auto= require('./sequelizequto')
const app = express()

//Middleware
app.use(express.json())
app.use(cors())

async function fetchData(url){
   try{
    const response= await fetch(url)
    return await response.json()    
   }catch(error){
    console.log("Voici l'erreur ",error)
   }
}

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

app.get("/test",async (req,res)=>{
  try{
    const data= await sq.query("CALl NbVictoire()")
    res.json(data)
  }catch(e){
    console.log(e)
  }
})
app.get("/teams",async (req,res)=>{
    try{
      var datas= []
      const fiveTeams= await teams.findAll({
        limit: 3
      })
       console.log(fiveTeams[1].dataValues)
      for(fiveteam of fiveTeams){
        // var flagUrl=""
        // const response =await fetchData(`https://restcountries.com/v3.1/name/${fiveteam.dataValues.name}`)
      //  if(response.status===201) 
        // console.log("Voici le status de la requete",response.status)
        //  if(response.status===undefined) flagUrl=response[0].flags.svg
         await sq.query("SET @result=0")
         await sq.query(`CALL CountMatchs(:team,@result)`,{
          replacements: {team: fiveteam.dataValues.name} 
         })
        const [{ victoire : victoire}]= await sq.query('CALL NombreVictoire(:team,@victoire)',{
          replacements: {team: fiveteam.dataValues.name}
         })

         const  [[{ '@result': matchCount }]] = await sq.query("SELECT @result")
         datas.push({
          id_team: fiveteam.dataValues.id_team,
          name: fiveteam.dataValues.name,
          nbMatch: matchCount,
          victoire: victoire,
          logo: fiveteam.dataValues.flag_svg,
          drapeau: fiveteam.dataValues.flag_png
         })
      }
      return res.status(200).json(datas)
    }catch(error){
      console.error("Erreur lors de la recuperation:", error)
      res.status(500).json({ message: 'Erreur serveur', error: error.message });    
    }

})

app.get("/five-tournaments",async (req,res)=> {
  try{
    var datas= []
    const fiveTournaments=await tournaments.findAll({
      limit: 6
    })
    await sq.query("SET @result=0")
    for(fiveTournament of fiveTournaments){
      await sq.query("CALL GetNbMatchs(:tournoi,@result)",{
        replacements: {
          tournoi: fiveTournament.dataValues.name 
        }
      })
     const date=  await sq.query("CALL IDateMatch(:tournoi)",{
        replacements: {
          tournoi: fiveTournament.dataValues.name 
        }
      })
      if(date.length===1) date.push(date[0])
      const [[{"@result": results}]] = await sq.query("SELECT @result")
      datas.push(
        {
          name: fiveTournament.dataValues.name,
          nbMatch: results,
          dateBegin: date[0].date,
           dateEnd: date[1].date 
        }
      )
    }
    res.status(200).json(datas)

  }catch(error){
    console.log("Voici l'erreur",error)
    res.status(500).json({
      error: error.message,
      message:"Erreur de serveur 500"
    })
 
  }
})

app.get("/five-matchs",async (req,res)=>{
  try{
   const result= await sq.query("CALL GetFiveMatchs()")
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
