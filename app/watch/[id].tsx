import { useEventListener } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CoinShopSheet } from "@/src/components/CoinShopSheet";
import { PaywallOverlay } from "@/src/components/PaywallOverlay";
import { mockTvShows } from "@/src/constants/tmdb";
import { EPISODE_UNLOCK_COST, useUnlockStore } from "@/src/store/unlockStore";
import { Colors, Gradients } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";
import { generateEpisodes } from "@/src/utils/episodes";
import { formatPlaybackTime } from "@/src/utils/format";

const videoSource = require("@/assets/videos/BigBuckBunny.mp4");

const HIDE_CONTROLS_DELAY_MS = 3000;

function clampFraction(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

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
    // Disabled by default; the custom scrubber needs it to track progress.
    p.timeUpdateEventInterval = 0.25;
  });

  // Custom playback chrome — replaces the native controls so it can share
  // one show/hide timer with the top bar and match the app's styling.
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubTime, setScrubTime] = useState<number | null>(null);
  const scrubbingRef = useRef(false);
  const trackWidthRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chromeOpacity = useSharedValue(1);

  // The topBar must stay visible (and the timer stay off) while the paywall
  // or coin shop covers the screen — derived here instead of synced via an
  // effect, since an effect may not call setState synchronously in its body.
  const chromeVisible = isLocked || showCoinShop ? true : controlsVisible;

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  // `willAutoHide` is passed explicitly by callers rather than read from
  // `isPlaying` state, since a caller that just called player.play()/pause()
  // would otherwise read the pre-update (stale) value in the same tick.
  const showControls = (willAutoHide: boolean) => {
    clearHideTimer();
    setControlsVisible(true);
    if (willAutoHide) {
      hideTimerRef.current = setTimeout(
        () => setControlsVisible(false),
        HIDE_CONTROLS_DELAY_MS,
      );
    }
  };

  const toggleControls = () => {
    if (controlsVisible) {
      clearHideTimer();
      setControlsVisible(false);
    } else {
      showControls(isPlaying);
    }
  };

  // Schedules the very first auto-hide; controlsVisible already defaults to
  // true, so this only needs to arm the timer, not set state synchronously.
  useEffect(() => {
    hideTimerRef.current = setTimeout(
      () => setControlsVisible(false),
      HIDE_CONTROLS_DELAY_MS,
    );
    return clearHideTimer;
  }, []);

  useEffect(() => {
    chromeOpacity.value = withTiming(chromeVisible ? 1 : 0, {
      duration: 200,
    });
  }, [chromeVisible, chromeOpacity]);

  const chromeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: chromeOpacity.value,
  }));

  useEventListener(player, "playingChange", ({ isPlaying: playing }) => {
    setIsPlaying(playing);
  });

  useEventListener(player, "sourceLoad", ({ duration: loadedDuration }) => {
    setDuration(loadedDuration);
  });

  useEventListener(player, "timeUpdate", ({ currentTime: time }) => {
    if (!scrubbingRef.current) setCurrentTime(time);
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

  const handleScrubGrant = (evt: GestureResponderEvent) => {
    scrubbingRef.current = true;
    clearHideTimer();
    setControlsVisible(true);
    const fraction = clampFraction(
      evt.nativeEvent.locationX / (trackWidthRef.current || 1),
    );
    setScrubTime(fraction * duration);
  };

  const handleScrubMove = (evt: GestureResponderEvent) => {
    const fraction = clampFraction(
      evt.nativeEvent.locationX / (trackWidthRef.current || 1),
    );
    setScrubTime(fraction * duration);
  };

  const handleScrubRelease = (evt: GestureResponderEvent) => {
    const fraction = clampFraction(
      evt.nativeEvent.locationX / (trackWidthRef.current || 1),
    );
    const target = fraction * duration;
    player.seekBy(target - player.currentTime);
    setCurrentTime(target);
    setScrubTime(null);
    scrubbingRef.current = false;
    showControls(isPlaying);
  };

  if (!show) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.notFoundText}>Not found.</Text>
      </View>
    );
  }

  const displayedTime = scrubTime ?? currentTime;
  const progressPercent =
    duration > 0 ? clampFraction(displayedTime / duration) * 100 : 0;
  const showPlaybackChrome = !isLocked && !showCoinShop;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />

      {showPlaybackChrome && (
        <Pressable style={StyleSheet.absoluteFill} onPress={toggleControls} />
      )}

      <Animated.View
        style={[
          styles.topBar,
          { paddingTop: insets.top + Spacing.sm },
          chromeAnimatedStyle,
        ]}
        pointerEvents={chromeVisible ? "auto" : "none"}
      >
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
        <View style={styles.episodeBadge}>
          <Text style={styles.episodeBadgeText}>
            {show.name} · Episode {currentEpisode}
          </Text>
        </View>
      </Animated.View>

      {showPlaybackChrome && (
        <Animated.View
          style={[StyleSheet.absoluteFill, chromeAnimatedStyle]}
          pointerEvents={chromeVisible ? "box-none" : "none"}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.55)", "transparent"]}
            style={styles.topGradient}
            pointerEvents="none"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.bottomGradient}
            pointerEvents="none"
          />

          <View style={styles.centerControls} pointerEvents="box-none">
            <Pressable
              style={styles.skipButton}
              onPress={() => {
                player.seekBy(-10);
                showControls(isPlaying);
              }}
            >
              <SymbolView
                name={{
                  ios: "gobackward.10",
                  android: "replay_10",
                  web: "replay_10",
                }}
                tintColor={Colors.text.default}
                size={24}
              />
            </Pressable>
            <Pressable
              style={styles.playPauseButton}
              onPress={() => {
                if (isPlaying) {
                  player.pause();
                  showControls(false);
                } else {
                  player.play();
                  showControls(true);
                }
              }}
            >
              <SymbolView
                name={{
                  ios: isPlaying ? "pause.fill" : "play.fill",
                  android: isPlaying ? "pause" : "play_arrow",
                  web: isPlaying ? "pause" : "play_arrow",
                }}
                tintColor={Colors.text.default}
                size={28}
              />
            </Pressable>
            <Pressable
              style={styles.skipButton}
              onPress={() => {
                player.seekBy(10);
                showControls(isPlaying);
              }}
            >
              <SymbolView
                name={{
                  ios: "goforward.10",
                  android: "forward_10",
                  web: "forward_10",
                }}
                tintColor={Colors.text.default}
                size={24}
              />
            </Pressable>
          </View>

          <View
            style={[
              styles.bottomBar,
              { paddingBottom: insets.bottom + Spacing.lg },
            ]}
          >
            <View style={styles.scrubRow}>
              <Text style={styles.timeText}>
                {formatPlaybackTime(displayedTime)}
              </Text>
              <View
                style={styles.scrubHitArea}
                onLayout={(e) => {
                  trackWidthRef.current = e.nativeEvent.layout.width;
                }}
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderGrant={handleScrubGrant}
                onResponderMove={handleScrubMove}
                onResponderRelease={handleScrubRelease}
                onResponderTerminate={handleScrubRelease}
              >
                <View style={styles.scrubTrackBg} />
                <LinearGradient
                  colors={Gradients.brand}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.scrubTrackFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
                <View
                  style={[styles.scrubThumb, { left: `${progressPercent}%` }]}
                />
              </View>
              <Text style={styles.timeText}>
                {formatPlaybackTime(duration)}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}

      {isLocked && !showCoinShop && (
        <PaywallOverlay
          coinBalance={coinBalance}
          unlockCost={EPISODE_UNLOCK_COST}
          onGoPremium={() => router.push(`/premium?showId=${showId}`)}
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
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
  },
  centerControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xxl,
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  skipButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.lg,
  },
  scrubRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  timeText: {
    minWidth: 36,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text.default,
  },
  scrubHitArea: {
    flex: 1,
    height: 24,
    justifyContent: "center",
  },
  scrubTrackBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  scrubTrackFill: {
    position: "absolute",
    top: 10,
    left: 0,
    height: 4,
    borderRadius: 2,
  },
  scrubThumb: {
    position: "absolute",
    top: 5,
    width: 14,
    height: 14,
    marginLeft: -7,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.text.default,
  },
});
