import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

interface NetworkStatusBarProps {
    showWhenOnline?: boolean;
}

export default function NetworkStatusBar({ showWhenOnline = false }: NetworkStatusBarProps) {
    const [isConnected, setIsConnected] = useState(true);
    const [connectionType, setConnectionType] = useState<string>('');
    const [slideAnim] = useState(new Animated.Value(-50));

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const connected = state.isConnected === true && state.isInternetReachable !== false;
            setIsConnected(connected);
            setConnectionType(state.type || '');

            // Animate banner in/out
            if (!connected || (connected && showWhenOnline)) {
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 8,
                }).start();
            } else {
                Animated.spring(slideAnim, {
                    toValue: -50,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 8,
                }).start();
            }
        });

        return () => unsubscribe();
    }, [showWhenOnline]);

    if (isConnected && !showWhenOnline) return null;

    return (
        <Animated.View
            style={
                [
                    styles.container,
                    {
                        backgroundColor: isConnected ? '#34C759' : '#FF3B30',
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
        >
            <Ionicons
                name={isConnected ? 'cloud-done' : 'cloud-offline'}
                size={16}
                color="#FFFFFF"
            />
            <Text style={styles.text}>
                {
                    isConnected
                        ? `Connected via ${connectionType}`
                        : 'You\'re offline'
                }
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // position: 'absolute',
        // top: 20,
        zIndex: 1000,
        position: 'absolute',
        top: 60,
        left: '57%',
        right: 0,
        width: '38%',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 13,
        // fontWeight: '600',
        fontFamily: theme.font.medium
    },
});