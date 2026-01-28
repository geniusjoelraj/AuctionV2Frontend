import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client: Client;

export const Event = (
  team: string,
  onPurchase: (purchase: string) => void,
  onRefund: (refund: string) => void
) => {
  client = new Client({
    webSocketFactory: () => new SockJS("http://localhost:6769/ws"),
    onConnect: () => {
      client.subscribe(`/topic/game/1/purchases/${team}`, (purchase) => {
        onPurchase(purchase.body);
      });
      client.subscribe(`/topic/game/1/refunds/${team}`, (refund) => {
        onRefund(refund.body);
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

