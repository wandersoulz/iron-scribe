import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Hero,
  HeroReference,
  Library,
  RegistryName,
  Career,
  FeatureFilterResolver,
  BaseFeature,
  FeatureChoice,
  ChoiceProviderRegistry,
} from "@iron-scribe/model";

interface Props {
  hero: Hero;
  library: Library;
  isEditable: boolean;
  onHeroStateChange: (newState: HeroReference) => void;
}

export const CareerDetail: React.FC<Props> = ({
  hero,
  library,
  isEditable,
  onHeroStateChange,
}) => {
  const [career, setCareer] = useState<Career | null>(null);

  useEffect(() => {
    if (!hero.career) return;
    library
      .getCompositeRegistry<Career>(RegistryName.Careers)
      .get(hero.career.id)
      .then((car) => {
        if (!car) return;
        setCareer(car);
      });
  }, [hero.career, library]);

  if (career == null) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.loadingText}>Select Career...</Text>
      </View>
    );
  }

  const handleSelectionChange = (choiceId: string, value: string) => {
    if (!isEditable) return;
    const newState = JSON.parse(JSON.stringify(hero.reference));

    if (!newState.selections) newState.selections = [];

    const selectionIndex = newState.selections.findIndex(
      (s: any) => s.choiceId === choiceId,
    );
    if (selectionIndex > -1) {
      newState.selections[selectionIndex].selectedOptionId = value;
    } else {
      newState.selections.push({
        choiceId: choiceId,
        selectedOptionId: value,
      });
    }
    onHeroStateChange(newState);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.careerName}>{career.name.toUpperCase()}</Text>
        <Text style={styles.careerDescription}>{career.description}</Text>
      </View>

      <View style={styles.statsRow}>
        <StatBox label="STARTING WEALTH" value={career.wealth} />
        <StatBox label="STARTING RENOWN" value={career.renown} />
        <StatBox label="STARTING PROJECT POINTS" value={career.projectPoints} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHOICES & FEATURES</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.choiceList}>
          {career.choices.map((choice) => (
            <ChoiceSelector
              key={choice.id}
              choice={choice}
              hero={hero}
              library={library}
              onSelectionChange={handleSelectionChange}
              isEditable={isEditable}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const StatBox: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const ChoiceSelector: React.FC<{
  choice: FeatureChoice;
  hero: Hero;
  library: Library;
  onSelectionChange: (choiceId: string, value: string) => void;
  isEditable: boolean;
}> = ({ choice, hero, library, onSelectionChange, isEditable }) => {
  const [options, setOptions] = useState<BaseFeature[]>([]);

  useEffect(() => {
    if (choice.values.type === "registry") {
      library
        .getCompositeRegistry<BaseFeature>(choice.values.registryName)
        .getAll()
        .then((allOptions) => {
          const filtered = allOptions.filter((opt) =>
            FeatureFilterResolver.resolve(
              choice.filter,
              opt as BaseFeature,
              hero,
            ),
          );
          setOptions(filtered);
        });
    } else if (choice.values.type === "dynamic") {
      const dynamicOptions = ChoiceProviderRegistry.resolve(
        choice.values,
        hero,
      );
      setOptions(dynamicOptions);
    } else {
      setOptions(choice.values.contents);
    }
  }, [library, choice.values, choice.filter, hero, hero.reference.selections]);

  const selectedValue =
    (hero.reference.selections || []).find((s) => s.choiceId === choice.id)
      ?.selectedOptionId || "";

  const selectedLabel =
    options.find((opt) => opt.id === selectedValue)?.name ||
    "No selection made";

  const selectedDescription = options.find(
    (opt) => opt.id === selectedValue,
  )?.description;

  return (
    <View style={styles.choiceCard}>
      <Text style={styles.choiceTitle}>{choice.name}</Text>

      {isEditable ? (
        <View style={styles.optionsList}>
          {options.map((opt) => {
            const isSelected = selectedValue === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionItem,
                  isSelected && styles.optionItemSelected,
                ]}
                onPress={() => onSelectionChange(choice.id, opt.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
                    {opt.name.toUpperCase()}
                  </Text>
                  {isSelected && <Text style={styles.checkMark}>✓</Text>}
                </View>
                {opt.description && (
                  <Text style={styles.optionDescription}>{opt.description}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.readonlyContainer}>
          <Text style={styles.selectedValue}>{selectedLabel.toUpperCase()}</Text>
          {selectedDescription && (
            <Text style={styles.selectedDescription}>{selectedDescription}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    gap: 32,
  },
  emptyContainer: {
    padding: 32,
  },
  loadingText: {
    color: "#94a3b8",
    textAlign: "center",
    fontWeight: "900",
    letterSpacing: 2,
  },
  header: {
    gap: 8,
  },
  careerName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  careerDescription: {
    fontSize: 16,
    color: "#94a3b8",
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statBox: {
    flex: 1,
    minWidth: 100,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 16,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1.5,
    marginBottom: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#10b981",
    letterSpacing: 2,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#1e293b",
  },
  choiceList: {
    gap: 20,
  },
  choiceCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1e293b",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    gap: 12,
  },
  choiceTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  optionsList: {
    gap: 8,
  },
  optionItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  optionItemSelected: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "#10b981",
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  optionName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#94a3b8",
  },
  optionNameSelected: {
    color: "#ffffff",
  },
  readonlyContainer: {
    gap: 4,
  },
  selectedValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#10b981",
  },
  selectedDescription: {
    fontSize: 14,
    color: "#94a3b8",
    fontStyle: "italic",
    lineHeight: 20,
  },
  optionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94a3b8",
  },
  optionTextSelected: {
    color: "#ffffff",
  },
  checkMark: {
    color: "#10b981",
    fontWeight: "900",
  },
  optionDescription: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 18,
  },
});
