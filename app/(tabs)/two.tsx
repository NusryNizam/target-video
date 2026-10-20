import { FlatList, StyleSheet, Text, View } from "react-native";

import { MediaCard, MediaItem } from "@/src/components/MediaCard";
import { mockTvShows, tmdbImageUrl } from "@/src/constants/tmdb";
import { useFavoritesStore } from "@/src/store/favoritesStore";
import { Colors } from "@/src/tokens/colors";
import { Spacing } from "@/src/tokens/spacing";

export default function FavoritesScreen() {
  const favorites = useFavoritesStore((state) => state.favorites);

  const items: MediaItem[] = mockTvShows
    .filter((show) => favorites.has(show.id))
    .map((show) => ({
      id: show.id,
      title: show.name,
      posterUrl: tmdbImageUrl(show.poster_path),
      voteAverage: show.vote_average,
    }));

  if (items.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyTitle}>No favourites yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on any show to save it here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <MediaCard item={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  content: {
    padding: Spacing.lg,
  },
  row: {
    gap: Spacing.md,
  },
  cardWrapper: {
    marginBottom: Spacing.lg,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.default,
  },
  emptySubtitle: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: Colors.text.muted,
    textAlign: "center",
  },
});
