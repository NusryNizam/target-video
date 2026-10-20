import { Tabs, router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useUnlockStore } from "@/src/store/unlockStore";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

const coinIcon = require("@/assets/images/coin.png");

function CoinBalancePill() {
  const coinBalance = useUnlockStore((state) => state.coinBalance);
  return (
    <Pressable style={styles.coinPill} onPress={() => router.push("/coins")}>
      <Image source={coinIcon} style={styles.coinIcon} />
      <Text style={styles.coinText}>{coinBalance}</Text>
    </Pressable>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.icon.default,
        tabBarInactiveTintColor: Colors.icon.muted,
        tabBarStyle: { backgroundColor: Colors.background.default },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "",
          headerLeft: () => <CoinBalancePill />,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "house.fill", android: "home", web: "home" }}
              tintColor={color}
              size={28}
            />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable style={styles.headerIconButton}>
                <SymbolView
                  name={{
                    ios: "magnifyingglass",
                    android: "search",
                    web: "search",
                  }}
                  tintColor={Colors.text.default}
                  size={22}
                />
              </Pressable>
              <Pressable style={styles.headerIconButton}>
                <SymbolView
                  name={{
                    ios: "bell",
                    android: "notifications",
                    web: "notifications",
                  }}
                  tintColor={Colors.text.default}
                  size={22}
                />
              </Pressable>
              <Pressable style={styles.headerIconButton}>
                <SymbolView
                  name={{
                    ios: "person.circle.fill",
                    android: "account_circle",
                    web: "account_circle",
                  }}
                  tintColor={Colors.text.default}
                  size={26}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "heart.fill", android: "favorite", web: "favorite" }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginRight: Spacing.lg,
  },
  headerIconButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  coinPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginLeft: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.secondary,
  },
  coinIcon: {
    width: 18,
    height: 18,
  },
  coinText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text.default,
  },
});
