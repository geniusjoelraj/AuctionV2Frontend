import { Transaction } from '@/types/api'
export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 100000) {
    const thousands = num / 1000;
    return thousands % 1 === 0
      ? `${thousands}K`
      : `${thousands.toFixed(1)}K`;
  }

  if (num < 10000000) {
    const lakhs = num / 100000;
    return lakhs % 1 === 0
      ? `${lakhs}L`
      : `${lakhs.toFixed(2)}L`;
  }
  if (num == 15000000) {
    const crores = num / 10000000;
    return crores % 1 === 0
      ? `${crores}Cr`
      : `${crores.toFixed(1)}Cr`;
  }

  const crores = num / 10000000;
  return crores % 1 === 0
    ? `${crores}Cr`
    : `${crores.toFixed(2)}Cr`;



}

export function substituteCheck(subplayers: Transaction[], allPlayers: Transaction[], setMessage: React.Dispatch<React.SetStateAction<string>>, setIsValid: React.Dispatch<React.SetStateAction<boolean>>) {
  const subPlayerList = subplayers.map((sp) => sp.name)
  const filPlayers = allPlayers.filter((player) => !subPlayerList.includes(player.name))
  const playersCount = filPlayers.reduce<any>((acc, player) => {
    acc.playerTypes[player.playerType] = (acc.playerTypes[player.playerType] || 0) + 1;

    if (player.isForeign) {
      acc.foreign++;
    }

    if (player.isLegend) {
      acc.legend++;
    }

    if (player.isUncapped) {
      acc.uncapped++;
    }

    return acc;
  }, {
    playerTypes: {
      BATSMAN: 0,
      BOWLER: 0,
      ALL_ROUNDER: 0,
      WICKET_KEEPER: 0
    },
    foreign: 0,
    legend: 0,
    uncapped: 0
  });

  if (subplayers.length < 3) {
    setMessage(`Pick ${3 - subplayers.length} more substitutes`);
    setIsValid(false);
    return;
  }

  if (subplayers.length > 3) {
    setMessage('Substitute length should not exceed 3');
    setIsValid(false);
    return;
  }

  if (playersCount.playerTypes.BATSMAN < 4) {
    setMessage(`Need ${4 - playersCount.playerTypes.BATSMAN} more batsmen (minimum 4 required)`);
    setIsValid(false);
    return;
  }

  if (playersCount.playerTypes.BOWLER < 4) {
    setMessage(`Need ${4 - playersCount.playerTypes.BOWLER} more bowlers (minimum 4 required)`);
    setIsValid(false);
    return;
  }

  if (playersCount.playerTypes.ALL_ROUNDER < 3) {
    setMessage(`Need ${3 - playersCount.playerTypes.ALL_ROUNDER} more all-rounders (minimum 3 required)`);
    setIsValid(false);
    return;
  }

  if (playersCount.playerTypes.WICKET_KEEPER < 1) {
    setMessage('Need at least 1 wicket keeper');
    setIsValid(false);
    return;
  }

  if (playersCount.foreign < 5) {
    setMessage(`Need ${5 - playersCount.foreign} more foreign players (minimum 5 required)`);
    setIsValid(false);
    return;
  }

  if (playersCount.legend < 1) {
    setMessage('Need at least 1 legend player');
    setIsValid(false);
    return;
  }

  if (playersCount.uncapped < 1) {
    setMessage('Need at least 1 uncapped player');
    setIsValid(false);
    return;
  }

  setMessage('Team is valid! Ready to proceed?');
  setIsValid(true);
  return filPlayers
}
