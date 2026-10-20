import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { Colors } from "@/src/tokens/colors";

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
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "house.fill", android: "home", web: "home" }}
              tintColor={color}
              size={28}
            />
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
