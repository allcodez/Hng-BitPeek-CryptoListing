import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const { height } = Dimensions.get('window');

export type SortOption =
    | 'market_cap'
    | 'price_high'
    | 'price_low'
    | 'change_high'
    | 'change_low'
    | 'volume';

interface SortItem {
    id: SortOption;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
}

const SORT_OPTIONS: SortItem[] = [
    { id: 'market_cap', label: 'Market Cap (High to Low)', icon: 'trending-up' },
    { id: 'price_high', label: 'Price (High to Low)', icon: 'arrow-up' },
    { id: 'price_low', label: 'Price (Low to High)', icon: 'arrow-down' },
    { id: 'change_high', label: '24h Change (Gainers)', icon: 'flame' },
    { id: 'change_low', label: '24h Change (Losers)', icon: 'water' },
    { id: 'volume', label: '24h Volume (High to Low)', icon: 'bar-chart' },
];

interface SortBottomDrawerProps {
    visible: boolean;
    onClose: () => void;
    selectedSort: SortOption;
    onSelectSort: (sort: SortOption) => void;
}

export default function SortBottomDrawer({
    visible,
    onClose,
    selectedSort,
    onSelectSort,
}: SortBottomDrawerProps) {
    const slideAnim = React.useRef(new Animated.Value(height)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleSelect = (sortId: SortOption) => {
        onSelectSort(sortId);
        onClose();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.drawer,
                                {
                                    transform: [{ translateY: slideAnim }],
                                },
                            ]}
                        >
                            <View style={styles.handleBar} />

                            <View style={styles.header}>
                                <Text style={styles.title}>Sort By</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} color="#8E8E93" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.optionsContainer}>
                                {SORT_OPTIONS.map((option) => (
                                    <TouchableOpacity
                                        key={option.id}
                                        style={[
                                            styles.optionItem,
                                            selectedSort === option.id && styles.optionItemActive,
                                        ]}
                                        onPress={() => handleSelect(option.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.optionLeft}>
                                            <View
                                                style={[
                                                    styles.iconContainer,
                                                    selectedSort === option.id && styles.iconContainerActive,
                                                ]}
                                            >
                                                <Ionicons
                                                    name={option.icon}
                                                    size={20}
                                                    color={selectedSort === option.id ? '#000000ff' : '#8E8E93'}
                                                />
                                            </View>
                                            <Text
                                                style={[
                                                    styles.optionLabel,
                                                    selectedSort === option.id && styles.optionLabelActive,
                                                ]}
                                            >
                                                {option.label}
                                            </Text>
                                        </View>
                                        {selectedSort === option.id && (
                                            <Ionicons name="checkmark-circle" size={24} color="#000000ff" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    drawer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 40,
        maxHeight: height * 0.7,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#8383bcff',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    title: {
        fontSize: 20,
        // fontWeight: '700',
        fontFamily: theme.font.styleBold,
        color: '#1F2937',
    },
    closeButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsContainer: {
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: '#F8F9FA',
    },
    optionItemActive: {
        backgroundColor: '#d0d0d0ff',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    iconContainerActive: {
        backgroundColor: '#e9e7ebff',
    },
    optionLabel: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
        flex: 1,
    },
    optionLabelActive: {
        color: '#000000ff',
        fontWeight: '600',
    },
});