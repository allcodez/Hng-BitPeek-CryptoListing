import { theme } from '@/theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PromoBannerProps {
    onPress?: () => void;
}

export default function PromoBanner({ onPress }: PromoBannerProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Invite a friend {'\n'}and you can both{'\n'}get $10 in BTC</Text>
            </View>


            <Image source={require('../../assets/images/3dicons-gift-box-dynamic-premium.png')} style={styles.imageStyle} />

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: '#ffffffff',
        flexDirection: 'row',
        overflow: 'hidden',
        minHeight: 160,
        alignItems: 'center',
        position: 'relative'
    },
    content: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        // fontWeight: '600',
        color: '#000',
        // lineHeight: 26,
        fontFamily: theme.font.styleMedium,
    },
    imageContainer: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 220,
        height: 220,
        borderRadius: 60,
        position: 'absolute',
        top: -0,
        right: -30,
        opacity: 0.9,
    },
});