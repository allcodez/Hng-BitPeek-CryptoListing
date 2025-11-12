import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

interface CandleData {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface CandlestickChartProps {
    data: CandleData[];
    width: number;
    height: number;
    upColor?: string;
    downColor?: string;
}

export default function CandlestickChart({
    data,
    width,
    height,
    upColor = '#00C087',
    downColor = '#FF4D4D',
}: CandlestickChartProps) {
    if (!data || data.length === 0) return null;

    const allPrices = data.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const priceRange = maxPrice - minPrice;

    const candleWidth = (width / data.length) * 0.6;
    const spacing = width / data.length;

    const priceToY = (price: number) => {
        return height - ((price - minPrice) / priceRange) * height;
    };

    return (
        <View style={styles.container}>
            <Svg width={width} height={height}>
                {data.map((candle, index) => {
                    const x = index * spacing + spacing / 2;
                    const isUp = candle.close >= candle.open;
                    const color = isUp ? upColor : downColor;

                    const openY = priceToY(candle.open);
                    const closeY = priceToY(candle.close);
                    const highY = priceToY(candle.high);
                    const lowY = priceToY(candle.low);

                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.abs(closeY - openY);

                    return (
                        <React.Fragment key={index}>
                            <Line
                                x1={x}
                                y1={highY}
                                x2={x}
                                y2={lowY}
                                stroke={color}
                                strokeWidth={1}
                            />

                            <Rect
                                x={x - candleWidth / 2}
                                y={bodyTop}
                                width={candleWidth}
                                height={Math.max(bodyHeight, 1)}
                                fill={isUp ? color : color}
                                opacity={isUp ? 0.3 : 1}
                                stroke={color}
                                strokeWidth={1}
                            />
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});

export function convertToCandleData(
    prices: [number, number][],
    candleCount: number = 24
): CandleData[] {
    if (!prices || prices.length === 0) return [];

    const itemsPerCandle = Math.max(1, Math.floor(prices.length / candleCount));
    const candles: CandleData[] = [];

    for (let i = 0; i < prices.length; i += itemsPerCandle) {
        const group = prices.slice(i, i + itemsPerCandle);
        if (group.length === 0) continue;

        const open = group[0][1];
        const close = group[group.length - 1][1];
        const high = Math.max(...group.map(p => p[1]));
        const low = Math.min(...group.map(p => p[1]));
        const timestamp = group[0][0];

        candles.push({ timestamp, open, high, low, close });
    }

    return candles;
}