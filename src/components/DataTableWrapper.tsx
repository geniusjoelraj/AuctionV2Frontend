'use client';
import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { fetchTeamPlayers, getTeamDetails } from "@/utils/api";
import { useRouter } from "next/navigation";

export function DataTableWrapper({ teamName }: { teamName?: string }) {
  const router = useRouter()
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTeamName = localStorage.getItem('teamName');
    const gameId = localStorage.getItem('game');

    if (!gameId || !storedTeamName) {
      router.push('/')
      return;
    }

    if (storedTeamName !== 'admin' && storedTeamName !== 'host') {
      router.push('/team/view')
      return;
    }

    const parsedGameId = parseInt(gameId);

    if (parsedGameId) {
      const team = teamName || 'CSK';

      setIsLoading(true);
      Promise.all([
        fetchTeamPlayers(team, parsedGameId),
        getTeamDetails(team, parsedGameId)
      ]).then(([players, teamDetails]) => {
        setData({ players, teamDetails, team });
        setIsLoading(false);
      }).catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
    }
  }, [teamName, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return <DataTable players={data.players} teamDetails={data.teamDetails} teamName={data.team} />;
}
