import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Hero, Library, RegistryName, Ancestry } from "@iron-scribe/model";

interface AncestryCardProps {
  hero: Hero;
  library: Library;
  onClick: () => void;
}

export const AncestryCard: React.FC<AncestryCardProps> = ({
  hero,
  library,
  onClick,
}) => {
  if (!hero.ancestry) return null;
  const [ancestryData, setAncestryData] = useState<Ancestry | undefined>(
    undefined,
  );

  useEffect(() => {
    const ancestryRegistry = library.getCompositeRegistry<Ancestry>(
      RegistryName.Ancestries,
    );
    ancestryRegistry.get(hero.ancestry!.id).then(setAncestryData);
  }, [hero.ancestry.id]);

  return (
    <TouchableOpacity style={styles.card} onPress={onClick} activeOpacity={0.7}>
      <View style={styles.decoration} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🛡️</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ANCESTRY</Text>
          </View>
        </View>

        <Text style={styles.name}>{ancestryData?.name?.toUpperCase() || "UNKNOWN"}</Text>
        <Text style={styles.subtitle}>CORE IDENTITY</Text>

        <View style={styles.traitsSection}>
          <View style={styles.sectionDividerRow}>
            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>TRAITS</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.traitList}>
            {[
              ...hero.ancestry.signatureTraits,
              ...hero.ancestry.purchasedTraits,
            ].map((t) => (
              <View key={t.id} style={styles.traitItem}>
                <View style={styles.traitDot} />
                <Text style={styles.traitName}>{t.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>MANAGE DETAILS</Text>
          <Text style={styles.footerArrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    position: "relative",
  },
  decoration: {
    position: "absolute",
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 64,
  },
  content: {
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(79, 70, 229, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    backgroundColor: "rgba(129, 140, 248, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.2)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#818cf8",
    letterSpacing: 2,
  },
  name: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 24,
  },
  traitsSection: {
    gap: 12,
  },
  sectionDividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#334155",
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 2,
  },
  traitList: {
    gap: 8,
  },
  traitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  traitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(99, 102, 241, 0.5)",
  },
  traitName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#cbd5e1",
  },
  footer: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: "#818cf8",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 2,
  },
  footerArrow: {
    color: "#818cf8",
    fontWeight: "900",
    fontSize: 12,
  },
});
