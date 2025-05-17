import React, { useEffect , useState} from 'react';
import {useNavigate} from 'react-router-dom'
// import { matche } from '../data/mockData';
// import { ChevronRight } from 'lucide-react';
interface RecentMatchesProps{
  darkMode: boolean
}

type MatchsProps={
  id: number;
  nomTournois: string,
	home_score: number,
	away_score: number,
	home_team: string,
	away_team: string,
	date: string

}
const SomeMatchs: React.FC<RecentMatchesProps> = (
  darkMode
) => {
  // Get only the most recent 5 matches
  // const recentMatches = [...matche]
  //   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //   .slice(0, 5);
  const navigation = useNavigate()
  
  const [someMatchs,setSomeMatchs]= useState<MatchsProps[]>([])

    async function fetchData(url:string){
    const response= await fetch(url)
    if(response.ok){
      return await response.json()
    }
  }


  useEffect(()=>{
    const getMatchs = async ()=>{
      const result= await fetchData("http://localhost:3000/five-matchs")
      setSomeMatchs(result)
    }

    getMatchs()
  },[])
  
  const goMatchs = ()=>{
    navigation("/match")

  }

  return (
    <div className={` ${darkMode.darkMode? 'bg-gray-800':'bg-gray-100' }  rounded-xl shadow-lg overflow-hidden`}>
      <div className={`p-5 border-b ${darkMode.darkMode? 'border-gray-700':'border-gray-100' }   flex justify-between items-center`}>
        <h3 className={`font-semibold ${darkMode.darkMode?'text-white': 'text-gray-900'} `}>Quelques Matches</h3>
        <button  onClick={goMatchs} className={`${darkMode.darkMode ? 'text-white': 'text-black'} underline hover:text-blue-500`}>Regarder tout </button>
      </div>
      
      <div className={`divide-y ${darkMode.darkMode?'divide-gray-100' :'divide-gray-700'}`}>
        { someMatchs && someMatchs.map(match => (
          <div key={match.away_team} className="p-4  transition-colors duration-150">
            <div className="flex items-center">
              <div className="mr-3 flex items-center justify-center">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${darkMode.darkMode?'text-white': 'text-gray-900'}`}>
                    {match.home_team} vs {match.away_team}
                  </span>
                    <span className={`text-sm ${darkMode.darkMode?'text-white': 'text-gray-900'}`}>
                      {match.home_score ?? 0} - {match.away_score ?? 0}
                    </span>
                  
                </div>
                
                <div className={`flex items-center justify-between text-xs  ${darkMode?'text-gray-400':'text-gray-600'}`}>
                  <span className=''>{match.nomTournois}</span>
                  <span>{new Date(match.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomeMatchs;

