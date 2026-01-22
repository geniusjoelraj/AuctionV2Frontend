export interface BatsmanStats {
  runs: number;
  matches: number;
  battingAvg: number;
  strikeRate: number;
}

export interface BowlerStats {
  matches: number;
  wickets: number;
  economy: number;
  bestFigure: string;
}

export interface AllRounderStats {
  runs: number;
  wickets: number;
  matches: number;
  strikeRate: number;
}

export type PlayerType = 'BATSMAN' | 'BOWLER' | 'ALL_ROUNDER';

export interface Player {
  id: number;
  name: string;
  imageLink: string;
  type: PlayerType;
  batsmanStats: BatsmanStats | null;
  bowlerStats: BowlerStats | null;
  allRounderStats: AllRounderStats | null;
  setId: number;
  price: number;
  points: number;
  order: number;
}

