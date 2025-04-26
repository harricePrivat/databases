import NavBar from '../components/Navbar'
import {useState, useEffect} from  'react'
import StatisticCard from '../components/StatisticsCard';
import { Trophy , Calendar} from 'lucide-react';
import RecentMatches from '../components/RecentsMatchs';
import UpcomingTournaments from '../components/UpcomingTournaments';

// import { MatchFilterOptions , } from '../types';
// import { matches } from '../data/mockData';


export default function Dashboard() {
    var data
    const [nbMatchs,setNbMatch]= useState(0)
    const [nbTeams,setNbTeams]= useState(0)
    const [nbTournois,setNbTournois]=useState(0)

    async function fetchData (){
        try{
            const response= await fetch("http://localhost:3000/tournois")
            if(response.ok){
                return response.json()
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
      
    
      // Save dark mode preference
      useEffect(() => {
        const getData= async ()=>{
             data = await fetchData()
            setNbMatch(data.nbMatchs)
            setNbTeams(data.nbTeams)
            setNbTournois(data.nbTournois)
        }
        getData()
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
          <RecentMatches />
        </div>
        <div>
          <UpcomingTournaments />
        </div>
      </div>
    </main>
    </div>
  )
}
