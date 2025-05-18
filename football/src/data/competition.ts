import { C } from '../types';

export const competitions: C[] = [
  {
    id: 1,
    name: "UEFA Champions League",
    logo: "https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg",
    country: "Europe",
    type: "International",
    founded: 1955,
    teams: 32,
    currentChampion: "Manchester City",
    seasonStart: "September",
    seasonEnd: "May",
    description: "The UEFA Champions League is UEFA's elite club competition with top clubs across Europe playing for the coveted trophy.",
    prize: "€20 million",
    tier: 1
  },
  {
    id: 2,
    name: "Premier League",
    logo: "https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg",
    country: "England",
    type: "League",
    founded: 1992,
    teams: 20,
    currentChampion: "Manchester City",
    seasonStart: "August",
    seasonEnd: "May",
    description: "The Premier League is the top level of the English football league system.",
    prize: "£150 million",
    tier: 1
  },
  {
    id: 3,
    name: "FIFA World Cup",
    logo: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    country: "International",
    type: "International",
    founded: 1930,
    teams: 32,
    currentChampion: "Argentina",
    seasonStart: "November",
    seasonEnd: "December",
    description: "The FIFA World Cup is the most prestigious football competition in the world.",
    prize: "$42 million",
    tier: 1
  },
  {
    id: 4,
    name: "Copa Libertadores",
    logo: "https://images.pexels.com/photos/46792/the-ball-stadion-football-the-pitch-46792.jpeg",
    country: "South America",
    type: "International",
    founded: 1960,
    teams: 47,
    currentChampion: "Fluminense",
    seasonStart: "February",
    seasonEnd: "November",
    description: "The Copa Libertadores is South America's premier club football competition.",
    prize: "$18 million",
    tier: 1
  }
];