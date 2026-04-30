import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ability } from "@iron-scribe/model";

interface Props {
  ability: Ability;
}

export const AbilityCard: React.FC<Props> = ({ ability }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{ability.name.toUpperCase()}</Text>
          <Text style={styles.type}>
            {ability.type.toUpperCase()} {ability.action.toUpperCase()}
          </Text>
        </View>
        <View style={styles.keywords}>
          {ability.keywords.map((kw) => (
            <View key={kw} style={styles.keywordBadge}>
              <Text style={styles.keywordText}>{kw.toUpperCase()}</Text>
            </View>
          ))}
        </View>
      </View>

      {ability.description ? (
        <Text style={styles.description}>{ability.description}</Text>
      ) : null}

      {ability.trigger ? (
        <View style={styles.propertyRow}>
          <Text style={styles.propertyLabel}>TRIGGER: </Text>
          <Text style={styles.propertyValue}>{ability.trigger}</Text>
        </View>
      ) : null}

      <View style={styles.propertyRow}>
        <Text style={styles.propertyLabel}>TARGET: </Text>
        <Text style={styles.propertyValue}>{ability.target}</Text>
      </View>

      <View style={styles.propertyRow}>
        <Text style={styles.propertyLabel}>RANGE: </Text>
        <Text style={styles.propertyValue}>
          {ability.range.distance} {ability.range.type}
        </Text>
      </View>

      {ability.powerRoll && (
        <View style={styles.powerRollSection}>
          <View style={styles.powerRollHeader}>
            <View style={styles.powerRollBadge}>
              <Text style={styles.powerRollBadgeText}>POWER ROLL</Text>
            </View>
            <Text style={styles.characteristics}>
              {ability.powerRoll.characteristics
                ?.map((c) => (typeof c === "string" ? c : c.name))
                .join(" + ")}
            </Text>
          </View>

          <View style={styles.tiersContainer}>
            <TierRow label="11-" outcome={ability.powerRoll.tierOutcomes.t1} />
            <TierRow
              label="12-16"
              outcome={ability.powerRoll.tierOutcomes.t2}
            />
            <TierRow label="17+" outcome={ability.powerRoll.tierOutcomes.t3} />
          </View>
        </View>
      )}

      {ability.effect && (
        <View style={styles.effectSection}>
          <Text style={styles.propertyLabel}>EFFECT: </Text>
          <Text style={styles.effectText}>{ability.effect}</Text>
        </View>
      )}
    </View>
  );
};

const TierRow: React.FC<{ label: string; outcome: any }> = ({
  label,
  outcome,
}) => {
  return (
    <View style={styles.tierRow}>
      <View style={styles.tierLabelContainer}>
        <Text style={styles.tierLabel}>{label}</Text>
      </View>
      <View style={styles.tierContent}>
        {outcome.damage && (
          <Text style={styles.tierDamage}>
            {outcome.damage.value}
            <Text style={styles.tierDamageType}> DMG</Text>
          </Text>
        )}
        {outcome.potencies &&
          outcome.potencies.map((p: string) => (
            <Text key={p} style={styles.tierPotency}>
              {p}
            </Text>
          ))}
        {outcome.effect && (
          <Text style={styles.tierEffect}>{outcome.effect}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  type: {
    fontSize: 10,
    fontWeight: "700",
    color: "#818cf8",
    marginTop: 2,
  },
  keywords: {
    flexDirection: "row",
    gap: 4,
  },
  keywordBadge: {
    backgroundColor: "#312e81",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  keywordText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#c7d2fe",
  },
  description: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 18,
    fontStyle: "italic",
  },
  propertyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  propertyLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#64748b",
  },
  propertyValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#cbd5e1",
  },
  powerRollSection: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
  powerRollHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    paddingBottom: 8,
  },
  powerRollBadge: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  powerRollBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#ffffff",
  },
  characteristics: {
    fontSize: 11,
    fontWeight: "800",
    color: "#818cf8",
  },
  tiersContainer: {
    gap: 8,
  },
  tierRow: {
    flexDirection: "row",
    gap: 12,
  },
  tierLabelContainer: {
    width: 45,
    alignItems: "flex-end",
  },
  tierLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#475569",
  },
  tierContent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  tierDamage: {
    fontSize: 13,
    fontWeight: "900",
    color: "#ef4444",
  },
  tierDamageType: {
    fontSize: 9,
    color: "#991b1b",
  },
  tierPotency: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fbbf24",
  },
  tierEffect: {
    fontSize: 11,
    color: "#cbd5e1",
  },
  effectSection: {
    marginTop: 4,
  },
  effectText: {
    fontSize: 12,
    color: "#cbd5e1",
    lineHeight: 18,
  },
});
