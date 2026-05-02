import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Hero } from "@iron-scribe/model";
import { AbilityCard } from "./AbilityCard";
import { SideOverlay } from "../common/SideOverlay";

interface Props {
  hero: Hero;
  isOpen: boolean;
  onClose: () => void;
}

export const AbilitiesOverlay: React.FC<Props> = ({
  hero,
  isOpen,
  onClose,
}) => {
  const abilities = hero.allAbilities;

  return (
    <SideOverlay
      isOpen={isOpen}
      onClose={onClose}
      title="CLASS ABILITIES"
      maxWidth={600}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {abilities.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔮</Text>
            <Text style={styles.emptyText}>
              NO ABILITIES FOUND FOR THIS CLASS.
            </Text>
          </View>
        ) : (
          abilities.map((ability) => (
            <View key={ability.id} style={styles.cardWrapper}>
              <AbilityCard ability={ability} />
            </View>
          ))
        )}
      </ScrollView>
    </SideOverlay>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 32,
    gap: 32,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    color: "#64748b",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 2,
    textAlign: "center",
  },
  cardWrapper: {
    marginBottom: 24,
  },
});
