import { create } from 'zustand';

export type MediaType = 'movie' | 'tv';

export function favoriteKey(mediaType: MediaType, id: number) {
  return `${mediaType}-${id}`;
}

type FavoritesState = {
  favorites: Set<string>;
  toggleFavorite: (mediaType: MediaType, id: number) => void;
  isFavorite: (mediaType: MediaType, id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set(),
  toggleFavorite: (mediaType, id) => {
    const key = favoriteKey(mediaType, id);
    set((state) => {
      const next = new Set(state.favorites);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return { favorites: next };
    });
  },
  isFavorite: (mediaType, id) => get().favorites.has(favoriteKey(mediaType, id)),
}));
