import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useFavoritesStore, type MediaType } from '@/src/store/favoritesStore';
import { Colors } from '@/src/tokens/colors';
import { BorderRadius, Spacing } from '@/src/tokens/spacing';

export type MediaItem = {
  id: number;
  mediaType: MediaType;
  title: string;
  posterUrl: string | null;
  voteAverage: number;
};

export function MediaCard({ item }: { item: MediaItem }) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(item.mediaType, item.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/details/${item.mediaType}/${item.id}`)}>
      <View>
        {item.posterUrl ? (
          <Image source={{ uri: item.posterUrl }} style={styles.poster} resizeMode="cover" />
        ) : (
          <View style={[styles.poster, styles.posterFallback]} />
        )}
        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.mediaType, item.id)}>
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.rating}>★ {item.voteAverage.toFixed(1)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
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
  favoriteButton: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    width: 28,
    height: 28,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 15,
    color: Colors.text.default,
  },
  favoriteIconActive: {
    color: Colors.text.accent,
  },
  title: {
    marginTop: Spacing.xs,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.default,
  },
  rating: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.text.muted,
  },
});
