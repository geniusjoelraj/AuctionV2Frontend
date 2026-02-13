import { socketService } from "@/socket";
import { formatNumber, getIncrement } from "@/utils/bid";
import { Dispatch, SetStateAction, useEffect, useCallback, useRef, useState } from "react";
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

  const [bidInc, setBidInc] = useState(500000)


  useEffect(() => {
    setBidInc(getIncrement(currentBid))
  }, [currentBid])

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
  useHotkeys('up', () => handleSendBid(currentBid + bidInc), [currentBid, handleSendBid, bidInc]);
  useHotkeys('down', () => handleSendBid(currentBid - bidInc), [currentBid, handleSendBid, bidInc]);

  return (
    <div className="flex flex-col items-center w-72 justify-center">
      <h1 className="font-bold text-5xl mb-3">CURRENT BID</h1>
      <p className="font-black text-9xl">{formatNumber(currentBid)}</p>
      <div className="flex justify-center items-center gap-4 hidden">
        <button
          className="text-4xl rounded-xl p-4 py-3 bg-[#A94A55] font-bold hover:bg-[#DE4255]"
          onClick={() => handleSendBid(currentBid - bidInc)}
        >
          -{formatNumber(bidInc)}
        </button>
      </div>
      <button
        className="text-4xl rounded-xl p-4 py-3 bg-white font-bold  flex text-black"
        onClick={() => handleSendBid(currentBid + bidInc)}
      >
        +{formatNumber(bidInc)}
      </button>

    </div>
  );
}

