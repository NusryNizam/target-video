import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUnlockStore } from "@/src/store/unlockStore";
import { Colors, Gradients } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

const coinIcon = require("@/assets/images/coin.png");

const PACKAGES = [
  { coins: 50, price: "$0.99", label: "Starter" },
  { coins: 150, price: "$2.99", label: "Popular", tag: "Most Popular" },
  { coins: 400, price: "$6.99", label: "Mega Pack", tag: "Best Value", bonus: "+25% Bonus" },
  { coins: 1000, price: "$14.99", label: "Ultimate", bonus: "+40% Bonus" },
];

export default function CoinsScreen() {
  const insets = useSafeAreaInsets();
  const coinBalance = useUnlockStore((state) => state.coinBalance);
  const isPremium = useUnlockStore((state) => state.isPremium);
  const addCoins = useUnlockStore((state) => state.addCoins);
  const goPremium = useUnlockStore((state) => state.goPremium);

  const [toast, setToast] = useState<string | null>(null);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withSequence(
      withTiming(1.18, { duration: 150 }),
      withTiming(1, { duration: 200 }),
    );
  }, [coinBalance, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleBuy = (pack: (typeof PACKAGES)[number]) => {
    addCoins(pack.coins);
    setToast(`+${pack.coins} Coins added!`);
  };

  return (
    <View style={styles.flex}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={Gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + Spacing.xxl }]}
        >
          <View style={styles.heroCoinWrap}>
            <Image source={coinIcon} style={styles.heroCoinIcon} />
          </View>
          <Animated.Text style={[styles.balanceValue, pulseStyle]}>
            {coinBalance}
          </Animated.Text>
          <Text style={styles.balanceLabel}>Your Balance</Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a Pack</Text>
          {PACKAGES.map((pack, index) => (
            <Animated.View
              key={pack.coins}
              entering={FadeInDown.delay(index * 80).springify().damping(16)}
            >
              <Pressable
                style={[styles.packageCard, pack.tag && styles.packageCardFeatured]}
                onPress={() => handleBuy(pack)}
              >
                {pack.tag && (
                  <LinearGradient
                    colors={Gradients.brand}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tagBadge}
                  >
                    <Text style={styles.tagBadgeText}>{pack.tag}</Text>
                  </LinearGradient>
                )}
                <View style={styles.packageIconWrap}>
                  <Image source={coinIcon} style={styles.packageIcon} />
                </View>
                <View style={styles.packageInfo}>
                  <Text style={styles.packageCoins}>{pack.coins} Coins</Text>
                  <View style={styles.packageMetaRow}>
                    <Text style={styles.packageLabel}>{pack.label}</Text>
                    {pack.bonus && (
                      <Text style={styles.packageBonus}>{pack.bonus}</Text>
                    )}
                  </View>
                </View>
                <View style={pack.tag ? styles.buyButtonFeatured : styles.buyButton}>
                  <Text
                    style={pack.tag ? styles.buyButtonFeaturedText : styles.buyButtonText}
                  >
                    {pack.price}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {!isPremium && (
          <View style={styles.section}>
            <LinearGradient
              colors={Gradients.brand}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.premiumCard}
            >
              <Text style={styles.premiumEyebrow}>UNLIMITED ACCESS</Text>
              <Text style={styles.premiumTitle}>Go Premium</Text>
              <Text style={styles.premiumSubtitle}>
                Unlock every episode of every show, forever. No coins needed.
              </Text>
              <Pressable style={styles.premiumButton} onPress={goPremium}>
                <Text style={styles.premiumButtonText}>Upgrade Now</Text>
              </Pressable>
            </LinearGradient>
          </View>
        )}
      </ScrollView>

      <View style={[styles.topBar, { paddingTop: insets.top + Spacing.sm }]}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
            tintColor={Colors.text.default}
            size={20}
          />
        </Pressable>
        <Text style={styles.topBarTitle}>Coin Shop</Text>
        <View style={styles.iconButtonSpacer} />
      </View>

      {toast && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[styles.toast, { top: insets.top + Spacing.xxl + 56 }]}
        >
          <Image source={coinIcon} style={styles.toastIcon} />
          <Text style={styles.toastText}>{toast}</Text>
        </Animated.View>
      )}
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
    paddingBottom: Spacing.xxxl,
  },
  hero: {
    alignItems: "center",
    paddingBottom: Spacing.xxl,
    borderBottomLeftRadius: BorderRadius.xxxl,
    borderBottomRightRadius: BorderRadius.xxxl,
  },
  heroCoinWrap: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCoinIcon: {
    width: 44,
    height: 44,
  },
  balanceValue: {
    marginTop: Spacing.md,
    fontSize: 44,
    fontWeight: "800",
    color: Colors.text.inverse,
  },
  balanceLabel: {
    marginTop: Spacing.xxs,
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(0,0,0,0.6)",
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.default,
    marginBottom: Spacing.md,
  },
  packageCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.secondary,
    gap: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: "transparent",
  },
  packageCardFeatured: {
    borderColor: Colors.text.accent,
  },
  tagBadge: {
    position: "absolute",
    top: -10,
    left: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  tagBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.3,
    color: Colors.text.inverse,
  },
  packageIconWrap: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  packageIcon: {
    width: 28,
    height: 28,
  },
  packageInfo: {
    flex: 1,
  },
  packageCoins: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.default,
  },
  packageMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: 2,
  },
  packageLabel: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  packageBonus: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.text.secondary,
  },
  buyButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: Colors.border.default,
  },
  buyButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text.default,
  },
  buyButtonFeatured: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.text.accent,
  },
  buyButtonFeaturedText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text.inverse,
  },
  premiumCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xxl,
  },
  premiumEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: "rgba(0,0,0,0.55)",
  },
  premiumTitle: {
    marginTop: Spacing.xs,
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text.inverse,
  },
  premiumSubtitle: {
    marginTop: Spacing.xs,
    fontSize: 13,
    color: "rgba(0,0,0,0.65)",
  },
  premiumButton: {
    marginTop: Spacing.lg,
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.default,
  },
  premiumButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text.default,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.default,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonSpacer: {
    width: 36,
    height: 36,
  },
  toast: {
    position: "absolute",
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.default,
  },
  toastIcon: {
    width: 18,
    height: 18,
  },
  toastText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text.default,
  },
});
