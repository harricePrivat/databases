import React from 'react';
 import { MatchProps } from '../types';
import MatchCard from './MatchCard';

interface MatchListProps {
  matches: MatchProps[];
  darkMode: boolean;
  title: string;
}

const MatchList: React.FC<MatchListProps> = ({ matches, darkMode, title }) => {
  // Filter matches based on filter options


  return (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{title}</h2>
        <div className="space-y-4">
          {matches.map(match => (
            <MatchCard key={match.home_score} match={match} darkMode={darkMode} />
          ))}
        </div>
      
    </div>
  );
};

export default MatchList;

{/* <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
<p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No matches found.</p>
<p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your filters.</p>
</div> */}