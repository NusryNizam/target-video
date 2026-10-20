import { Stack, router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MediaRow } from "@/src/components/MediaRow";
import { mockMovies, mockTvShows, tmdbImageUrl } from "@/src/constants/tmdb";
import { mockCredits } from "@/src/constants/tmdbCredits";
import { MOVIE_GENRES, TV_GENRES } from "@/src/constants/tmdbGenres";
import { useFavoritesStore, type MediaType } from "@/src/store/favoritesStore";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";
import { formatCompactCount } from "@/src/utils/format";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailsScreen() {
  const params = useLocalSearchParams<{ mediaType: MediaType; id: string }>();
  const mediaType = params.mediaType;
  const numericId = Number(params.id);
  const isMovie = mediaType === "movie";
  const insets = useSafeAreaInsets();

  const movie = isMovie
    ? mockMovies.find((m) => m.id === numericId)
    : undefined;
  const show = !isMovie
    ? mockTvShows.find((t) => t.id === numericId)
    : undefined;

  const isFavorite = useFavoritesStore((state) =>
    state.isFavorite(mediaType, numericId),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  if (!movie && !show) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.notFoundText}>Not found.</Text>
      </View>
    );
  }

  const title = movie ? movie.title : show!.name;
  const overview = movie ? movie.overview : show!.overview;
  const backdropPath = movie ? movie.backdrop_path : show!.backdrop_path;
  const genreIds = movie ? movie.genre_ids : show!.genre_ids;
  const genreMap = isMovie ? MOVIE_GENRES : TV_GENRES;
  const genres = genreIds.map((gid) => genreMap[gid]).filter(Boolean);
  const year = (movie ? movie.release_date : show!.first_air_date).slice(0, 4);
  const rating = movie ? movie.vote_average : show!.vote_average;
  const voteCount = movie ? movie.vote_count : show!.vote_count;
  const backdropUrl = tmdbImageUrl(backdropPath, "w780");

  const cast = mockCredits[`${mediaType}-${params.id}`] ?? [];

  const related = (movie ? mockMovies : mockTvShows)
    .filter(
      (x) =>
        x.id !== numericId && x.genre_ids.some((g) => genreIds.includes(g)),
    )
    .slice(0, 10)
    .map((x) => ({
      id: x.id,
      mediaType,
      title: movie
        ? (x as typeof movie).title
        : (x as NonNullable<typeof show>).name,
      posterUrl: tmdbImageUrl(x.poster_path),
      voteAverage: x.vote_average,
    }));

  return (
    <View style={styles.flex}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroWrap}>
          {backdropUrl ? (
            <Image
              source={{ uri: backdropUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.heroImage, styles.heroImageFallback]} />
          )}
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.section}>
        <View style={styles.tagsRow}>
          {genres.map((genre) => (
            <View key={genre} style={styles.tag}>
              <Text style={styles.tagText}>{genre}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            ★ {rating.toFixed(1)} ({formatCompactCount(voteCount)})
          </Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.meta}>{year}</Text>
        </View>
        <Pressable style={styles.playButton}>
          <Text style={styles.playButtonText}>▶ Play</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Synopsis</Text>
        <Text style={styles.overview}>{overview}</Text>
      </View>

      {cast.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cast & Crew</Text>
        </View>
      )}
      {cast.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.castRow}
        >
          {cast.map((member) => (
            <View key={member.id} style={styles.castItem}>
              {member.profile_path ? (
                <Image
                  source={{
                    uri: tmdbImageUrl(member.profile_path, "w200") ?? undefined,
                  }}
                  style={styles.castAvatar}
                />
              ) : (
                <View style={[styles.castAvatar, styles.castAvatarFallback]} />
              )}
              <Text numberOfLines={1} style={styles.castName}>
                {member.name}
              </Text>
              <Text numberOfLines={1} style={styles.castCharacter}>
                {member.character}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      {related.length > 0 && (
        <MediaRow title="You might also like" items={related} />
      )}
      </ScrollView>

      <View style={[styles.topBar, { paddingTop: insets.top + Spacing.sm }]}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <SymbolView
            name={{
              ios: "chevron.left",
              android: "arrow_back",
              web: "arrow_back",
            }}
            tintColor={Colors.text.default}
            size={20}
          />
        </Pressable>
        <View style={styles.topBarRight}>
          <Pressable
            style={styles.iconButton}
            onPress={() => toggleFavorite(mediaType, numericId)}
          >
            <Text
              style={[styles.heartIcon, isFavorite && styles.heartIconActive]}
            >
              {isFavorite ? "♥" : "♡"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.iconButton}
            onPress={() => Share.share({ message: title })}
          >
            <SymbolView
              name={{
                ios: "square.and.arrow.up",
                android: "share",
                web: "share",
              }}
              tintColor={Colors.text.default}
              size={18}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.default,
  },
  notFoundText: {
    color: Colors.text.default,
    fontSize: 16,
  },
  heroWrap: {
    height: 320,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
  },
  heroImageFallback: {
    backgroundColor: Colors.background.secondary,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  topBarRight: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  heartIcon: {
    fontSize: 18,
    color: Colors.text.default,
  },
  heartIconActive: {
    color: Colors.text.accent,
  },
  section: {
    paddingHorizontal: Spacing.lg,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.secondary,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.muted,
  },
  title: {
    marginTop: Spacing.md,
    fontSize: 26,
    fontWeight: "700",
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
  playButton: {
    marginTop: Spacing.lg,
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
  sectionTitle: {
    marginTop: Spacing.xl,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.default,
  },
  overview: {
    marginTop: Spacing.sm,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text.muted,
  },
  castRow: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  castItem: {
    width: 80,
  },
  castAvatar: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.secondary,
  },
  castAvatarFallback: {
    backgroundColor: Colors.background.secondary,
  },
  castName: {
    marginTop: Spacing.xs,
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.default,
    textAlign: "center",
  },
  castCharacter: {
    fontSize: 11,
    color: Colors.text.muted,
    textAlign: "center",
  },
});
