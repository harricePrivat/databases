import React, { useState } from 'react';
import { Match } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  darkMode: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, darkMode }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine card status color
  const getStatusColor = () => {
    switch (match.status) {
      case 'live':
        return 'bg-red-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Determine status text
  const getStatusText = () => {
    switch (match.status) {
      case 'live':
        return 'LIVE';
      case 'upcoming':
        return 'UPCOMING';
      case 'completed':
        return 'COMPLETED';
      default:
        return match.status;
    }
  };

  return (
    <div 
      className={`rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 transform hover:translate-y-[-2px] ${
        darkMode ? 'bg-slate-800 text-white hover:shadow-slate-700' : 'bg-white text-slate-900 hover:shadow-lg'
      }`}
    >
      <div 
        className="p-4 cursor-pointer" 
        onClick={toggleExpanded}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor()}`}></div>
            <span className="text-xs font-semibold">{getStatusText()}</span>
          </div>
          <div className="text-sm font-medium">{match.league}</div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-3">
            <img src={match.team1.logo} alt={`${match.team1.name} logo`} className="w-10 h-10 rounded-full object-cover" />
            <span className="font-semibold">{match.team1.name}</span>
          </div>
          
          {match.status === 'completed' || match.status === 'live' ? (
            <div className="text-center font-bold text-xl">
              {match.team1.score} - {match.team2.score}
            </div>
          ) : (
            <div className="text-center text-sm font-medium">
              {match.time}
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <span className="font-semibold">{match.team2.name}</span>
            <img src={match.team2.logo} alt={`${match.team2.name} logo`} className="w-10 h-10 rounded-full object-cover" />
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <button 
            className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            aria-label={expanded ? "Show less" : "Show more"}
          >
            {expanded ? (
              <>
                <span className="mr-1">Less info</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span className="mr-1">More info</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className={`p-4 border-t ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'} transition-all duration-300`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm"><span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date:</span> {formatDate(match.date)}</p>
              {match.venue && <p className="text-sm mt-2"><span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Venue:</span> {match.venue}</p>}
            </div>
            <div>
              {match.status === 'completed' && (
                <div className="flex justify-start md:justify-end">
                  <div className={`rounded-lg p-3 ${darkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                    <p className="text-sm font-semibold mb-1">Match Result</p>
                    <p className="text-sm">
                      {match.team1.score === match.team2.score 
                        ? 'Draw' 
                        : `${match.team1.score! > match.team2.score! ? match.team1.name : match.team2.name} victory`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {match.status === 'upcoming' && (
            <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
              <p className="text-sm font-semibold mb-1">Match Preview</p>
              <p className="text-sm">
                Don't miss this exciting match between {match.team1.name} and {match.team2.name}!
                Set a reminder to watch it live.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchCard;