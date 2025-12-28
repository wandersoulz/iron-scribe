import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { usePlayerStore } from '../store/usePlayerStore';
import { useHeroStore } from '../store/useHeroStore';
import { getClassTheme } from '../app/theme/class-theme';
import { getGlowStyle } from '../utils/styleHelpers';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HeroSelect'>;

interface Props {
  navigation: NavigationProp;
}

export const HeroSelectScreen: React.FC<Props> = ({ navigation }) => {
  const userId = usePlayerStore((state) => state.userId);
  const logout = usePlayerStore((state) => state.logout);
  
  // Select state and actions from the Hero Store
  const heroes = useHeroStore((state) => state.heroes);
  const fetchHeroes = useHeroStore((state) => state.fetchHeroes);
  const isLoading = useHeroStore((state) => state.isLoading);

  // Logout Button Logic
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, logout]);

  // Fetch Logic is now triggered here, but executed in the store
  useEffect(() => {
    if (userId) {
      fetchHeroes(userId);
    }
  }, [userId, fetchHeroes]);

  if (isLoading && heroes.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3700B3" />
        <Text style={{ color: '#666', marginTop: 10 }}>Opening the Vault...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHOOSE YOUR HERO</Text>
      
      <FlatList
        data={heroes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const theme = getClassTheme(item.class);
          const glow = getGlowStyle(theme.primaryColor);

          return (
            <TouchableOpacity 
              style={[styles.card, { borderLeftColor: theme.primaryColor }, glow]} 
              onPress={() => navigation.navigate('HeroDashboard', { heroId: item.id })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>LVL {item.level}</Text>
                </View>
              </View>
              <Text style={[styles.details, { color: theme.primaryColor }]}>
                {item.class.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No heroes found.</Text>
        }
      />
    </View>
  );
};

// ... copy your existing styles here ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 20, paddingTop: 20 },
  centered: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 14, color: '#888', fontWeight: 'bold', letterSpacing: 2, marginBottom: 20, textAlign: 'center' },
  listContent: { paddingBottom: 40 },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 22, color: '#FFF', fontWeight: 'bold' },
  levelBadge: { backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  levelText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  details: { fontSize: 12, fontWeight: 'bold', marginTop: 5, letterSpacing: 1.5 },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 50 },
  logoutButton: { padding: 8 },
  logoutText: { color: '#BB86FC', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 }
});