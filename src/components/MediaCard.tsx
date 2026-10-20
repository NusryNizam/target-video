import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

export type MediaItem = {
  id: number;
  title: string;
  posterUrl: string | null;
  voteAverage: number;
};

export function MediaCard({ item }: { item: MediaItem }) {
  return (
    <View style={styles.card}>
      {item.posterUrl ? (
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.poster}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.poster, styles.posterFallback]} />
      )}
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.rating}>★ {item.voteAverage.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: Spacing.md,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.secondary,
  },
  posterFallback: {
    backgroundColor: Colors.background.secondary,
  },
  title: {
    marginTop: Spacing.xs,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.default,
  },
  rating: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.text.muted,
  },
});
