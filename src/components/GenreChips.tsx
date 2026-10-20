import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@/src/tokens/colors";
import { BorderRadius, Spacing } from "@/src/tokens/spacing";

export function GenreChips({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}) {
  return (
    <FlatList
      horizontal
      data={options}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => {
        const isSelected = item === selected;
        return (
          <Pressable
            onPress={() => onSelect(item)}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {item}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.background.secondary,
    marginRight: Spacing.sm,
  },
  chipSelected: {
    backgroundColor: Colors.icon.default,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.muted,
  },
  labelSelected: {
    color: Colors.text.inverse,
  },
});
