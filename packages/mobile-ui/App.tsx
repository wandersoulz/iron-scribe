import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  useState,
  useEffect,
} from "react-native";
import { TestHero } from "@iron-scribe/data";
import { HeroReference, Hero, Library } from "@iron-scribe/model";
import { AncestryDetail } from "@iron-scribe/ui-shared";

// We need a mock library for the demo
const mockLibrary = new Library([]);

export default function App() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const heroes: HeroReference[] = [TestHero];

  useEffect(() => {
    Hero.create(TestHero, mockLibrary).then(setHero);
  }, []);

  if (!hero) return null;

  if (isDetailOpen) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            onPress={() => setIsDetailOpen(false)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>✕ CLOSE</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>ANCESTRY</Text>
        </View>
        <AncestryDetail
          hero={hero}
          library={mockLibrary}
          isEditable={false}
          onHeroStateChange={() => {}}
        />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>IRON SCRIBE</Text>
        <Text style={styles.subtitle}>Mobile Hero Manager</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Shared Components</Text>

        <TouchableOpacity
          style={styles.demoCard}
          onPress={() => setIsDetailOpen(true)}
        >
          <Text style={styles.demoCardTitle}>View Ancestry Detail</Text>
          <Text style={styles.demoCardSubtitle}>Full Shared UI View</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Your Heroes</Text>
        {heroes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.heroCard}
            activeOpacity={0.7}
          >
            <View style={styles.heroIcon}>
              <Text style={styles.heroIconText}>{item.name[0]}</Text>
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.heroName}>{item.name}</Text>
              <Text style={styles.heroId}>ID: {item.id}</Text>
            </View>
            <View style={styles.chevron}>
              <Text style={styles.chevronText}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // slate-900
  },
  header: {
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b", // slate-800
  },
  detailHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 2,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#818cf8",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#f8fafc", // slate-50
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6366f1", // indigo-500
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#94a3b8", // slate-400
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  demoCard: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
    marginBottom: 12,
  },
  demoCardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  demoCardSubtitle: {
    fontSize: 12,
    color: "#818cf8",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroCard: {
    backgroundColor: "#1e293b", // slate-800
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderBottomColor: "#334155", // slate-700
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#312e81", // indigo-900
    alignItems: "center",
    justifyContent: "center",
  },
  heroIconText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#818cf8", // indigo-400
  },
  heroInfo: {
    flex: 1,
    marginLeft: 16,
  },
  heroName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f1f5f9", // slate-200
  },
  heroId: {
    fontSize: 12,
    color: "#64748b", // slate-500
    marginTop: 2,
  },
  chevron: {
    marginLeft: 8,
  },
  chevronText: {
    fontSize: 24,
    color: "#475569", // slate-600
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 24,
  },
});
