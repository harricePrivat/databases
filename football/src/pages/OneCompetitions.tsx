import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import CompetitionStats from '../components/StateCompetitions';
export default function OneCompetitions() {
    const locate = useLocation()
    const { c } = locate.state || {}
    const [currentView,setCurrentView]=useState("")
    console.log("Voici le donne suivant",c)
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
         <main >
            <CompetitionStats darkMode={darkMode} name={c.tournament_name}/>
      </main>
    </div>
    </div>
  )
}
