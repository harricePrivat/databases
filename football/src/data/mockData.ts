import { Match, Matche, Tournament } from '../types';

export const matches: Match[] = [
  {
    id: '1',
    team1: {
      name: 'Arsenal',
      logo: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 2,
    },
    team2: {
      name: 'Chelsea',
      logo: 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 1,
    },
    date: '2025-03-15',
    time: '15:00',
    status: 'completed',
    league: 'Premier League',
    venue: 'Emirates Stadium',
  },
  {
    id: '2',
    team1: {
      name: 'Barcelona',
      logo: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 3,
    },
    team2: {
      name: 'Real Madrid',
      logo: 'https://images.pexels.com/photos/4446199/pexels-photo-4446199.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 3,
    },
    date: '2025-03-14',
    time: '20:00',
    status: 'completed',
    league: 'La Liga',
    venue: 'Camp Nou',
  },
  {
    id: '3',
    team1: {
      name: 'Liverpool',
      logo: 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    team2: {
      name: 'Manchester City',
      logo: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    date: '2025-03-28',
    time: '17:30',
    status: 'upcoming',
    league: 'Premier League',
    venue: 'Anfield',
  },
  {
    id: '4',
    team1: {
      name: 'Juventus',
      logo: 'https://images.pexels.com/photos/4446199/pexels-photo-4446199.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 2,
    },
    team2: {
      name: 'AC Milan',
      logo: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 0,
    },
    date: '2025-03-16',
    time: '19:45',
    status: 'completed',
    league: 'Serie A',
    venue: 'Allianz Stadium',
  },
  {
    id: '5',
    team1: {
      name: 'Bayern Munich',
      logo: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    team2: {
      name: 'Borussia Dortmund',
      logo: 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    date: '2025-03-30',
    time: '18:00',
    status: 'upcoming',
    league: 'Bundesliga',
    venue: 'Allianz Arena',
  },
  {
    id: '6',
    team1: {
      name: 'PSG',
      logo: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 1,
    },
    team2: {
      name: 'Lille',
      logo: 'https://images.pexels.com/photos/4446199/pexels-photo-4446199.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 0,
    },
    date: '2025-03-10',
    time: '20:00',
    status: 'completed',
    league: 'Ligue 1',
    venue: 'Parc des Princes',
  },
  {
    id: '7',
    team1: {
      name: 'Manchester United',
      logo: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 1,
    },
    team2: {
      name: 'Tottenham',
      logo: 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 1,
    },
    date: '2025-03-12',
    time: '20:15',
    status: 'completed',
    league: 'Premier League',
    venue: 'Old Trafford',
  },
  {
    id: '8',
    team1: {
      name: 'Inter Milan',
      logo: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    team2: {
      name: 'Napoli',
      logo: 'https://images.pexels.com/photos/4446199/pexels-photo-4446199.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    date: '2025-04-02',
    time: '20:45',
    status: 'upcoming',
    league: 'Serie A',
    venue: 'San Siro',
  },
  {
    id: '9',
    team1: {
      name: 'Ajax',
      logo: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 3,
    },
    team2: {
      name: 'PSV',
      logo: 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      score: 2,
    },
    date: '2025-03-13',
    time: '19:00',
    status: 'completed',
    league: 'Eredivisie',
    venue: 'Johan Cruyff Arena',
  },
  {
    id: '10',
    team1: {
      name: 'Atletico Madrid',
      logo: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    team2: {
      name: 'Sevilla',
      logo: 'https://images.pexels.com/photos/4446199/pexels-photo-4446199.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    },
    date: '2025-04-05',
    time: '21:00',
    status: 'upcoming',
    league: 'La Liga',
    venue: 'Wanda Metropolitano',
  },
];

export const tournaments: Tournament[] = [
  {
    id: 't1',
    name: 'Champions Cup',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    location: 'Multiple Locations',
    status: 'ongoing',
    logoUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    participants: 32
  },
  {
    id: 't2',
    name: 'Summer League',
    startDate: '2025-06-10',
    endDate: '2025-08-20',
    location: 'Miami, USA',
    status: 'upcoming',
    logoUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
    participants: 16
  },
  {
    id: 't3',
    name: 'World Championship',
    startDate: '2024-11-20',
    endDate: '2024-12-18',
    location: 'Qatar',
    status: 'completed',
    logoUrl: 'https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg',
    participants: 32
  },
  {
    id: 't4',
    name: 'Regional Cup',
    startDate: '2025-03-05',
    endDate: '2025-05-15',
    location: 'Berlin, Germany',
    status: 'upcoming',
    logoUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
    participants: 24
  }
];


export const matche: Matche[] = [
  {
    id: 'm1',
    tournamentId: 't1',
    homeTeam: 'Barcelona FC',
    awayTeam: 'Real Madrid',
    homeScore: 2,
    awayScore: 2,
    date: '2025-04-15',
    time: '20:00',
    status: 'completed',
    round: 'Quarter-final',
    venue: 'Camp Nou'
  },
  {
    id: 'm2',
    tournamentId: 't1',
    homeTeam: 'Bayern Munich',
    awayTeam: 'PSG',
    homeScore: 3,
    awayScore: 1,
    date: '2025-04-16',
    time: '20:00',
    status: 'completed',
    round: 'Quarter-final',
    venue: 'Allianz Arena'
  },
  {
    id: 'm3',
    tournamentId: 't1',
    homeTeam: 'Manchester City',
    awayTeam: 'Juventus',
    homeScore: 1,
    awayScore: 0,
    date: '2025-04-17',
    time: '20:00',
    status: 'live',
    round: 'Quarter-final',
    venue: 'Etihad Stadium'
  },
  {
    id: 'm4',
    tournamentId: 't1',
    homeTeam: 'Liverpool',
    awayTeam: 'AC Milan',
    homeScore: null,
    awayScore: null,
    date: '2025-04-18',
    time: '20:00',
    status: 'scheduled',
    round: 'Quarter-final',
    venue: 'Anfield'
  },
  {
    id: 'm5',
    tournamentId: 't2',
    homeTeam: 'Miami Heat',
    awayTeam: 'LA Lakers',
    homeScore: null,
    awayScore: null,
    date: '2025-06-12',
    time: '19:30',
    status: 'scheduled',
    round: 'Group Stage',
    venue: 'Miami Arena'
  }
];
