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
      <View style={styles.container}>
        <Text style={styles.loadingText}>Select Career...</Text>
      </View>
    );
  }

  const handleSelectionChange = (choiceId: string, value: string) => {
    if (!isEditable) return;
    const newState = structuredClone(hero.reference);

    if (!newState.selections) newState.selections = [];

    const selectionIndex = newState.selections.findIndex(
      (s) => s.choiceId === choiceId,
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.careerName}>{career.name.toUpperCase()}</Text>
        <Text style={styles.careerDescription}>{career.description}</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>STARTING WEALTH</Text>
          <Text style={styles.statValue}>{career.wealth}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>STARTING RENOWN</Text>
          <Text style={styles.statValue}>{career.renown}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>STARTING PROJECT POINTS</Text>
          <Text style={styles.statValue}>{career.projectPoints}</Text>
        </View>
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
      <Text style={styles.choiceLabel}>{choice.name.toUpperCase()}</Text>

      {isEditable ? (
        <View style={styles.pickerContainer}>
          {options.length > 0 ? (
            options.map((opt) => {
              const isSelected = selectedValue === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected,
                  ]}
                  onPress={() => onSelectionChange(choice.id, opt.id)}
                >
                  <View>
                    {isSelected && opt.description ? (
                      <Text style={styles.optionDescription}>
                        {opt.description}
                      </Text>
                    ) : (
                      <Text />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text />
          )}
        </View>
      ) : (
        <View style={styles.readOnlyChoice}>
          <Text style={styles.choiceValue}>{selectedLabel}</Text>
          {selectedDescription ? (
            <Text style={styles.selectedDescription}>
              {selectedDescription}
            </Text>
          ) : (
            <Text />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 32,
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
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
  statsSection: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  statBox: {
    flex: 1,
    minWidth: 100,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
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
    color: "#6366f1",
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    flex: 1,
  },
  choiceList: {
    gap: 20,
  },
  choiceCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1e293b",
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    gap: 12,
  },
  choiceLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1.5,
  },
  readOnlyChoice: {
    gap: 4,
  },
  choiceValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#818cf8",
  },
  selectedDescription: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
    fontStyle: "italic",
  },
  pickerContainer: {
    gap: 8,
  },
  optionButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    gap: 4,
  },
  optionButtonSelected: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderColor: "#4f46e5",
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94a3b8",
  },
  optionTextSelected: {
    color: "#ffffff",
  },
  checkMark: {
    color: "#818cf8",
    fontWeight: "900",
  },
  optionDescription: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 18,
  },
});
