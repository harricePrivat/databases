import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Trophy, Users, TrendingUp, Target } from 'lucide-react';
import { TeamStatsProps } from '../types';

const StateTeam: React.FC<TeamStatsProps> = ({ teamName, yearlyStats ,darkMode,won,drawn,lost}) => {


  const winPercentages = (yearlyStats || [])
  .filter(stat => stat !== undefined && stat !== null)
  .map(stat => ({
    year: stat.year,
    winRate: ((stat.wins  * 10000 / (stat.wins + stat.losses + stat.draws))).toFixed(1),
    totalGames: stat.wins + stat.losses + stat.draws,
    wins: stat.wins,
    losses: stat.losses,
    draws: stat.draws,
    goalsFor: stat.goalsFor,
    goalsAgainst: stat.goalsAgainst
  }));


  console.log("voici une remarque",yearlyStats)
// Max goalsFor sur une seule année
const maxGoalsFor = Math.max(...yearlyStats.map(stat => stat.goalsFor || 0));

// Max goal difference (goalsFor - goalsAgainst)
const maxGoalDiff = Math.max(...yearlyStats.map(stat => (stat.goalsFor - stat.goalsAgainst) || 0));

const maxGoal = Math.max(...yearlyStats.map(stat => Math.max(stat.goalsFor, stat.goalsAgainst)));

  // console.log("voici une winPercentage",winPercentages)

  // const currentYearStats = yearlyStats[yearlyStats.length - 1];
  // const totalGames = currentYearStats.wins + currentYearStats.losses + currentYearStats.draws;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`${darkMode?"bg-gray-850" : "bg-white"} rounded-xl shadow-lg p-6`}>
        <div className="mb-8">
          <h1 className={`${darkMode?"text-gray-100" :"text-gray-900"} text-3xl font-bold `}>Statistiques de {teamName}</h1>
          <p className={`${darkMode?"text-gray-300" :"text-gray-600"} mt-2 `}>Analyse des performances et historiques des données</p>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`${darkMode ? "bg-gray-600": "bg-blue-50"}  rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${darkMode? "text-blue-200": "text-blue-600" }  text-sm font-medium `}>Taux de victoires</p>
                <p className={`${darkMode? "text-blue-400": "text-blue-800" }  text-2xl font-bold `}>
                  {((won / (won+lost+drawn)) * 100).toFixed(2)}%
                </p>
              </div>
              <Trophy className={`${darkMode? "text-blue-300": "text-blue-500" }  text-sm font-medium `} size={24} />
            </div>
          </div>
          
          <div className={`${darkMode ? "bg-gray-600": "bg-green-50"}  rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${darkMode? "text-green-200": "text-green-600" }  text-sm font-medium `}>But marqué</p>
                <p className={`${darkMode? "text-green-400": "text-green-800" }  text-2xl font-bold `}>{maxGoalsFor}</p>
              </div>
              <Target className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className={`${darkMode ? "bg-gray-600": "bg-purple-50"}  rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${darkMode? "text-purple-200": "text-purple-600" }  text-sm font-medium `}>Matchs total</p>
                <p className={`${darkMode? "text-purple-400": "text-purple-800" }  text-2xl font-bold `}>{(won+lost+drawn)}</p>
              </div>
              <Users className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className={`${darkMode ? "bg-gray-600": "bg-orange-50"}  rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${darkMode? "text-orange-200": "text-orange-600" }  text-sm font-medium `}>Difference de but</p>
                <p className={`${darkMode? "text-orange-400": "text-orange-800" }  text-2xl font-bold `}>
                  {maxGoalDiff}
                </p>
              </div>
              <TrendingUp className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        {/* Victory Graph */}
        <div className={`${darkMode?"bg-gray-600":"bg-white"}  rounded-lg p-6 mb-8`}>
          <h2 className={`${darkMode?"text-white": "text-gray-600"} text-xl font-semibold mb-4`}>Evolution du taux de victoires</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={winPercentages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis unit="%" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className={`${darkMode?"bg-gray-600":"bg-white"} p-3 shadow-lg rounded-lg border`}>
                          <p className="font-semibold">{label}</p>
                          <p className="text-blue-600">Taux de victoires: {payload[0].value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="winRate"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals Analysis */}
        <div className={`${darkMode?"bg-gray-600":"bg-white"}  rounded-lg p-6 mb-8`}>
          <h2  className={`${darkMode?"text-white": "text-gray-600"} text-xl font-semibold mb-4`}>Analyses des buts</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
              dataKey="year" 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              />                
              <YAxis domain={[0, Math.ceil(maxGoal / 10) * 10]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className={`${darkMode ? "bg-gray-600": "bg-blue-50"} p-3 shadow-lg rounded-lg border`}>
                          <p className="font-semibold">{label}</p>
                          <p className={`${darkMode? "text-green-200":"text-green-600"}`}>But marqués: {payload[0].value}</p>
                          <p className={`${darkMode? "text-red-200":"text-red-600"}`}>But concédés: {payload[1].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="goalsFor" fill="#22c55e" name="But marqués " />
                <Bar dataKey="goalsAgainst" fill="#ef4444" name="But concédées" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateTeam;