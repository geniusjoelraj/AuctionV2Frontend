import { Player } from '@/types/api'
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:6769';

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/1/players`);
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.statusText}`);
    }
    const data: Player[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};

export const purchasePlayer = async (team: string, id: number, finalBid: number) => {
  const GAME_ID = 1;
  try {
    const response = await fetch(`${BASE_URL}/game/${GAME_ID}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "playerId": id,
        "teamAssociation": team,
        "finalBid": finalBid
      })
    });

    if (response.ok) {
      // If the server sends a JSON message, parse it:
      const result = await response.json();
      toast.success(result.message || "Player purchased successfully!");
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Failed to purchase player");
    }

  } catch (err) {
    console.error("Failed to purchase player", err);
    toast.error("Network error: Could not reach server");
    throw err;
  }
}

export const refundPlayer = async (playerId: number) => {
  const GAME_ID = 1;
  try {
    const response = await fetch(`${BASE_URL}/game/${GAME_ID}/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "playerId": playerId,
      })
    });

    if (response.ok) {
      const result = await response.json();
      toast.success(result.message || "Player refunded successfully!");
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Failed to refund player");
    }

  } catch (err) {
    console.error("Failed to purchase player", err);
    toast.error("Network error: Could not reach server");
    throw err;
  }
}
