export interface Match {
  id: string;
  team1: {
    name: string;
    logo: string;
    score?: number;
  };
  team2: {
    name: string;
    logo: string;
    score?: number;
  };
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'completed';
  league: string;
  venue?: string;
}

export interface MatchFilterOptions {
  status: string;
  league: string;
  searchQuery: string;
}

export interface Matche {
  id: string;
  tournamentId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  round: string;
  venue: string;
}


export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  logoUrl: string;
  participants: number;
}


export interface Competition {
  id: string;
  name: string;
  season: string;
  type: 'league' | 'cup' | 'friendly';
  logoUrl: string;
  currentMatchday: number;
  totalMatchdays: number;
}

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}