import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavItem {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    active?: boolean;
    onPress: () => void;
}

interface BottomNavBarProps {
    activeRoute: string;
}

export default function BottomNavBar({ activeRoute }: BottomNavBarProps) {
    const navItems: NavItem[] = [
        {
            icon: 'home',
            label: 'Home',
            active: activeRoute === 'home',
            onPress: () => console.log('Home pressed'),
        },
        {
            icon: 'wallet',
            label: 'Wallet',
            active: activeRoute === 'wallet',
            onPress: () => console.log('Wallet pressed'),
        },
        {
            icon: 'swap-horizontal',
            label: 'Exchange',
            active: activeRoute === 'exchange',
            onPress: () => console.log('Exchange pressed'),
        },
        {
            icon: 'bar-chart',
            label: 'Analysis',
            active: activeRoute === 'analysis',
            onPress: () => console.log('Analysis pressed'),
        },
        {
            icon: 'settings-outline',
            label: 'Settings',
            active: activeRoute === 'settings',
            onPress: () => console.log('Settings pressed'),
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                {navItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.navItem}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            styles.iconContainer,
                            item.active && styles.activeIconContainer
                        ]}>
                            <Ionicons
                                name={item.icon}
                                size={24}
                                color={item.active ? '#FFFFFF' : '#8E8E93'}
                            />
                        </View>
                        <Text style={[
                            styles.label,
                            item.active && styles.activeLabel
                        ]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    activeIconContainer: {
        backgroundColor: '#000000',
    },
    label: {
        fontSize: 11,
        color: '#8E8E93',
        marginTop: 4,
    },
    activeLabel: {
        color: '#000000',
        fontWeight: '600',
    },
});