import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePlayerStore } from '../store/usePlayerStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: NavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const login = usePlayerStore((state) => state.login);
  const loginWithGoogle = usePlayerStore((state) => state.loginWithGoogle);
  const isLoggingIn = usePlayerStore((state) => state.isLoggingIn);

  const handleLogin = async () => {
    setErrorMsg(null);
    if (!email || !password) {
      setErrorMsg("Please enter email and password.");
      return;
    }
    try {
      await login(email, password);
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed.");
    }
  };

  const handleSignUp = () => {
    setErrorMsg(null);
    navigation.navigate('SignUp');
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setErrorMsg(err.message || "Google login failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iron Scribe</Text>
      <Text style={styles.subtitle}>Digital Companion for DrawSteel</Text>

      <View style={styles.formContainer}>
        {errorMsg && (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
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

        {isLoggingIn ? (
          <ActivityIndicator size="large" color="#BB86FC" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>ENTER THE VAULT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
              <Text style={styles.secondaryButtonText}>Create New Account</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {__DEV__ && <Text style={styles.devNote}>Development Mode</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 30 },
  title: { fontSize: 42, color: '#fff', fontWeight: 'bold', textAlign: 'center', letterSpacing: 4, fontFamily: 'monospace' },
  subtitle: { color: '#888', textAlign: 'center', marginBottom: 50, letterSpacing: 1 },
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
    backgroundColor: '#3700B3',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#3700B3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', letterSpacing: 2, fontSize: 16 },
  secondaryButton: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 10
  },
  secondaryButtonText: { color: '#BB86FC', fontSize: 14, fontWeight: '600' },

  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  divider: { flex: 1, height: 1, backgroundColor: '#333' },
  dividerText: { marginHorizontal: 10, color: '#666', fontSize: 12 },

  googleButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  googleButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  devNote: { color: '#333', textAlign: 'center', marginTop: 40, fontSize: 10 }
});