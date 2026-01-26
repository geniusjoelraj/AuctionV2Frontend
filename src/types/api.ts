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
//
// export interface WicketKeeperStats {
//   runs: number;
//   battingAvg: number;
//   matches: number;
//   strikeRate: number;
// }

export interface AllRounderStats {
  runs: number;
  wickets: number;
  matches: number;
  strikeRate: number;
}

export type PlayerType = 'BATSMAN' | 'BOWLER' | 'ALL_ROUNDER' | 'WICKET_KEEPER';

export interface Player {
  id: number;
  name: string;
  imageLink: string;
  type: PlayerType;
  batsmanStats: BatsmanStats | null;
  bowlerStats: BowlerStats | null;
  allRounderStats: AllRounderStats | null;
  setId: number;
  isUncapped: boolean;
  isLegend: boolean;
  country: string;
  status: "FOR_SALE" | "SOLD";
  price: number;
  points: number;
  order: number;
}

export type Transaction = {
  "name": string;
  "playerType": string;
  "boughtFor": number;
  "points": number;
  "isForeign": boolean;
  "isLegend": boolean;
  "isUncapped": boolean;
}

export type TeamDetails = {
  "id": number;
  "gameId": number;
  "name": string;
  "association": string;
  "balance": number;
  "points": number;
  "playerCount": number;
  "allRounderCount": number;
  "batsmanCount": number;
  "bowlerCount": number;
  "wicketKeeperCount": number;
  "uncappedCount": number;
}
