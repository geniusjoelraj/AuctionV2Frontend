"use client";
import { useState, useMemo, useEffect } from "react";
import { Player, PlayerType } from "@/types/api"; import { fetchPlayers } from '@/utils/api'
import PlayerCard from "@/components/PlayerCard";
import Bidder from "@/components/Bidder";
import Bid from "@/components/Bid";
import { PlayerSearch } from "@/components/PlayerSearch";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useHotkeys } from 'react-hotkeys-hook'
import CustomIncrement from "@/components/CustomIncrement";

export default function PlayerGallery() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filter, setFilter] = useState<PlayerType>("BATSMAN");
  const [playerIndexes, setPlayerIndexes] = useState({
    batsman: 0,
    bowler: 0,
    allrounder: 0,
    keeper: 0
  })
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const getIndexByFilter = (filter: string) => {
    switch (filter) {
      case 'BATSMAN': return playerIndexes.batsman;
      case 'BOWLER': return playerIndexes.bowler;
      case 'ALL_ROUNDER': return playerIndexes.allrounder;
      case 'WICKET_KEEPER': return playerIndexes.keeper;
      default: return 0;
    }
  };
  const filterToKey: Record<string, keyof typeof playerIndexes> = {
    BATSMAN: 'batsman',
    BOWLER: 'bowler',
    ALL_ROUNDER: 'allrounder',
    WICKET_KEEPER: 'keeper',
  };


  useHotkeys('1', () => handleFilterChange('BATSMAN'))
  useHotkeys('2', () => handleFilterChange('BOWLER'))
  useHotkeys('3', () => handleFilterChange('ALL_ROUNDER'))
  useHotkeys('4', () => handleFilterChange('WICKET_KEEPER'))
  useHotkeys('right', () => next())
  useHotkeys('left', () => prev())

  useEffect(() => {
    if (localStorage.getItem('teamName') !== 'admin') {
      router.push('/team/view')
    }
  })
  useEffect(() => {
    const id = parseInt(localStorage.getItem('game')!)
    if (id) {
      fetchPlayers(id).then(data => {
        setPlayers(data);
        setIsLoading(false);
      });
    }
  }, []);

  const filteredPlayers = useMemo(() => {
    return players.filter(p => p.type === filter);
  }, [filter, players]);

  const currentPlayer = filteredPlayers[currentIndex];

  const [currentBid, setCurrentBid] = useState(currentPlayer?.price!);
  useEffect(() => {
    if (currentPlayer) {
      setCurrentBid(currentPlayer.price);
    }
  }, [currentIndex, currentPlayer]);

  const handleFilterChange = (val: string) => {
    setFilter(val as PlayerType);
    setCurrentIndex(getIndexByFilter(val));
    console.log(playerIndexes);
  };

  const next = () => {
    if (filteredPlayers.length > 0 && currentIndex < filteredPlayers.length - 1) {
      console.log('filter:', filter, 'key:', filterToKey[filter], 'prev:', playerIndexes);
      setPlayerIndexes((prev) => ({
        ...prev,
        [filterToKey[filter]]: prev[filterToKey[filter]] + 1,
      }));
      setCurrentIndex((prev) => (prev + 1));
    }
  };

  const prev = () => {
    if (filteredPlayers.length > 0 && currentIndex > 0) {
      setPlayerIndexes((prev) => ({
        ...prev,
        [filterToKey[filter]]: prev[filterToKey[filter]] - 1,
      }));
      setCurrentIndex((prev) => (prev - 1));
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main style={{ backgroundImage: "url('/ipl-stadium-bg.jpg')" }} className="flex flex-col items-center relative bg-blue-900 h-dvh text-white text-nowrap bg-cover bg-opacity-0 px-20">
      <div className="flex flex-col items-center relative">
        <h1 className="text-4xl font-bold mb-6"><img src="/srm-ipl.png" alt="IPL" width={100} className="inline -pr-4" />Auction</h1>

        <div className="flex gap-4 mb-8">
          {["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-sm font-bold ${filter === cat ? "bg-[#674D63] text-white" : "bg-white text-[#674D63]"
                }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <PlayerSearch setFilter={setFilter} players={players} setCurrentIndex={setCurrentIndex} />
      <CustomIncrement bid={currentBid} setCurrentBid={setCurrentBid} />
      <div className="flex items-center justify-around w-full">
        {currentPlayer ? (
          <>
            <PlayerCard player={currentPlayer} />
            <Bid currentBid={currentBid ?? currentPlayer.price} setCurrentBid={setCurrentBid} />
            <Bidder player={currentPlayer} finalBid={currentBid} />
          </>
        ) : (
          <PlayerCard player="EMPTY" />
        )}

        <div className="absolute bottom-10 flex w-11/12 justify-between">
          <button onClick={prev} className="control-btn text-[#674D63] p-3 w-28 rounded-sm text-xl font-semibold cursor-pointer">Prev</button>
          <button onClick={next} className="control-btn text-[#674D63] p-3 w-28 rounded-sm text-xl font-semibold cursor-pointer">Next</button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
