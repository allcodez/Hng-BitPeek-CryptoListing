
export interface CoinListItem {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    last_updated: string;
    sparkline_in_7d?: {
        price: number[];
    };
    price_change_percentage_7d_in_currency?: number;
}

export interface CoinDetails {
    id: string;
    symbol: string;
    name: string;
    description: {
        en: string;
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_data: {
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
        total_volume: {
            usd: number;
        };
        high_24h: {
            usd: number;
        };
        low_24h: {
            usd: number;
        };
        price_change_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d: number;
        price_change_percentage_30d: number;
        market_cap_rank: number;
        circulating_supply: number;
        total_supply: number | null;
        max_supply: number | null;
        ath: {
            usd: number;
        };
        ath_date: {
            usd: string;
        };
        atl: {
            usd: number;
        };
        atl_date: {
            usd: string;
        };
    };
    links: {
        homepage: string[];
        blockchain_site: string[];
    };
}

export interface CoinMarketChart {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export interface SearchResult {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    large: string;
}