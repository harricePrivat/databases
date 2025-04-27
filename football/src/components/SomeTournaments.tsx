import { tournaments } from '../data/mockData';
import { Calendar,Trophy } from 'lucide-react';

interface UpcomingTournamentsProps{
  darkMode : boolean
}

const SomeTournaments: React.FC<UpcomingTournamentsProps> = (darkMode) => {
  // Filter for upcoming tournaments only
  const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming');

  return (
    <div className={`${darkMode.darkMode? 'bg-gray-800':'bg-gray-100' } rounded-xl shadow-lg overflow-hidden h-full`}>
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className={`font-semibold ${darkMode.darkMode?'text-white': 'text-gray-900'} `}>Quelques compétitions</h3>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {upcomingTournaments.length > 0 ? (
          upcomingTournaments.map(tournament => (
            <div key={tournament.id} className="p-4 transition-colors duration-150">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mr-3">
                  {/* <img 
                    src={tournament.logoUrl} 
                    alt={tournament.name} 
                    className="w-full h-full object-cover"
                  /> */}
                  <Trophy className='w-full h-full p-2 object-cover bg-green-400 color text-white'/>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${darkMode.darkMode?'text-white': 'text-gray-900'}`}>
                      {tournament.name}
                    </span>
                    <span className={`text-xs font-medium ${darkMode.darkMode?'bg-blue-900/30' :'bg-blue-100'} ${darkMode.darkMode?'text-blue-300' :'text-blue-800'}   px-2 py-1 rounded-full`}>
                      {tournament.participants} Teams
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={12} className="mr-1" />
                    <span>
                      {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No upcoming tournaments scheduled
          </div>
        )}
      </div>
    </div>
  );
};

export default SomeTournaments;