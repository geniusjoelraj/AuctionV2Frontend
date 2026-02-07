'use client'

import { ToastContainer, toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "./ui/combobox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState, useCallback } from "react";
import { Player } from "@/types/api"
import {
  fetchSoldPlayers,
  fetchUnsoldPlayers,
  purchasePlayer,
  refundPlayer
} from "@/utils/api";
import { teams } from "@/utils/constants";

export default function AdminControls() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [soldPlayers, setSoldPlayers] = useState<Player[]>([]);
  const [unsoldPlayers, setUnsoldPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [purchaseSelectedPlayer, setPurchaseSelectedPlayer] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [bid, setBid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);

  useEffect(() => {
    const storedGameId = localStorage.getItem('game');
    setGameId(storedGameId);
  }, []);

  // Fetch players data
  const fetchPlayers = useCallback(async () => {
    if (!gameId) return;

    setIsLoading(true);
    try {
      const gameIdNum = parseInt(gameId, 10);
      const [sold, unsold] = await Promise.all([
        fetchSoldPlayers(gameIdNum),
        fetchUnsoldPlayers(gameIdNum)
      ]);
      setSoldPlayers(sold || []);
      setUnsoldPlayers(unsold || []);
      console.log(unsold);

    } catch (error) {
      console.error('Error fetching players:', error);
      toast.error('Failed to load players data');
    } finally {
      setIsLoading(false);
    }
  }, [gameId]);

  // Fetch players when gameId changes
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const handleRefund = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameId || !selectedPlayer) {
      toast.error('Please select a player to refund');
      return;
    }

    const refundPlayerData = soldPlayers?.find(
      (player) => player.name === selectedPlayer
    );

    if (!refundPlayerData) {
      toast.error('Player not found');
      return;
    }

    setIsRefunding(true);
    try {
      await refundPlayer(refundPlayerData.id, parseInt(gameId, 10));
      toast.success(`Refunded ${selectedPlayer}`);
      setSelectedPlayer("");
      await fetchPlayers();
    } catch (error) {
      console.error('Error refunding player:', error);
      toast.error('Failed to refund player');
    } finally {
      setIsRefunding(false);
    }
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameId || !purchaseSelectedPlayer || !selectedTeam || !bid) {
      toast.error('Please fill in all fields');
      return;
    }

    const purchasePlayerData = unsoldPlayers?.find(
      (player) => player.name === purchaseSelectedPlayer
    );

    if (!purchasePlayerData) {
      toast.error('Player not found');
      return;
    }

    const bidAmount = parseInt(bid, 10);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    setIsPurchasing(true);
    try {
      await purchasePlayer(
        selectedTeam,
        purchasePlayerData.id,
        bidAmount * 10000000,
        parseInt(gameId, 10)
      );
      toast.success(`${purchaseSelectedPlayer} purchased by ${selectedTeam} for ₹${bidAmount}Cr`);

      // Reset form
      setPurchaseSelectedPlayer("");
      setSelectedTeam("");
      setBid("");

      await fetchPlayers();
    } catch (error) {
      console.error('Error purchasing player:', error);
      toast.error('Failed to purchase player');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!gameId) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No game ID found. Please select a game.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* PURCHASE SECTION */}
      <div className="rounded-lg border p-6 space-y-4">
        <h2 className="text-xl font-semibold">Purchase Player</h2>
        <form onSubmit={handlePurchase} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="purchase-player">Player</Label>
            <Combobox
              value={purchaseSelectedPlayer}
              onValueChange={(value) => setPurchaseSelectedPlayer(value || "")}
              name="purchase-player"
              autoHighlight
              items={unsoldPlayers?.map((player) => player.name) || []}
              disabled={isLoading || isPurchasing}
            >
              <ComboboxInput placeholder="Select player..." />
              <ComboboxContent>
                <ComboboxList>
                  {(item, ind) => (
                    <ComboboxItem key={ind} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Combobox
              value={selectedTeam}
              onValueChange={(value) => setSelectedTeam(value || "")}
              name="team"
              autoHighlight
              items={teams}
              disabled={isLoading || isPurchasing}
            >
              <ComboboxInput placeholder="Select team..." />
              <ComboboxContent>
                <ComboboxList>
                  {(item, ind) => (
                    <ComboboxItem key={ind} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bid">Bid Amount (in Crores)</Label>
            <Input
              id="bid"
              type="number"
              min="0"
              step="0.1"
              placeholder="Enter bid amount"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              disabled={isPurchasing}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isPurchasing || isLoading}
            className="w-full"
          >
            {isPurchasing ? 'Processing...' : 'Purchase Player'}
          </Button>
        </form>
      </div>

      {/* REFUND SECTION */}
      <div className="rounded-lg border p-6 space-y-4">
        <h2 className="text-xl font-semibold">Refund Player</h2>
        <form onSubmit={handleRefund} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="refund-player">Player</Label>
            <Combobox
              value={selectedPlayer}
              onValueChange={(value) => setSelectedPlayer(value || "")}
              name="refund-player"
              autoHighlight
              items={soldPlayers?.map((player) => player.name) || []}
              disabled={isLoading || isRefunding}
            >
              <ComboboxInput placeholder="Select player..." />
              <ComboboxContent>
                <ComboboxList>
                  {(item, ind) => (
                    <ComboboxItem key={ind} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <Button
            type="submit"
            variant="destructive"
            disabled={isRefunding || isLoading}
            className="w-full"
          >
            {isRefunding ? 'Processing...' : 'Refund Player'}
          </Button>
        </form>
      </div>
    </div>
  );
}
