'use client';

import { useEffect, useState } from "react";
import { fetchTeamPlayers, getTeamDetails } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { teams } from "@/utils/constants";
import { DataTableWrapper } from "./DataTableWrapper";
import GameLogs from "./GameLogs";

export function AdminDataTable() {
  const router = useRouter()
  const [data, setData] = useState<any>();
  const [curTeam, setCurTeam] = useState('RCB')

  useEffect(() => {
    if (!localStorage.getItem('game') && localStorage.getItem('teamName') !== 'admin') {
      router.push('/team')
    }
    const gameId = parseInt(localStorage.getItem('game')!);
    if (gameId) {
      Promise.all([
        fetchTeamPlayers(curTeam, gameId),
        getTeamDetails(curTeam, gameId)
      ]).then(([players, teamDetails]) => {
        setData({ players, teamDetails, teams });
      });
    }

  }, []);

  if (!data) return <div>Loading...</div>;


  return (
    <>
      <div className="flex p-5 gap-5 h-full items-start">
        <div className="flex-1/2 flex flex-col gap-5 justify-center items-center">
          <Tabs defaultValue="account" className="">
            <TabsList variant='line'>
              {teams.map((team) => (
                <TabsTrigger value={team} key={team} onClick={() => setCurTeam(team)}>{team}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <DataTableWrapper teamName={curTeam} key={curTeam} />
        </div>
        <div className="flex-1/2"><GameLogs /> </div>
      </div>
    </>
  )
}
