import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/src/tokens/colors';
import { BorderRadius, Spacing } from '@/src/tokens/spacing';

const coinIcon = require('@/assets/images/coin.png');

const PACKAGES = [
  { coins: 50, label: 'Starter' },
  { coins: 150, label: 'Popular' },
  { coins: 400, label: 'Best Value' },
];

export function CoinShopSheet({
  onBuy,
  onClose,
}: {
  onBuy: (coins: number) => void;
  onClose: () => void;
}) {
  return (
    <View style={styles.overlay}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.title}>Get Coins</Text>
        <Text style={styles.subtitle}>Top up your balance to unlock episodes</Text>
        {PACKAGES.map((pack) => (
          <Pressable key={pack.coins} style={styles.packageRow} onPress={() => onBuy(pack.coins)}>
            <Image source={coinIcon} style={styles.coinIcon} />
            <View style={styles.packageInfo}>
              <Text style={styles.packageCoins}>{pack.coins} Coins</Text>
              <Text style={styles.packageLabel}>{pack.label}</Text>
            </View>
            <Text style={styles.buyText}>Get</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.xxl,
    right: Spacing.lg,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: Colors.text.default,
    fontSize: 16,
  },
  card: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.default,
  },
  subtitle: {
    marginTop: Spacing.xs,
    fontSize: 13,
    color: Colors.text.muted,
  },
  packageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background.secondary,
    gap: Spacing.md,
  },
  coinIcon: {
    width: 32,
    height: 32,
  },
  packageInfo: {
    flex: 1,
  },
  packageCoins: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.default,
  },
  packageLabel: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.text.muted,
  },
  buyText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.accent,
  },
});
