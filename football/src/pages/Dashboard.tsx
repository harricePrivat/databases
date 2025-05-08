import NavBar from '../components/Navbar'
import {useState, useEffect} from  'react'
import StatisticCard from '../components/StatisticsCard';
import { Trophy , Calendar} from 'lucide-react';
import RecentMatches from '../components/SomeMatchs';
import UpcomingTournaments from '../components/SomeTournaments';
import { useNavigate } from 'react-router-dom'

// import { MatchFilterOptions , } from '../types';
// import { matches } from '../data/mockData';
type TeamsProps = {
  id_team: number;
  name: string;
  nbMatch: number;
  victoire: number;
  drapeau:string
}

export default function Dashboard() {
    const [nbMatchs,setNbMatch]= useState(0)
    const [nbTeams,setNbTeams]= useState(0)
    const [nbTournois,setNbTournois]=useState(0)
    const [someTeams,setSomeTeams]= useState<TeamsProps[]>([])
    const navigation = useNavigate()
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
    const [darkMode, setDarkMode] = useState(() => {
        // Check for saved preference or system preference
        const savedMode = localStorage.getItem('darkMode');
        return savedMode 
          ? savedMode === 'true' 
          : window.matchMedia('(prefers-color-scheme: dark)').matches;
      });
    
      const [currentView, setCurrentView] = useState("Mes données");
      
    
     useEffect(()=>{
      const someTeam= async ()=>{
        // const flag= await fetchData(`https://restcountries.com/v3.1/name/${country_name}`)
          const teams= await fetchData("http://localhost:3000/teams")
          const results : TeamsProps[] = teams.map((dd: any)=>({
              id_team : dd.id_team,
              name: dd.name,
              nbMatch: dd.nbMatch ,
              victoire: dd.victoire,
              drapeau: dd.logo
          }))
          if(teams) {
            setSomeTeams(
                results
            )
   
          }

       }
       someTeam()
     },[])

      // useEffect(()=>{
      //   const getFl= async ()=>{

      //   }
      // },[])
     const goTeams = ()=>{
        navigation("/team")
     }
     
      useEffect(()=>{
        const getData= async ()=>{
          const data = await fetchData("http://localhost:3000/nb-data")
         setNbMatch(data.nbMatchs)
         setNbTeams(data.nbTeams)
         setNbTournois(data.nbTournois)
     }
     
     getData()
      },[])

      // Save dark mode preference
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
    <div className='block'>
       <NavBar darkMode={darkMode} currentView={currentView} setCurrentView={setCurrentView} toggleDarkMode={toggleDarkMode}/> 
       <main className=" container mx-auto pb-8">
        <div className="grid mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticCard 
          dark={darkMode}
          title="Total Équipes" 
          value={nbTeams } 
          icon={<Trophy size={24} className="text-white" />}
          bgColor="bg-indigo-600 dark:bg-indigo-500"
        />
        <StatisticCard
        dark={darkMode}
          title="Total compétitions" 
          value={nbTournois} 
          icon={<Trophy size={24} className="text-white" />}
          bgColor="bg-green-600 dark:bg-green-500"
        />
        <StatisticCard 
                dark={darkMode}

          title="Total Matches" 
          value={nbMatchs} 
          icon={<Calendar size={24} className="text-white" />}
          bgColor="bg-blue-600 dark:bg-blue-500"
        />
        </div>
        <div className=" mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentMatches  darkMode={darkMode}/>
        </div>
        <div>
          <UpcomingTournaments darkMode={darkMode} />
        </div>
      </div>

      <div className=" mt-6 grid grid-cols-1 gap-6">
        <div className={`${darkMode?'bg-gray-800':'bg-white' } rounded-xl shadow-lg overflow-hidden`}>
          <div className="p-5 border-b flex justify-between border-gray-100 dark:border-gray-700">
          <h3 className={`font-semibold ${darkMode?'text-gray-100': 'text-gray-900'} `}>Quelques Équipes</h3>
          <button onClick={goTeams} className={`${darkMode ? "text-white": "text-black"} underline hover:text-blue-400`}>Regarder tout</button>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {someTeams && someTeams.map(some => (
                <div key={some.id_team} className={`${darkMode?'bg-gray-750':'bg-gray-100' } shadow-xl rounded-lg p-4`}>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mr-3">
                      <img 
                        src={some.drapeau} 
                        alt={some.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className={`font-medium ${darkMode?'text-gray-100': 'text-gray-900'} `}>{some.name}</h4>
                 <div className='flex'>
                 <p className='text-xs text-gray-500 dark:text-gray-400 mr-2'>Nombre de matchs: </p>
                 <p className=" font-bold  text-xs text-gray-500 dark:text-gray-400">{some.nbMatch}</p>
                 </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Victoires</span>
                      <span className={`font-medium  ${darkMode?'text-gray-200':'text-gray-800'}`}>
                        {Math.round((some.victoire / some.nbMatch) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full" 
                        style={{ width: `${(some.victoire / some.nbMatch) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  )
}
