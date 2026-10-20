import { FlatList, StyleSheet, Text, View } from "react-native";

import { MediaCard, MediaItem } from "@/src/components/MediaCard";
import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

export function MediaRow({
  title,
  items,
}: {
  title: string;
  items: MediaItem[];
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.accentBar} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => <MediaCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  accentBar: {
    width: 4,
    height: 16,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.icon.default,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.default,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
});
