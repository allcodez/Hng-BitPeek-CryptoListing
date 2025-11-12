
export const formatPrice = (price: number | null | undefined): string => {
    if (price == null || isNaN(price)) {
        return '$0.00';
    }

    if (price >= 1) {
        return `$${price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    } else if (price >= 0.01) {
        return `$${price.toFixed(4)}`;
    } else {
        return `$${price.toFixed(8)}`;
    }
};

export const formatLargeNumber = (num: number | null | undefined): string => {
    if (num == null || isNaN(num)) {
        return '$0';
    }

    if (num >= 1e12) {
        return `$${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
        return `$${(num / 1e3).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
};

export const formatPercentage = (percentage: number | null | undefined): string => {
    if (percentage == null || isNaN(percentage)) {
        return '0.00%';
    }

    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
};


export const getChangeColor = (percentage: number | null | undefined): string => {
    if (percentage == null || isNaN(percentage)) {
        return '#999999';
    }

    return percentage >= 0 ? '#00C087' : '#FF4D4D';
};


export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) {
        return 'Unknown date';
    }

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch (error) {
        return 'Invalid date';
    }
};


export const truncateText = (text: string | null | undefined, maxLength: number = 100): string => {
    if (!text) {
        return '';
    }
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const stripHtml = (html: string | null | undefined): string => {
    if (!html) {
        return '';
    }
    return html.replace(/<[^>]*>/g, '');
};