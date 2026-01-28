import { DataTable } from "@/components/DataTable";
import { fetchTeamPlayers, getTeamDetails } from "@/utils/api";

export async function DataTableWrapper({ team }: { team: string }) {
  const [players, teamDetails] = await Promise.all([
    fetchTeamPlayers(team),
    getTeamDetails(team)
  ])

  return <DataTable players={players} teamDetails={teamDetails} teamName={team} />;

}
