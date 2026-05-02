import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Hero, SkillGroup, RegistryName, Skill } from "@iron-scribe/model";
import { SideOverlay } from "../common/SideOverlay";

interface Props {
  hero: Hero;
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsOverlay: React.FC<Props> = ({ hero, isOpen, onClose }) => {
  const [groups, setSkillGroups] = useState<SkillGroup[]>([]);
  const heroSkills = hero.getList("skills") as Skill[];

  useEffect(() => {
    if (isOpen) {
      hero.library
        .getCompositeRegistry<SkillGroup>(RegistryName.SkillGroups)
        .getAll()
        .then(setSkillGroups);
    }
  }, [isOpen, hero.library]);

  const groupedSkills = groups
    .map((group) => {
      const skillsInGroup = heroSkills.filter(
        (s) => s.skillGroupId === group.id,
      );
      return { group, skills: skillsInGroup };
    })
    .filter((g) => g.skills.length > 0);

  return (
    <SideOverlay
      isOpen={isOpen}
      onClose={onClose}
      title="TRAINED SKILLS"
      maxWidth={600}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {heroSkills.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyText}>NO SKILLS TRAINED YET.</Text>
          </View>
        ) : (
          groupedSkills.map(({ group, skills }) => (
            <View key={group.id} style={styles.groupSection}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupTitle}>{group.name.toUpperCase()}</Text>
                <View style={styles.divider} />
              </View>
              <View style={styles.skillGrid}>
                {skills.map((skill) => (
                  <View key={skill.id} style={styles.skillItem}>
                    <Text style={styles.skillName}>
                      {skill.name.toUpperCase()}
                    </Text>
                  </View>
                ))}
              </View>
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
    gap: 40,
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
  groupSection: {
    gap: 16,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  groupTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#34d399",
    letterSpacing: 2,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#1e293b",
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  skillItem: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.5)",
    borderRadius: 16,
    padding: 16,
    minWidth: "45%",
  },
  skillName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#cbd5e1",
    letterSpacing: 0.5,
  },
});
