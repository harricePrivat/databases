import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Goal, Award } from 'lucide-react';
import Pagination from './Pagination';
// import { competitionStats } from '../data/competitionStats';

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

type CompetitionStatsProps={
    darkMode: boolean,
    name:string,
    goal : {
      team_name: string,
      total_goals: number,
    }[],
    match: {
      team_name: string,
      total_matches: number,
    }[],
    win: {
        team_name:string,
        wins: number
    }[]


}

const CompetitionStats: React.FC<CompetitionStatsProps>= ({darkMode,name,match,win,goal}) => {
  // const { competitionName, teamStats, historicalParticipation } = competitionStats;
  // Sort teams by different metrics
  const [currentPage,setCurrentPage]=useState(1)
 const darkModes = darkMode
  const topScorers = [...goal].slice((currentPage*5)-5,currentPage*5).sort((a, b) => b.total_goals - a.total_goals);
  const mostWins = [...win].slice((currentPage*5)-5,currentPage*5).sort((a, b) => b.wins - a.wins);
  const mostAppearances = match.slice((currentPage*5)-5,currentPage*5).map((c)=>({
    team: c.team_name,
    appearances: c.total_matches
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`${darkModes?"bg-gray-850" : "bg-white"} rounded-xl shadow-lg p-6`}>
      <div className="mb-8">
          <h1 className={`${darkModes?"text-gray-100" :"text-gray-900"} text-3xl font-bold `}>{name}</h1>
          <p className={`${darkModes?"text-gray-300" :"text-gray-600"} mt-2 `}>Statistiques de la competition</p>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Meuilleur Buteur</h3>
              <Goal className="text-blue-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-blue-800">{goal[0].team_name}</div>
            <div className="text-blue-600 mt-1">{goal[0].total_goals} buts</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-900">Plus de vainqueurs</h3>
              <Trophy className="text-green-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-green-800">{win[0].team_name}</div>
            <div className="text-green-600 mt-1">{win[0].wins} victoires</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-900">Plus d'apparition</h3>
              <Award className="text-purple-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-purple-800">{match[0].team_name}</div>
            <div className="text-purple-600 mt-1">{match[0].total_matches} apparition</div>
          </div>
        </div>
        <div className='w-full items-center justify-center'>
          <Pagination currentPage={currentPage} totalPages={Math.ceil(goal.length/5)} onPageChange={(current:number)=>{
            setCurrentPage(current)
          }}/>
          </div>

        {/* Goals Scored Chart */}
        <div className="mb-12">
          <h2 className={`${darkMode?"text-white": "text-gray-600"} text-xl font-semibold mb-4`}>But marque par equipe</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topScorers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team_name" />
                <YAxis dataKey={"total_goals"}/>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className={`${darkMode?"bg-gray-600":"bg-white"} p-3 shadow-lg rounded-lg border`}>
                          <p className={`${darkModes?"text-gray-300" : "text-gray-600"}"font-semibold"`}>{payload[0].payload.name}</p>
                          <p className="text-blue-400">Goals: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="total_goals" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Participation Chart */}
        <div className="mb-12">
          <h2 className={`${darkMode?"text-white": "text-gray-600"} text-xl font-semibold mb-4`}>Historique de Participation</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mostAppearances}
                  dataKey="appearances"
                  nameKey="team"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {mostAppearances.map((entry,index) => (
                    <Cell key={`cell-${index}-${entry}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className={`${darkMode?"bg-gray-600":"bg-white"} p-3 shadow-lg rounded-lg border`}>
                          <p className={`${darkModes?"text-gray-300" : "text-gray-600"}"font-semibold"`}>{payload[0].name}</p>
                          <p className="text-blue-400">{payload[0].value} appearances</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win Records */}
        <div>
          <h2 className={`${darkMode?"text-white": "text-gray-600"} text-xl font-semibold mb-4`}>Victoires par equipes</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mostWins}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team_name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className={`${darkMode?"bg-gray-600":"bg-white"} p-3 shadow-lg rounded-lg border`}>
                          <p className={`${darkModes?"text-gray-300" : "text-gray-600"}"font-semibold"`}>{payload[0].payload.name}</p>
                          <p className="text-green-400">Wins: {payload[0].payload.wins}</p>
                          {/* <p className="text-blue-400">Draws: {payload[0].payload.draws}</p>
                          <p className="text-red-400">Losses: {payload[0].payload.losses}</p> */}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="wins" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionStats;