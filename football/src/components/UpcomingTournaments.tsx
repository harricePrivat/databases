import { tournaments } from '../data/mockData';
import { Calendar, ChevronRight } from 'lucide-react';

const UpcomingTournaments: React.FC = () => {
  // Filter for upcoming tournaments only
  const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-full">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Tournaments</h3>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center">
          View All
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {upcomingTournaments.length > 0 ? (
          upcomingTournaments.map(tournament => (
            <div key={tournament.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mr-3">
                  <img 
                    src={tournament.logoUrl} 
                    alt={tournament.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {tournament.name}
                    </span>
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full">
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

export default UpcomingTournaments;