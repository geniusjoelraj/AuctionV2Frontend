' use client'
import { socket } from "@/socket"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function Bid({ currentBid, setCurrentBid }: { currentBid: number, setCurrentBid: Dispatch<SetStateAction<number>> }) {
  useEffect(() => {
    const handleBid = (bid: number) => {
      console.log(bid);
      setCurrentBid(bid)
    }

    socket.on("bid", handleBid)
    return () => {
      socket.off("bid", handleBid)
    }
  }, [setCurrentBid])

  const handleIncrease = () => {
    const newBid = currentBid + 0.25
    socket.emit("bid", newBid)
  }

  const handleDecrease = () => {
    const newBid = Math.max(0, currentBid - 0.25)
    socket.emit("bid", newBid)
  }
  return (<div className="flex flex-col items-center w-72">
    <h1 className="font-bold text-5xl mb-5">Current Bid</h1>
    <p className="font-black text-8xl">{currentBid}Cr</p>
    <div className="flex justify-center items-center gap-4">
      <button className="text-3xl bg-red-600 rounded-md p-2" onClick={handleDecrease}>-25L</button>
      <button className="text-3xl bg-green-600 rounded-md p-2" onClick={handleIncrease}>+25L</button>
    </div>
  </div>
  )
}
