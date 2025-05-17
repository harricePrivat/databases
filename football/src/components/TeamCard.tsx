import React from 'react';
import { Team } from '../types';
import { GoalIcon, Percent, MapPin } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  darkMode : boolean
  onClick : ()=> void
}

const TeamCard: React.FC<TeamCardProps> = ({ team ,darkMode, onClick}) => {

  return (
    <div  onClick={onClick} className={`${darkMode?"bg-gray-700":"bg-white"} rounded-xl  mt-20 ml-10 mr-10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="relative h-48">
        <img 
          src={team.logoUrl} 
          alt={`${team.name} logo`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-2xl font-bold">{team.name}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <MapPin size={16} />
            <span className="text-sm text-white-600">{team.name}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Percent size={16} className={` ${darkMode?"text-gray-200":"text-gray-600"}`}/>
            <span className={`text-sm ${darkMode?"text-gray-200":"text-gray-600"}`}>Victoires:  {(team.won*100/(team.drawn+team.lost+team.won)).toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <GoalIcon size={16} className={`text-sm ${darkMode?"text-gray-200":"text-gray-600"}`} />
            <span className={`text-sm ${darkMode?"text-gray-200":"text-gray-600"}`}>{team.drawn+team.lost+team.won}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className={`${darkMode?"text-gray-200":"text-gray-600"} font-semibold mb-2`}>Ses statistiques</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`${darkMode?"bg-gray-600" : "bg-green-50"} p-2 rounded`}>
              <div className="text-green-600 font-bold">{team.won}</div>
              <div className={`text-xs ${darkMode?"text-gray-200":"text-gray-600"}`}>Gagnés</div>
            </div>
            <div className={`${darkMode?"bg-gray-600" : "bg-white-50"} p-2 rounded`}>
              <div className={`${darkMode?"text-gray-50" : "text-gray-600"}`}>{team.drawn}</div>
              <div className={`text-xs ${darkMode?"text-gray-200":"text-gray-600"}`}>Null</div>
            </div>
            <div className={`${darkMode?"bg-gray-600" : "bg-red-50"} p-2 rounded`}>
              <div className="text-red-600 font-bold">{team.lost}</div>
              <div className={`text-xs ${darkMode?"text-gray-200":"text-gray-600"}`}>Perdus</div>
            </div>
          </div>
          {/* <div className={`${darkMode?"text-gray-200":"text-gray-600"} mt-2 text-sm text-center `}>
            {totalPoints} points in {totalGames} games
          </div> */}
        </div>

        {/* <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold flex items-center">
              <Users size={16} className="mr-2" />
              Key Players
            </h4>
            <span className="text-sm text-gray-500">Coach: {team.coach}</span>
          </div>
          <div className="flex -space-x-2 overflow-hidden">
            {team.players.map((player) => (
              <div key={player.id} className="group relative">
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white" 
                  src={player.photo} 
                  alt={player.name}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {player.name} • #{player.number} • {player.position}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TeamCard;