import { purchasePlayer } from "@/utils/api";
import { teams } from "@/utils/constants";

export default function Bidder() {
  return (
    <div className="grid grid-cols-2 grid-rows-5 gap-3 bg-blue-500 p-4">
      {teams.map((team) => <div key={team} className="bg-blue-400 p-3 rounded-sm hover:bg-blue-600" onClick={() => { purchasePlayer(team) }}>{team}</div>)}
    </div>
  )
}
