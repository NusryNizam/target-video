import { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { FeaturedHero } from "@/src/components/FeaturedHero";
import { GenreChips } from "@/src/components/GenreChips";
import { MediaRow } from "@/src/components/MediaRow";
import { mockMovies, tmdbImageUrl } from "@/src/constants/tmdb";
import { MOVIE_GENRES } from "@/src/constants/tmdbGenres";
import { Colors } from "@/src/tokens/colors";

const ALL = "All";

export default function HomeScreen() {
  const [featured, ...rest] = mockMovies;

  const genreOptions = useMemo(() => {
    const counts = new Map<string, number>();
    rest.forEach((movie) => {
      movie.genre_ids.forEach((id) => {
        const name = MOVIE_GENRES[id];
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
      (movie) =>
        selectedGenre === ALL ||
        movie.genre_ids.some((id) => MOVIE_GENRES[id] === selectedGenre),
    )
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: tmdbImageUrl(movie.poster_path),
      voteAverage: movie.vote_average,
    }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <FeaturedHero
        title={featured.title}
        overview={featured.overview}
        backdropUrl={tmdbImageUrl(featured.backdrop_path, "w780")}
        genres={featured.genre_ids
          .map((id) => MOVIE_GENRES[id])
          .filter(Boolean)
          .slice(0, 3)}
        rating={featured.vote_average}
        year={featured.release_date.slice(0, 4)}
      />
      <GenreChips
        options={genreOptions}
        selected={selectedGenre}
        onSelect={setSelectedGenre}
      />
      <MediaRow title="Popular Movies" items={rowItems} />
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
