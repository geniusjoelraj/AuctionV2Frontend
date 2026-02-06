import { socketService } from "@/socket";
import { formatNumber } from "@/utils/bid";
import { Dispatch, SetStateAction, useEffect, useCallback, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Bid({
  currentBid,
  setCurrentBid,
}: {
  currentBid: number;
  setCurrentBid: Dispatch<SetStateAction<number>>;
}) {
  const initialBidSent = useRef(false);

  const handleSendBid = useCallback((bid: number) => {
    if (!socketService.isConnected()) {
      console.warn('Cannot send bid: Not connected');
      return;
    }

    socketService.publish("/app/game/1/bids", { currentBid: bid });
    setCurrentBid(bid);
  }, [setCurrentBid]);


  useEffect(() => {
    const setupConnection = () => {
      if (socketService.isConnected()) {
        if (!initialBidSent.current) {
          handleSendBid(currentBid);
          initialBidSent.current = true;
        }
      } else {
        socketService.connect(() => {
          if (!initialBidSent.current) {
            handleSendBid(currentBid);
            initialBidSent.current = true;
          }
        });
      }
    };

    setupConnection();

    return () => {
      initialBidSent.current = false;
    };
  }, []);
  // Hotkeys
  useHotkeys('up', () => handleSendBid(currentBid + 2500000), [currentBid, handleSendBid]);
  useHotkeys('down', () => handleSendBid(currentBid - 2500000), [currentBid, handleSendBid]);

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
