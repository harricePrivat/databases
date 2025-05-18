import React from 'react';
import { Competition } from '../types';
import { Trophy, Users, Calendar, Globe, Award } from 'lucide-react';
import image from '../assets/competitions.webp'

const CompetitionCard: React.FC<Competition> = ({ onClick, darkMode ,tournament_name,total_matches,total_teams,first_match_date,last_match_date }) => {
  return (
    <div onClick={onClick} className={`${darkMode?"bg-gray-600":"bg-white" } "bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"`}>
      <div className="relative h-48">
        <img 
          src={image} 
          alt={`${name} logo`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-2xl font-bold">{tournament_name}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <Globe size={16} />
            <span className="text-sm">{tournament_name}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className={`${darkMode?"text-gray-200":"text -gray-500" }`} />
            <span className={`${darkMode?"text-gray-200":"text -gray-500" } text-sm font-bold`}>Premier match: {new Date(first_match_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy size={16} className={`${darkMode?"text-gray-200":"text -gray-500" }`} />
            <span className={`${darkMode?"text-gray-300":"text -gray-400" } text-sm`}>{total_matches}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`${darkMode?"bg-gray-500" :"bg-blue-50 " } p-3 rounded-lg`}>
              <div className="flex items-center space-x-2 mb-1">
                <Users size={16} className={`${darkMode?"text-blue-300" :"text-blue-600 " }`} />
                <span className={`${darkMode?"text-gray-200":"text -gray-500" } text-sm `}>Nombre de match</span>
              </div>
              <span className={`${darkMode?"text-blue-300" :"text-blue-600 " } text-lg font-semibold `} >{total_matches}</span>
            </div>
            <div className={`${darkMode?"bg-gray-500" :"bg-green-50 " } p-3 rounded-lg`}>
              <div className="flex items-center space-x-2 mb-1">
                <Award size={16}  className={`${darkMode?"text-green-300" :"text-green-600 " }`} />
                <span className={`${darkMode?"text-gray-200":"text -gray-500" } text-sm `}>Participant</span>
              </div>
              <span  className={`${darkMode?"text-green-300" :"text-green-600 " }`}>{total_teams}</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className={`${darkMode?"text-gray-200":"text -gray-600" } font-bold`}>Deriner match: </span>
              <span className={`${darkMode?"text-gray-300":"text -gray-400" } font-medium`}>{new Date(last_match_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;