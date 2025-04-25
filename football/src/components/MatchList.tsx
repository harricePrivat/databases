import React from 'react';
import { Match, MatchFilterOptions } from '../types';
import MatchCard from './MatchCard';

interface MatchListProps {
  matches: Match[];
  filterOptions: MatchFilterOptions;
  darkMode: boolean;
  title: string;
}

const MatchList: React.FC<MatchListProps> = ({ matches, filterOptions, darkMode, title }) => {
  // Filter matches based on filter options
  const filteredMatches = matches.filter(match => {
    // Filter by status if selected
    if (filterOptions.status && match.status !== filterOptions.status) {
      return false;
    }
    
    // Filter by league if selected
    if (filterOptions.league && match.league !== filterOptions.league) {
      return false;
    }
    
    // Filter by search query
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      return (
        match.team1.name.toLowerCase().includes(query) ||
        match.team2.name.toLowerCase().includes(query) ||
        match.league.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{title}</h2>
      
      {filteredMatches.length === 0 ? (
        <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No matches found.</p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map(match => (
            <MatchCard key={match.id} match={match} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchList;