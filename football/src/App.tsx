import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import UpcomingMatches from './pages/UpcomingMatches';
import MatchHistory from './pages/MatchHistory';
import { matches } from './data/mockData';
import { MatchFilterOptions } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode 
      ? savedMode === 'true' 
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [currentView, setCurrentView] = useState('upcoming');
  
  const [filterOptions, setFilterOptions] = useState<MatchFilterOptions>({
    status: '',
    league: '',
    searchQuery: '',
  });

  // Get unique leagues for the filter dropdown
  const leagues = Array.from(new Set(matches.map(match => match.league)));

  // Save dark mode preference
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
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-100 text-slate-900'} transition-colors duration-300`}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <FilterBar 
        darkMode={darkMode} 
        filterOptions={filterOptions} 
        setFilterOptions={setFilterOptions}
        leagues={leagues}
      />
      
      <main className="container mx-auto pb-8">
        {currentView === 'upcoming' ? (
          <UpcomingMatches 
            matches={matches} 
            filterOptions={filterOptions} 
            darkMode={darkMode} 
          />
        ) : (
          <MatchHistory 
            matches={matches} 
            filterOptions={filterOptions} 
            darkMode={darkMode} 
          />
        )}
      </main>
    </div>
  );
}

export default App;