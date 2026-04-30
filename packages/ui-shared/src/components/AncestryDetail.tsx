import React, { useEffect, useState, useMemo } from "react";
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
  Ancestry,
  AncestryTrait,
  Named,
  FeatureFilterResolver,
  BaseFeature,
  FeatureChoice,
} from "@iron-scribe/model";
import { AbilityCard } from "./AbilityCard";

interface Props {
  hero: Hero;
  library: Library;
  isEditable: boolean;
  onHeroStateChange: (newState: HeroReference) => void;
}

export const AncestryDetail: React.FC<Props> = ({
  hero,
  library,
  isEditable,
  onHeroStateChange,
}) => {
  const [ancestry, setAncestry] = useState<Ancestry | null>();
  const [allPurchasedTraits, setAllPurchasedTraits] = useState<AncestryTrait[]>(
    [],
  );
  const [allSignatureTraits, setAllSignatureTraits] = useState<AncestryTrait[]>(
    [],
  );

  useEffect(() => {
    if (!hero.ancestry) return;
    library
      .getCompositeRegistry<Ancestry>(RegistryName.Ancestries)
      .get(hero.ancestry.id)
      .then((anc) => {
        if (!anc) return;
        setAncestry(anc);
        const traitRegistry = library.getCompositeRegistry<AncestryTrait>(
          RegistryName.AncestryTraits,
        );
        traitRegistry.filter({ ancestryId: anc.id }).then((traits) => {
          setAllPurchasedTraits(
            traits.filter((trait) => trait.cost !== undefined),
          );
          setAllSignatureTraits(
            traits.filter((trait) => trait.cost === undefined),
          );
        });
      });
  }, [hero.ancestry, library]);

  const spentPoints = useMemo(() => {
    return hero.ancestry!.purchasedTraits.reduce(
      (total, trait) => total + (trait.cost || 0),
      0,
    );
  }, [hero.ancestry!.purchasedTraits]);

  if (ancestry == null) {
    return <>Select Ancestry...</>;
  }
  const availablePoints = (ancestry.ancestryPoints || 0) - spentPoints;

  const handleSelectionChange = (
    traitId: string,
    choiceId: string,
    value: string,
  ) => {
    if (!isEditable) return;
    const newState = structuredClone(hero.reference);

    if (!newState.modules?.ancestry) return;

    const traitState = [
      ...newState.modules.ancestry.signatureTraits,
      ...(newState.modules.ancestry.purchasedTraits || []),
    ].find((t) => t.traitId === traitId);

    if (traitState) {
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
    }
  };

  const handlePurchaseToggle = (traitToToggle: AncestryTrait) => {
    if (!isEditable) return;
    const newState = structuredClone(hero.reference);
    if (!newState.modules?.ancestry) return;

    const currentPurchased = newState.modules.ancestry.purchasedTraits || [];
    const traitIndex = currentPurchased.findIndex(
      (t) => t.traitId === traitToToggle.id,
    );

    if (traitIndex > -1) {
      newState.modules.ancestry.purchasedTraits.splice(traitIndex, 1);
    } else {
      if (availablePoints >= (traitToToggle.cost || 0)) {
        newState.modules.ancestry.purchasedTraits.push({
          traitId: traitToToggle.id,
        });
      } else {
        return;
      }
    }
    onHeroStateChange(newState);
  };

  const displayedPurchasableTraits = isEditable
    ? allPurchasedTraits
    : allPurchasedTraits.filter((traitDef) =>
        hero.ancestry!.purchasedTraits.some((t) => t.id === traitDef.id),
      );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.ancestryName}>{ancestry.name.toUpperCase()}</Text>
        <Text style={styles.ancestryDescription}>
          {ancestry.description || ancestry.loreDescription}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SIGNATURE TRAITS</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.traitList}>
          {allSignatureTraits.map((trait) => (
            <TraitDetailCard
              key={trait.id}
              trait={trait}
              hero={hero}
              library={library}
              isEditable={isEditable}
              onSelectionChange={handleSelectionChange}
            />
          ))}
        </View>
      </View>

      {displayedPurchasableTraits.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderWithDivider}>
              <Text style={styles.sectionTitle}>PURCHASABLE TRAITS</Text>
              <View style={styles.divider} />
            </View>
            {isEditable && (
              <View style={styles.pointsBadge}>
                <Text style={styles.pointsLabel}>AVAILABLE</Text>
                <Text
                  style={[
                    styles.pointsValue,
                    availablePoints < 0 && styles.pointsNegative,
                  ]}
                >
                  {availablePoints}{" "}
                  <Text style={styles.pointsUnit}>POINTS</Text>
                </Text>
              </View>
            )}
          </View>
          <View style={styles.traitList}>
            {displayedPurchasableTraits.map((traitDef) => {
              const isPurchased = hero.ancestry!.purchasedTraits.some(
                (t) => t.id === traitDef.id,
              );
              const canAfford = availablePoints >= (traitDef.cost || 0);

              return (
                <TraitDetailCard
                  key={traitDef.id}
                  trait={traitDef}
                  hero={hero}
                  library={library}
                  isEditable={isEditable}
                  onSelectionChange={handleSelectionChange}
                  isPurchasable={true}
                  isPurchased={isPurchased}
                  onTogglePurchase={() => handlePurchaseToggle(traitDef)}
                  disabled={!isPurchased && !canAfford}
                />
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const TraitDetailCard: React.FC<{
  trait: AncestryTrait;
  hero: Hero;
  library: Library;
  isEditable: boolean;
  onSelectionChange: (traitId: string, choiceId: string, value: string) => void;
  isPurchasable?: boolean;
  isPurchased?: boolean;
  onTogglePurchase?: () => void;
  disabled?: boolean;
}> = ({
  trait,
  hero,
  library,
  isEditable,
  onSelectionChange,
  isPurchasable,
  isPurchased,
  onTogglePurchase,
  disabled,
}) => {
  const allChoices = useMemo(() => {
    return trait.allChoices;
  }, [trait]);

  return (
    <View
      style={[
        styles.traitCard,
        isPurchasable && isPurchased && styles.traitCardPurchased,
        isPurchasable && !isPurchased && disabled && styles.traitCardDisabled,
      ]}
    >
      <View style={styles.traitHeader}>
        <View style={styles.traitTitleRow}>
          <Text
            style={[
              styles.traitName,
              (isPurchased || !isPurchasable) && styles.traitNameActive,
            ]}
          >
            {trait.name.toUpperCase()}
          </Text>
          {isPurchased && !isEditable && (
            <View style={styles.ownedBadge}>
              <Text style={styles.ownedBadgeText}>OWNED</Text>
            </View>
          )}
        </View>
        {isPurchasable && isEditable && (
          <TouchableOpacity
            onPress={onTogglePurchase}
            disabled={disabled}
            style={[
              styles.purchaseButton,
              isPurchased
                ? styles.purchaseButtonActive
                : disabled
                  ? styles.purchaseButtonDisabled
                  : styles.purchaseButtonInactive,
            ]}
          >
            <Text
              style={[
                styles.purchaseButtonText,
                isPurchased && styles.purchaseButtonTextActive,
              ]}
            >
              {isPurchased ? "✓ PURCHASED" : `BUY (${trait.cost} PT)`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.traitDescription}>{trait.description}</Text>

      {trait.abilities && trait.abilities.length > 0 && (
        <View style={styles.abilityList}>
          {trait.abilities.map((ability) => (
            <AbilityCard key={ability.id} ability={ability} />
          ))}
        </View>
      )}

      {allChoices.map((choice) => (
        <ChoiceSelector
          key={choice.id}
          traitId={trait.id}
          choice={choice}
          hero={hero}
          library={library}
          onSelectionChange={onSelectionChange}
          isEditable={isEditable}
          disabled={!isEditable || (isPurchasable && !isPurchased)}
        />
      ))}
    </View>
  );
};

const ChoiceSelector: React.FC<{
  traitId: string;
  choice: FeatureChoice;
  hero: Hero;
  library: Library;
  onSelectionChange: (traitId: string, choiceId: string, value: string) => void;
  isEditable: boolean;
  disabled?: boolean;
}> = ({
  traitId,
  choice,
  hero,
  library,
  onSelectionChange,
  isEditable,
  disabled,
}) => {
  const [options, setOptions] = useState<Named[]>([]);

  useEffect(() => {
    if (choice.values.type == "registry") {
      library
        .getCompositeRegistry<Named>(choice.values.registryName)
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
    } else {
      setOptions(choice.values.contents);
    }
  }, [library, choice.values, choice.filter, hero]);

  if (options.length == 0) {
    return <Text>Loading...</Text>;
  }

  const selectedValue =
    (hero.reference.selections || []).find((s) => s.choiceId === choice.id)
      ?.selectedOptionId || "";

  const selectedLabel =
    options.find((opt) => opt.id === selectedValue)?.name ||
    "No selection made";

  if (!isEditable) {
    return (
      <View style={styles.readOnlyChoice}>
        <Text style={styles.choiceLabel}>{choice.name.toUpperCase()}</Text>
        <Text style={styles.choiceValue}>{selectedLabel}</Text>
      </View>
    );
  }

  return (
    <View style={styles.editableChoice}>
      <Text style={styles.choiceLabel}>{choice.name.toUpperCase()}</Text>
      <View style={styles.pickerContainer}>
        {/* Simplified picker: list of options as buttons if few, or a styled Text for now */}
        {options.map((opt: any) => {
          const id = opt.id;
          const label = opt.name;
          const isSelected = selectedValue === id;
          return (
            <TouchableOpacity
              key={id}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
              ]}
              onPress={() => onSelectionChange(traitId, choice.id, id)}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 32,
  },
  header: {
    gap: 8,
  },
  ancestryName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  ancestryDescription: {
    fontSize: 16,
    color: "#94a3b8",
    lineHeight: 24,
    fontStyle: "italic",
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderWithDivider: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#6366f1", // indigo-400
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    flex: 1,
  },
  traitList: {
    gap: 20,
  },
  traitCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1e293b",
    backgroundColor: "rgba(30, 41, 59, 0.4)",
  },
  traitCardPurchased: {
    borderColor: "rgba(99, 102, 241, 0.5)",
    backgroundColor: "rgba(30, 41, 59, 0.8)",
  },
  traitCardDisabled: {
    opacity: 0.4,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  traitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  traitTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  traitName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#f1f5f9",
  },
  traitNameActive: {
    color: "#818cf8",
  },
  ownedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
  ownedBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#818cf8",
    letterSpacing: 1,
  },
  purchaseButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  purchaseButtonInactive: {
    backgroundColor: "#334155",
    borderColor: "#475569",
  },
  purchaseButtonActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#6366f1",
  },
  purchaseButtonDisabled: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
  },
  purchaseButtonText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#cbd5e1",
  },
  purchaseButtonTextActive: {
    color: "#ffffff",
  },
  traitDescription: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
    marginBottom: 20,
  },
  abilityList: {
    gap: 12,
    marginBottom: 16,
  },
  pointsBadge: {
    alignItems: "flex-end",
    marginLeft: 20,
  },
  pointsLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1,
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#818cf8",
  },
  pointsNegative: {
    color: "#ef4444",
  },
  pointsUnit: {
    fontSize: 10,
    color: "#64748b",
  },
  readOnlyChoice: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
  },
  editableChoice: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
    gap: 10,
  },
  choiceLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1,
  },
  choiceValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#818cf8",
  },
  pickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  optionButtonSelected: {
    backgroundColor: "#312e81",
    borderColor: "#4f46e5",
  },
  optionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94a3b8",
  },
  optionTextSelected: {
    color: "#ffffff",
  },
});
