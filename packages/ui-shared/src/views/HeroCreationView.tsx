import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Hero,
  Library,
  Ancestry,
  RegistryName,
  HeroReference,
  AncestryTrait,
} from "@iron-scribe/model";
import { HeroesSourcebook, HeroFactory } from "@iron-scribe/data";
import { AncestrySelection } from "../components/ancestry/AncestrySelection";

interface Props {
  onNavigate: (view: "home" | "create" | "view", hero?: HeroReference) => void;
}

export const HeroCreationView: React.FC<Props> = ({ onNavigate }) => {
  const [library, setLibrary] = useState<Library | null>(null);
  const [allAncestries, setAllAncestries] = useState<Ancestry[]>([]);
  const [heroState, setHeroState] = useState<Partial<HeroReference>>({
    name: "New Hero",
  });
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    const lib = new Library([HeroesSourcebook]);
    setLibrary(lib);
    lib.loadAll().then(() => {
      const traitLibrary = lib.getCompositeRegistry<AncestryTrait>(
        RegistryName.AncestryTraits,
      );
      lib
        .getCompositeRegistry<Ancestry>(RegistryName.Ancestries)
        .getAll()
        .then(async (ancestries) => {
          return Promise.all(
            ancestries.map(async (ancestry) => {
              let traits = await traitLibrary.filter({
                ancestryId: ancestry.id,
              });
              if (hero)
                traits = traits.map((trait) => trait.resolveValue(hero));
              ancestry.signatureTraits = traits.filter(
                (trait) => trait.cost === undefined,
              );
              ancestry.purchasedTraits = traits.filter(
                (trait) => trait.cost !== undefined,
              );
              return ancestry;
            }),
          );
        })
        .then(setAllAncestries);
    });
  }, []);

  // Sync rich Hero model with raw state
  useEffect(() => {
    if (library && heroState.modules?.ancestry) {
      HeroFactory.create(heroState as HeroReference, library).then(setHero);
    } else {
      setHero(null);
    }
  }, [heroState, library]);

  const handleHeroStateChange = (newState: Partial<HeroReference>) => {
    setHeroState(newState);
  };

  const handleFinalize = async () => {
    if (hero) {
      console.log("Final Hero State:", heroState);
    }
    onNavigate("home");
  };

  const isComplete = hero?.isComplete() || false;

  if (!library) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { flexGrow: 1 }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => onNavigate("home")}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← BACK TO HOME</Text>
          </TouchableOpacity>
          <View style={styles.headerDivider} />
          <Text style={styles.title}>CHARACTER BUILDER</Text>
        </View>

        <TouchableOpacity
          onPress={handleFinalize}
          style={[styles.finalizeButton, !isComplete && styles.finalizeButtonDisabled]}
          disabled={!isComplete}
        >
          <Text style={styles.finalizeButtonText}>COMPLETE BUILD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nameInputContainer}>
        <Text style={styles.inputLabel}>CHARACTER NAME</Text>
        <TextInput
          style={styles.nameInput}
          value={heroState.name}
          onChangeText={(text) => setHeroState({ ...heroState, name: text })}
          placeholder="Enter hero name..."
          placeholderTextColor="#64748b"
        />
      </View>

      <View style={styles.selectionCard}>
        <AncestrySelection
          library={library}
          allAncestries={allAncestries}
          heroState={heroState}
          onHeroStateChange={handleHeroStateChange}
          hero={hero}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#020617", // slate-950
    alignItems: "center",
    justifyContent: "center",
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
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  finalizeButton: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  finalizeButtonDisabled: {
    opacity: 0.5,
  },
  finalizeButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 2,
  },
  nameInputContainer: {
    marginBottom: 48,
    maxWidth: 400,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 2,
    marginBottom: 8,
  },
  nameInput: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  selectionCard: {
    backgroundColor: "rgba(30, 41, 59, 0.3)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.5)",
    padding: 32,
  },
});
