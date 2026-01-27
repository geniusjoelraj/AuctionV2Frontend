import { useBidStore } from "@/store"
import { Player } from "@/types/api"
import { Dispatch, SetStateAction, useState } from "react"

export default function Bid() {
  const bid = useBidStore((state) => state.bid)
  const increment = useBidStore((state) => state.increment)
  const decrement = useBidStore((state) => state.decrement)
  return (<div className="flex flex-col items-center w-72">
    <h1 className="font-bold text-5xl mb-5">Current Bid</h1>
    <p className="font-black text-8xl">{bid}Cr</p>
    <div className="flex justify-center items-center gap-4">
      <button className="text-3xl bg-red-600 rounded-md p-2" onClick={decrement}>-25L</button>
      <button className="text-3xl bg-green-600 rounded-md p-2" onClick={increment}>+25L</button>
    </div>
  </div>
  )
}
