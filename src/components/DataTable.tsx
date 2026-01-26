import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchTeamPlayers } from "@/utils/api"
import { Badge } from "@/components/ui/badge"


export async function DataTable({ team }: { team: string }) {
  const players = await fetchTeamPlayers(team)
  return (
    <Table>
      <TableCaption>The list of players you have purchased</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Capped</TableHead>
          <TableHead>Points</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.name}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.playerType}</TableCell>
            <TableCell>{player.isUncapped ? <Badge variant="default" >uncapped</ Badge> : null}{player.isForeign ? <Badge variant="secondary" >foreign</ Badge> : null}</TableCell>
            <TableCell>{player.points}</TableCell>
            <TableCell className="text-right">{player.boughtFor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>{players.reduce((acc, curr) => acc + curr.points, 0)}</TableCell>
          <TableCell className="text-right">{players.reduce((acc, curr) => acc + curr.boughtFor, 0)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
