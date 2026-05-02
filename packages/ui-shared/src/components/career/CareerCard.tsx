import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Hero, Library, RegistryName, Career } from "@iron-scribe/model";

interface CareerCardProps {
  hero: Hero;
  library: Library;
  onClick: () => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  hero,
  library,
  onClick,
}) => {
  if (!hero.career)
    return (
      <TouchableOpacity
        style={styles.emptyCard}
        onPress={onClick}
        activeOpacity={0.7}
      >
        <Text style={styles.emptyIcon}>🔮</Text>
        <Text style={styles.emptyText}>SELECT CAREER</Text>
      </TouchableOpacity>
    );

  const [careerData, setCareerData] = useState<Career | undefined>(undefined);

  useEffect(() => {
    const careerRegistry = library.getCompositeRegistry<Career>(
      RegistryName.Careers,
    );
    careerRegistry.get(hero.career!.id).then(setCareerData);
  }, [hero.career.id, library]);

  return (
    <TouchableOpacity style={styles.card} onPress={onClick} activeOpacity={0.7}>
      <View style={styles.decoration} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⚒️</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CAREER</Text>
          </View>
        </View>

        <Text style={styles.name}>{careerData?.name?.toUpperCase() || "UNKNOWN"}</Text>
        <Text style={styles.subtitle}>BACKGROUND & EXPERTISE</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>MANAGE DETAILS</Text>
          <Text style={styles.footerArrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emptyCard: {
    borderRadius: 24,
    padding: 32,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#1e293b",
    backgroundColor: "rgba(30, 41, 59, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748b",
    letterSpacing: 2,
  },
  card: {
    overflow: "hidden",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    position: "relative",
  },
  decoration: {
    position: "absolute",
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 64,
  },
  content: {
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(5, 150, 105, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    backgroundColor: "rgba(52, 211, 153, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(52, 211, 153, 0.2)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#34d399",
    letterSpacing: 2,
  },
  name: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  footer: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: "#34d399",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 2,
  },
  footerArrow: {
    color: "#34d399",
    fontWeight: "900",
    fontSize: 12,
  },
});
