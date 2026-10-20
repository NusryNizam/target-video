import { create } from 'zustand';

const STARTING_COIN_BALANCE = 50;
export const EPISODE_UNLOCK_COST = 20;

function episodeKey(showId: number, episodeNumber: number) {
  return `${showId}-${episodeNumber}`;
}

type UnlockState = {
  isPremium: boolean;
  coinBalance: number;
  coinUnlockedEpisodes: Set<string>;
  goPremium: () => void;
  addCoins: (amount: number) => void;
  unlockWithCoins: (showId: number, episodeNumber: number) => boolean;
  isEpisodeLocked: (showId: number, episodeNumber: number, baseLocked: boolean) => boolean;
};

export const useUnlockStore = create<UnlockState>((set, get) => ({
  isPremium: false,
  coinBalance: STARTING_COIN_BALANCE,
  coinUnlockedEpisodes: new Set(),
  goPremium: () => set({ isPremium: true }),
  addCoins: (amount) => set((state) => ({ coinBalance: state.coinBalance + amount })),
  unlockWithCoins: (showId, episodeNumber) => {
    const state = get();
    if (state.coinBalance < EPISODE_UNLOCK_COST) return false;
    const next = new Set(state.coinUnlockedEpisodes);
    next.add(episodeKey(showId, episodeNumber));
    set({ coinBalance: state.coinBalance - EPISODE_UNLOCK_COST, coinUnlockedEpisodes: next });
    return true;
  },
  isEpisodeLocked: (showId, episodeNumber, baseLocked) => {
    if (!baseLocked) return false;
    const state = get();
    if (state.isPremium) return false;
    return !state.coinUnlockedEpisodes.has(episodeKey(showId, episodeNumber));
  },
}));
