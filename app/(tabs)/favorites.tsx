import { useCoins } from '@/hooks/useCryptoData';
import { useFavoritesStore } from '@/store/favoritesStore';
import { theme } from '@/theme';
import { CoinListItem } from '@/types/api';
import { formatPercentage, formatPrice, getChangeColor } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function FavoritesScreen() {
    const { favorites } = useFavoritesStore();
    const { data, isLoading } = useCoins();

    const allCoins = data?.pages.flatMap((page) => page) ?? [];

    const favoriteCoins = allCoins.filter((coin) => favorites.includes(coin.id));

    const renderCoinCard = ({ item }: { item: CoinListItem }) => {
        const priceChange = item.price_change_percentage_24h ?? 0;
        const changeColor = getChangeColor(priceChange);

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/(tabs)/${item.id}`)}
                activeOpacity={0.7}
            >
                <View style={styles.cardHeader}>
                    <Image source={{ uri: item.image }} style={styles.coinIcon} />
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.coinName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>

                    <Text style={styles.price} numberOfLines={1}>
                        {formatPrice(item.current_price ?? 0)}
                    </Text>

                    <View style={[styles.changeBadge, { backgroundColor: `${changeColor}15` }]}>
                        <Ionicons
                            name={priceChange >= 0 ? 'trending-up' : 'trending-down'}
                            size={12}
                            color={changeColor}
                        />
                        <Text style={[styles.changeText, { color: changeColor }]}>
                            {formatPercentage(priceChange)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                {/* <Ionicons name="heart-outline" size={80} color="#E5E5EA" /> */}
            </View>
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptySubtext}>
                Tap the heart icon on any coin to add it to your favorites
            </Text>
            <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => router.push('/(tabs)/explore')}
            >
                <Text style={styles.exploreButtonText}>Explore Coins</Text>
                <Ionicons name="arrow-forward" size={20} color="#000000ff" />
            </TouchableOpacity>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#8B5CF6" />
                <Text style={styles.loadingText}>Loading favorites...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Favorites</Text>
                <Text style={styles.headerSubtitle}>
                    {favoriteCoins.length} {favoriteCoins.length === 1 ? 'coin' : 'coins'}
                </Text>

            </View>

            <FlatList
                data={favoriteCoins}
                renderItem={renderCoinCard}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 24,
        // fontWeight: '700',
        color: '#1F2937',
        fontFamily: theme.font.styleBold,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
        fontFamily: theme.font.regular,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        maxWidth: '48%',
    },
    cardHeader: {
        marginBottom: 12,
    },
    coinIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    cardContent: {
        gap: 4,
    },
    coinName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        fontFamily: theme.font.semiBold,
    },
    coinSymbol: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 8,
        fontFamily: theme.font.regular,
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        fontFamily: theme.font.styleBold,
    },
    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    changeText: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: theme.font.semiBold,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 24,
        // fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        fontFamily: theme.font.styleBold,
    },
    emptySubtext: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
        fontFamily: theme.font.regular,
    },
    exploreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.color.brand,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 16,
        gap: 8,
    },
    exploreButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000ff',
        fontFamily: theme.font.semiBold,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#6B7280',
        fontFamily: theme.font.regular,
    },
});