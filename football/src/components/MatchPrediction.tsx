import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Goal, Percent, Search, Shield } from 'lucide-react';
// import { Team } from '../types';
// import { teams } from '../data/teams';
interface MatchPredictionProps{
    darkMode : boolean
}
interface LieuProps{
    id_tournois:number,
    name: string
}

interface TeamProps{
    name: string,
    flag_svg:string
}

interface PredictionProps{
    result: string,
	score_team1: string,
	score_team2: string,
	form_team1: string,
	form_team2: string,
	goals_scored_team1: string,
	goals_scored_team2: string,
	goals_conceded_team1: string,
	goals_conceded_team2: string
}

const MatchPrediction: React.FC<MatchPredictionProps> = (darkMode) => {

  const [team1, setTeam1] = useState<TeamProps | null>(null);
  const [lieu, setLieu]=useState<LieuProps | null>(null);
  const [team2, setTeam2] = useState<TeamProps | null>(null);
  const [team1Search, setTeam1Search] = useState('');
  const [team2Search, setTeam2Search] = useState('');
  const [lieuSearch, setLieuSearch]=useState('');  
  const [isClicked,setisClicked]=useState(false)
  const [team1Suggestions, setTeam1Suggestions] = useState<TeamProps[]>([]);
  const [team2Suggestions, setTeam2Suggestions] = useState<TeamProps[]>([]);
  const [lieuSuggestions, setLieuSuggestions]=useState<LieuProps[]>([]);
  const [prediction,setPrediction]=useState<PredictionProps | null>(null)

  const darkModes= darkMode.darkMode
  async function fetchData (url: string){
    try{
        const response= await fetch(url)
        if(response.ok){
            return await response.json()
        }
    }catch(e){
        console.log("Erreur",e)
    }
    
}

const predict = async ()=>{
    const response = await fetchData(`http://localhost:3000/predict?team1=${team1?.name}&team2=${team2?.name}&tournois=${lieu?.name}`)
    if(response){
        setPrediction(response)
    }
}

        useEffect(()=>{
        const research= async ()=>{
       if(team1Search!=='' && team1===null){
             const response= await fetchData(`http://localhost:3000/search-team?team=${team1Search}`)
            if(response){
                setTeam1Suggestions(response[0])
            }
       }    
        }
        if(team1Search===""){
            setTeam1(null)
            setisClicked(false)
        }
        research()
        },[team1Search])

        useEffect(()=>{
            const research= async ()=>{
              if(team2Search!=="" && team2===null){
                const response= await fetchData(`http://localhost:3000/search-team?team=${team2Search}`)
                if(response){
                    setTeam2Suggestions(response[0])
                }
              }
            }
            if(team2Search===""){
                setTeam2(null)
                setisClicked(false)

            }
            research()

        },[team2Search])
    
        useEffect(()=>{
            const tournois= async ()=>{
               if(lieuSearch!==""&& lieu===null){
                const response= await fetchData(`http://localhost:3000/search-tournois?tournois=${lieuSearch}`)
                if(response){
                    setLieuSuggestions(response[0])
                }
               }
            }
            if(lieuSearch===""){
                setLieu(null)
                setisClicked(false)

            }
            tournois()

        },[lieuSearch])

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8">
      <div className={`${darkModes? "bg-gray-800":"bg-white"}  rounded-xl shadow-lg p-6`}>
        <div className="text-center mb-8">
          <h1 className={`${darkModes?" text-gray-200" :"text-gray-900 " } text-3xl font-bold`}>Prediction de match</h1>
          <p className={`${darkModes? "text-gray-300":"text-gray-600"}  mt-2`}>Comparaison et prediction entre deux Equipes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team 1 Search */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={team1Search}
                onChange={(e) => setTeam1Search(e.target.value)}
                placeholder="L'equipe local"
                className={`${darkModes? "bg-gray-700 text-white":"bg-white text-gray-800"} w-full p-4 border rounded-lg  shadow-sm hover:border-blue-500 transition-colors pl-12`}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {team1Suggestions.length > 0 && (
              <div className={`${darkModes? "bg-gray-700":"bg-white "} absolute z-10 w-full mt-2 border rounded-lg shadow-lg max-h-60 overflow-y-auto`}>
                {team1Suggestions.map((team) => (
                  <button
                    key={team.name}
                    onClick={() => {
                      setTeam1(team);
                      setTeam1Search(team.name);
                      setTeam1Suggestions([]);
                    }}
                    className="w-full p-3 text-left hover:bg-blue-50 flex items-center space-x-3"
                  >
                    <Shield className="text-blue-600" size={20} />
                    <span>{team.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Team 2 Search */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={team2Search}
                onChange={(e) => setTeam2Search(e.target.value)}
                placeholder="L'equipe etrangers"
                className={`${darkModes? "bg-gray-700 text-white":"bg-white text-gray-800"} w-full p-4 border rounded-lg  shadow-sm hover:border-red-500 transition-colors pl-12`}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {team2Suggestions.length > 0 && (
              <div className={`${darkModes? "bg-gray-700":"bg-white "} absolute z-10 w-full mt-2 border rounded-lg shadow-lg max-h-60 overflow-y-auto`}>
                {team2Suggestions.map((team) => (
                  <button
                    key={team.name}
                    onClick={() => {
                      setTeam2(team);
                      setTeam2Search(team.name);
                      setTeam2Suggestions([]);
                    }}
                    className="w-full p-3 text-left hover:bg-red-50 flex items-center space-x-3"
                  >
                    <Shield className="text-red-600" size={20} />
                    <span>{team.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

    <div className='flex mt-10 justify-between'>
    <div className="relative  max-w-full">
            <div className="relative">
              <input
                type="text"
                value={lieuSearch}
                onChange={(e) => setLieuSearch(e.target.value)}
                placeholder="Le tournois"
                className={`${darkModes? "bg-gray-700 text-white":"bg-white text-gray-800"} w-full p-4 border rounded-lg  shadow-sm hover:border-blue-500 transition-colors pl-12`}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {lieuSuggestions.length > 0 && (
              <div className={`${darkModes? "bg-gray-700":"bg-white "} absolute z-10 w-full mt-2 border rounded-lg shadow-lg max-h-60 overflow-y-auto`}>
                {lieuSuggestions.map((l) => (
                  <button
                    key={l.name}
                    onClick={() => {
                      setLieu(l);
                      setLieuSearch(l.name);
                      setLieuSuggestions([]);
                    }}
                    className="w-full p-3 text-left hover:bg-blue-50 flex items-center space-x-3"
                  >
                    <Shield className="text-blue-600" size={20} />
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className='bg-green-600 rounded-lg px-5 h-auto hover:bg-green-400 text-white hover:text-black hover:shadow-lg'
          onClick={async ()=>{
            if(team1 && team2 && lieu){
                await predict()
                setisClicked(!isClicked)

            }          }}
          >{isClicked?"OK":"Predire"}</button>

    </div>
        

        {lieu && team1 && prediction && team2 && (
        (isClicked)?   
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
       <div className='block'>
       <div className="bg-gradient-to-br my-5 from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-lg font-semibold text-blue-900 mr-3">Qui va gagner ??</h3>
              <Trophy className="text-blue-600" size={24} />
            </div>
            <div className="flex justify-center items-center">
              <div className="text-red-800 text-right">
                <div className="text-xl font-bold">{prediction.result}</div>
              </div>
            </div>
          </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Win Rate Comparison */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">But concédées par Match</h3>
              <Trophy className="text-blue-600" size={24} />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-blue-800">
                <div className="text-2xl font-bold">{prediction.goals_conceded_team1}</div>
                <div className="text-sm">{team1.name}</div>
              </div>
              <div className="text-red-800 text-right">
                <div className="text-2xl font-bold">{prediction.goals_conceded_team2}</div>
                <div className="text-sm">{team2.name}</div>
              </div>
            </div>
          </div>

          {/* Goal Average */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-900">But marqué par Match</h3>
              <Goal className="text-green-600" size={24} />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-green-800">
                <div className="text-2xl font-bold">{prediction.goals_scored_team1}</div>
                <div className="text-sm">{team1.name}</div>
              </div>
              <div className="text-green-800 text-right">
                <div className="text-2xl font-bold">{prediction.goals_scored_team2}</div>
                <div className="text-sm">{team2.name}</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-900">Forme de l'equipe</h3>
              <Percent className="text-purple-600" size={24} />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-purple-800">
                <div className="text-2xl font-bold">
                  {prediction.form_team1}
                </div>
                <div className="text-sm">{team1.name}</div>
              </div>
              <div className="text-purple-800 text-right">
                <div className="text-2xl font-bold">
                  {prediction.form_team2}
                </div>
                <div className="text-sm">{team2.name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            *Les predictions sont basés sur l'histroique des performances et de ses formes </p>
        </div>
       </div>
      </motion.div>:<></>
        )}
      </div>
    </div>
  );
};

export default MatchPrediction;