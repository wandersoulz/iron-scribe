import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Hero, ResolvedDamageImmunity } from "@iron-scribe/model";

interface Props {
  hero: Hero;
}

export const useCalculatedStats = (hero: Hero) => {
  return useMemo(() => {
    const speed = hero.getNumericStat("speed");
    const stamina = hero.getNumericStat("max_stamina");
    const size = hero.getStringStat("size");

    const might = hero.getNumericStat("might");
    const agility = hero.getNumericStat("agility");
    const reason = hero.getNumericStat("reason");
    const intuition = hero.getNumericStat("intuition");
    const presence = hero.getNumericStat("presence");

    const damageImmunities = hero.getList(
      "damage-immunity",
    ) as ResolvedDamageImmunity[];

    const resolvedImmunities = damageImmunities.reduce((acc, curr) => {
      const typeId = curr.damageType?.id;
      if (!typeId) return acc;

      const existing = acc.find((i) => i.damageType?.id === typeId);
      if (existing) {
        if (curr.value > existing.value) {
          acc = acc.filter((i) => i.damageType?.id !== typeId);
          acc.push(curr);
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as ResolvedDamageImmunity[]);

    return {
      speed,
      stamina,
      resolvedImmunities,
      size,
      characteristics: {
        might,
        agility,
        reason,
        intuition,
        presence,
      },
    };
  }, [hero]);
};

export const StatSummary: React.FC<Props> = ({ hero }) => {
  const { speed, stamina, resolvedImmunities, characteristics, size } =
    useCalculatedStats(hero);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHARACTERISTICS</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.grid}>
          <View style={styles.statBox}>
            <Text style={styles.label}>MIGHT</Text>
            <Text style={styles.value}>{characteristics.might}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>AGILITY</Text>
            <Text style={styles.value}>{characteristics.agility}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>REASON</Text>
            <Text style={styles.value}>{characteristics.reason}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>INTUITION</Text>
            <Text style={styles.value}>{characteristics.intuition}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>PRESENCE</Text>
            <Text style={styles.value}>{characteristics.presence}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>VITALITY</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.grid}>
          <View style={styles.statBox}>
            <Text style={styles.label}>SPEED</Text>
            <Text style={styles.value}>{speed}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>SIZE</Text>
            <Text style={styles.value}>{size}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>STAMINA</Text>
            <Text style={styles.value}>{stamina}</Text>
          </View>
        </View>
      </View>

      {resolvedImmunities.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>DAMAGE IMMUNITIES</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.list}>
            {resolvedImmunities.map((ri) => (
              <View key={ri.id} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listItemText}>
                  <Text style={styles.bold}>{ri.damageType?.name || ""}</Text>:{" "}
                  {ri.value as number}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statBox: {
    minWidth: 80,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 12,
    alignItems: "center",
  },
  label: {
    fontSize: 9,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#6366f1", // indigo-500
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    flex: 1,
  },
  list: {
    gap: 8,
    paddingLeft: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#818cf8", // indigo-400
  },
  listItemText: {
    fontSize: 14,
    color: "#cbd5e1",
  },
  bold: {
    fontWeight: "bold",
    color: "#f1f5f9",
    textTransform: "capitalize",
  },
});
