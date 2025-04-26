import NavBar from '../components/Navbar'
import {useState, useEffect} from  'react'
import StatisticCard from '../components/StatisticsCard';
import { Trophy , Calendar} from 'lucide-react';
// import { MatchFilterOptions , } from '../types';
// import { matches } from '../data/mockData';


export default function Dashboard() {

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
          value={20} 
          icon={<Trophy size={24} className="text-white" />}
          bgColor="bg-indigo-600 dark:bg-indigo-500"
        />
        <StatisticCard
        dark={darkMode}
          title="Total compétitions" 
          value={183} 
          icon={<Trophy size={24} className="text-white" />}
          bgColor="bg-green-600 dark:bg-green-500"
        />
        <StatisticCard 
                dark={darkMode}

          title="Total Matches" 
          value={44840} 
          icon={<Calendar size={24} className="text-white" />}
          bgColor="bg-blue-600 dark:bg-blue-500"
        />

      </div>
    </main>
    </div>
  )
}
