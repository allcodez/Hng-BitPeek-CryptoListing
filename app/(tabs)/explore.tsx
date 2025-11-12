import MiniChart from '@/components/main/MiniChart';
import NetworkStatusBar from '@/components/NetworkStatusBar';
import { useCoins, useNetworkStatus } from '@/hooks/useCryptoData';
import { useFavoritesStore } from '@/store/favoritesStore';
import { theme } from '@/theme';
import { CoinListItem } from '@/types/api';
import { formatPercentage, formatPrice, getChangeColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type FilterType = 'trending' | 'gainers' | 'losers' | 'popular';

export default function MarketScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('trending');
  const { isConnected } = useNetworkStatus();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCoins();

  const allCoins = data?.pages.flatMap((page) => page) ?? [];

  const getFilteredCoins = () => {
    let filtered = allCoins;

    if (searchQuery) {
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (activeFilter) {
      case 'gainers':
        return filtered
          .filter((coin) => (coin.price_change_percentage_24h ?? 0) > 0)
          .sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0));
      case 'losers':
        return filtered
          .filter((coin) => (coin.price_change_percentage_24h ?? 0) < 0)
          .sort((a, b) => (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0));
      case 'popular':
        return filtered.sort((a, b) => (a.market_cap_rank ?? 9999) - (b.market_cap_rank ?? 9999));
      case 'trending':
      default:
        return filtered;
    }
  };

  const filteredCoins = getFilteredCoins();

  const sanitizedCoins = filteredCoins.filter(coin => {
    if (!coin.id || !coin.name || !coin.symbol) return false;

    const price = coin.current_price;
    if (price != null && (isNaN(price) || !isFinite(price))) return false;

    const priceChange = coin.price_change_percentage_24h;
    if (priceChange != null && (isNaN(priceChange) || !isFinite(priceChange))) return false;

    return true;
  });

  const renderCoinItem = ({ item }: { item: CoinListItem }) => {
    const priceChange = item.price_change_percentage_24h ?? 0;
    const changeColor = getChangeColor(priceChange);
    const currentPrice = item.current_price ?? 0;

    const hasValidSparkline = item.sparkline_in_7d?.price &&
      Array.isArray(item.sparkline_in_7d.price) &&
      item.sparkline_in_7d.price.length > 0 &&
      item.sparkline_in_7d.price.every(val => val != null && !isNaN(val) && isFinite(val));

    return (
      <TouchableOpacity
        style={styles.coinCard}
        onPress={() => router.push(`/(tabs)/${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.coinLeft}>
          <View style={styles.iconContainer}>
            <Image source={{ uri: item.image }} style={styles.coinIcon} />
          </View>
          <View style={styles.coinInfo}>
            <Text style={styles.coinName}>{item.name}</Text>
            <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
          </View>
        </View>

        {hasValidSparkline && (
          <View style={styles.chartContainer}>
            <MiniChart
              data={item.sparkline_in_7d.price}
              color={changeColor}
              width={80}
              height={40}
            />
          </View>
        )}

        <View style={styles.coinRight}>
          <Text style={styles.price}>{formatPrice(currentPrice)}</Text>
          <Text style={[styles.priceChange, { color: changeColor }]}>
            {formatPercentage(priceChange)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={64} color="#ccc" />
      <Text style={styles.emptyText}>No coins found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search or filter</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4A90E2" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading market...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={64} color="#E53935" />
          <Text style={styles.errorText}>You’re currently offline</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Peek Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {!isConnected && <NetworkStatusBar />}

      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Market</Text>
        {/* <View style={styles.backButton} /> */}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterTabs}
      >
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'trending' && styles.filterTabActive]}
          onPress={() => setActiveFilter('trending')}
        >
          <Text style={[styles.filterTabText, activeFilter === 'trending' && styles.filterTabTextActive]}>
            Trending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'gainers' && styles.filterTabActive]}
          onPress={() => setActiveFilter('gainers')}
        >
          <Text style={[styles.filterTabText, activeFilter === 'gainers' && styles.filterTabTextActive]}>
            Top Gainers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'losers' && styles.filterTabActive]}
          onPress={() => setActiveFilter('losers')}
        >
          <Text style={[styles.filterTabText, activeFilter === 'losers' && styles.filterTabTextActive]}>
            Top Losers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'popular' && styles.filterTabActive]}
          onPress={() => setActiveFilter('popular')}
        >
          <Text style={[styles.filterTabText, activeFilter === 'popular' && styles.filterTabTextActive]}>
            Most Popular
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={sanitizedCoins}
        renderItem={renderCoinItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetch}
            tintColor="#4A90E2"
            colors={['#4A90E2']}
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    // fontWeight: '700',
    color: '#1a1a1a',
    fontFamily: theme.font.styleBold,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 16,
    // paddingVertical: 14,
    gap: 10,
  },
  searchText: {
    flex: 1,
    color: '#1a1a1a',
    fontSize: 16,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
    paddingVertical: 4,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: theme.color.brand,
  },
  filterTabText: {
    color: '#666',
    fontSize: 14,
    // fontWeight: '600',
    fontFamily: theme.font.regular,
  },
  filterTabTextActive: {
    color: '#000',
    fontFamily: theme.font.medium,

  },
  listContent: {
    paddingBottom: 100,
  },
  coinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 1,
  },
  coinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  coinIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  coinInfo: {
    justifyContent: 'center',
  },
  coinName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    fontFamily: theme.font.medium,

  },
  coinSymbol: {
    fontSize: 13,
    color: '#666',
    fontFamily: theme.font.regular,

  },
  chartContainer: {
    marginHorizontal: 12,
  },
  coinRight: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    fontFamily: theme.font.medium,
  },
  priceChange: {
    fontSize: 13,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: theme.color.brand,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  retryButtonText: {
    color: '#000000',
    fontFamily: theme.font.medium,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  footerLoader: {
    paddingVertical: 20,
  },
});