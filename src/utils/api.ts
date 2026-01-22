import { Player } from '@/types/api'
const BASE_URL = 'http://localhost:6769'; // Replace with your actual URL

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/1/preview`);

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

export const purchasePlayer = async (team: string) => {
  const GAME_ID = 1;
  try {
    await fetch(`${BASE_URL}/game/${GAME_ID}/purchase`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "playerId": 1,
          "teamAssociation": team,
          "finalBid": 100000000
        })
      }
    )
  } catch (err) {
    console.log("Failed to purchase player", err);
    throw err
  }
}
