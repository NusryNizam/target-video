import { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { FeaturedHero } from "@/src/components/FeaturedHero";
import { GenreChips } from "@/src/components/GenreChips";
import { MediaRow } from "@/src/components/MediaRow";
import { mockTvShows, tmdbImageUrl } from "@/src/constants/tmdb";
import { TV_GENRES } from "@/src/constants/tmdbGenres";
import { Colors } from "@/src/tokens/colors";

const ALL = "All";

export default function TvShowsScreen() {
  const [featured, ...rest] = mockTvShows;

  const genreOptions = useMemo(() => {
    const counts = new Map<string, number>();
    rest.forEach((show) => {
      show.genre_ids.forEach((id) => {
        const name = TV_GENRES[id];
        if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
      });
    });
    const sorted = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
    return [ALL, ...sorted.slice(0, 5)];
  }, [rest]);

  const [selectedGenre, setSelectedGenre] = useState(ALL);

  const rowItems = rest
    .filter(
      (show) =>
        selectedGenre === ALL ||
        show.genre_ids.some((id) => TV_GENRES[id] === selectedGenre),
    )
    .map((show) => ({
      id: show.id,
      title: show.name,
      posterUrl: tmdbImageUrl(show.poster_path),
      voteAverage: show.vote_average,
    }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <FeaturedHero
        title={featured.name}
        overview={featured.overview}
        backdropUrl={tmdbImageUrl(featured.backdrop_path, "w780")}
        genres={featured.genre_ids
          .map((id) => TV_GENRES[id])
          .filter(Boolean)
          .slice(0, 3)}
        rating={featured.vote_average}
        year={featured.first_air_date.slice(0, 4)}
      />
      <GenreChips
        options={genreOptions}
        selected={selectedGenre}
        onSelect={setSelectedGenre}
      />
      <MediaRow title="Popular TV Shows" items={rowItems} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  content: {
    paddingBottom: 48,
  },
});
