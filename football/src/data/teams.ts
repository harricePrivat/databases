import { T } from '../types';

export const teams: T[] = [
  {
    id: 1,
    name: "Paris Saint-Germain",
    logo: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
    stadium: "Parc des Princes",
    founded: 1970,
    league: "Ligue 1",
    coach: "Luis Enrique",
    description: "Paris Saint-Germain Football Club, commonly known as PSG, is a professional football club based in Paris, France.",
   
    stats: {
      wins: 18,
      draws: 5,
      losses: 2,
      goalsFor: 58,
      goalsAgainst: 22
    }
  },
  {
    id: 2,
    name: "Olympique de Marseille",
    logo: "https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg",
    stadium: "Orange Vélodrome",
    founded: 1899,
    league: "Ligue 1",
    coach: "Jean-Louis Gasset",
    description: "Olympique de Marseille is a French professional football club based in Marseille, Provence-Alpes-Côte d'Azur.",
  
    stats: {
      wins: 12,
      draws: 7,
      losses: 6,
      goalsFor: 42,
      goalsAgainst: 28
    }
  },
  {
    id: 3,
    name: "AS Monaco",
    logo: "https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg",
    stadium: "Stade Louis II",
    founded: 1924,
    league: "Ligue 1",
    coach: "Adi Hütter",
    description: "Association Sportive de Monaco Football Club is a professional football club based in Monaco.",

    stats: {
      wins: 13,
      draws: 6,
      losses: 6,
      goalsFor: 44,
      goalsAgainst: 32
    }
  }
];