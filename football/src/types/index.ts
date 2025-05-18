

//==========================//
export type MatchProps= {
    nomTournois : string,
    home_score: number,
    away_score: number,
    home_team: string,
    home_flag_svg:string,
    home_flag_png:string
    away_flag_svg:string,
    away_flag_png:string
    away_team: string,
    date: string
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


export interface Competition {
  tournament_name:string,
  onClick: ()=> void,
  first_match_date: string,
  total_matches: string,
  last_match_date: string,
  total_teams: number,
  darkMode: boolean
}


export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  won: number;
  drawn: number;
  lost: number;
}
export interface TeamStatsProps {
  teamName: string;
  darkMode: boolean;
  won:number;
  lost:number;
  drawn: number;
  yearlyStats: {
    year: number;
    wins: number;
    losses: number;
    draws: number;
    goalsFor: number;
    goalsAgainst: number;
  }[];
}


export interface T {
  id: number;
  name: string;
  logo: string;
  stadium: string;
  founded: number;
  league: string;
  coach: string;
  description: string;
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}