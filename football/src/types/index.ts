

//==========================//
export type MatchProps= {
    nomTournois : string,
    home_score: number,
    away_score: number,
    home_team: string,
    away_team: string,
    date: string
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


export interface Competition {
  logo:string,
  name:string,
  country: string,
  founded: string,
  type: string,
  teams: string,
  prize: number,
  description: string,
  seasonStart: string,
  seasonEnd: string,
  currentChampion:string
  darkMode: boolean
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
