import { create } from 'zustand';

type FavoritesState = {
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set(),
  toggleFavorite: (id) => {
    set((state) => {
      const next = new Set(state.favorites);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { favorites: next };
    });
  },
  isFavorite: (id) => get().favorites.has(id),
}));
