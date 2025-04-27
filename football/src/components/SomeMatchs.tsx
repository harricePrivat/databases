import React, { useEffect } from 'react';
import { matche } from '../data/mockData';
// import { ChevronRight } from 'lucide-react';
interface RecentMatchesProps{
  darkMode: boolean
}
const SomeMatchs: React.FC<RecentMatchesProps> = (
  darkMode
) => {
  // Get only the most recent 5 matches
  const recentMatches = [...matche]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>;
      case 'completed':
        return <span className="w-2 h-2 bg-gray-500 rounded-full"></span>;
      case 'scheduled':
        return <span className="w-2 h-2 bg-blue-500 rounded-full"></span>;
      default:
        return <span className="w-2 h-2 bg-gray-500 rounded-full"></span>;
    }
  };

  return (
    <div className={` ${darkMode.darkMode? 'bg-gray-800':'bg-gray-100' }  rounded-xl shadow-lg overflow-hidden`}>
      <div className={`p-5 border-b ${darkMode.darkMode? 'border-gray-700':'border-gray-100' }   flex justify-between items-center`}>
        <h3 className={`font-semibold ${darkMode.darkMode?'text-white': 'text-gray-900'} `}>Quelques Matches</h3>
     
      </div>
      
      <div className={`divide-y ${darkMode.darkMode?'divide-gray-100' :'divide-gray-700'}`}>
        {recentMatches.map(match => (
          <div key={match.id} className="p-4  transition-colors duration-150">
            <div className="flex items-center">
              <div className="mr-3 flex items-center justify-center">
                {getStatusIndicator(match.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${darkMode.darkMode?'text-white': 'text-gray-900'}`}>
                    {match.homeTeam} vs {match.awayTeam}
                  </span>
                  
                  {match.status === 'scheduled' ? (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {match.time}
                    </span>
                  ) : (
                    <span className={`text-sm ${darkMode.darkMode?'text-white': 'text-gray-900'}`}>
                      {match.homeScore ?? 0} - {match.awayScore ?? 0}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{match.round}</span>
                  <span>{new Date(match.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomeMatchs;