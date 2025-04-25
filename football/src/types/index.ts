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