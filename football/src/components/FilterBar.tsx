import React from 'react';
import { Search } from 'lucide-react';
// import { MatchFilterOptions } from '../types';

interface FilterBarProps {
  darkMode: boolean;
  // filterOptions: MatchFilterOptions;
  // setFilterOptions: React.Dispatch<React.SetStateAction<MatchFilterOptions>>;
  // leagues: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ darkMode,  }) => {
  return (
    <div className={`sticky top-16 z-30 py-3 px-4 mb-4 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} border-b ${darkMode ? 'border-slate-800' : 'border-gray-200'} transition-colors duration-300`}>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          <input
            type="text"
            placeholder="Search for teams..."
            // value={filterOptions.searchQuery}
            // onChange={(e) => setFilterOptions({ ...filterOptions, searchQuery: e.target.value })}
            className={`pl-10 pr-4 py-2 w-auto rounded-lg border ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200`}
          />
        </div>     
      </div>
    </div>
  );
};

export default FilterBar;