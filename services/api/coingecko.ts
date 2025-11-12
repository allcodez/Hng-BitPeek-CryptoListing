import axios from 'axios';
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

export const coinGeckoAPI = {
    getCoins: async (page: number = 1, perPage: number = 50) => {
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
    },

    getCoinDetails: async (coinId: string) => {
        const response = await api.get<CoinDetails>(`/coins/${coinId}`, {
            params: {
                localization: false,
                tickers: false,
                community_data: false,
                developer_data: false,
            },
        });
        return response.data;
    },

    getCoinMarketChart: async (coinId: string, days: number = 7) => {
        const response = await api.get<CoinMarketChart>(`/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: days,
            },
        });
        return response.data;
    },

    searchCoins: async (query: string) => {
        const response = await api.get('/search', {
            params: {
                query: query,
            },
        });
        return response.data.coins;
    },
};

export default api;