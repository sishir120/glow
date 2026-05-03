import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


import { API_URL } from '../config';
import { MOCK_USER } from '../data/mockData';

type User = {
    id: string;
    email: string;
    name: string;
    picture?: string;
    token?: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    signIn: (token: string, userData: User) => Promise<void>;
    signOut: () => Promise<void>;
    promptGoogleSignIn: () => Promise<void>;
    demoSignIn: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    signIn: async () => { },
    signOut: async () => { },
    promptGoogleSignIn: async () => { },
    demoSignIn: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Configure Google Signin
        // Ensure you have valid webClientId from Google Console
        // Google Signin configuration removed for distribution build
        /*
        GoogleSignin.configure({
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
            offlineAccess: true, // required for getting idToken
        });
        */

        const bootstrapAsync = async () => {
            try {
                const userJson = await AsyncStorage.getItem('user');
                if (userJson) {
                    setUser(JSON.parse(userJson));
                }
            } catch (e) {
                console.error('Failed to load user', e);
            } finally {
                setIsLoading(false);
            }
        };

        bootstrapAsync();
    }, []);

    const promptGoogleSignIn = async () => {
        console.warn("Google Sign In is disabled in this build.");
        alert("Google Sign In is currently disabled. Please use Guest Access or Email Login.");
    };

    const authenticateWithBackend = async (googleIdToken: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/mobile/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: googleIdToken }),
            });

            if (!response.ok) {
                console.error("Backend login failed", response.status);
                return;
            }

            const data = await response.json();

            const appUser: User = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                picture: data.user.image || data.user.picture,
                token: data.token
            };

            await signIn(data.token, appUser);
        } catch (error) {
            console.error("Failed to authenticate with backend", error);
        }
    };

    const signIn = async (token: string, userData: User) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error("Sign in error", error);
        }
    };

    const demoSignIn = async () => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(async () => {
            await signIn('mock-demo-token', {
                ...MOCK_USER, // Ensure MOCK_USER is imported or defined
                email: 'guest@glowup.com',
                name: 'Guest User',
                id: 'guest-user-id'
            });
            setIsLoading(false);
        }, 800);
    };

    const signOut = async () => {
        try {
            // await GoogleSignin.signOut();
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error("Sign out error", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                signIn,
                signOut,
                promptGoogleSignIn,
                demoSignIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
