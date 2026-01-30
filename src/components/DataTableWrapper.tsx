'use client';

import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { fetchTeamPlayers, getTeamDetails } from "@/utils/api";

export function DataTableWrapper() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {

    const gameId = parseInt(localStorage.getItem('game')!);
    const teamName = localStorage.getItem('teamName')!;
    Promise.all([
      fetchTeamPlayers(teamName, gameId),
      getTeamDetails(teamName, gameId)
    ]).then(([players, teamDetails]) => {
      setData({ players, teamDetails, teamName });
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  return <DataTable players={data.players} teamDetails={data.teamDetails} teamName={data.teamName} />;
}
