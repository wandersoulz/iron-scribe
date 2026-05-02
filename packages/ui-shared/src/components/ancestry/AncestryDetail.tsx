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
import { AbilityCard } from "../ability/AbilityCard";

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
    return <Text style={styles.loadingText}>Select Ancestry...</Text>;
  }
  const availablePoints = (ancestry.ancestryPoints || 0) - spentPoints;

  const handleSelectionChange = (
    traitId: string,
    choiceId: string,
    value: string,
  ) => {
    if (!isEditable) return;
    const newState = JSON.parse(JSON.stringify(hero.reference));

    if (!newState.modules?.ancestry) return;

    const traitState = [
      ...newState.modules.ancestry.signatureTraits,
      ...(newState.modules.ancestry.purchasedTraits || []),
    ].find((t) => t.traitId === traitId);

    if (traitState) {
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
    }
  };

  const handlePurchaseToggle = (traitToToggle: AncestryTrait) => {
    if (!isEditable) return;
    const newState = JSON.parse(JSON.stringify(hero.reference));
    if (!newState.modules?.ancestry) return;

    const currentPurchased = newState.modules.ancestry.purchasedTraits || [];
    const traitIndex = currentPurchased.findIndex(
      (t: any) => t.traitId === traitToToggle.id,
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
    <ScrollView contentContainerStyle={styles.scrollContent}>
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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>PURCHASABLE TRAITS</Text>
              <View style={styles.divider} />
            </View>
            {isEditable && (
              <View style={styles.pointsDisplay}>
                <Text style={styles.pointsLabel}>AVAILABLE</Text>
                <Text style={[styles.pointsValue, availablePoints < 0 && styles.pointsValueNegative]}>
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
        <View style={styles.traitHeaderInfo}>
          <Text style={[styles.traitName, (isPurchased || !isPurchasable) && styles.traitNameActive]}>
            {trait.name}
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
              isPurchased && styles.purchaseButtonActive,
              disabled && !isPurchased && styles.purchaseButtonDisabled,
            ]}
          >
            <Text style={[styles.purchaseButtonText, isPurchased && styles.purchaseButtonTextActive]}>
              {isPurchased ? "✓ PURCHASED" : `BUY (${trait.cost} PT)`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.traitDescription}>{trait.description}</Text>

      {trait.abilities && trait.abilities.length > 0 && (
        <View style={styles.traitAbilities}>
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
    } else if (choice.values.type == "dynamic") {
      setOptions([]);
    } else {
      setOptions(choice.values.contents);
    }
  }, [library, choice.values, choice.filter, hero]);

  if (options.length == 0) {
    return <Text style={styles.loadingOptionsText}>Loading...</Text>;
  }

  const selectedValue =
    (hero.reference.selections || []).find((s) => s.choiceId === choice.id)
      ?.selectedOptionId || "";

  const selectedLabel =
    options.find((opt) => opt.id === selectedValue)?.name ||
    "No selection made";

  if (!isEditable) {
    return (
      <View style={styles.readonlyChoice}>
        <Text style={styles.choiceLabel}>{choice.name}</Text>
        <Text style={styles.choiceValue}>{selectedLabel}</Text>
      </View>
    );
  }

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceLabel}>{choice.name}</Text>
      <View style={styles.optionGrid}>
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
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
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
  scrollContent: {
    padding: 24,
    gap: 32,
  },
  loadingText: {
    color: "#94a3b8",
    padding: 32,
    textAlign: "center",
    fontWeight: "900",
    letterSpacing: 2,
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
    fontStyle: "italic",
    lineHeight: 24,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#818cf8",
    letterSpacing: 2,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#1e293b",
  },
  pointsDisplay: {
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
  pointsValueNegative: {
    color: "#ef4444",
  },
  pointsUnit: {
    fontSize: 10,
    color: "#64748b",
  },
  traitList: {
    gap: 20,
  },
  traitCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1e293b",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  traitCardPurchased: {
    borderColor: "rgba(79, 70, 229, 0.5)",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
  },
  traitCardDisabled: {
    opacity: 0.4,
    backgroundColor: "rgba(2, 6, 23, 0.4)",
  },
  traitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  traitHeaderInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  traitName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  traitNameActive: {
    color: "#818cf8",
  },
  ownedBadge: {
    backgroundColor: "rgba(129, 140, 248, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.2)",
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
    borderRadius: 12,
    backgroundColor: "#334155",
    borderWidth: 1,
    borderColor: "#475569",
  },
  purchaseButtonActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#6366f1",
  },
  purchaseButtonDisabled: {
    backgroundColor: "#020617",
    borderColor: "#1e293b",
  },
  purchaseButtonText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94a3b8",
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
  traitAbilities: {
    gap: 12,
    marginBottom: 16,
  },
  loadingOptionsText: {
    color: "#64748b",
    fontSize: 12,
    fontStyle: "italic",
  },
  readonlyChoice: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(2, 6, 23, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
  },
  choiceContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(2, 6, 23, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(30, 41, 59, 0.5)",
    gap: 10,
  },
  choiceLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  choiceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#818cf8",
  },
  optionGrid: {
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
