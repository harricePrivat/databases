import {useEffect,useState } from 'react'
import NavBar from "../components/Navbar"
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { Competition } from '../types';
import CompetitionCard from '../components/CompetitionsCard';
import { useNavigate } from 'react-router-dom';

export default function Competitions() {
        const navigate= useNavigate()
        const [currentPage,setCurrentPage]=useState(1)
        const [total,setTotal]=useState(0)
        const [competitions,setCompetitions]= useState<Competition[]>([])
        const [filter,setFilter]= useState("")
        const [darkMode, setDarkMode] = useState(() => {
          const savedMode = localStorage.getItem('darkMode');
            return savedMode 
              ? savedMode === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
          });
        
          const [currentView, setCurrentView] = useState("Compétitions");
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
        const competitions = async ()=>{
          const response= await fetchData(`http://localhost:3000/all-tournaments?page=${currentPage}&search=${filter}`)
          if(response){
            setTotal(response.total)
            setCompetitions(response.result)
          }
        }

        competitions()
      },[currentPage,filter])
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
        <NavBar darkMode={darkMode} isView={true} currentView={currentView} setCurrentView={setCurrentView} toggleDarkMode={toggleDarkMode}/> 
        <FilterBar darkMode={darkMode}  
        filterOptions={filter}
        setFilterOptions={setFilter}       
        pagination={<Pagination currentPage={currentPage}  totalPages={Math.ceil(total/6)} onPageChange={(current:number)=>{setCurrentPage(current)}}/>}
        placeholder='Recherche de quelques competitions'/>
          <div className='container mx-auto m-20 grid lg:grid-cols-3 xl:grid-cols-3 mb-20 md:grid-cols-2 gap-6 grid-cols-1' >
          {
            competitions.map(c=><CompetitionCard onClick={()=>{navigate(`/competition/${c.tournament_name.trim()}`,{state: {c: c}})}} darkMode={darkMode} total_matches={c.total_matches} total_teams={c.total_teams} first_match_date={c.first_match_date} last_match_date={c.last_match_date} tournament_name={c.tournament_name} />)
          }
       </div>  

    </div>
   
  )
}
