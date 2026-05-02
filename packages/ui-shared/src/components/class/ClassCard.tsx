import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Hero } from "@iron-scribe/model";

interface Props {
  hero: Hero;
  onClick: () => void;
}

export const ClassCard: React.FC<Props> = ({ hero, onClick }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick} activeOpacity={0.7}>
      <View style={styles.decoration} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⚔️</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CLASS</Text>
          </View>
        </View>

        <Text style={styles.name}>{hero.class?.name?.toUpperCase() || "UNKNOWN"}</Text>
        
        <View style={styles.subclassInfo}>
          {hero.class?.subclasses.map((subclass) => (
            <Text key={subclass.name} style={styles.subclassText}>
              {subclass.name.toUpperCase()}:{" "}
              {hero.resolveChoiceReference({ choiceId: subclass.id })?.name.toUpperCase()}
            </Text>
          ))}
        </View>

        <View style={styles.abilitiesSection}>
          <View style={styles.sectionDividerRow}>
            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>ABILITIES</Text>
            <View style={styles.divider} />
          </View>

          <Text style={styles.abilitiesCount}>
            {hero.class?.abilities?.length || 0} CLASS ABILITIES AVAILABLE
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>VIEW ABILITIES</Text>
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
  subclassInfo: {
    marginBottom: 24,
  },
  subclassText: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 4,
  },
  abilitiesSection: {
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
  abilitiesCount: {
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
