import { fetchTeamPlayers } from "@/utils/api"
import { SubstituteDataTable } from "./SubsitituteDataTable"
import { substituteColumn } from "./SubstituteColumn"
import { Transaction } from "@/types/api"

export default function SetSubstitute({ players }: { players: Transaction[] }) {
  const data = players

  return (
    <div className="container mx-auto py-10">
      <SubstituteDataTable columns={substituteColumn} data={data} />
    </div>
  )
}
