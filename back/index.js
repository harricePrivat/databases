const express= require('express')
const {models, sq} = require('./database')
const { matchs, tournaments,teams } = models
const cors = require('cors')
//  const auto= require('./sequelizequto')
const app = express()

//Middleware
app.use(express.json())
app.use(cors())

// async function fetchData(url){
//    try{
//     const response= await fetch(url)
//     return await response.json()    
//    }catch(error){
//     console.log("Voici l'erreur ",error)
//    }
// }

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
      // const datas = await sq.query("CALL NV(332)")
      var datas= []
      const fiveTeams= await teams.findAll({
        limit: 2
      })
       console.log(fiveTeams[1].dataValues)
      for(fiveteam of fiveTeams){
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

app.get("/statperyear",async (req,res)=>{
  try{
    const pays = req.query.pays
    const result = await sq.query(`CALL StatPerYear("${pays}")`)
    res.status(200).json(result)
  }catch(e){
    res.status(500).json({
      "error": e.error,
    })
  }
})

app.get("/stat-tournois",async (req,res)=>{
  try{
    const nomTournois= req.query.nomTournois
    const goal = await sq.query(`CALL ButeurParTournois("${nomTournois}",${50000})`)
    const match = await sq.query(`CALL MatchParTournoi("${nomTournois}",${50000})`)
    const win = await sq.query(`CALL WinParTournois("${nomTournois}",${50000})`)
    console.log("Voici le resultat de la requete",goal.length,match.length,win.length)
    res.status(200).json(
      {
        goal : goal,
        match : match,
        win: win
      }
    )
  }catch(error){
    console.log("Voici l'erreur",error)
    res.status(500).json({
      error: error.message,
      message:"Erreur de serveur 500"
    })
 
  }
})

app.get("/search-team",async (req,res)=>{
  try{
    const team = req.query.team
    const result = await sq.query(`select distinct name, flag_svg from teams where name like concat('%','${team}','%')`)
    res.status(200).json(result)
  }catch(error){
    console.log("Voici l'erreur",error)
    res.status(500).json({
      error: error.message,
      message:"Erreur de serveur 500"
    })
  }
})

app.get("/search-tournois",async (req,res)=>{
  try{
    const tournois = req.query.tournois
    const result = await sq.query(`select * from tournaments where name like concat('%','${tournois}','%')`)
    res.status(200).json(result)
  }catch(error){
    console.log("Voici l'erreur",error)
    res.status(500).json({
      error: error.message,
      message:"Erreur de serveur 500"
    })
  }
})

app.get("/all-tournaments",async (req,res)=> {
  try{
    const paginate = req.query.page || 0
   const search= req.query.search || undefined
   if(search===undefined){
    const result = await sq.query(`call CompetitionPagination(${paginate})`)
    res.status(200).json({
      "total": 182,
      "result": result
    })
   }else{
    const result = await sq.query(`call CompetitionSearch(${paginate},"${search}")`)
    const [{"count(*)": count}] = await sq.query(`call nombreSearchCompetition("${search}")`)
    res.status(200).json({
      "total": count,
      "result": result
    })
   }

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

app.get("/match-paginate",async (req,res)=>{
  try{
    const paginate= req.query.page || 1
    const search = req.query.search || undefined
    if(search===undefined){
       const result= await sq.query(`CALL MatchPaginate(${paginate})`)
       res.status(200).json({
        total : 48207,
        result: result
      })
    }else{
      const result= await sq.query(`CALL SearchPaginate(${paginate},"${search}")`)
      const [{ "count(*)": count }] = await sq.query(`CALL NombreSearch("${search}")`)
      res.status(200).json({
        total : count,
        result: result
      })
    } 
    
  }catch(e){
    console.log("Erreur lors de ",e)
  }
})


app.get("/team",async (req,res)=>{
  try{
    const paginate = req.query.page || 1 
    const search = req.query.search || undefined
    if(search===undefined){
      const result = await sq.query(`CALL TeamPaginate(${paginate})`)
    res.status(200).json({
      "total": 332,
      "result": result
    })
    }else{
      const [{"count(*)": count }] = await sq.query(`call NombreSearchTeam("${search}")`)
      const result = await sq.query(`CALL TeamSearch(${paginate},"${search}")`)
    res.status(200).json({
      "total": count,
      "result": result
    })
    }
  }catch(e){
    res.status(500).json({"Erreur":"Erreur du serveur"})
  }
})

app.get("/predict",async(req,res)=>{
try{
  const team1= req.query.team1
  const team2= req.query.team2
  const tournois = req.query.tournois
  const result = await sq.query(`CALL predict_match("${team1}","${team2}","${tournois}")`)
  res.status(200).json(result[0])
}catch(e){
  res.status(500).json({
    "erreur": e.error
  })
}
  
})

app.listen(3000,()=>{
    console.log("Serveur node JS sur le port 3000")
})



