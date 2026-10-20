import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, View } from "react-native";

import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { Colors } from "@/src/tokens/colors";
import { Spacing } from "@/src/tokens/spacing";

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
});
