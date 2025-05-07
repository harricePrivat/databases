import {useEffect,useState } from 'react'
import NavBar from "../components/Navbar"
import { Team } from '../types';
import FilterBar from '../components/FilterBar';
import TeamCard from '../components/TeamCard';

export default function Teams() {
        const teams : Team ={
          name: "",
          logoUrl: "",
          won : 4,
          lost : 6,
          points: 44,
          played: 6,
          id: "4",
          drawn: 0

        }
        const [darkMode, setDarkMode] = useState(() => {
            // Check for saved preference or system preference
            const savedMode = localStorage.getItem('darkMode');
            return savedMode 
              ? savedMode === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
          });
        
          const [currentView, setCurrentView] = useState("Equipes");
// const [filterOptions, setFilterOptions] = useState<MatchFilterOptions>({
//     status: '',
//     league: '',
//     searchQuery: '',
//   });
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
    <div className="block">
        <NavBar darkMode={darkMode} currentView={currentView} setCurrentView={setCurrentView} toggleDarkMode={toggleDarkMode}/> 
        <FilterBar 
        placeholder='Recherche equipes ...'
        darkMode={darkMode} 
        // filterOptions={filterOptions} 
        // setFilterOptions={setFilterOptions}
        // leagues={leagues}
      />
       <div className='flex p-20' >
       <TeamCard team={teams}/>
            <TeamCard team={teams}/>

            <TeamCard team={teams}/>
            <TeamCard team={teams}/>
            <TeamCard team={teams}/>
       </div>


    
    </div>
   
  )
}
 