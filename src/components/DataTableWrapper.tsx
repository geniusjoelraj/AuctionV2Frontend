'use client';

import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { fetchTeamPlayers, getTeamDetails } from "@/utils/api";
import { useRouter } from "next/navigation";

export function DataTableWrapper() {
  const router = useRouter()
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!localStorage.getItem('game') && !localStorage.getItem('team')) {
      router.push('/team')
    }
    const gameId = parseInt(localStorage.getItem('game')!);
    const teamName = localStorage.getItem('teamName')!;
    if (gameId && teamName) {
      Promise.all([
        fetchTeamPlayers(teamName, gameId),
        getTeamDetails(teamName, gameId)
      ]).then(([players, teamDetails]) => {
        setData({ players, teamDetails, teamName });
      });
    }

  }, []);

  if (!data) return <div>Loading...</div>;

  return <DataTable players={data.players} teamDetails={data.teamDetails} teamName={data.teamName} />;
}
