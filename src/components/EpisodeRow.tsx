import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Episode } from '@/src/utils/episodes';
import { Colors } from '@/src/tokens/colors';
import { BorderRadius, Spacing } from '@/src/tokens/spacing';

export function EpisodeRow({ episode, onPress }: { episode: Episode; onPress: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.thumbnailWrap}>
        {episode.thumbnailUrl ? (
          <Image source={{ uri: episode.thumbnailUrl }} style={styles.thumbnail} resizeMode="cover" />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailFallback]} />
        )}
        <View style={styles.thumbnailOverlay}>
          <Text style={styles.thumbnailIcon}>{episode.locked ? '🔒' : '▶'}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>
          {episode.number}. {episode.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.duration}>{episode.durationMinutes} min</Text>
          {episode.locked && <Text style={styles.unlock}>Locked</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  thumbnailWrap: {
    width: 110,
    height: 64,
  },
  thumbnail: {
    width: 110,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.secondary,
  },
  thumbnailFallback: {
    backgroundColor: Colors.background.secondary,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: BorderRadius.md,
  },
  thumbnailIcon: {
    fontSize: 18,
    color: Colors.text.default,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.default,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xxs,
  },
  duration: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  unlock: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.accent,
  },
});
