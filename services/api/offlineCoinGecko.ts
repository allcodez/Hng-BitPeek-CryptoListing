import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { cacheService } from '../cache/cacheService';
import { CoinDetails, CoinListItem, CoinMarketChart } from './types';

const BASE_URL = process.env.EXPO_PUBLIC_COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const apiKey = process.env.EXPO_PUBLIC_COINGECKO_API_KEY;
    if (apiKey) {
        config.headers['x-cg-demo-api-key'] = apiKey;
    }
    return config;
});


async function isOnline(): Promise<boolean> {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected === true && netInfo.isInternetReachable !== false;
}

async function fetchWithCache<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>
): Promise<T> {
    const online = await isOnline();

    const cachedData = await cacheService.get<T>(cacheKey, !online);

    if (cachedData) {
        if (!online) {
            console.log(`[OFFLINE] Using cached data for ${cacheKey}`);
            return cachedData;
        }

        console.log(`[CACHE] Using cached data for ${cacheKey}, fetching fresh...`);

        fetchFn()
            .then(freshData => {
                cacheService.set(cacheKey, freshData);
                console.log(`[UPDATED] Fresh data cached for ${cacheKey}`);
            })
            .catch(error => {
                console.log(`[BACKGROUND FETCH FAILED] ${cacheKey}:`, error.message);
            });

        return cachedData;
    }

    if (!online) {
        const staleData = await cacheService.getStale<T>(cacheKey);
        if (staleData) {
            console.log(`[OFFLINE] Using stale cache for ${cacheKey}`);
            return staleData;
        }
        throw new Error('No internet connection and no cached data available');
    }

    console.log(`[FETCH] Getting fresh data for ${cacheKey}`);
    const freshData = await fetchFn();
    await cacheService.set(cacheKey, freshData);
    return freshData;
}

export const offlineCoinGeckoAPI = {

    getCoins: async (page: number = 1, perPage: number = 50) => {
        const cacheKey = `coins_page_${page}_per_${perPage}`;

        return fetchWithCache<CoinListItem[]>(cacheKey, async () => {
            const response = await api.get<CoinListItem[]>('/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: perPage,
                    page: page,
                    sparkline: true,
                    price_change_percentage: '24h,7d',
                },
            });
            return response.data;
        });
    },


    getCoinDetails: async (coinId: string) => {
        const cacheKey = `coin_details_${coinId}`;

        return fetchWithCache<CoinDetails>(cacheKey, async () => {
            const response = await api.get<CoinDetails>(`/coins/${coinId}`, {
                params: {
                    localization: false,
                    tickers: false,
                    community_data: false,
                    developer_data: false,
                },
            });
            return response.data;
        });
    },


    getCoinMarketChart: async (coinId: string, days: number = 7) => {
        const cacheKey = `market_chart_${coinId}_${days}`;

        return fetchWithCache<CoinMarketChart>(cacheKey, async () => {
            const response = await api.get<CoinMarketChart>(`/coins/${coinId}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: days,
                },
            });
            return response.data;
        });
    },

    searchCoins: async (query: string) => {
        const cacheKey = `search_${query.toLowerCase()}`;

        return fetchWithCache(cacheKey, async () => {
            const response = await api.get('/search', {
                params: {
                    query: query,
                },
            });
            return response.data.coins;
        });
    },


    clearCache: async () => {
        await cacheService.clearAll();
    },


    getCacheInfo: async () => {
        return cacheService.getCacheInfo();
    },
};