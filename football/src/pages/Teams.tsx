import {useEffect,useState } from 'react'
import NavBar from "../components/Navbar"
import { Team } from '../types';
import FilterBar from '../components/FilterBar';
import TeamCard from '../components/TeamCard';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

export default function Teams() {
        // var currentPage : number =1
        const navigation = useNavigate()
        const [currentPage,setCurrentPage]= useState(1)
        const teams : Team[] =[
          {
            name: "Brice Privat",
            logoUrl: "https://flagcdn.com/al.svg",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },{
            name: "",
            logoUrl: "https://flagcdn.com/w320/al.png",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },{
            name: "",
            logoUrl: "",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },{
            name: "",
            logoUrl: "",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },{
            name: "",
            logoUrl: "",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },
          {
            name: "",
            logoUrl: "",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },
          {
            name: "",
            logoUrl: "",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },
          {
            name: "",
            logoUrl: "",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          },
          {
            name: "",
            logoUrl: "",
            won : 4,
            lost : 6,
            points: 44,
            played: 6,
            id: "4",
            drawn: 0
  
          }
        ]
     
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
    <div className="block pl-30 pr-30">
        <NavBar darkMode={darkMode} currentView={currentView} setCurrentView={setCurrentView} toggleDarkMode={toggleDarkMode}/> 
        <FilterBar 
        placeholder='Recherche equipes ...'
        darkMode={darkMode} 
        pagination={<Pagination currentPage={currentPage} totalPages={Math.ceil(teams.length/6)} onPageChange={(current:number)=>{setCurrentPage(current)}}/>}
        // filterOptions={filterOptions} 
        // setFilterOptions={setFilterOptions}
        // leagues={leagues}
      />
       <div className='container mx-auto  grid lg:grid-cols-3 xl:grid-cols-3 mb-20 md:grid-cols-2 grid-cols-1' >
          {
            teams.slice((currentPage-1)*6,currentPage*6).map(team=><TeamCard onClick={()=>{navigation("",{state : team})}} team={team}  darkMode={darkMode}/>)
          }
       </div>  

  
    </div>
   
  )
}
 