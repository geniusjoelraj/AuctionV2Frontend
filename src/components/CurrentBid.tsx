'use client'
import { useBidStore } from "@/store";

export default function CurrentBid() {
  const bid = useBidStore((state) => state.bid)
  return <p>Current Bid: {bid}</p>
}
