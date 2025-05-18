import {useState} from 'react'
import MatchPrediction from '../components/MatchPrediction'
import Navbar from '../components/Navbar'
export default function Predict() {
    
        const [darkMode, setDarkMode] = useState(() => {
            // Check for saved preference or system preference
            const savedMode = localStorage.getItem('darkMode');
            return savedMode 
              ? savedMode === 'true' 
              : window.matchMedia('(prefers-color-scheme: dark)').matches;
          });
        
          const [currentView, setCurrentView] = useState("Prédictions");

          const toggleDarkMode = () => {
            setDarkMode(prevMode => !prevMode);
          };
  return (
    <div className={`${darkMode? "bg-gray-900":"bg-gray-50" } min-h-screen`}>   
     <Navbar isView={true} toggleDarkMode={toggleDarkMode} setCurrentView={setCurrentView} currentView={currentView} darkMode={darkMode} />
      <main className=''> 
        <MatchPrediction darkMode={darkMode} />
      </main>
    </div>
  )
}
