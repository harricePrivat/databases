import React from 'react';
// import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string
dark: boolean
}

const StatisticCard: React.FC<StatisticCardProps> = ({ 
  title, 
  value, 
  icon,
  dark,
  bgColor = 'bg-indigo-600' 
}) => {
  return (
    <div className={`${dark?'hover:bg-gray-600': 'hover:bg-gray-100'} ${dark?'bg-gray-800': 'bg-white'} rounded-xl shadow-sm m-4 overflow-hidden`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm font-medium ${dark?'text-gray-400':'text-gray-500' } mb-1`}>{title}</p>
            <h3 className={`text-2xl font-bold ${dark?'text-white':'text-gray-900' } `}>{value}</h3>
          </div>       
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor} `}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;