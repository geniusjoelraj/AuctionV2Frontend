import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Player, PlayerType } from "@/types/api"
import { Dispatch, SetStateAction, useState } from "react"

export function PlayerSearch({ players, setCurrentIndex, setFilter }: { players: Array<Player>, setCurrentIndex: Dispatch<SetStateAction<number>>, setFilter: Dispatch<SetStateAction<PlayerType>> }) {
  const [selectedPlayer, setSelectedPlayer] = useState("")

  const search = (formdata: FormData) => {
    const playerName = formdata.get("player") as string
    const player = players.find((player) => player.name === playerName)
    if (player) {
      const filteredPlayers = players.filter((p) => p.type === player.type)
      const filPlay = filteredPlayers.indexOf(player)
      if (filPlay !== undefined) {
        setFilter(player.type)
        setCurrentIndex(filPlay)
        console.log(filPlay);
      }
    }
  }

  return (
    <form action={search} className="flex gap-2">
      <Combobox
        items={players.map((player) => player.name)}
        value={selectedPlayer}
        onValueChange={(value) => setSelectedPlayer(value || "")}
        name="player"
      >
        <ComboboxInput placeholder="Search for player" />
        <ComboboxContent>
          <ComboboxEmpty>No players found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <button type="submit" className="bg-[#674D63] p-2 py-1 rounded-sm">Go</button>
    </form>
  )
}
