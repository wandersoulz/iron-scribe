import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HeroReference, Sourcebook } from "@iron-scribe/model";
import { HeroesSourcebook, TestHero } from "@iron-scribe/data";
import { SourcebooksOverlay } from "../components/sourcebook/SourcebooksOverlay";

interface Props {
  onNavigate: (view: "home" | "create" | "view", hero?: HeroReference) => void;
}

export const HomeView: React.FC<Props> = ({ onNavigate }) => {
  // Mock stored characters
  const savedHeroes: HeroReference[] = [TestHero];
  const [isSourcebooksOpen, setIsSourcebooksOpen] = useState(false);

  // Mock sourcebooks
  const availableSourcebooks: Sourcebook<any>[] = [HeroesSourcebook];

  const selectedSourcebooks: Sourcebook<any>[] = [...availableSourcebooks];

  const sourcebookCount = selectedSourcebooks.length;

  const heroStatsText = `${savedHeroes.length} ${savedHeroes.length === 1 ? "HERO" : "HEROES"}`;
  const sourcebookStatsText = `${sourcebookCount} ${sourcebookCount === 1 ? "SOURCEBOOK" : "SOURCEBOOKS"}`;

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, { flexGrow: 1 }]}
      >
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <Text style={styles.title}>IRON SCRIBE</Text>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.headerDot} />
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>
              YOUR HEROES - {heroStatsText},{" "}
            </Text>
            <TouchableOpacity onPress={() => setIsSourcebooksOpen(true)}>
              <Text style={[styles.sectionTitle, styles.linkText]}>
                {sourcebookStatsText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroesList}>
          <TouchableOpacity
            onPress={() => onNavigate("create")}
            style={styles.createCard}
            activeOpacity={0.7}
          >
            <View style={styles.createIconContainer}>
              <Text style={styles.createIcon}>+</Text>
            </View>
            <Text style={styles.createText}>ADD NEW HERO</Text>
          </TouchableOpacity>

          {savedHeroes.map((hero) => (
            <TouchableOpacity
              key={hero.id}
              onPress={() => onNavigate("view", hero)}
              style={styles.heroCard}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={styles.heroAvatar}>
                  <Text style={styles.avatarText}>
                    {hero.name[0].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.viewBadge}>
                  <Text style={styles.viewBadgeText}>VIEW SHEET</Text>
                </View>
              </View>
              <Text style={styles.heroName}>{hero.name.toUpperCase()}</Text>
              <Text style={styles.heroId}>ID: {hero.id}</Text>
              <View style={styles.cardArrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <SourcebooksOverlay
        isOpen={isSourcebooksOpen}
        onClose={() => setIsSourcebooksOpen(false)}
        allSourcebooks={availableSourcebooks}
        selectedSourcebooks={selectedSourcebooks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#020617", // slate-950
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 80,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 24,
    backgroundColor: "#4f46e5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  logoIcon: {
    fontSize: 32,
    color: "#ffffff",
  },
  title: {
    fontSize: 56,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  headerDot: {
    width: 8,
    height: 32,
    backgroundColor: "#4f46e5",
    borderRadius: 4,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  linkText: {
    color: "#818cf8",
    textDecorationLine: "underline",
  },
  heroesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  heroCard: {
    width: "31.5%",
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 24,
    padding: 24,
    position: "relative",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  heroAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
  },
  viewBadge: {
    backgroundColor: "rgba(51, 65, 85, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  viewBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#94a3b8",
    letterSpacing: 1,
  },
  heroName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
  },
  heroId: {
    fontSize: 12,
    color: "#64748b",
  },
  cardArrow: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  arrowText: {
    fontSize: 20,
    color: "#4f46e5",
    fontWeight: "900",
  },
  createCard: {
    width: "31.5%",
    minHeight: 180,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.2)",
  },
  createIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  createIcon: {
    fontSize: 24,
    color: "#64748b",
  },
  createText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1,
  },
});
