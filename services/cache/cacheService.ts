import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'crypto_cache_';
const CACHE_EXPIRY = 1000 * 60 * 10;

interface CacheData<T> {
    data: T;
    timestamp: number;
}

class CacheService {
    async set<T>(key: string, data: T): Promise<void> {
        try {
            const cacheData: CacheData<T> = {
                data,
                timestamp: Date.now(),
            };
            await AsyncStorage.setItem(
                `${CACHE_PREFIX}${key}`,
                JSON.stringify(cacheData)
            );
        } catch (error) {
            console.error('Cache save error:', error);
        }
    }

    async get<T>(key: string, ignoreExpiry: boolean = false): Promise<T | null> {
        try {
            const cached = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
            if (!cached) return null;

            const cacheData: CacheData<T> = JSON.parse(cached);
            const now = Date.now();
            const age = now - cacheData.timestamp;

            if (ignoreExpiry || age < CACHE_EXPIRY) {
                return cacheData.data;
            }

            return null;
        } catch (error) {
            console.error('Cache read error:', error);
            return null;
        }
    }

    async getStale<T>(key: string): Promise<T | null> {
        return this.get<T>(key, true);
    }

    async isFresh(key: string): Promise<boolean> {
        try {
            const cached = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
            if (!cached) return false;

            const cacheData: CacheData<any> = JSON.parse(cached);
            const age = Date.now() - cacheData.timestamp;
            return age < CACHE_EXPIRY;
        } catch {
            return false;
        }
    }

    async clear(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
        } catch (error) {
            console.error('Cache clear error:', error);
        }
    }


    async clearAll(): Promise<void> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
            await AsyncStorage.multiRemove(cacheKeys);
        } catch (error) {
            console.error('Cache clear all error:', error);
        }
    }

    async getCacheInfo(): Promise<{
        totalKeys: number;
        oldestCache: number;
        newestCache: number;
    }> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));

            if (cacheKeys.length === 0) {
                return { totalKeys: 0, oldestCache: 0, newestCache: 0 };
            }

            let oldest = Date.now();
            let newest = 0;

            for (const key of cacheKeys) {
                const cached = await AsyncStorage.getItem(key);
                if (cached) {
                    const cacheData: CacheData<any> = JSON.parse(cached);
                    if (cacheData.timestamp < oldest) oldest = cacheData.timestamp;
                    if (cacheData.timestamp > newest) newest = cacheData.timestamp;
                }
            }

            return {
                totalKeys: cacheKeys.length,
                oldestCache: oldest,
                newestCache: newest,
            };
        } catch {
            return { totalKeys: 0, oldestCache: 0, newestCache: 0 };
        }
    }
}

export const cacheService = new CacheService();