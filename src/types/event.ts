import { Transaction } from "./api";

export interface RefundEvent {
  eventType: 'REFUND';
  timestamp: string;
  payload: {
    playerName: string;
    playerStatus: string;
    message: string;
  };
}

export interface PurchaseEvent {
  eventType: 'PURCHASE';
  timestamp: string;
  payload: {
    name: string;
    playerType: string;
    boughtFor: number;
    points: number;
    isForeign: boolean;
    isLegend: boolean;
    isUncapped: boolean;
  };
}

export interface TeamUpdateEvent {
  eventType: 'TEAM_UPDATE';
  timestamp: string;
  payload: Transaction;
}

type GameEvent = RefundEvent | PurchaseEvent | TeamUpdateEvent;

export interface UseGameWebSocketProps {
  gameId: number;
  teamAssociation: string;
  onRefund?: (event: RefundEvent) => void;
  onPurchase?: (event: PurchaseEvent) => void;
  onTeamUpdate?: (event: TeamUpdateEvent) => void;
  wsUrl?: string;
}

