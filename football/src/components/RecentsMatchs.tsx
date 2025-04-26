import React from 'react';
import { matche } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

const RecentMatches: React.FC = () => {
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Matches</h3>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center">
          View All
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {recentMatches.map(match => (
          <div key={match.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
            <div className="flex items-center">
              <div className="mr-3 flex items-center justify-center">
                {getStatusIndicator(match.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {match.homeTeam} vs {match.awayTeam}
                  </span>
                  
                  {match.status === 'scheduled' ? (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {match.time}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
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

export default RecentMatches;