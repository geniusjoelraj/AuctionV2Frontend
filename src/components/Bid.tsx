import { socketService } from "@/socket";
import { formatNumber } from "@/utils/bid";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

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

  useHotkeys('up', () => handleSendBid(currentBid + 2500000))
  useHotkeys('down', () => handleSendBid(currentBid - 2500000))



  return (
    <div className="flex flex-col items-center w-72 justify-center">
      <h1 className="font-bold text-5xl mb-3">CURRENT BID</h1>
      <p className="font-black text-9xl">{formatNumber(currentBid)}</p>
      <div className="flex justify-center items-center gap-4 hidden">
        <button
          className="text-4xl rounded-xl p-4 py-3 bg-[#A94A55] font-bold hover:bg-[#DE4255]"
          onClick={() => handleSendBid(currentBid - 2500000)}
        >
          -25L
        </button>
        <button
          className="text-4xl rounded-xl p-4 py-3 bg-[#42684f] font-bold hover:bg-[#50A36D]"
          onClick={() => handleSendBid(currentBid + 2500000)}
        >
          +25L
        </button>
      </div>
    </div>
  );
}
