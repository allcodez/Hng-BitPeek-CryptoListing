import CoinCard from '@/components/main/CoinCard';
import MarketHeader from '@/components/main/MarketHeader';
import PinnedCoinHeader from '@/components/main/PinnedCoinHeader';
import PromoBanner from '@/components/main/PromoBanner';
import SortBottomDrawer, { SortOption } from '@/components/main/SortBottomDrawer';
import { globalStyle } from '@/globalStyle';
import { useCoins, useNetworkStatus } from '@/hooks/useCryptoData';
import { useFavoritesStore } from '@/store/favoritesStore';
import { usePinnedCoinStore } from '@/store/pinnedCoinStore';
import { useUserStore } from '@/store/userStore';
import { theme } from '@/theme';
import { CoinListItem } from '@/types/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function CoinsListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSortDrawer, setShowSortDrawer] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('market_cap');
  const [showOfflineToast, setShowOfflineToast] = useState(false);
  const { isConnected } = useNetworkStatus();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { pinnedCoinId } = usePinnedCoinStore();
  const { userInfo } = useUserStore();

  const toastAnimation = useRef(new Animated.Value(-100)).current;

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

  const pinnedCoin = allCoins.find((coin) => coin.id === pinnedCoinId) || allCoins[0];

  useEffect(() => {
    if (showOfflineToast) {
      Animated.sequence([
        Animated.timing(toastAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2500),
        Animated.timing(toastAnimation, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowOfflineToast(false));
    }
  }, [showOfflineToast]);

  const handleRefresh = () => {
    if (!isConnected) {
      setShowOfflineToast(true);
    }
    refetch();
  };

  const sortedAndFilteredCoins = useMemo(() => {
    let filtered = searchQuery
      ? allCoins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : allCoins;

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'market_cap':
          return (b.market_cap ?? 0) - (a.market_cap ?? 0);
        case 'price_high':
          return (b.current_price ?? 0) - (a.current_price ?? 0);
        case 'price_low':
          return (a.current_price ?? 0) - (b.current_price ?? 0);
        case 'change_high':
          return (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0);
        case 'change_low':
          return (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0);
        case 'volume':
          return (b.total_volume ?? 0) - (a.total_volume ?? 0);
        default:
          return 0;
      }
    });

    return searchQuery ? sorted : sorted.slice(0, 10);
  }, [allCoins, searchQuery, sortBy]);

  const getSortLabel = (sort: SortOption): string => {
    switch (sort) {
      case 'market_cap':
        return 'Market Cap';
      case 'price_high':
        return 'Price (High)';
      case 'price_low':
        return 'Price (Low)';
      case 'change_high':
        return 'Gainers';
      case 'change_low':
        return 'Losers';
      case 'volume':
        return 'Volume';
      default:
        return 'Market Cap';
    }
  };

  const renderCoinItem = ({ item }: { item: CoinListItem }) => (
    <CoinCard
      coin={item}
      onPress={() => router.push(`/(tabs)/${item.id}`)}
      onFavoritePress={() => toggleFavorite(item.id)}
      isFavorite={isFavorite(item.id)}
    />
  );

  const renderHeader = () => (
    <View>
      <PinnedCoinHeader
        coin={pinnedCoin}
        userInfo={{
          name: userInfo?.name || 'Guest User',
          email: userInfo?.email || 'guest@example.com',
        }}
      />
      <PromoBanner onPress={() => console.log('Promo clicked')} />
      <MarketHeader
        sortBy={getSortLabel(sortBy)}
        onSortPress={() => setShowSortDrawer(true)}
      />
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {isFetchingNextPage && (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      )}
      {!searchQuery && sortedAndFilteredCoins.length >= 10 && (
        <TouchableOpacity
          style={[globalStyle.solidButton, styles.viewAllButton]}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <Text style={globalStyle.solidButtonText}>View All Coins</Text>
          <Ionicons name="arrow-forward" size={20} color="#8B5CF6" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={64} color="#E5E5EA" />
      <Text style={styles.emptyText}>No coins found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={64} color="#FF3B30" />
      <Text style={styles.errorText}>Seems you&apos;re offline</Text>
      {/* <Text style={styles.errorSubtext}>Failed to load coins</Text> */}
      <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryButtonText}>Peek Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Image
          source={require('../../assets/images/bitpeek.png')}
          style={styles.loadingLogo}
          resizeMode="contain"
        />
        <Text style={styles.loadingText}>Loading coins...</Text>
      </View>
    );
  }

  if (isError && allCoins.length === 0) {
    return (
      <View style={styles.container}>
        {renderError()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchButton}
      >
        <Image style={styles.placeholderImage} source={require('../../assets/images/bitpeek.png')} />
      </TouchableOpacity>

      {showOfflineToast && (
        <Animated.View
          style={[
            styles.offlineToast,
            {
              transform: [{ translateY: toastAnimation }],
            },
          ]}
        >
          <Ionicons name="cloud-offline" size={20} color="#fff" />
          <Text style={styles.offlineToastText}>You're offline.</Text>
        </Animated.View>
      )}

      <FlatList
        data={sortedAndFilteredCoins}
        renderItem={renderCoinItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} tintColor="#007AFF" />
        }
        showsVerticalScrollIndicator={false}
      />

      <SortBottomDrawer
        visible={showSortDrawer}
        onClose={() => setShowSortDrawer(false)}
        selectedSort={sortBy}
        onSelectSort={setSortBy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9c9c9ff',
  },
  searchButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineToast: {
    position: 'absolute',
    top: 60,
    left: '57%',
    right: 0,
    width: '38%',
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  offlineToastText: {
    color: '#FFFFFF',
    fontSize: 14,
    // fontWeight: '500',
    fontFamily: theme.font.semiBold,
    flex: 1,
  },
  footerLoader: {
    paddingVertical: 20,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 0,
    gap: 8,
    backgroundColor: '#ffffffff',
    width: '100%',
  },
  listContent: {},
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: theme.color.brand,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  retryButtonText: {
    color: '#000000ff',
    fontSize: 16,
    fontFamily: theme.font.medium,
  },
  searchModal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchListContent: {
    paddingBottom: 20,
  },
  placeholderImage: {
    width: 24,
    height: 27,
  },
  loadingLogo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});