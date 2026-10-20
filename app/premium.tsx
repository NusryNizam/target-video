import { LinearGradient } from "expo-linear-gradient";
import { Stack, router, useLocalSearchParams } from "expo-router";
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
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { mockTvShows, tmdbImageUrl } from "@/src/constants/tmdb";
import { useUnlockStore } from "@/src/store/unlockStore";
import { Colors, Gradients } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

type PlanId = "monthly" | "yearly";

type Plan = {
  id: PlanId;
  label: string;
  price: string;
  period: string;
  badge?: string;
  billed: string;
  features?: string[];
};

const PLANS: Plan[] = [
  {
    id: "monthly",
    label: "Monthly",
    price: "$9.99",
    period: "/month",
    billed: "Billed $9.99 every month. Cancel anytime.",
  },
  {
    id: "yearly",
    label: "Yearly",
    price: "$59.99",
    period: "/year",
    badge: "SAVE 50%",
    billed: "Billed $59.99 every year. Cancel anytime.",
    features: [
      "Watch every episode, every show",
      "Zero ads, ever",
      "New episodes unlocked first",
    ],
  },
];

// Simulates checkout round-trip latency since there is no real payment backend.
const PURCHASE_DELAY_MS = 1500;

export default function PremiumScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ showId?: string }>();
  const show =
    mockTvShows.find((item) => item.id === Number(params.showId)) ??
    mockTvShows[0];
  const backdropUrl = tmdbImageUrl(show.backdrop_path, "w780");

  const goPremium = useUnlockStore((state) => state.goPremium);

  const [selected, setSelected] = useState<PlanId>("yearly");
  const [status, setStatus] = useState<"idle" | "processing" | "success">(
    "idle",
  );

  useEffect(() => {
    if (status !== "processing") return;
    const timer = setTimeout(() => {
      goPremium();
      setStatus("success");
    }, PURCHASE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status, goPremium]);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => router.back(), 1100);
    return () => clearTimeout(timer);
  }, [status]);

  const selectedPlan = PLANS.find((plan) => plan.id === selected) ?? PLANS[1];

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
          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,0.55)",
              Colors.background.default,
            ]}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <View style={styles.crownBadge}>
              <SymbolView
                name={{
                  ios: "crown.fill",
                  android: "workspace_premium",
                  web: "workspace_premium",
                }}
                tintColor={Colors.text.accent}
                size={16}
              />
              <Text style={styles.crownBadgeText}>PREMIUM</Text>
            </View>
            <Text style={styles.heroTitle}>{show.name}</Text>
            <Text style={styles.heroTagline}>Limitless Episodes</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.description}>
            Get unlimited access to every episode of every show with a
            Premium plan. No coins, no waiting, no ads — ever.
          </Text>

          {PLANS.map((plan) => {
            const isSelected = plan.id === selected;
            return (
              <Pressable
                key={plan.id}
                style={[styles.planCard, isSelected && styles.planCardSelected]}
                onPress={() => setSelected(plan.id)}
              >
                {plan.badge && (
                  <LinearGradient
                    colors={Gradients.brand}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.planBadge}
                  >
                    <Text style={styles.planBadgeText}>{plan.badge}</Text>
                  </LinearGradient>
                )}
                <View style={styles.planRow}>
                  <View
                    style={[styles.radio, isSelected && styles.radioSelected]}
                  >
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.planLabel}>{plan.label}</Text>
                  <View style={styles.planPriceWrap}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>{plan.period}</Text>
                  </View>
                </View>
                {isSelected && plan.features && (
                  <View style={styles.featureList}>
                    {plan.features.map((feature) => (
                      <View key={feature} style={styles.featureRow}>
                        <Text style={styles.featureCheck}>✓</Text>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </Pressable>
            );
          })}

          <Text style={styles.disclaimer}>{selectedPlan.billed}</Text>
        </View>
      </ScrollView>

      <Pressable
        style={[styles.closeButton, { top: insets.top + Spacing.sm }]}
        onPress={() => router.back()}
      >
        <Text style={styles.closeText}>✕</Text>
      </Pressable>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + Spacing.lg },
        ]}
      >
        <Pressable
          onPress={() => status === "idle" && setStatus("processing")}
          disabled={status !== "idle"}
        >
          <LinearGradient
            colors={Gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>
              Continue — {selectedPlan.price}
              {selectedPlan.period}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>

      {status !== "idle" && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.overlay}
        >
          {status === "processing" ? (
            <>
              <ActivityIndicator size="large" color={Colors.text.accent} />
              <Text style={styles.overlayText}>Processing payment…</Text>
            </>
          ) : (
            <Animated.View entering={FadeInDown} style={styles.successWrap}>
              <View style={styles.successCircle}>
                <Text style={styles.successCheck}>✓</Text>
              </View>
              <Text style={styles.overlayText}>You&rsquo;re Premium!</Text>
              <Text style={styles.overlaySubtext}>
                Every episode is now unlocked.
              </Text>
            </Animated.View>
          )}
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
    paddingBottom: 160,
  },
  heroWrap: {
    height: 360,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
  },
  heroImageFallback: {
    backgroundColor: Colors.background.secondary,
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
  },
  heroContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.lg,
  },
  crownBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  crownBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: Colors.text.accent,
  },
  heroTitle: {
    marginTop: Spacing.sm,
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text.default,
  },
  heroTagline: {
    marginTop: Spacing.xxs,
    fontSize: 15,
    fontStyle: "italic",
    color: Colors.text.secondary,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text.muted,
    marginBottom: Spacing.lg,
  },
  planCard: {
    position: "relative",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.secondary,
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: Spacing.md,
  },
  planCardSelected: {
    borderColor: Colors.text.accent,
    backgroundColor: "rgba(180,87,219,0.12)",
  },
  planBadge: {
    position: "absolute",
    top: -10,
    right: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.3,
    color: Colors.text.inverse,
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.pill,
    borderWidth: 2,
    borderColor: Colors.border.default,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: Colors.text.accent,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.text.accent,
  },
  planLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.default,
  },
  planPriceWrap: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.text.default,
  },
  planPeriod: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  featureList: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    paddingLeft: 34,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border.default,
    gap: Spacing.xs,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  featureCheck: {
    width: 16,
    fontSize: 13,
    fontWeight: "800",
    color: Colors.text.secondary,
  },
  featureText: {
    fontSize: 13,
    color: Colors.text.muted,
  },
  disclaimer: {
    marginTop: Spacing.sm,
    fontSize: 12,
    textAlign: "center",
    color: Colors.text.muted,
  },
  closeButton: {
    position: "absolute",
    right: Spacing.lg,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: Colors.text.default,
    fontSize: 16,
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
  continueButton: {
    borderRadius: BorderRadius.pill,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.text.inverse,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    marginTop: Spacing.md,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.default,
  },
  overlaySubtext: {
    marginTop: Spacing.xxs,
    fontSize: 13,
    color: Colors.text.muted,
  },
  successWrap: {
    alignItems: "center",
  },
  successCircle: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(100,237,247,0.15)",
    borderWidth: 2,
    borderColor: Colors.text.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  successCheck: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.text.secondary,
  },
});
