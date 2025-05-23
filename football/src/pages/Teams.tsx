import {useEffect,useState } from 'react'
import NavBar from "../components/Navbar"
import { Team } from '../types';
import FilterBar from '../components/FilterBar';
import TeamCard from '../components/TeamCard';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

export default function Teams() {
        // var currentPage : number =1
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

        const navigation = useNavigate()
        const [currentPage,setCurrentPage]= useState(1)
        const [teams,setTeams]= useState<Team[]>([])
        const [total,setTotal]=useState(0)
        const [filter,setFilter]=useState("")
        useEffect(  ()=>{
          const teams = async ()=>{
            const response= await fetchData(`http://localhost:3000/team?page=${currentPage}&search=${filter}`)
            if(response){
              setTotal(response.total)
              const result : Team[] = response.result.map((dd: any)=>({
                name: dd.team,
                logoUrl: dd.flag_svg,
                won: dd.victoires,
                drawn: dd.Nulle,
                lost: dd.defaites
              }))
              // if(result.length<12){
              //   setCurrentPage(1)
              // }
              setTeams(result)
            }
          }

          teams()
        },[currentPage,filter])
     
        const [darkMode, setDarkMode] = useState(() => {
            // Check for saved preference or system preference
            const savedMode = localStorage.getItem('darkMode');
            return savedMode 
              ? savedMode === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
          });

          const [currentView, setCurrentView] = useState("Equipes");
      
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
        <NavBar darkMode={darkMode} currentView={currentView}  isView={true} setCurrentView={setCurrentView} toggleDarkMode={toggleDarkMode}/> 
        <FilterBar 
        placeholder='Recherche equipes ...'
        filterOptions={filter}
        setFilterOptions={setFilter}
        darkMode={darkMode} 
        pagination={<Pagination currentPage={currentPage} totalPages={Math.ceil(total/6)} onPageChange={(current:number)=>{setCurrentPage(current)}}/>}

      />
       <div className='container mx-auto  grid lg:grid-cols-3 xl:grid-cols-3 mb-20 md:grid-cols-2 grid-cols-1' >
          {
          (teams && teams.length!==0) ? teams.map(team=><TeamCard key={team.name} onClick={()=>{navigation(`/team/${team.name}`,{state : {team }})}} team={team}  darkMode={darkMode}/>):
          <div className='flex justify-center items-center mt-16 ml-80 w-full h-full'>
         <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Aucun Equipe trouve (ou retrouvez la pagination (1) ) .</p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Veuillez bien regarder le nom de l'equipe entrer.</p>
          </div> 
          </div>
          }
       </div>  

  
    </div>
   
  )
}
 