import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: string[];
    addFavorite: (coinId: string) => void;
    removeFavorite: (coinId: string) => void;
    isFavorite: (coinId: string) => boolean;
    toggleFavorite: (coinId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (coinId: string) => {
                set((state) => ({
                    favorites: [...state.favorites, coinId],
                }));
            },

            removeFavorite: (coinId: string) => {
                set((state) => ({
                    favorites: state.favorites.filter((id) => id !== coinId),
                }));
            },

            isFavorite: (coinId: string) => {
                return get().favorites.includes(coinId);
            },

            toggleFavorite: (coinId: string) => {
                const { favorites } = get();
                if (favorites.includes(coinId)) {
                    get().removeFavorite(coinId);
                } else {
                    get().addFavorite(coinId);
                }
            },
        }),
        {
            name: 'crypto-favorites-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);