'use client'

import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function CurrentBid() {
  const [curBid, setCurBid] = useState(1000000)
  useEffect(() => {
    const handleBid = (bid: number) => {
      console.log(bid);
      setCurBid(bid)
    }

    socket.on("bid", handleBid)
    return () => {
      socket.off("bid", handleBid)
    }
  }, [setCurBid])
  return (<p>Current Bid: {curBid}Cr</p>)
}
