import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MarketHeaderProps {
    onSortPress?: () => void;
    sortBy?: string;
}

export default function MarketHeader({ onSortPress, sortBy = 'Capitalization' }: MarketHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Text style={styles.title}>Market</Text>
                <Text style={styles.sortText}>
                    Sort by: <Text style={styles.sortValue}>{sortBy}</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={onSortPress} style={styles.sortButton}>
                <Ionicons name="options-outline" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    leftSection: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        // fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
        fontFamily: theme.font.styleBold,
    },
    sortText: {
        fontSize: 14,
        color: '#8E8E93',
        fontFamily: theme.font.regular,
    },
    sortValue: {
        color: '#000',
        // fontWeight: '500',
        fontFamily: theme.font.semiBold,
    },
    sortButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});