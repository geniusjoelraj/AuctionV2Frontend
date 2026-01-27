import { create } from "zustand";

type BidStore = {
  bid: number;
  playerName: string;
  increment: () => void;
  decrement: () => void;
}

export const useBidStore = create<BidStore>((set) => ({
  bid: 10000000,
  playerName: "KL Rahul",
  increment: () => {
    set((state) => ({ bid: state.bid + 2500000 }))
  },
  decrement: () => {
    set((state) => ({ bid: state.bid - 2500000 }))
  }
}))
