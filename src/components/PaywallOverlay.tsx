import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Gradients } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const coinIcon = require("@/assets/images/coin.png");

export function PaywallOverlay({
  coinBalance,
  unlockCost,
  onGoPremium,
  onUnlockWithCoins,
  onClose,
}: {
  coinBalance: number;
  unlockCost: number;
  onGoPremium: () => void;
  onUnlockWithCoins: () => void;
  onClose: () => void;
}) {
  const canAfford = coinBalance >= unlockCost;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.overlay}>
      <Pressable
        style={[styles.closeButton, { top: insets.top }]}
        onPress={onClose}
      >
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>CLIFFHANGER</Text>
        <Text style={styles.title}>Want to know what happens next?</Text>
        <Text style={styles.subtitle}>
          This episode is locked. Unlock it to keep watching.
        </Text>

        <Pressable onPress={onGoPremium}>
          <LinearGradient
            colors={Gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.premiumButton}
          >
            <Text style={styles.premiumButtonText}>
              🔓 Go Premium — Unlock Everything
            </Text>
          </LinearGradient>
        </Pressable>

        <Pressable style={styles.coinButton} onPress={onUnlockWithCoins}>
          <Image source={coinIcon} style={styles.coinIcon} />
          <Text style={styles.coinButtonText}>
            {canAfford
              ? `Unlock for ${unlockCost} Coins`
              : "Not enough coins — Get more"}
          </Text>
        </Pressable>
        <Text style={styles.balanceText}>
          Your balance: {coinBalance} coins
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  closeButton: {
    position: "absolute",
    right: Spacing.lg,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: Colors.text.default,
    fontSize: 16,
  },
  card: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: Colors.text.accent,
  },
  title: {
    marginTop: Spacing.sm,
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text.default,
  },
  subtitle: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: Colors.text.muted,
  },
  premiumButton: {
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.pill,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  premiumButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text.inverse,
  },
  coinButton: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    borderRadius: BorderRadius.pill,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.default,
  },
  coinIcon: {
    width: 20,
    height: 20,
  },
  coinButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text.default,
  },
  balanceText: {
    marginTop: Spacing.sm,
    textAlign: "center",
    fontSize: 12,
    color: Colors.text.muted,
  },
});
