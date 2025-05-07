import React from 'react';
import MatchList from '../components/MatchList';
import { MatchProps } from '../types';

interface MatchHistoryProps {
  matches: MatchProps[];
  darkMode: boolean;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ matches, darkMode }) => {
  // Get completed matches and sort by date (newest first)


  return (
    <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <MatchList 
        matches={matches} 
        darkMode={darkMode} 
        title="Les matchs" 
      />
    </div>
  );
};

export default MatchHistory;