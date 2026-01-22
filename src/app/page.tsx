"use client";
import { useState, useMemo, useEffect } from "react";
import { Player, PlayerType } from "@/types/api";
import { fetchPlayers } from '@/utils/api'
import StatDisplay from "@/components/StatDisplay";
import PlayerCard from "@/components/PlayerCard";
import Bidder from "@/components/Bidder";

// Mock data from your JSON

export default function PlayerGallery() {
  useEffect(() => {
    fetchPlayers().then(data => {
      setPlayers(data);
    });
  }, []);
  const [players, setPlayers] = useState<Player[]>([]); // State for players
  const [filter, setFilter] = useState<PlayerType>("BATSMAN");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPlayers = useMemo(() => {
    return players.filter(p => p.type === filter);
  }, [filter]);

  const handleFilterChange = (val: string) => {
    setFilter(val as PlayerType);
    setCurrentIndex(0);
  };

  const currentPlayer = filteredPlayers[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % filteredPlayers.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + filteredPlayers.length) % filteredPlayers.length);

  return (
    <main className="flex flex-col items-center relative">
      <div className="flex flex-col items-center relative">
        <h1 className="text-3xl font-bold mb-6">IPL Auction</h1>

        {/* Category Filter */}
        <div className="flex gap-4 mb-8">
          {["BATSMAN", "BOWLER", "ALL_ROUNDER"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-sm font-bold ${filter === cat ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-30">
        {/* Player Display Card */}
        {currentPlayer ? (
          <PlayerCard player={currentPlayer} />
        ) : (
          <p>No players found in this category.</p>
        )}
        <Bidder />
      </div>


    </main>
  );
}
