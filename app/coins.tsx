import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
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
  {
    coins: 400,
    price: "$6.99",
    label: "Mega Pack",
    tag: "Best Value",
    bonus: "+25% Bonus",
  },
  { coins: 1000, price: "$14.99", label: "Ultimate", bonus: "+40% Bonus" },
];

// Simulates checkout round-trip latency since there is no real payment backend.
const PURCHASE_DELAY_MS = 1200;

export default function CoinsScreen() {
  const insets = useSafeAreaInsets();
  const coinBalance = useUnlockStore((state) => state.coinBalance);
  const addCoins = useUnlockStore((state) => state.addCoins);

  const [selectedCoins, setSelectedCoins] = useState(PACKAGES[1].coins);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withSequence(
      withTiming(1.25, { duration: 150 }),
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

  const handleBuy = () => {
    if (isPurchasing) return;
    setIsPurchasing(true);
    setTimeout(() => {
      addCoins(selectedCoins);
      setToast(`+${selectedCoins} Coins added!`);
      setIsPurchasing(false);
    }, PURCHASE_DELAY_MS);
  };

  return (
    <View style={styles.flex}>
      <Stack.Screen options={{ headerShown: false }} />

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
        <Animated.View style={[styles.balancePill, pulseStyle]}>
          <Image source={coinIcon} style={styles.balancePillIcon} />
          <Text style={styles.balancePillText}>{coinBalance}</Text>
        </Animated.View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + Spacing.xxxl },
        ]}
      >
        <Text style={styles.headline}>Get More{"\n"}Coins</Text>
        <Text style={styles.subtitle}>
          Stock up to keep every cliffhanger unlocked.
        </Text>

        <View style={styles.grid}>
          {PACKAGES.map((pack) => {
            const isSelected = pack.coins === selectedCoins;
            return (
              <Pressable
                key={pack.coins}
                style={[styles.card, isSelected && styles.cardSelected]}
                disabled={isPurchasing}
                onPress={() => setSelectedCoins(pack.coins)}
              >
                {pack.tag && (
                  <LinearGradient
                    colors={Gradients.brand}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ribbon}
                  >
                    <Text style={styles.ribbonText}>{pack.tag}</Text>
                  </LinearGradient>
                )}
                <View style={styles.checkCircle}>
                  {isSelected ? (
                    <LinearGradient
                      colors={Gradients.brand}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.checkCircleFill}
                    >
                      <Text style={styles.checkMark}>✓</Text>
                    </LinearGradient>
                  ) : null}
                </View>

                <Image source={coinIcon} style={styles.cardIcon} />
                <Text style={styles.cardCoins}>{pack.coins}</Text>
                <Text style={styles.cardLabel}>{pack.label}</Text>

                {isSelected ? (
                  <LinearGradient
                    colors={Gradients.brand}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.cardFooter}
                  >
                    <Text style={styles.cardFooterPriceSelected}>
                      {pack.price}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.cardFooter, styles.cardFooterNeutral]}>
                    <Text style={styles.cardFooterPrice}>{pack.price}</Text>
                  </View>
                )}
                {pack.bonus && (
                  <Text style={styles.cardBonus}>{pack.bonus}</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.legal}>
          One-time purchase. Instant delivery. No subscription.
        </Text>

        <Pressable
          style={styles.premiumRow}
          onPress={() => router.push("/premium")}
        >
          <View style={styles.premiumRowIcon}>
            <SymbolView
              name={{
                ios: "crown.fill",
                android: "workspace_premium",
                web: "workspace_premium",
              }}
              tintColor={Colors.text.accent}
              size={16}
            />
          </View>
          <View style={styles.premiumRowInfo}>
            <Text style={styles.premiumRowTitle}>Want unlimited instead?</Text>
            <Text style={styles.premiumRowSubtitle}>
              Go Premium for every episode, no coins needed
            </Text>
          </View>
          <SymbolView
            name={{
              ios: "chevron.right",
              android: "arrow_forward",
              web: "arrow_forward",
            }}
            tintColor={Colors.text.muted}
            size={16}
          />
        </Pressable>
      </ScrollView>

      <View
        style={[styles.footer, { paddingBottom: insets.bottom + Spacing.lg }]}
      >
        <Pressable onPress={handleBuy} disabled={isPurchasing}>
          <LinearGradient
            colors={Gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buyButton}
          >
            {isPurchasing ? (
              <ActivityIndicator size="small" color={Colors.text.inverse} />
            ) : (
              <Text style={styles.buyButtonText}>
                Buy {selectedCoins} Coins
              </Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>

      {toast && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[styles.toast, { top: insets.top + Spacing.xxl + 40 }]}
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
    backgroundColor: Colors.background.default,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 140,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  balancePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.secondary,
  },
  balancePillIcon: {
    width: 18,
    height: 18,
  },
  balancePillText: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.text.default,
  },
  headline: {
    fontSize: 38,
    lineHeight: 40,
    fontWeight: "800",
    color: Colors.text.default,
  },
  subtitle: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: Colors.text.muted,
  },
  grid: {
    marginTop: Spacing.xl,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  card: {
    position: "relative",
    width: "47%",
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.secondary,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
  },
  cardSelected: {
    borderColor: Colors.text.accent,
  },
  ribbon: {
    position: "absolute",
    top: -10,
    left: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  ribbonText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.3,
    color: Colors.text.inverse,
  },
  checkCircle: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    width: 20,
    height: 20,
    borderRadius: BorderRadius.pill,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    overflow: "hidden",
  },
  checkCircleFill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.text.inverse,
  },
  cardIcon: {
    width: 36,
    height: 36,
  },
  cardCoins: {
    marginTop: Spacing.sm,
    fontSize: 20,
    fontWeight: "800",
    color: Colors.text.default,
  },
  cardLabel: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.text.muted,
  },
  cardFooter: {
    marginTop: Spacing.md,
    width: "100%",
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    alignItems: "center",
  },
  cardFooterNeutral: {
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  cardFooterPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text.default,
  },
  cardFooterPriceSelected: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.text.inverse,
  },
  cardBonus: {
    marginTop: Spacing.xs,
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text.secondary,
  },
  legal: {
    marginTop: Spacing.xl,
    fontSize: 12,
    textAlign: "center",
    color: Colors.text.muted,
  },
  premiumRow: {
    marginTop: Spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.secondary,
  },
  premiumRowIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(180,87,219,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  premiumRowInfo: {
    flex: 1,
  },
  premiumRowTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text.default,
  },
  premiumRowSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.text.muted,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.background.default,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border.default,
  },
  buyButton: {
    borderRadius: BorderRadius.pill,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.text.inverse,
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
    backgroundColor: Colors.background.success,
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
