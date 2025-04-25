import React from 'react';
import MatchList from '../components/MatchList';
import { Match, MatchFilterOptions } from '../types';

interface MatchHistoryProps {
  matches: Match[];
  filterOptions: MatchFilterOptions;
  darkMode: boolean;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ matches, filterOptions, darkMode }) => {
  // Get completed matches and sort by date (newest first)
  const completedMatches = matches
    .filter(match => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <MatchList 
        matches={completedMatches} 
        filterOptions={filterOptions} 
        darkMode={darkMode} 
        title="Match History" 
      />
    </div>
  );
};

export default MatchHistory;