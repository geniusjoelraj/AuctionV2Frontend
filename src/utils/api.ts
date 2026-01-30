import { Player, TeamDetails, Transaction } from '@/types/api'
import { toast } from 'react-toastify';

const HOST = process.env.NEXT_PUBLIC_HOST
const BASE_URL = `http://${HOST}:6769`;

export const fetchPlayers = async (gameId: number): Promise<Player[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/players`);
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

export const fetchTeamPlayers = async (team: string, gameId: number): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/team/${team}/purchases`);
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.statusText}`);
    }
    const data: Transaction[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};

export const fetchAllTeamPlayers = async (gameId: number): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/team/players`);
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.statusText}`);
    }
    const data: Transaction[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};

export const purchasePlayer = async (team: string, id: number, finalBid: number, gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/purchase`, {
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

export const getTeamDetails = async (team: string, gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/team/${team.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(`Error fetching team details: ${response.statusText}`);
    }
    const data: TeamDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch team details:", error);
    throw error;
  }
}

export const getALlTeamDetails = async (gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/team`);
    if (!response.ok) {
      throw new Error(`Error fetching team details: ${response.statusText}`);
    }
    const data: Array<TeamDetails> = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch team details:", error);
    throw error;
  }
}


export const refundPlayer = async (playerId: number, gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/refund`, {
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
