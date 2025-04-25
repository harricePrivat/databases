import React from 'react';
import MatchList from '../components/MatchList';
import { Match, MatchFilterOptions } from '../types';

interface UpcomingMatchesProps {
  matches: Match[];
  filterOptions: MatchFilterOptions;
  darkMode: boolean;
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches, filterOptions, darkMode }) => {
  // Get upcoming and live matches
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const liveMatches = matches.filter(match => match.status === 'live');

  return (
    <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {liveMatches.length > 0 && (
        <div className="mb-10">
          <MatchList 
            matches={liveMatches} 
            filterOptions={filterOptions} 
            darkMode={darkMode} 
            title="Live Matches" 
          />
        </div>
      )}
      
      <MatchList 
        matches={upcomingMatches} 
        filterOptions={filterOptions} 
        darkMode={darkMode} 
        title="Upcoming Matches" 
      />
    </div>
  );
};

export default UpcomingMatches;