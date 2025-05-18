import React from 'react';
import {  Moon, Sun } from 'lucide-react';
import MenuNav from './MenuNav';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  darkMode: boolean;
  isView : boolean;
  toggleDarkMode: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  isView,
  currentView, 
  setCurrentView 
}) => {
  const navigate= useNavigate()
  //Utilise sur le mobile


  const clickNavigate = (path :string,view: string )=>{
    setCurrentView(view);
    navigate(path)

  }
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} shadow-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div onClick={()=>{navigate("/")}} className="flex-shrink-0 flex items-center">
              <div className={`h-8 w-8 rounded-full ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'} mr-2`}></div>
              <span className="font-bold text-xl">Stats Foot </span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="block md:flex items-center space-x-4">
        {
          isView ? <div>
                <MenuNav currentView={currentView} darkMode={darkMode} title='Mes données' handleNavClick={()=> clickNavigate("/",'Mes données')}/>
            <MenuNav currentView={currentView} darkMode={darkMode} title='Match' handleNavClick={()=> clickNavigate("/match","Matchs")}/>
              <MenuNav currentView={currentView} darkMode={darkMode} title='Equipes' handleNavClick={()=>clickNavigate("/team","Equipes")}/>
              <MenuNav currentView={currentView} darkMode={darkMode} title='Compétitions' handleNavClick={()=>clickNavigate("/competition","Compétitions")}/>
              <MenuNav currentView={currentView} darkMode={darkMode} title='Prédictions' handleNavClick={()=>clickNavigate("/predict","Prédictions")}/>


          </div>: <div></div>
        }
            {/* <MenuNav currentView={currentView} darkMode={darkMode} title='Mes données' handleNavClick={()=> handleNavClick('Mes données')}/> */}
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-200'} transition-colors duration-150`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;