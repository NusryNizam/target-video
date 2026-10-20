import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/tokens/colors";
import { Spacing } from "@/src/tokens/spacing";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.background.default,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.default,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
});
