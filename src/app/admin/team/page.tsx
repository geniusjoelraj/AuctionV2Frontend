import { TeamDetails } from "@/types/api";
import { getALlTeamDetails } from "@/utils/api";

export default async function TeamView() {
  const allTeamDetails: Array<TeamDetails> = await getALlTeamDetails();

  return (
    <div className="p-10 grid-cols-2 grid gap-5">
      {allTeamDetails.map((teamDetails) => (
        <div key={teamDetails.id || teamDetails.name} className="mb-10">
          <p className="text-center mt-10">{teamDetails.name}</p>
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl shadow-sm border">
            <div className="p-2 border-b">Balance: <span className="font-bold">₹{teamDetails.balance.toFixed(2)}</span></div>
            <div className="p-2 border-b">Spent: <span className="font-bold">₹{(10000000 - teamDetails.balance).toFixed(2)}</span></div>

            <div className="p-2 border-b">Total Points: <span className="font-bold">{teamDetails.points}</span></div>
            <div className="p-2 border-b">All Rounders: <span className="font-bold">{teamDetails.allRounderCount}</span></div>

            <div className="p-2 border-b">Batsman: <span className="font-bold">{teamDetails.batsmanCount}</span></div>
            <div className="p-2 border-b">Bowler: <span className="font-bold">{teamDetails.bowlerCount}</span></div>

            <div className="p-2">Wicket Keeper: <span className="font-bold">{teamDetails.wicketKeeperCount}</span></div>
            <div className="p-2">Player Count: <span className="font-bold">{teamDetails.playerCount}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}
