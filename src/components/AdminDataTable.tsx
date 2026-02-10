'use client';

import { useEffect, useState } from "react";
import { fetchTeamPlayers, getTeamDetails } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { teams } from "@/utils/constants";
import { DataTableWrapper } from "./DataTableWrapper";
import GameLogs from "./GameLogs";
import AdminControls from "./AdminControls";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function AdminDataTable() {
  const router = useRouter()
  const [data, setData] = useState<any>();
  const [curTeam, setCurTeam] = useState('CSK')

  useEffect(() => {
    if (!localStorage.getItem('game') && localStorage.getItem('teamName') !== 'admin') {
      router.push('/')
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
  // useHotkeys('1', () => setCurTeam(teams[0]));
  // useHotkeys('2', () => setCurTeam(teams[1]));
  // useHotkeys('3', () => setCurTeam(teams[2]));
  // useHotkeys('4', () => setCurTeam(teams[3]));
  // useHotkeys('5', () => setCurTeam(teams[4]));
  // useHotkeys('6', () => setCurTeam(teams[5]));
  // useHotkeys('7', () => setCurTeam(teams[6]));
  // useHotkeys('8', () => setCurTeam(teams[7]));
  // useHotkeys('9', () => setCurTeam(teams[8]));
  // useHotkeys('0', () => setCurTeam(teams[9]));


  if (!data) return <div>Loading...</div>;


  return (
    <>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel>
          <Tabs defaultValue="CSK" className="">
            <TabsList variant='line'>
              {teams.map((team) => (
                <TabsTrigger value={team} key={team} onClick={() => setCurTeam(team)}>{team}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <DataTableWrapper teamName={curTeam} key={curTeam} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <GameLogs />
          <AdminControls />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
