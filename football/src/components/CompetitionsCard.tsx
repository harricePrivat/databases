import React from 'react';
import { Competition } from '../types';
import { Trophy, Users, Calendar, Globe, Award } from 'lucide-react';


const CompetitionCard: React.FC<Competition> = ({  darkMode , logo,name,country,founded,type,teams,prize,description,seasonEnd,seasonStart,currentChampion }) => {
  return (
    <div className={`${darkMode?"bg-gray-600":"bg-white" } "bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"`}>
      <div className="relative h-48">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-2xl font-bold">{name}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <Globe size={16} />
            <span className="text-sm">{country}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className={`${darkMode?"text-gray-200":"text -gray-500" }`} />
            <span className={`${darkMode?"text-gray-200":"text -gray-500" } text-sm font-bold`}>Founded {founded}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy size={16} className={`${darkMode?"text-gray-200":"text -gray-500" }`} />
            <span className={`${darkMode?"text-gray-300":"text -gray-400" } text-sm`}>{type}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`${darkMode?"bg-gray-500" :"bg-blue-50 " } p-3 rounded-lg`}>
              <div className="flex items-center space-x-2 mb-1">
                <Users size={16} className={`${darkMode?"text-blue-300" :"text-blue-600 " }`} />
                <span className={`${darkMode?"text-gray-200":"text -gray-500" } text-sm `}>Teams</span>
              </div>
              <span className={`${darkMode?"text-blue-300" :"text-blue-600 " } text-lg font-semibold `} >{teams}</span>
            </div>
            <div className={`${darkMode?"bg-gray-500" :"bg-green-50 " } p-3 rounded-lg`}>
              <div className="flex items-center space-x-2 mb-1">
                <Award size={16}  className={`${darkMode?"text-green-300" :"text-green-600 " }`} />
                <span className={`${darkMode?"text-gray-200":"text -gray-500" } text-sm `}>Prize</span>
              </div>
              <span  className={`${darkMode?"text-green-300" :"text-green-600 " }`}>{prize}</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className={`${darkMode?"text-gray-200":"text -gray-600" } font-bold`}>Season: </span>
              <span className={`${darkMode?"text-gray-300":"text -gray-400" } font-medium`}>{seasonStart} - {seasonEnd}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy size={16} className="text-yellow-500" />
              <span className={`${darkMode?"text-gray-300":"text -gray-400" } text-sm font-medium`}>{currentChampion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;