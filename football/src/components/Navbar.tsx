import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import MenuNav from './MenuNav';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  currentView, 
  setCurrentView 
}) => {
  const navigate= useNavigate()
  //Utilise sur le mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };
  const clickNavigate = (path :string,view: string )=>{
    setCurrentView(view);
    navigate(path)

  }
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} shadow-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className={`h-8 w-8 rounded-full ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'} mr-2`}></div>
              <span className="font-bold text-xl">Foot Mada</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
          <MenuNav currentView={currentView} darkMode={darkMode} title='Mes données' handleNavClick={()=> clickNavigate("/",'Mes données')}/>
            <MenuNav currentView={currentView} darkMode={darkMode} title='Match' handleNavClick={()=> clickNavigate("/match","Match")}/>
            {/* <MenuNav currentView={currentView} darkMode={darkMode} title='Mes données' handleNavClick={()=> handleNavClick('Mes données')}/> */}
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-200'} transition-colors duration-150`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 mr-2 rounded-full ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-200'} transition-colors duration-150`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden transition-all duration-300 ease-in-out`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <button
            onClick={() => handleNavClick('upcoming')}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
              currentView === 'upcoming' 
                ? (darkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900') 
                : (darkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100')
            }`}
          >
            Upcoming Matches
          </button>
          <button
            onClick={() => handleNavClick('history')}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
              currentView === 'history' 
                ? (darkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900') 
                : (darkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100')
            }`}
          >
            Match History
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;