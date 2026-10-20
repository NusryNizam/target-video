import { tmdbImageUrl, type TmdbTvShow } from '@/src/constants/tmdb';

export type Episode = {
  number: number;
  title: string;
  durationMinutes: number;
  thumbnailUrl: string | null;
  locked: boolean;
};

const EPISODES_PER_SHOW = 8;
const FREE_EPISODES = 3;

// No per-episode data exists in the TMDB snapshot, so episodes are synthesized
// deterministically from the show itself (reusing its backdrop as a thumbnail)
// purely to demonstrate the episode list / premium-lock UI.
export function generateEpisodes(show: TmdbTvShow): Episode[] {
  const thumbnailUrl = tmdbImageUrl(show.backdrop_path ?? show.poster_path, 'w342');

  return Array.from({ length: EPISODES_PER_SHOW }, (_, index) => {
    const number = index + 1;
    return {
      number,
      title: `Episode ${number}`,
      durationMinutes: 20 + ((show.id + number) % 4) * 5,
      thumbnailUrl,
      locked: number > FREE_EPISODES,
    };
  });
}
