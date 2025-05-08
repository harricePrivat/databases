import React from 'react';
import { Search } from 'lucide-react';

interface FilterBarProps {
  darkMode: boolean;
  placeholder: string
  pagination? : React.ReactNode
  filterOptions?: string;
  setFilterOptions?: React.Dispatch<React.SetStateAction<string>>;
  // leagues: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ darkMode, placeholder,setFilterOptions,filterOptions ,pagination}) => {
  return (
    <div className={`sticky top-16 z-30 py-3 px-4  mb-4 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} border-b ${darkMode ? 'border-slate-800' : 'border-gray-200'} transition-colors duration-300`}>
      <div className="flex container mx-auto flex-col md:flex-row justify-between gap-4">
        <div className="container mx-auto mr-20 ml-20 relative flex-grow">
          <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          <input
            type="text"
            placeholder={placeholder}
           value={filterOptions ?? ""}
            onChange={(e) => setFilterOptions!(e.target.value)}
            className={`pl-10 pr-4 py-2 w-auto rounded-lg border ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200`}
          />
        </div>

        {pagination}
     
      </div>
    </div>
  );
};

export default FilterBar;