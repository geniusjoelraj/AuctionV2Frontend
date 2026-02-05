import { fetchTeamPlayers } from "@/utils/api"
import { SubstituteDataTable } from "./SubsitituteDataTable"
import { substituteColumn } from "./SubstituteColumn"
import { Transaction } from "@/types/api"
import { Button } from "./ui/button"

export default function SetSubstitute({ players, setSetTeam }: { players: Transaction[], setSetTeam: any }) {
  const data = players
  return (
    <div className="container mx-auto py-10">
      <SubstituteDataTable columns={substituteColumn} data={data} />
      <Button onClick={() => setSetTeam(false)} className="mt-5">Back to teams</Button>
    </div>
  )
}
