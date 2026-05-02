import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ability, TierOutcome } from "@iron-scribe/model";

interface Props {
  ability: Ability;
}

export const AbilityCard: React.FC<Props> = ({ ability }) => {
  const outcomes = ability.powerRoll?.tierOutcomes;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{ability.name.toUpperCase()}</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.abilityType}>{ability.abilityType.toUpperCase()}</Text>
            {ability.keywords.length > 0 && (
              <>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.keywords}>{ability.keywords.join(", ").toUpperCase()}</Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Description */}
      {ability.description && (
        <Text style={styles.description}>{ability.description}</Text>
      )}

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>ACTION</Text>
          <Text style={styles.statValue}>{ability.action.toUpperCase()}</Text>
        </View>
        {ability.target && (
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TARGET</Text>
            <Text style={styles.statValue}>{ability.target}</Text>
          </View>
        )}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>RANGE</Text>
          <Text style={styles.statValue}>
            {ability.range.type.toUpperCase()} ({ability.range.distance})
          </Text>
        </View>
      </View>

      {/* Power Roll Outcomes */}
      {outcomes && (
        <View style={styles.outcomesContainer}>
          <OutcomeRow tier={1} outcome={outcomes.t1} />
          <OutcomeRow tier={2} outcome={outcomes.t2} />
          <OutcomeRow tier={3} outcome={outcomes.t3} />
        </View>
      )}

      {/* Primary Effect */}
      {ability.effect && (
        <View style={[styles.effectSection, outcomes && styles.effectSectionWithMargin]}>
          <Text style={styles.effectText}>{ability.effect}</Text>
        </View>
      )}
    </View>
  );
};

const OutcomeRow: React.FC<{ tier: number; outcome: TierOutcome }> = ({ tier, outcome }) => (
  <View style={styles.outcomeRow}>
    <View style={styles.outcomeHeader}>
      <Text style={styles.tierLabel}>TIER {tier}</Text>
      {outcome.damage && (
        <Text style={styles.damageValue}>
          {outcome.damage.value}
          <Text style={styles.damageLabel}> DMG</Text>
        </Text>
      )}
    </View>
    <View style={styles.outcomeEffects}>
      {outcome.potencies?.map((p, i) => (
        <Text key={i} style={styles.outcomeText}>• {p}</Text>
      ))}
      {outcome.conditions?.map((c, i) => (
        <Text key={i} style={styles.outcomeText}>
          • {c.condition.toUpperCase()} {c.endOfCondition ? `(${c.endOfCondition})` : ''}
        </Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  abilityType: {
    fontSize: 10,
    fontWeight: "900",
    color: "#818cf8",
    letterSpacing: 2,
  },
  dot: {
    color: "#475569",
  },
  keywords: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#64748b",
    letterSpacing: 1,
  },
  description: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
    fontStyle: "italic",
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 24,
  },
  statItem: {
    gap: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#e2e8f0",
  },
  outcomesContainer: {
    gap: 12,
  },
  outcomeRow: {
    backgroundColor: "rgba(2, 6, 23, 0.5)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 16,
  },
  outcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tierLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 2,
  },
  damageValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#fbbf24",
  },
  damageLabel: {
    fontSize: 10,
    color: "#d97706",
  },
  outcomeEffects: {
    gap: 4,
  },
  outcomeText: {
    fontSize: 11,
    color: "#cbd5e1",
    lineHeight: 16,
  },
  effectSection: {
    borderTopWidth: 1,
    borderTopColor: "rgba(51, 65, 85, 0.5)",
    paddingTop: 16,
  },
  effectSectionWithMargin: {
    marginTop: 16,
  },
  effectText: {
    fontSize: 12,
    color: "#cbd5e1",
    lineHeight: 18,
  },
});
