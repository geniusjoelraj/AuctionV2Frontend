import { socketService } from "@/socket";
import { formatNumber } from "@/utils/bid";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function Bid({
  currentBid,
  setCurrentBid,
}: {
  currentBid: number;
  setCurrentBid: Dispatch<SetStateAction<number>>;
}) {
  useEffect(() => {
    socketService.connect(() => {
      handleSendBid(currentBid)
    });

    return () => {
      socketService.disconnect();
    };
  }, [setCurrentBid]);

  const handleSendBid = (bid: number) => {
    socketService.publish("/app/game/1/bids", { currentBid: bid });
    setCurrentBid(bid);
  };

  return (
    <div className="flex flex-col items-center w-72">
      <h1 className="font-bold text-5xl mb-5">Current Bid</h1>
      <p className="font-black text-8xl">{formatNumber(currentBid)}</p>
      <div className="flex justify-center items-center gap-4">
        <button
          className="text-3xl bg-red-600 rounded-md p-2"
          onClick={() => handleSendBid(currentBid - 2500000)}
        >
          -25L
        </button>
        <button
          className="text-3xl bg-green-600 rounded-md p-2"
          onClick={() => handleSendBid(currentBid + 2500000)}
        >
          +25L
        </button>
      </div>
    </div>
  );
}
