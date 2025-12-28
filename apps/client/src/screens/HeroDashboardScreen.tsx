import { calculateMaxStamina } from "@iron-scribe/common";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useHeroStore } from '../store/useHeroStore';
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePlayerStore } from "../store/usePlayerStore";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HeroDashboard'>;

interface Props {
    navigation: NavigationProp;
}

export const HeroDashboardScreen: React.FC<Props> = ({ navigation }) => {
    const hero = useHeroStore((state) => state.activeHero);

    const logout = usePlayerStore((state) => state.logout);
    const updateResource = useHeroStore((state) => state.updateResource);
    const [maxStamina, setMaxStamina] = useState<number>(0);
    const [currentStamina, setCurrentStamina] = useState<number>(-1);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>LOGOUT</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, logout]);

    useEffect(() => {
        if (hero) {
            const staminaMax = calculateMaxStamina(hero.class, hero.level);
            setMaxStamina(staminaMax);
            setCurrentStamina(staminaMax - hero.state.staminaDamage);
        }
    }, [hero]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{hero?.name}</Text>
            <View style={styles.resourceBoxFull}>
                <Text style={styles.label}>STAMINA</Text>
                <View style={styles.controlsRow}>
                    <TouchableOpacity onPress={() => updateResource('staminaDamage', 1)}>
                        <Text style={styles.button}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.value}>{currentStamina} / {maxStamina}</Text>
                    <TouchableOpacity onPress={() => updateResource('staminaDamage', -1)}>
                        <Text style={styles.button}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#121212', flex: 1 },
    header: { fontSize: 28, color: '#FFFFFF', fontWeight: 'bold' },
    subHeader: { fontSize: 18, color: '#B0B0B0', marginBottom: 20 },
    resourceBoxFull: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, marginBottom: 15 },
    label: { color: '#757575', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    controlsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    value: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    button: { backgroundColor: '#3700B3', width: 60, height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
    logoutButton: { padding: 8 },
    logoutText: { color: '#BB86FC', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
});