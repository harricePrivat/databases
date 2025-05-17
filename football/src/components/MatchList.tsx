import React from 'react';
import { MatchProps } from '../types';
import MatchCard from './MatchCard';

interface MatchListProps {
  matches: MatchProps[];
  darkMode: boolean;
  currentPage: number;
  title: string;
}

const MatchList: React.FC<MatchListProps> = ({ matches, darkMode, title }) => {

  return (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{title}</h2>
      <div className="space-y-4">
        {matches.length!==0? matches.map((match, index) => (
          <MatchCard key={`${match.home_team}-${match.away_team}-${index}`} match={match} darkMode={darkMode} />
        )):
             <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Aucun match trouve (retrouvez la pagination (1) ) .</p>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Veuillez bien regarder le nom de l'equipe entrer.</p>
        </div> 
        }
      </div>
    </div>
  );
};

export default MatchList;


