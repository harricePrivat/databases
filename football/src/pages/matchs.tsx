import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
// import UpcomingMatches from './UpcomingMatches';
import MatchList from '../components/MatchList';
// import { matches } from '../data/mockData';
import {  MatchProps } from '../types'; 


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode 
      ? savedMode === 'true' 
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [currentView, setCurrentView] = useState('Match');
  const [match, setMatch]= useState<MatchProps[]>([])
  const [filteredMatch, setFilteredMatch]= useState<MatchProps[]>(match)


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
  // Save dark mode preference
  useEffect(()=>{
    const matchs = async ()=>{
      const response = await fetchData("http://localhost:3000/five-matchs")
      if(response){
        setMatch(response)
        setFilteredMatch(response)
      }

    }

    matchs()
  },[])

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

  const [filter,setFilter] =useState("")
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(()=>{
    // if (filter) {
    //   console.log("Misy ooo")

      const result = match.filter((m) =>
        m.home_team.toLowerCase().includes(filter.toLowerCase()) ||
        m.away_team.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredMatch(result);
    // } else{
    //   console.log("Tsisy ooo")
    //   setFilteredMatch(match);
  //}
},[filter])
    
  return (
    
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-100 text-slate-900'} transition-colors duration-300`}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <FilterBar 
      placeholder='Recherche de matchs ...'
        darkMode={darkMode} 
        filterOptions={filter}
        setFilterOptions={setFilter}
      />
      
      <main className="container mx-auto pb-8">
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <MatchList 
        matches={filteredMatch} 
        darkMode={darkMode} 
        title="Les matchs" 
      />
    </div>
      </main>
    </div>
  );
}

export default App;