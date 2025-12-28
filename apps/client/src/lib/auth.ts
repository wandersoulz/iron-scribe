import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

// 1. Initialize Supabase Client with Persistence
const getEnvVar = (key: string, placeholder: string) => {
    const value = process.env[key];
    return value ? value : placeholder;
};

// Prevent crash if keys are missing by using a syntactically valid dummy URL
const supabaseUrl = getEnvVar('EXPO_PUBLIC_SUPABASE_URL', 'https://placeholder.supabase.co');
const supabaseAnonKey = getEnvVar('EXPO_PUBLIC_SUPABASE_ANON_KEY', 'placeholder-key');

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false, // We handle OAuth redirects manually in RN
    },
});

WebBrowser.maybeCompleteAuthSession(); // Required for Web usage of AuthSession

export interface AuthUser {
    id: string;
    email: string;
}

// 2. Email/Password Login
export const login = async (email: string, password: string): Promise<AuthUser> => {
    const isPlaceholder = supabaseUrl === 'https://placeholder.supabase.co';
    
    // Dev Toggle Override OR forced fallback if keys are missing
    if (__DEV__ && (email === 'void@iron-scribe.local' || isPlaceholder)) {
        console.log("🛠️ Using Dummy Auth (Dev mode or missing keys)");
        // Simulate network delay
        await new Promise(r => setTimeout(r, 500));
        return { id: '00000000-0000-0000-0000-000000000000', email: email };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { id: data.user.id, email: data.user.email! };
};

// 3. Email/Password Sign Up
export const signUp = async (email: string, password: string): Promise<AuthUser> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    
    // Note: If email confirmation is enabled, the user won't be signed in immediately.
    // However, for this implementation, we return the user object if created.
    if (!data.user) throw new Error("Sign up successful, but no user data returned. Check email confirmation.");
    
    return { id: data.user.id, email: data.user.email! };
};

// 4. Google OAuth Login
export const signInWithGoogle = async (): Promise<AuthUser | null> => {
    const redirectUri = makeRedirectUri({
        scheme: 'iron-scribe',
        path: 'auth/callback', // Optional, purely for clarity
    });

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectUri,
            skipBrowserRedirect: true, // We will open the URL ourselves
        },
    });

    if (error) throw error;
    if (!data.url) throw new Error("No OAuth URL returned");

    // Open the browser
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);

    if (result.type === 'success' && result.url) {
        // Parse the URL to get the tokens (Supabase returns them in the fragment #)
        const params = parseUrlParams(result.url);
        
        if (params.access_token && params.refresh_token) {
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                access_token: params.access_token,
                refresh_token: params.refresh_token,
            });
            if (sessionError) throw sessionError;
            return { 
                id: sessionData.user?.id || '', 
                email: sessionData.user?.email || '' 
            };
        }
    }

    return null; // User cancelled or failed
};

// Helper to parse URL fragment parameters
const parseUrlParams = (url: string): Record<string, string> => {
    const params: Record<string, string> = {};
    const regex = /[#&]([^=]+)=([^&]*)/g;
    let match;
    while ((match = regex.exec(url)) !== null) {
        params[match[1]] = decodeURIComponent(match[2]);
    }
    return params;
};
