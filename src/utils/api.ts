import { Game, NewGame, Player, TeamDetails, TeamResult, Transaction } from '@/types/api'
import { toast } from 'react-toastify';
import { teams } from './constants';

const HOST = process.env.NEXT_PUBLIC_HOST || "localhost"
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

export const fetchPlayer = async (gameId: number, name: string): Promise<Player> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/player/${name}`);
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.statusText}`);
    }
    const data: Player = await response.json();
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

export const getGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/game`)
    const games: Game[] = await response.json()
    return games
  } catch (err) {
    console.log("Failed to get games", err);
    throw err
  }
}

export const getGame = async (gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}`)
    const games: Game = await response.json()
    return games
  } catch (err) {
    console.log("Failed to get games", err);
    throw err
  }
}

export const createGame = async (newgame: NewGame) => {
  try {
    const response = await fetch(`${BASE_URL}/game`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newgame)
    })
    if (response.ok) {
      const result = await response.json();
      toast.success(result.message || "Game created successfully");
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Failed to create game");
    }

  } catch (err) {
    console.log("Failed to get games", err);
    throw err
  }
}

export const getLogs = async (gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/audit`)
    if (response.ok) {
      const result = await response.json()
      return result
    }
  } catch (err) {
    console.log("Failed to fetch game logs");
    throw err
  }

}

export const startGame = async (gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/start`, {
      method: 'POST',
      body: JSON.stringify({
        command: "START"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const res = await response.json()
      toast.success(res.message)
    } else {
      const errorData = await response.json();
      toast.error(errorData.message)
    }
  } catch (err) {
    console.log("Failed to start game", err);
  }
}
export const fetchUnsoldPlayers = async (gameId: number): Promise<Player[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/players/unsold`);
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


export const fetchSoldPlayers = async (gameId: number): Promise<Player[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/players/sold`);
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

// Game End

export const finalizeGame = async (gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/finalize`, {
      method: 'POST',
    })
    if (response.ok) {
      const res = await response.json()
      toast.success(res.message)
    } else {
      const errorData = await response.json();
      toast.error(errorData.message)
    }
  } catch (err) {
    console.log("Failed to finalize game", err);
  }
}

export const getLockedIn = async (gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/selection/locked-in`);
    if (!response.ok) {
      toast.error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch locked-in:", error);
    throw error;
  }
};

export const LockInSelection = async (gameId: number, teamName: string, substitutes: number[]) => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/selection`, {
      method: 'POST',
      body: JSON.stringify({
        teamAssociation: teamName,
        substitutes: substitutes
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const res = await response.json()
      toast.success(res.message)
    } else {
      const errorData = await response.json();
      toast.error(errorData.message)
    }
  } catch (err) {
    console.log("Failed to lockin selection", err);
  }
}

export const EndGameAndFinalize = async (gameId: number): Promise<TeamResult[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/end`);
    if (!response.ok) {
      toast.error(`Error ending game: ${response.statusText}`);
    }
    const data: TeamResult[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to end game:", error);
    throw error;
  }
}

export const getResults = async (gameId: number): Promise<TeamResult[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game/${gameId}/results`);
    if (!response.ok) {
      toast.error(response.statusText);
    }
    const data: TeamResult[] = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Failed to get results:", error);
    throw error;
  }
};

