import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useFavoritesStore } from "@/src/store/favoritesStore";
import { Colors, Gradients } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

export function FeaturedHero({
  id,
  title,
  overview,
  backdropUrl,
  genres,
  rating,
  year,
  onPress,
}: {
  id: number;
  title: string;
  overview: string;
  backdropUrl: string | null;
  genres: string[];
  rating: number;
  year: string;
  onPress: () => void;
}) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {backdropUrl && (
        <Image
          source={{ uri: backdropUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.tagsRow}>
          <LinearGradient
            colors={Gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>Featured</Text>
          </LinearGradient>
          {genres.map((genre) => (
            <Text key={genre} style={styles.genre}>
              {genre}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={2} style={styles.overview}>
          {overview}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>★ {rating.toFixed(1)}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.meta}>{year}</Text>
        </View>
        <View style={styles.actionsRow}>
          <Pressable style={styles.playButton} onPress={onPress}>
            <Text style={styles.playButtonText}>▶ Play Now</Text>
          </Pressable>
          <Pressable
            style={styles.addButton}
            onPress={() => toggleFavorite(id)}>
            <Text style={[styles.addButtonText, isFavorite && styles.addButtonTextActive]}>
              {isFavorite ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 420,
    backgroundColor: Colors.background.secondary,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: Spacing.lg,
  },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.pill,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.text.inverse,
  },
  genre: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.muted,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text.default,
  },
  overview: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: Colors.text.default,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  meta: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.muted,
  },
  metaDot: {
    fontSize: 13,
    color: Colors.text.muted,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  playButton: {
    flex: 1,
    backgroundColor: Colors.text.secondary,
    borderRadius: BorderRadius.pill,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  playButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text.inverse,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: Colors.border.default,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.default,
  },
  addButtonTextActive: {
    color: Colors.text.accent,
  },
});
