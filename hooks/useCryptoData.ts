import { offlineCoinGeckoAPI } from '@/services/api/offlineCoinGecko';
import NetInfo from '@react-native-community/netinfo';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [isInternetReachable, setIsInternetReachable] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected ?? false);
            setIsInternetReachable(state.isInternetReachable ?? false);
        });

        return () => unsubscribe();
    }, []);

    return { isConnected, isInternetReachable };
};

export const useCoins = (perPage: number = 50) => {
    return useInfiniteQuery({
        queryKey: ['coins', perPage],
        queryFn: ({ pageParam = 1 }) => offlineCoinGeckoAPI.getCoins(pageParam, perPage),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === perPage ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 1,
        retryDelay: 1000,
        refetchOnMount: false,
        refetchOnReconnect: true,
    });
};

export const useCoinDetails = (coinId: string) => {
    return useQuery({
        queryKey: ['coin', coinId],
        queryFn: () => offlineCoinGeckoAPI.getCoinDetails(coinId),
        enabled: !!coinId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 1,
        refetchOnMount: false,
        refetchOnReconnect: true,
    });
};

export const useCoinMarketChart = (coinId: string, days: number = 7) => {
    return useQuery({
        queryKey: ['marketChart', coinId, days],
        queryFn: () => offlineCoinGeckoAPI.getCoinMarketChart(coinId, days),
        enabled: !!coinId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 1,
        refetchOnMount: false,
        refetchOnReconnect: true,
    });
};

export const useSearchCoins = (query: string) => {
    return useQuery({
        queryKey: ['search', query],
        queryFn: () => offlineCoinGeckoAPI.searchCoins(query),
        enabled: query.length > 0,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};