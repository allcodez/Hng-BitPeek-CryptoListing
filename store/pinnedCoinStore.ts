import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PinnedCoinState {
    pinnedCoinId: string | null;
    setPinnedCoin: (coinId: string) => void;
    clearPinnedCoin: () => void;
}

export const usePinnedCoinStore = create<PinnedCoinState>()(
    persist(
        (set) => ({
            pinnedCoinId: null,

            setPinnedCoin: (coinId: string) => {
                set({ pinnedCoinId: coinId });
            },

            clearPinnedCoin: () => {
                set({ pinnedCoinId: null });
            },
        }),
        {
            name: 'crypto-pinned-coin-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);