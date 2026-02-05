'use client'
import { ToastContainer } from "react-toastify";
import { Button } from "./ui/button";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "./ui/combobox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { Player } from "@/types/api"
import { fetchSoldPlayers, fetchUnsoldPlayers, purchasePlayer, refundPlayer } from "@/utils/api";
import { teams } from "@/utils/constants";

export default function AdminControls() {
  const gameId = localStorage.getItem('game')
  const [soldPlayers, setSoldPlayers] = useState<Player[]>()
  const [unsoldPlayers, setUnsoldPlayers] = useState<Player[]>()
  const [selectedPlayer, setSelectedPlayer] = useState<string>("")
  const [purchaseSelectedPlayer, setPurchaseSelectedPlayer] = useState<string>("")
  const [selectedTeam, setSelectedTeam] = useState("")
  const [bid, setBid] = useState<string>("")
  const [tdone, settdone] = useState(true)
  useEffect(() => {
    fetchSoldPlayers(parseInt(gameId!)).then((data) => {
      setSoldPlayers(data)
    })
    fetchUnsoldPlayers(parseInt(gameId!)).then((data) => {
      setUnsoldPlayers(data)
    })
  }, [tdone])

  const refund = async (e: React.FormEvent) => {
    e.preventDefault()
    const refundPlayerId = soldPlayers?.find((player) => player.name === selectedPlayer)
    if (refundPlayerId) {
      await refundPlayer(refundPlayerId?.id, parseInt(gameId!))
      settdone(prev => !prev)
    }
  }

  const purchase = async (e: React.FormEvent) => {
    e.preventDefault()
    const purchasePlayerId = unsoldPlayers?.find((player) => player.name === purchaseSelectedPlayer)
    if (purchasePlayerId) {
      await purchasePlayer(selectedTeam, purchasePlayerId.id, parseInt(bid, 10) * 10000000, parseInt(gameId!))
      settdone(prev => !prev)
      setBid('')
      setSelectedTeam("")
    }
  }

  return (
    <div className="w-full flex">
      <div className="flex w-full px-10 gap-2 items-start">
        {/* PURCHASE */}
        <form className='space-y-4' onSubmit={purchase}>
          <div className='space-y-1 flex flex-col gap-3'>
            <Label htmlFor='player' className='leading-5'>
              Purchase Player
            </Label>
            <Combobox
              value={purchaseSelectedPlayer}
              onValueChange={(value) => setPurchaseSelectedPlayer(value || "")}
              name="player"
              autoHighlight
              items={unsoldPlayers?.map((player) => player.name)}
            >
              <ComboboxInput placeholder="Player" />
              <ComboboxContent>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>

              </ComboboxContent>
            </Combobox>
            <div className="flex">
              <Combobox
                value={selectedTeam}
                onValueChange={(value) => setSelectedTeam(value || "")}
                name="player"
                autoHighlight
                items={teams}
              >
                <ComboboxInput placeholder="Team" />
                <ComboboxContent>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>

                </ComboboxContent>
              </Combobox>
              <Input
                id='bid'
                type="number"
                placeholder="Bid in Crores"
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                required
              />

            </div>
          </div>
          <Button className='w-full' type='submit'>
            Purchase
          </Button>

        </form>
        {/* REFUND */}
        <form className='space-y-4' onSubmit={refund}>
          <div className='space-y-1'>
            <Label htmlFor='player' className='leading-5 mb-4'>
              Refund Player
            </Label>
            <Combobox
              value={selectedPlayer}
              onValueChange={(value) => setSelectedPlayer(value || "")}
              name="player"
              autoHighlight
              items={soldPlayers?.map((player) => player.name)}
            >
              <ComboboxInput placeholder="Player" />
              <ComboboxContent>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>

              </ComboboxContent>
            </Combobox>
          </div>
          <Button className='w-full' type='submit'>
            Refund
          </Button>

        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
