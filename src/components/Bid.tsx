import { useStompClient } from "@/socket";
import { Player } from "@/types/api"
import { Dispatch, SetStateAction, useState } from "react"

export default function Bid({ currentBid, setCurrentBid }: { currentBid: number, setCurrentBid: Dispatch<SetStateAction<number>> }) {
  const { publish } = useStompClient();
  const handleSendBid = (bid: number) => {
    publish({ currentBid: bid });
  };
  return (<div className="flex flex-col items-center w-72">
    <h1 className="font-bold text-5xl mb-5">Current Bid</h1>
    <p className="font-black text-8xl">{currentBid}Cr</p>
    <div className="flex justify-center items-center gap-4">
      <button className="text-3xl bg-red-600 rounded-md p-2" onClick={() => { setCurrentBid(currentBid - 0.25); handleSendBid(currentBid - 0.25) }}>-25L</button>
      <button className="text-3xl bg-green-600 rounded-md p-2" onClick={() => { setCurrentBid(currentBid + 0.25) }}>+25L</button>
    </div>
  </div>
  )
}
