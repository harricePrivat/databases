import {useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import TeamState from '../components/StateTeam'
// import { teamStats } from '../data/teamStats';
import Navbar from '../components/Navbar';

interface yearlyStats {
    year: number;
    wins: number;
    losses: number;
    draws: number;
    goalsFor: number;
    goalsAgainst: number;
  }

export default function OneTeams() {
    const location = useLocation()
    const {team} = location.state || {}
    const [currentView,setCurrentView]= useState("")
    const [stats,setYearlyStats]= useState<yearlyStats[]>([])


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
        const statPerYear= async ()=>{
            const response= await fetchData(`http://localhost:3000/statperyear?pays=${team.name}`)

            if(response){
                const data : yearlyStats[] = response.map((data:any)=>({
                    year: data.year,
                    wins: data.wins,
                    losses: data.losses,
                    draws: data.draws,
                    goalsFor: data.goals_scored,
                    goalsAgainst: data.goals_conceded
                }))
                const result = data.reverse().slice(0,10)

                setYearlyStats(result)
            }
        }

        statPerYear()

    },[])

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
    // <>
    // <StateTeam teamName={team.name} yearlyStats={Team}/>
    // </>
    <div className='block'>
                <Navbar darkMode={darkMode} currentView={currentView} isView={false} setCurrentView={setCurrentView} toggleDarkMode={toggleDarkMode}/> 
    <div className={`${darkMode ? "bg-gray-900":"bg-gray-50"} min-h-screen mt-14`}>
         <main>
            {
            stats && <TeamState teamName={team.name} won={team.won} drawn={team.drawn} lost={team.lost} yearlyStats={stats} darkMode={darkMode}  />

            }
      </main>
    </div>
    </div>
  )
}
