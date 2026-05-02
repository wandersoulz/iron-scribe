import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Hero, Skill } from "@iron-scribe/model";

interface Props {
  hero: Hero;
}

export const SkillCard: React.FC<Props> = ({ hero }) => {
  const skills = hero.getList("skills") as Skill[];

  return (
    <View style={styles.card}>
      <View style={styles.decoration} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🧠</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SKILLS</Text>
          </View>
        </View>

        <Text style={styles.name}>SKILLS</Text>

        <View style={styles.section}>
          <View style={styles.sectionDividerRow}>
            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>KNOWLEDGE & UTILITY</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.skillList}>
            {skills.map((skill) => (
              <View key={skill.id} style={styles.skillBadge}>
                <Text style={styles.skillName}>{skill.name.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: "rgba(16, 185, 129, 0.1)",
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
    backgroundColor: "rgba(5, 150, 105, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    backgroundColor: "rgba(52, 211, 153, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(52, 211, 153, 0.2)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#34d399",
    letterSpacing: 2,
  },
  name: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  section: {
    gap: 16,
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
  skillList: {
    gap: 8,
  },
  skillBadge: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.5)",
    borderRadius: 16,
    padding: 12,
  },
  skillName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#e2e8f0",
    letterSpacing: 0.5,
  },
});
