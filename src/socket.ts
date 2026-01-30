import { Client, IFrame, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const HOST = process.env.NEXT_PUBLIC_HOST || "localhost"
const SOCKET_URL = `http://${HOST}:6769/ws`;

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

class SocketService {
  private client: Client | null = null;
  private connectionStatus: ConnectionStatus = 'disconnected';
  private subscriptions: Map<string, StompSubscription> = new Map();
  private pendingSubscriptions: Array<{
    topic: string;
    callback: (payload: any) => void;
  }> = [];

  connect(onConnected?: (frame: IFrame) => void, onError?: (error: any) => void) {
    if (this.client?.active) {
      console.log("Already connected");
      return;
    }

    this.connectionStatus = 'connecting';

    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: (frame) => {
        console.log("✅ Connected to STOMP");
        this.connectionStatus = 'connected';

        // Process any pending subscriptions
        this.processPendingSubscriptions();

        onConnected?.(frame);
      },

      onDisconnect: () => {
        console.log("❌ Disconnected from STOMP");
        this.connectionStatus = 'disconnected';
        this.subscriptions.clear();
      },

      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers['message']);
        console.error("Details:", frame.body);
        onError?.(frame);
      },

      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        onError?.(error);
      },
    });

    this.client.activate();
  }

  private processPendingSubscriptions() {
    while (this.pendingSubscriptions.length > 0) {
      const pending = this.pendingSubscriptions.shift();
      if (pending) {
        this.subscribe(pending.topic, pending.callback);
      }
    }
  }

  subscribe(topic: string, callback: (payload: any) => void): StompSubscription | null {
    // If not connected yet, queue the subscription
    if (this.connectionStatus !== 'connected') {
      console.warn(`Connection not ready. Queuing subscription to ${topic}`);
      this.pendingSubscriptions.push({ topic, callback });
      return null;
    }

    if (!this.client) {
      console.error("Client not initialized");
      return null;
    }

    // Prevent duplicate subscriptions
    if (this.subscriptions.has(topic)) {
      console.warn(`Already subscribed to ${topic}`);
      return this.subscriptions.get(topic)!;
    }

    try {
      const subscription = this.client.subscribe(topic, (message) => {
        try {
          const payload = JSON.parse(message.body);
          callback(payload);
        } catch (error) {
          console.error("Error parsing message:", error);
          console.error("Raw message:", message.body);
        }
      });

      this.subscriptions.set(topic, subscription);
      console.log(`📡 Subscribed to ${topic}`);

      return subscription;
    } catch (error) {
      console.error(`Failed to subscribe to ${topic}:`, error);
      return null;
    }
  }

  unsubscribe(topic: string) {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
      console.log(`📴 Unsubscribed from ${topic}`);
    }
  }

  publish(destination: string, body: any) {
    if (!this.client || this.connectionStatus !== 'connected') {
      console.error("Cannot publish: Not connected");
      return false;
    }

    try {
      this.client.publish({
        destination,
        body: JSON.stringify(body),
      });
      console.log(`📤 Published to ${destination}`);
      return true;
    } catch (error) {
      console.error("Failed to publish:", error);
      return false;
    }
  }

  disconnect() {
    if (this.client) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
      this.subscriptions.clear();
      this.pendingSubscriptions = [];

      this.client.deactivate();
      this.client = null;
      this.connectionStatus = 'disconnected';
      console.log("🔌 Disconnected");
    }
  }

  isConnected(): boolean {
    return this.connectionStatus === 'connected' && !!this.client?.active;
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus;
  }
}

export const socketService = new SocketService();
