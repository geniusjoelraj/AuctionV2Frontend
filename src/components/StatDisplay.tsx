import { Player } from "@/types/api";

export default function StatDisplay({ player }: { player: Player }) {
  if ((player.type === "BATSMAN" || player.type === "WICKET_KEEPER") && player.batsmanStats) {
    const s = player.batsmanStats;
    return (
      <div className="grid grid-cols-2 gap-1 stat text-xl font-semibold" >
        <p>Runs: {s.runs}</p>
        <p>Avg: {s.battingAvg}</p>
        <p>SR: {s.strikeRate}</p>
        <p>Matches: {s.matches}</p>
      </div>
    );
  }

  if (player.type === "BOWLER" && player.bowlerStats) {
    const s = player.bowlerStats;
    return (

      <div className="grid grid-cols-2 gap-1 stat text-xl font-semibold">
        <p>Wickets: {s.wickets}</p>
        <p>Econ: {s.economy}</p>
        <p>Best: {s.bestFigure}</p>
        <p>Matches: {s.matches}</p>
      </div>
    );
  }

  if (player.type === "ALL_ROUNDER" && player.allRounderStats) {
    const s = player.allRounderStats
    return (
      <div className="grid grid-cols-2 gap-1 stat text-xl font-semibold">
        <p>Runs: {s.runs}</p>
        <p>Wickets: {s.wickets}</p>
        <p>Matches: {s.matches}</p>
        <p>SR: {s.strikeRate}</p>
      </div>
    )
  }
  return <p className="text-gray-400 italic">No specific stats available.</p>;
}
