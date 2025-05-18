import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import CompetitionStats from '../components/StateCompetitions';

interface goalProps{
  team_name: string,
  total_goals: number,
}


interface matchProps{
  team_name: string,
  total_matches: number,
}

interface winsProps{
  team_name:string,
  wins: number
}

export default function OneCompetitions() {
    const locate = useLocation()
    const { c } = locate.state || {}
    const [currentView,setCurrentView]=useState("")
    const [goal,setGoal]=useState<goalProps[]>([])
    const [match,setMatch]=useState<matchProps[]>([])
    const [wins,setWins]=useState<winsProps[]>([])
    const [isLoading,setLoading]=useState(true)

    
    async function fetchData(url: string){
      try{
          const response=await  fetch(url)
          if(response.ok){
            return response.json()
          }
      }catch(e){
        console.log("Voicile resultat du donne",e)
      }
    } 

    useEffect(()=>{
      const competition = async ()=>{
        const response = await fetchData(`http://localhost:3000/stat-tournois?nomTournois=${c.tournament_name}`)
        if(response){
              // console.log("Voici le resultat du requete ",response.goal,response.match,response.win)
              setGoal(response.goal)
              setMatch(response.match)
              setWins(response.win)
              setLoading(false)

        }
      }
      competition()
    },[])

    // useEffect(()=>{
    //   console.log("Voici le resultat de ce requete",goal,match,wins)
    //   console.log("Regarde aussi ",goal[0].total_goals)
    // },
    // [goal,match,wins])

     const [darkMode, setDarkMode] = useState(() => {
            // Check for saved preference or system preference
            const savedMode = localStorage.getItem('darkMode');
            return savedMode 
              ? savedMode === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
          });
    
          useEffect(() => {
              localStorage.setItem('darkMode', String(darkMode));
              
              // Apply dark mode to document body
              if (darkMode) {
                document.body.classList.add('bg-slate-950');
              } else {
                document.body.classList.remove('bg-slate-950');
                document.body.classList.add('bg-gray-100');
              }
              
              return () => {
                document.body.classList.remove('bg-slate-950', 'bg-gray-100');
              };
            }, [darkMode]);
          
            
            const toggleDarkMode = () => {
              setDarkMode(prevMode => !prevMode);
            };
  return (
    <div>
            <Navbar darkMode={darkMode} currentView={currentView} isView={false} setCurrentView={setCurrentView} toggleDarkMode={toggleDarkMode}/> 
            <div className={`${darkMode ? "bg-gray-900":"bg-gray-50"} min-h-screen mt-14`}>
         {
          isLoading?
          <div className='flex w-screen h-full mt-40 items-center justify-center'>
            <p className={`${darkMode?"text-gray-200":"text-gray-700"} text-3xl font-bold`}>Chargement....</p>
          </div>:
          <main > 
          <CompetitionStats goal={goal} match={match} win={wins} darkMode={darkMode} name={c.tournament_name}/>
          </main>
         }
         
    </div>
    </div>
  )
}
