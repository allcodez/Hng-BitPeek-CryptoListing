import React from 'react';
import { View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

interface MiniChartProps {
    data: number[];
    color: string;
    width?: number;
    height?: number;
}

export default function MiniChart({ data, color, width = 80, height = 40 }: MiniChartProps) {
    if (!data || data.length === 0) return null;

    const validData = data.filter(val => val != null && !isNaN(val) && isFinite(val));

    if (validData.length === 0) return null;

    try {
        const minValue = Math.min(...validData);
        const maxValue = Math.max(...validData);
        const range = maxValue - minValue;

        const points = validData
            .map((value, index) => {
                const x = (index / (validData.length - 1)) * width;
                const y = range === 0 ? height / 2 : height - ((value - minValue) / range) * height;

                if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
                    return null;
                }

                return `${x},${y}`;
            })
            .filter(point => point !== null)
            .join(' ');

        if (!points || points.length === 0) return null;

        return (
            <View>
                <Svg width={width} height={height}>
                    <Polyline
                        points={points}
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                    />
                </Svg>
            </View>
        );
    } catch (error) {
        console.log('MiniChart error:', error);
        return null;
    }
}