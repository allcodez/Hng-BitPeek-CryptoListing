import CandlestickChart, { convertToCandleData } from '@/components/main/CandlestickChart';
import { useCoinDetails, useCoinMarketChart } from '@/hooks/useCryptoData';
import { useFavoritesStore } from '@/store/favoritesStore';
import { usePinnedCoinStore } from '@/store/pinnedCoinStore';
import { theme } from '@/theme';
import {
    formatLargeNumber,
    formatPercentage,
    formatPrice,
    getChangeColor,
    stripHtml,
    truncateText,
} from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const CHART_PERIODS = [
    { label: 'D', value: 1 },
    { label: 'W', value: 7 },
    { label: 'M', value: 30 },
    { label: '6M', value: 180 },
    { label: 'Y', value: 365 },
    { label: 'All', value: 'max' },
];

const TABS = ['Order Book', 'History', 'Notes', 'Info'];

export default function CoinDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [selectedPeriod, setSelectedPeriod] = useState(7);
    const [selectedTab, setSelectedTab] = useState('Order Book');
    const { setPinnedCoin, pinnedCoinId } = usePinnedCoinStore();

    const isFav = useFavoritesStore((state) => state.favorites.includes(id));
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    const { data: coinDetails, isLoading, isError } = useCoinDetails(id);
    const { data: chartData, isLoading: chartLoading } = useCoinMarketChart(id, selectedPeriod);
    const [chartType, setChartType] = useState<'line' | 'candle'>('line');

    const isPinned = pinnedCoinId === id;

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/');
        }
    };

    const handlePinCoin = () => {
        setPinnedCoin(id);
        Toast.show({
            type: 'success',
            text1: 'Pin Successful',
            text2: isPinned ? 'Coin pinned to home screen' : 'Coin pinned to home screen',
            position: 'top',
            visibilityTime: 3000,
            topOffset: 60,
        });
    };

    const handleToggleFavorite = () => {
        toggleFavorite(id);
        Toast.show({
            type: 'success',
            text1: isFav ? 'Removed from Favorites' : 'Added to Favorites',
            text2: isFav ? 'Coin removed successfully' : 'Coin added successfully',
            position: 'top',
            visibilityTime: 2000,
            topOffset: 60,
        });
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#8B5CF6" />
                <Text style={styles.loadingText}>Loading details...</Text>
            </View>
        );
    }

    if (isError || !coinDetails) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons name="alert-circle" size={64} color="#EF4444" />
                <Text style={styles.errorText}>You’re currently offline</Text>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const priceChange24h = coinDetails.market_data.price_change_percentage_24h;
    const changeColor = getChangeColor(priceChange24h);

    const chartPrices = chartData?.prices.map((item) => item[1]) ?? [];
    const minPrice = Math.min(...chartPrices);
    const maxPrice = Math.max(...chartPrices);

    const orderBookData = {
        bids: [
            { price: formatPrice(coinDetails.market_data.current_price.usd - 10), amount: '493,128,201' },
            { price: formatPrice(coinDetails.market_data.current_price.usd - 20), amount: '853,177,018' },
            { price: formatPrice(coinDetails.market_data.current_price.usd - 30), amount: '2,559,531,054' },
        ],
        asks: [
            { price: formatPrice(coinDetails.market_data.current_price.usd + 5), amount: '881,828,501' },
            { price: formatPrice(coinDetails.market_data.current_price.usd + 10), amount: '1,620,091,122' },
            { price: formatPrice(coinDetails.market_data.current_price.usd + 15), amount: '5,821,501,904' },
        ],
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
                    <Ionicons name="chevron-back" size={24} color="#1F2937" />
                </TouchableOpacity>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>
                        {coinDetails.symbol.toUpperCase()}/USDT
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        onPress={handlePinCoin}
                        style={styles.headerIconButton}
                    >
                        <Ionicons
                            name={isPinned ? 'pin' : 'pin-outline'}
                            size={20}
                            color={isPinned ? '#8B5CF6' : '#1F2937'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleToggleFavorite}
                        style={styles.headerIconButton}
                    >
                        <Ionicons
                            name={isFav ? 'star' : 'star-outline'}
                            size={20}
                            color={isFav ? '#F59E0B' : '#1F2937'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.priceSection}>
                    <View style={styles.priceRow}>
                        <View style={styles.priceInfo}>
                            <Text style={styles.mainPrice}>
                                {formatPrice(coinDetails.market_data.current_price.usd)}
                            </Text>
                            <View style={styles.priceChangeRow}>
                                <Text style={styles.priceChangeAmount}>
                                    {priceChange24h > 0 ? '+' : ''}
                                    {coinDetails.market_data.price_change_24h?.toFixed(2) || '0.00'}
                                </Text>
                                <Text style={[styles.priceChangePercent, { color: changeColor }]}>
                                    {formatPercentage(priceChange24h)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.highLowContainer}>
                            <View style={styles.highLowItem}>
                                <Text style={styles.highLowLabel}>High</Text>
                                <Text style={styles.highLowValue}>
                                    {formatPrice(coinDetails.market_data.high_24h.usd)}
                                </Text>
                            </View>
                            <View style={styles.highLowItem}>
                                <Text style={styles.highLowLabel}>Low</Text>
                                <Text style={styles.highLowValue}>
                                    {formatPrice(coinDetails.market_data.low_24h.usd)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <TouchableOpacity
                            style={styles.chartTitleRow}
                            onPress={() => setChartType(chartType === 'line' ? 'candle' : 'line')}
                        >
                            <Ionicons
                                name={chartType === 'line' ? 'pulse' : 'bar-chart'}
                                size={15}
                                color='#000000'
                            />
                            <Text style={styles.chartTitle}>
                                {chartType === 'line' ? 'Line' : 'Candle'}
                            </Text>
                            <Ionicons name="chevron-down" size={14} color="#000000ff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.chartWrapper}>
                        {chartLoading ? (
                            <View style={styles.chartLoading}>
                                <ActivityIndicator size="small" color="#8B5CF6" />
                            </View>
                        ) : chartPrices.length > 0 ? (
                            <View style={styles.chartContainer}>
                                <Text style={styles.minPriceLabel}>{formatPrice(minPrice)}</Text>

                                {chartType === 'line' ? (
                                    <LineChart
                                        data={{
                                            labels: [],
                                            datasets: [
                                                {
                                                    data: chartPrices,
                                                    color: (opacity = 1) => changeColor,
                                                    strokeWidth: 2,
                                                }
                                            ],
                                        }}
                                        width={width + 10}
                                        height={200}
                                        chartConfig={{
                                            backgroundColor: '#FFFFFF',
                                            backgroundGradientFrom: '#FFFFFF',
                                            backgroundGradientTo: '#FFFFFF',
                                            backgroundGradientFromOpacity: 0,
                                            backgroundGradientToOpacity: 0,
                                            decimalPlaces: 2,
                                            color: (opacity = 1) => changeColor,
                                            labelColor: (opacity = 1) => changeColor,
                                            style: { borderRadius: 16 },
                                            propsForDots: { r: '0' },
                                            propsForBackgroundLines: { strokeWidth: 0 },
                                            fillShadowGradient: changeColor,
                                            fillShadowGradientOpacity: 0.3,
                                            fillShadowGradientTo: changeColor,
                                            fillShadowGradientToOpacity: 0.05,
                                        }}
                                        bezier
                                        style={styles.chart}
                                        withVerticalLabels={false}
                                        withHorizontalLabels={false}
                                        withDots={false}
                                        withInnerLines={false}
                                        withOuterLines={false}
                                        withShadow={true}
                                    />
                                ) : (
                                    <View style={styles.candlestickContainer}>
                                        <CandlestickChart
                                            data={convertToCandleData(chartData?.prices || [], 24)}
                                            width={width - 60}
                                            height={200}
                                            upColor="#00C087"
                                            downColor="#FF4D4D"
                                        />
                                    </View>
                                )}

                                <Text style={styles.maxPriceLabel}>{formatPrice(maxPrice)}</Text>
                            </View>
                        ) : (
                            <Text style={styles.noDataText}>No chart data available</Text>
                        )}
                    </View>

                    <View style={styles.periodSelector}>
                        {CHART_PERIODS.map((period) => (
                            <TouchableOpacity
                                key={period.label}
                                style={[
                                    styles.periodButton,
                                    selectedPeriod === period.value && styles.periodButtonActive,
                                ]}
                                onPress={() => setSelectedPeriod(period.value as number)}
                            >
                                <Text
                                    style={[
                                        styles.periodText,
                                        selectedPeriod === period.value && styles.periodTextActive,
                                    ]}
                                >
                                    {period.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.tabsContainer}>
                    <View style={styles.tabsHeader}>
                        {TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={styles.tab}
                                onPress={() => setSelectedTab(tab)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedTab === tab && styles.tabTextActive,
                                    ]}
                                >
                                    {tab}
                                </Text>
                                {selectedTab === tab && <View style={styles.tabIndicator} />}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {selectedTab === 'Order Book' && (
                        <View style={styles.orderBookContainer}>
                            <View style={styles.orderBookHeader}>
                                <Text style={styles.orderBookColumn}>Bid</Text>
                                <Text style={styles.orderBookColumn}></Text>
                                <Text style={[styles.orderBookColumn, styles.orderBookColumn2]}>Ask</Text>
                            </View>

                            {orderBookData.bids.map((bid, index) => (
                                <View key={index} style={styles.orderBookRow}>
                                    <View style={styles.bidSection}>
                                        <Text style={styles.bidPrice}>{bid.price}</Text>
                                        <Text style={styles.bidAmount}>{bid.amount}</Text>
                                    </View>
                                    <View style={styles.spacer} />
                                    <View style={styles.askSection}>
                                        <Text style={styles.askAmount}>{orderBookData.asks[index].amount}</Text>
                                        <Text style={styles.askPrice}>{orderBookData.asks[index].price}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {selectedTab === 'Info' && (
                        <View style={styles.infoContainer}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Market Cap</Text>
                                <Text style={styles.infoValue}>
                                    {formatLargeNumber(coinDetails.market_data.market_cap.usd)}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>24h Volume</Text>
                                <Text style={styles.infoValue}>
                                    {formatLargeNumber(coinDetails.market_data.total_volume.usd)}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Market Cap Rank</Text>
                                <Text style={styles.infoValue}>
                                    #{coinDetails.market_data.market_cap_rank}
                                </Text>
                            </View>
                            {coinDetails.market_data.circulating_supply && (
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Circulating Supply</Text>
                                    <Text style={styles.infoValue}>
                                        {coinDetails.market_data.circulating_supply.toLocaleString()}
                                    </Text>
                                </View>
                            )}
                            {coinDetails.description.en && (
                                <View style={styles.descriptionSection}>
                                    <Text style={styles.infoLabel}>About</Text>
                                    <Text style={styles.description}>
                                        {truncateText(stripHtml(coinDetails.description.en), 300)}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    {selectedTab === 'History' && (
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderText}>Trade history coming soon</Text>
                        </View>
                    )}
                    {selectedTab === 'Notes' && (
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderText}>Notes feature coming soon</Text>
                        </View>
                    )}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c9c9c9ff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    headerButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginLeft: 48,
    },
    headerTitle: {
        fontSize: 16,
        color: '#1F2937',
        fontFamily: theme.font.semiBold,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    headerIconButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceSection: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceInfo: {
        flex: 1,
    },
    mainPrice: {
        fontSize: 25,
        color: '#1F2937',
        marginBottom: 4,
        fontFamily: theme.font.semiBold,
    },
    priceChangeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    priceChangeAmount: {
        fontSize: 14,
        fontFamily: theme.font.semiBold,
        color: '#6B7280',
    },
    priceChangePercent: {
        fontSize: 14,
        fontFamily: theme.font.semiBold,
    },
    highLowContainer: {
        gap: 15,
        flexDirection: 'row',
    },
    highLowItem: {
        alignItems: 'flex-end',
    },
    highLowLabel: {
        fontSize: 14,
        color: '#9CA3AF',
        fontFamily: theme.font.regular,
        marginBottom: 2,
    },
    highLowValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        fontFamily: theme.font.semiBold,
    },
    chartCard: {
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    chartTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    chartTitle: {
        fontSize: 16,
        color: '#1F2937',
        fontFamily: theme.font.semiBold,
    },
    chartWrapper: {
        position: 'relative',
    },
    chartContainer: {
        position: 'relative',
        marginLeft: -40,
    },
    chart: {
        marginLeft: -16,
        borderRadius: 0,
    },
    minPriceLabel: {
        position: 'absolute',
        left: 35,
        bottom: 0,
        fontSize: 12,
        color: '#9CA3AF',
        fontFamily: theme.font.styleBold,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 4,
        paddingVertical: 2,
        zIndex: 10,
    },
    maxPriceLabel: {
        position: 'absolute',
        right: 0,
        top: 0,
        fontSize: 12,
        color: '#9CA3AF',
        fontFamily: theme.font.styleBold,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 4,
        paddingVertical: 2,
        zIndex: 10,
    },
    chartLoading: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        color: '#9CA3AF',
        textAlign: 'center',
        paddingVertical: 40,
        fontFamily: theme.font.regular,
    },
    periodSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    periodButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
    },
    periodButtonActive: {
        borderBottomWidth: 5,
        borderBottomColor: theme.color.brand,
        borderRadius: 10,
    },
    periodText: {
        fontSize: 13,
        color: '#9CA3AF',
        fontFamily: theme.font.medium,
        fontWeight: '500',
    },
    periodTextActive: {
        color: '#1F2937',
        fontWeight: '600',
    },
    tabsContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        paddingHorizontal: 18,
        paddingVertical: 10,
        height: '100%'
    },
    tabsHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        position: 'relative',
    },
    tabText: {
        fontSize: 15,
        color: '#9CA3AF',
        fontFamily: theme.font.regular,
    },
    tabTextActive: {
        color: '#1F2937',
        fontFamily: theme.font.semiBold,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#1F2937',
    },
    orderBookContainer: {
        paddingVertical: 16,
    },
    orderBookHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    orderBookColumn: {
        fontSize: 13,
        fontFamily: theme.font.medium,
        color: '#6B7280',
        flex: 1,
    },
    orderBookColumn2:{
        textAlign: 'right',
    },
    orderBookRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F9FAFB',
    },
    bidSection: {
        flex: 1,
    },
    bidPrice: {
        fontSize: 14,
        fontFamily: theme.font.medium,
        color: '#1F2937',
        marginBottom: 2,
    },
    bidAmount: {
        fontSize: 12,
        color: '#9CA3AF',
        fontFamily: theme.font.regular,
    },
    spacer: {
        width: 20,
    },
    askSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    askAmount: {
        fontSize: 12,
        color: '#EF4444',
        marginBottom: 2,
        fontFamily: theme.font.regular,
    },
    askPrice: {
        fontSize: 14,
        color: '#1F2937',
        fontFamily: theme.font.medium,
    },
    infoContainer: {
        padding: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F9FAFB',
    },
    infoLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    descriptionSection: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    description: {
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 20,
        marginTop: 8,
    },
    placeholderContainer: {
        padding: 40,
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 14,
        color: '#9CA3AF',
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
    },
    errorText: {
        fontSize: 20,
        // fontWeight: ' 600',
        fontFamily: theme.font.semiBold,
        color: '#1F2937',
        marginTop: 16,
    },
    backButton: {
        backgroundColor: theme.color.brand,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    backButtonText: {
        color: '#000000ff',
        fontSize: 16,
        // fontWeight: '600',
        fontFamily: theme.font.medium,
    },
    candlestickContainer: {
        marginLeft: 56,
    }
});