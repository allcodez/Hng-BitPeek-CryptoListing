import { theme } from '@/theme';
import { CoinListItem } from '@/types/api';
import { formatPercentage, formatPrice, getChangeColor } from '@/utils/formatters';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


interface PinnedCoinHeaderProps {
    coin: CoinListItem | null;
    userInfo?: {
        name: string;
        email: string;
        avatar?: string;
    };
}

export default function PinnedCoinHeader({ coin, userInfo }: PinnedCoinHeaderProps) {
    // const { userInfo } = useUserStore();
    if (!coin) return null;

    const priceChange = coin.price_change_percentage_24h;
    const changeColor = getChangeColor(priceChange);
    const priceChangeAmount = coin.price_change_24h;

    return (
        <View style={styles.container}>
            {userInfo && (
                <View style={styles.userSection}>
                    <View style={styles.userInfo}>
                        {userInfo.avatar ? (
                            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>
                                    {userInfo.name.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        )}
                        <View>
                            <Text style={styles.userName}>{userInfo.name}</Text>
                            <Text style={styles.userEmail}>{userInfo.email}</Text>
                        </View>
                    </View>
                </View>
            )}

            <View style={styles.portfolioSection}>
                <View style={styles.portfolioValueContainer}>
                    <Text style={styles.portfolioLabel}>Pinned Coin - </Text>
                    <Text style={styles.portfolioName}>{coin.name}</Text>
                </View>
                <View style={styles.pinnedCoinValue}>
                    <Text style={styles.portfolioValue}>{formatPrice(coin.current_price)}</Text>
                    <View style={styles.changeRow}>
                        <Text style={[styles.changePercent, { color: changeColor }]}>
                            {formatPercentage(priceChange)}
                        </Text>
                        <Text style={[styles.changeAmount, { color: changeColor }]}>
                            {priceChangeAmount >= 0 ? '+' : ''}${Math.abs(priceChangeAmount).toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    userSection: {
        marginBottom: 30,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#E5E5EA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    userName: {
        fontFamily: theme.font.styleBold,
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 3,
    },
    userEmail: {
        fontFamily: theme.font.regular,
        fontSize: 14,
        color: '#8E8E93',
    },
    portfolioSection: {
        alignItems: 'flex-start',
    },
    portfolioLabel: {
        fontSize: 14,
        color: '#8E8E93',
        // marginBottom: 8,
    },
    pinnedCoinValue: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
    },
    portfolioValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    portfolioName: {
        fontFamily: theme.font.styleMedium,
        fontSize: 16,
        color: '#000',
        // marginBottom: 4,
    },
    portfolioValue: {
        fontSize: 40,
        fontFamily: theme.font.styleRegular,
        // fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    changeRow: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 4,
    },
    changePercent: {
        fontSize: 16,
        fontFamily: theme.font.styleRegular,
    },
    changeAmount: {
        fontSize: 16,
        fontFamily: theme.font.styleRegular,
    },
});