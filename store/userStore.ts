import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfo {
    name: string;
    email: string;
}

interface UserState {
    userInfo: UserInfo | null;
    isAuthenticated: boolean;
    hasCompletedOnboarding: boolean;
    setUserInfo: (userInfo: UserInfo) => void;
    clearUserInfo: () => void;
    logout: () => void;
    completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userInfo: null,
            isAuthenticated: false,
            hasCompletedOnboarding: false,

            setUserInfo: (userInfo) =>
                set({ userInfo, isAuthenticated: true }),

            clearUserInfo: () =>
                set({ userInfo: null, isAuthenticated: false }),

            logout: () =>
                set({ userInfo: null, isAuthenticated: false }),

            completeOnboarding: () =>
                set({ hasCompletedOnboarding: true }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);