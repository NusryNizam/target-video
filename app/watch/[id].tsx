import { useEventListener } from "expo";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CoinShopSheet } from "@/src/components/CoinShopSheet";
import { PaywallOverlay } from "@/src/components/PaywallOverlay";
import { mockTvShows } from "@/src/constants/tmdb";
import { EPISODE_UNLOCK_COST, useUnlockStore } from "@/src/store/unlockStore";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";
import { generateEpisodes } from "@/src/utils/episodes";

const videoSource = require("@/assets/videos/BigBuckBunny.mp4");

export default function WatchScreen() {
  const params = useLocalSearchParams<{ id: string; episode?: string }>();
  const showId = Number(params.id);
  const insets = useSafeAreaInsets();

  const show = mockTvShows.find((s) => s.id === showId);
  const episodes = useMemo(() => (show ? generateEpisodes(show) : []), [show]);

  const [currentEpisode, setCurrentEpisode] = useState(
    params.episode ? Number(params.episode) : 1,
  );
  const [showCoinShop, setShowCoinShop] = useState(false);

  const coinBalance = useUnlockStore((state) => state.coinBalance);
  const goPremium = useUnlockStore((state) => state.goPremium);
  const addCoins = useUnlockStore((state) => state.addCoins);
  const unlockWithCoins = useUnlockStore((state) => state.unlockWithCoins);
  // isEpisodeLocked's own reference never changes, so also subscribe to the
  // fields it reads internally — otherwise a Premium purchase here wouldn't
  // trigger a re-render (coinBalance changing happens to cover the coins path).
  useUnlockStore((state) => state.isPremium);
  useUnlockStore((state) => state.coinUnlockedEpisodes);
  const isEpisodeLocked = useUnlockStore((state) => state.isEpisodeLocked);

  const episodeData = episodes.find((e) => e.number === currentEpisode);
  const isLocked = episodeData
    ? isEpisodeLocked(showId, currentEpisode, episodeData.locked)
    : false;

  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = false;
  });

  useEventListener(player, "playToEnd", () => {
    const next = episodes.find((e) => e.number === currentEpisode + 1);
    if (!next) return;
    setCurrentEpisode(next.number);
    const nextLocked = isEpisodeLocked(showId, next.number, next.locked);
    if (!nextLocked) {
      player.replay();
    }
  });

  useEffect(() => {
    if (isLocked || showCoinShop) {
      player.pause();
    } else {
      player.play();
    }
  }, [isLocked, showCoinShop, player]);

  if (!show) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.notFoundText}>Not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={!isLocked && !showCoinShop}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + Spacing.sm }]}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
            tintColor={Colors.text.default}
            size={20}
          />
        </Pressable>
        <View style={styles.episodeBadge}>
          <Text style={styles.episodeBadgeText}>
            {show.name} · Episode {currentEpisode}
          </Text>
        </View>
      </View>

      {isLocked && !showCoinShop && (
        <PaywallOverlay
          coinBalance={coinBalance}
          unlockCost={EPISODE_UNLOCK_COST}
          onGoPremium={() => {
            goPremium();
            player.replay();
          }}
          onUnlockWithCoins={() => {
            const unlocked = unlockWithCoins(showId, currentEpisode);
            if (unlocked) {
              player.replay();
            } else {
              setShowCoinShop(true);
            }
          }}
          onClose={() => router.back()}
        />
      )}

      {showCoinShop && (
        <CoinShopSheet
          onBuy={(coins) => {
            addCoins(coins);
            setShowCoinShop(false);
          }}
          onClose={() => setShowCoinShop(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  video: {
    ...StyleSheet.absoluteFill,
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
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  episodeBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  episodeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.default,
  },
});
