import { theme } from '@/theme';
import { CoinListItem } from '@/types/api';
import { formatPercentage, formatPrice, getChangeColor } from '@/utils/formatters';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MiniChart from './MiniChart';

interface CoinCardProps {
    coin: CoinListItem;
    onPress: () => void;
    onFavoritePress: () => void;
    isFavorite: boolean;
}

export default function CoinCard({ coin, onPress, onFavoritePress, isFavorite }: CoinCardProps) {
    const priceChange = coin.price_change_percentage_24h;
    const changeColor = getChangeColor(priceChange);
    const priceChangeAmount = coin.price_change_24h;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.leftSection}>
                <View style={styles.iconContainer}>
                    <Image source={{ uri: coin.image }} style={styles.coinIcon} />
                </View>
                <View style={styles.coinInfo}>
                    <Text style={styles.coinName}>{coin.name}</Text>
                    <Text style={styles.coinSymbol}>{coin.symbol.toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.chartSection}>
                {coin.sparkline_in_7d?.price && (
                    <MiniChart
                        data={coin.sparkline_in_7d.price}
                        color={changeColor}
                        width={80}
                        height={40}
                    />
                )}
            </View>

            <View style={styles.rightSection}>
                <Text style={styles.price}>{formatPrice(coin.current_price)}</Text>
                <View style={styles.changeContainer}>
                    <Text style={[styles.changeAmount, { color: changeColor }]}>
                        {priceChangeAmount >= 0 ? '+' : ''}${Math.abs(priceChangeAmount).toFixed(2)}
                    </Text>
                    <Text style={[styles.changePercent, { color: changeColor }]}>
                        {formatPercentage(priceChange)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F8F9FA',
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
        // fontWeight: '600',
        color: '#000',
        marginBottom: 4,
        fontFamily: theme.font.styleBold,
    },
    coinSymbol: {
        fontSize: 13,
        color: '#8E8E93',
        fontFamily: theme.font.regular,
    },
    chartSection: {
        marginHorizontal: 12,
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 16,
        // fontWeight: '600',
        color: '#000',
        marginBottom: 4,
        fontFamily: theme.font.styleBold,
    },
    changeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    changeAmount: {
        fontSize: 12,
        fontWeight: '500',
    },
    changePercent: {
        fontSize: 12,
        fontWeight: '500',
    },
});