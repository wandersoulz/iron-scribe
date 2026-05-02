import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Library, Ancestry, HeroReference, Hero } from "@iron-scribe/model";
import { AncestryDetail } from "./AncestryDetail";

interface Props {
  library: Library;
  allAncestries: Ancestry[];
  heroState: Partial<HeroReference>;
  onHeroStateChange: (newState: Partial<HeroReference>) => void;
  hero: Hero | null;
}

export const AncestrySelection: React.FC<Props> = ({
  library,
  allAncestries,
  heroState,
  onHeroStateChange,
  hero,
}) => {
  const [selectedAncestryId, setSelectedAncestryId] = useState<string>("");

  const handleSelectAncestry = (ancestry: Ancestry) => {
    setSelectedAncestryId(ancestry.id);

    const newState = {
      ...heroState,
      modules: {
        ...heroState.modules,
        ancestry: {
          ancestryId: ancestry.id,
          signatureTraits: ancestry.signatureTraits.map((trait) => ({
            traitId: trait.id,
          })),
          purchasedTraits: [],
        },
      },
    };
    onHeroStateChange(newState);
  };

  const currentAncestryId = heroState.modules?.ancestry?.ancestryId;

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>CHOOSE ANCESTRY</Text>
        <ScrollView style={styles.sidebarScroll}>
          <View style={styles.sidebarList}>
            {allAncestries.map((anc) => {
              const isSelected = selectedAncestryId === anc.id || currentAncestryId === anc.id;
              return (
                <TouchableOpacity
                  key={anc.id}
                  onPress={() => handleSelectAncestry(anc)}
                  style={[
                    styles.ancestryButton,
                    isSelected && styles.ancestryButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.ancestryButtonText,
                      isSelected && styles.ancestryButtonTextSelected,
                    ]}
                  >
                    {anc.name.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.mainContent}>
        {!hero ? (
          <View style={styles.placeholderContainer}>
            <View style={styles.placeholderIconContainer}>
              <Text style={styles.placeholderIcon}>🛡️</Text>
            </View>
            <Text style={styles.placeholderTitle}>HERITAGE UNCLAIMED</Text>
            <Text style={styles.placeholderText}>
              SELECT A LINEAGE FROM THE ARCHIVES TO DEFINE YOUR HERO'S
              FUNDAMENTAL TRAITS AND ABILITIES.
            </Text>
          </View>
        ) : (
          <View style={styles.detailWrapper}>
            <AncestryDetail
              hero={hero}
              library={library}
              isEditable={true}
              onHeroStateChange={onHeroStateChange as any}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 600,
    gap: 32,
  },
  sidebar: {
    width: 280,
    borderRightWidth: 1,
    borderRightColor: "#1e293b",
    paddingRight: 16,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 2,
    marginBottom: 24,
  },
  sidebarScroll: {
    flex: 1,
  },
  sidebarList: {
    gap: 12,
  },
  ancestryButton: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  ancestryButtonSelected: {
    backgroundColor: "#4f46e5",
    borderColor: "#6366f1",
  },
  ancestryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#94a3b8",
    letterSpacing: -0.5,
  },
  ancestryButtonTextSelected: {
    color: "#ffffff",
    fontWeight: "900",
  },
  mainContent: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 41, 59, 0.1)",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(51, 65, 85, 0.5)",
    borderRadius: 48,
    padding: 48,
  },
  placeholderIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  placeholderIcon: {
    fontSize: 48,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#cbd5e1",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#64748b",
    letterSpacing: 2,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 20,
  },
  detailWrapper: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.2)",
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.3)",
    overflow: "hidden",
  },
});
