import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Hero, Library, HeroReference } from "@iron-scribe/model";
import { StatSummary } from "../components/common/StatSummary";
import { HeroesSourcebook, HeroFactory } from "@iron-scribe/data";
import { AncestryCard } from "../components/ancestry/AncestryCard";
import { AncestryDetail } from "../components/ancestry/AncestryDetail";
import { SkillCard } from "../components/skills/SkillCard";
import { AbilitiesOverlay } from "../components/ability/AbilitiesOverlay";
import { ClassCard } from "../components/class/ClassCard";
import { CareerCard } from "../components/career/CareerCard";
import { CareerDetail } from "../components/career/CareerDetail";
import { SideOverlay } from "../components/common/SideOverlay";

interface Props {
  heroReference?: HeroReference;
  onNavigate: (view: "home" | "create" | "view", hero?: HeroReference) => void;
}

export const HeroView: React.FC<Props> = ({ heroReference, onNavigate }) => {
  const [library, setLibrary] = useState<Library | null>(null);
  const [heroState, setHeroState] = useState<HeroReference | undefined>(
    heroReference,
  );
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    setLibrary(new Library([HeroesSourcebook]));
  }, []);

  // Any time the state JSON or library updates, we recalculate the rich model instance
  useEffect(() => {
    if (library && heroState) {
      library
        .loadAll()
        .then(() => HeroFactory.create(heroState, library).then(setHero));
    }
  }, [heroState, library]);

  const [isAncestryOpen, setIsAncestryOpen] = useState(false);
  const [isAbilitiesOpen, setIsAbilitiesOpen] = useState(false);
  const [isCareerOpen, setIsCareerOpen] = useState(false);

  if (!library || !hero || !heroState) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>LOADING CHARACTER SHEET...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.contentContainer, { flexGrow: 1 }]}>
        {/* Navigation / Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => onNavigate("home")}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← BACK TO HOME</Text>
            </TouchableOpacity>
            <View style={styles.headerDivider} />
            <Text style={styles.heroName}>{hero.reference.name.toUpperCase()}</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>
                LEVEL {hero.getNumericStat("level")} {hero.class?.name?.toUpperCase() || "HERO"}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>
        </View>

        {/* Hero Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>HERO STATISTICS</Text>
            <View style={styles.divider} />
          </View>
          <StatSummary hero={hero} />
        </View>

        {/* Modules Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHARACTER MODULES</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.modulesGrid}>
          <View style={styles.gridItem}>
            <AncestryCard
              hero={hero}
              onClick={() => setIsAncestryOpen(true)}
              library={library}
            />
          </View>

          <View style={styles.gridItem}>
            <ClassCard hero={hero} onClick={() => setIsAbilitiesOpen(true)} />
          </View>

          <View style={styles.gridItem}>
            <CareerCard
              hero={hero}
              library={library}
              onClick={() => setIsCareerOpen(true)}
            />
          </View>

          <View style={styles.gridItem}>
            <SkillCard hero={hero} />
          </View>
        </View>
      </ScrollView>

      {/* Overlays */}
      <SideOverlay
        isOpen={isAncestryOpen}
        onClose={() => setIsAncestryOpen(false)}
        title="ANCESTRY DETAILS"
      >
        <AncestryDetail
          hero={hero}
          library={library}
          isEditable={false}
          onHeroStateChange={setHeroState as any}
        />
      </SideOverlay>

      <SideOverlay
        isOpen={isCareerOpen}
        onClose={() => setIsCareerOpen(false)}
        title="CAREER DETAILS"
      >
        <CareerDetail
          hero={hero}
          library={library}
          isEditable={false}
          onHeroStateChange={setHeroState as any}
        />
      </SideOverlay>

      <AbilitiesOverlay
        hero={hero}
        isOpen={isAbilitiesOpen}
        onClose={() => setIsAbilitiesOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#020617", // slate-950
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "bold",
    color: "#64748b",
    letterSpacing: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#020617", // slate-950
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 80,
    maxWidth: 1280,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 48,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  headerDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#334155",
  },
  heroName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  levelBadge: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  levelBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94a3b8",
    letterSpacing: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
    shadowColor: "#22c55e",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#cbd5e1",
    letterSpacing: 1,
  },
  statsSection: {
    marginBottom: 48,
    backgroundColor: "rgba(30, 41, 59, 0.3)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.5)",
    padding: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#6366f1",
    letterSpacing: 3,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#1e293b",
  },
  modulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 32,
  },
  gridItem: {
    width: "31%", // Approximate for 3 columns with gaps
    minWidth: 300,
  },
});
