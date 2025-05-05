import {useEffect,useState } from 'react'
import NavBar from "../components/Navbar"
export default function Competitions() {

        const [darkMode, setDarkMode] = useState(() => {
            // Check for saved preference or system preference
            const savedMode = localStorage.getItem('darkMode');
            return savedMode 
              ? savedMode === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
          });
        
          const [currentView, setCurrentView] = useState("Compétitions");

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
        <div className="flex w-screen h-screen justify-center items-center">
        <p className="text-3xl underline text-white">Liste des competitions</p>
        </div>
    </div>
   
  )
}
