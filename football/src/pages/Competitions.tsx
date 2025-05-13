import {useEffect,useState } from 'react'
import NavBar from "../components/Navbar"
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { Competition } from '../types';
import CompetitionCard from '../components/CompetitionsCard';
export default function Competitions() {
 
        const [currentPage,setCurrentPage]=useState(1)
        const [darkMode, setDarkMode] = useState(() => {
            const savedMode = localStorage.getItem('darkMode');
            return savedMode 
              ? savedMode === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
          });
        
          const [currentView, setCurrentView] = useState("Compétitions");
          const competitions : Competition[]=[
            {
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string",
              darkMode: darkMode
            }, {
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string"
              ,              darkMode: darkMode

            }, {
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string",
              darkMode: darkMode

            }, {
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string",              darkMode: darkMode

            }, {
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string",              darkMode: darkMode

            },{
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string",              darkMode: darkMode

            },{
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string",              darkMode: darkMode

            },{
              logo:"string",
              name:"string",
              country: "string",
              founded: "string",
              type: "string",
              teams: "string",
              prize: 0,
              description: "string",
              seasonStart: "string",
              seasonEnd: "string",
              currentChampion:"string",              darkMode: darkMode

            },
          ]

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
        <FilterBar darkMode={darkMode}         
        pagination={<Pagination currentPage={currentPage} totalPages={Math.ceil(competitions.length/6)} onPageChange={(current:number)=>{setCurrentPage(current)}}/>}
        placeholder='Recherche de quelques competitions'/>
          <div className='container mx-auto m-20 grid lg:grid-cols-3 xl:grid-cols-3 mb-20 md:grid-cols-2 gap-6 grid-cols-1' >
          {
            competitions.slice((currentPage-1)*6,currentPage*6).map(c=><CompetitionCard darkMode={darkMode} logo={c.logo} country={c.country} name={c.name} type={c.type} founded={c.founded} description={c.description} teams={c.teams} prize={c.prize} seasonEnd={c.seasonStart} seasonStart={c.seasonStart} currentChampion={c.currentChampion}  />)
          }
       </div>  

    </div>
   
  )
}
