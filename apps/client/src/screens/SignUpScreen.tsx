import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { usePlayerStore } from '../store/usePlayerStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
    navigation: NavigationProp;
}

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    
    const signUp = usePlayerStore((state) => state.signUp);
    const isLoggingIn = usePlayerStore((state) => state.isLoggingIn);

    const handleSignUp = async () => {
        setErrorMsg(null);

        if (!email || !password || !confirmPassword) {
            setErrorMsg("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            return;
        }

        try {
            await signUp(email, password);
        } catch (err: any) {
            setErrorMsg(err.message || "Registration Failed.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join the Vault</Text>
            <Text style={styles.subtitle}>Create your Iron Scribe account</Text>

            <View style={styles.formContainer}>
                {errorMsg && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorMsg}</Text>
                    </View>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={(text) => { setEmail(text); setErrorMsg(null); }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => { setPassword(text); setErrorMsg(null); }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text) => { setConfirmPassword(text); setErrorMsg(null); }}
                />

                {isLoggingIn ? (
                    <ActivityIndicator size="large" color="#BB86FC" style={{ marginTop: 20 }} />
                ) : (
                    <>
                        <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
                            <Text style={styles.primaryButtonText}>CREATE ACCOUNT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.textButton} 
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.textButtonLabel}>Already have an account? Log In</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 30 },
    title: { fontSize: 32, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 10, letterSpacing: 2 },
    subtitle: { color: '#888', textAlign: 'center', marginBottom: 40, fontSize: 16 },
    formContainer: { width: '100%' },
    input: { 
        backgroundColor: '#1E1E1E', 
        color: '#fff', 
        padding: 16, 
        borderRadius: 8, 
        marginBottom: 16, 
        borderWidth: 1, 
        borderColor: '#333' 
    },
    errorContainer: {
        backgroundColor: 'rgba(207, 102, 121, 0.2)',
        padding: 10,
        borderRadius: 6,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#CF6679',
        alignItems: 'center'
    },
    errorText: { color: '#CF6679', fontWeight: 'bold', textAlign: 'center' },
    primaryButton: { 
        backgroundColor: '#03DAC6', // Teal for "Success/Create" vibe
        padding: 18, 
        borderRadius: 8, 
        alignItems: 'center', 
        marginBottom: 20,
        shadowColor: '#03DAC6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    primaryButtonText: { color: '#000', fontWeight: 'bold', letterSpacing: 2, fontSize: 16 },
    textButton: { alignItems: 'center', padding: 10 },
    textButtonLabel: { color: '#BB86FC', fontSize: 14, textDecorationLine: 'underline' }
});