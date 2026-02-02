'use client';


import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { fetchTeamPlayers, getTeamDetails } from "@/utils/api";
import { useRouter } from "next/navigation";

export function DataTableWrapper({ teamName }: { teamName?: string }) {
  const router = useRouter()
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!localStorage.getItem('game') && !localStorage.getItem('team')) {
      router.push('/team')
    }
    const gameId = parseInt(localStorage.getItem('game')!);
    const team = teamName ? teamName : localStorage.getItem('teamName')!;
    console.log(teamName);
    if (gameId && team) {
      Promise.all([
        fetchTeamPlayers(team, gameId),
        getTeamDetails(team, gameId)
      ]).then(([players, teamDetails]) => {
        setData({ players, teamDetails, team });
      });
    }
  }, []);

  if (!data) return <div>Loading...</div>;

  return <DataTable players={data.players} teamDetails={data.teamDetails} teamName={data.team} />;
}
