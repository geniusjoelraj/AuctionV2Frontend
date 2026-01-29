import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client: Client;
const HOST = process.env.NEXT_PUBLIC_HOST;

export const Event = (
  team: string,
  onPurchase: (purchase: string) => void,
  onRefund: (refund: string) => void,
  onTeam: (team: string) => void,
  onBid: (bid: string) => void
) => {
  client = new Client({
    webSocketFactory: () => new SockJS(`http://${HOST}:6769/ws`),
    onConnect: () => {
      client.subscribe(`/topic/game/1/purchases/${team}`, (purchase) => {
        onPurchase(purchase.body);
      });
      client.subscribe(`/topic/game/1/refunds/${team}`, (refund) => {
        onRefund(refund.body);
      });
      client.subscribe(`/topic/game/1/team/${team}`, (teams) => {
        onTeam(teams.body);
      });
      client.subscribe(`/topic/game/1/bids`, (bid) => {
        onBid(bid.body); // Fixed: was calling onTeam
      });
    },
  });
  client.activate();

  return () => {
    if (client) {
      console.log("🧹 Disconnecting WS");
      client.deactivate();
    }
  };
};

export function useStompClient() {
  const publish = (body: any, destination: string = '/app/game/1/bids') => {
    if (client && client.connected) {
      client.publish({
        destination,
        body: JSON.stringify(body),
      });
    } else {
      console.warn("STOMP client is not connected");
    }
  };

  return { publish };
}
