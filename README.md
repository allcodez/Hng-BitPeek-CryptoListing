# 🪙 Crypto Wallet App

A modern React Native mobile application that displays real-time cryptocurrency data with a sleek Web3 UI. Built with Expo and powered by the CoinGecko API.

## 📱 Demo

**[Watch Demo Video](https://drive.google.com/file/d/1MRDZ43riqNKJ5dXgdWG_B0VOMFD8Ezqm/view?usp=sharing)**

**[Download APK](https://drive.google.com/file/d/1GVKZNgfYDWWnTNiMAZVG6H0Wo6d5Rcy0/view?usp=sharing)**

## ✨ Features

- **📊 Live Crypto Data**: Real-time cryptocurrency prices and market data
- **📈 Price Trends Chart**: Visual representation of price movements
- **🔍 Coin Details**: Comprehensive information for each cryptocurrency
- **🌐 Offline Support**: Graceful handling of network issues and poor connectivity
- **⚡ Loading States**: Smooth loading indicators for better UX
- **❌ Error Handling**: User-friendly error messages and recovery options
- **🎨 Modern Web3 UI**: Clean, intuitive interface with contemporary design
- **🔎 Search Functionality** *(Optional)*: Find coins quickly
- **⭐ Favorites** *(Optional)*: Save your preferred cryptocurrencies

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript/TypeScript
- **API**: CoinGecko Public API
- **State Management**: Zustand
- **Charts**: react-native-chart-kit / victory-native
- **Navigation**: React Navigation
- **HTTP Client**: Axios / Fetch API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/allcodez/Hng-BitPeek-CryptoListing/
cd Hng-BitPeek-CryptoListing
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_BASE_URL=https://api.coingecko.com/api/v3
```

> **Note**: CoinGecko's public API doesn't require an API key for basic usage. If using a different API or premium features, add your API key here.

4. **Start the development server**
```bash
npm start
# or
expo start
```

5. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📁 Project Structure

```
crypto-wallet-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CoinCard.js
│   │   ├── PriceChart.js
│   │   ├── LoadingState.js
│   │   └── ErrorState.js
│   ├── screens/           # App screens
│   │   ├── CoinsListScreen.js
│   │   └── CoinDetailScreen.js
│   ├── services/          # API calls and data fetching
│   │   └── cryptoApi.js
│   ├── utils/             # Helper functions
│   │   └── formatters.js
│   ├── contexts/          # React Context for state management
│   │   └── FavoritesContext.js
│   └── navigation/        # Navigation configuration
│       └── AppNavigator.js
├── assets/                # Images, fonts, icons
├── .env                   # Environment variables (not committed)
├── .gitignore
├── app.json              # Expo configuration
├── package.json
└── README.md
```

## 🔧 Configuration

### API Configuration

The app uses CoinGecko's public API. Key endpoints used:

- **Coins List**: `/coins/markets`
- **Coin Details**: `/coins/{id}`
- **Market Chart**: `/coins/{id}/market_chart`

### Building for Production

**Android APK:**
```bash
expo build:android
# or with EAS Build
eas build --platform android
```

**iOS IPA:**
```bash
expo build:ios
# or with EAS Build
eas build --platform ios
```

## 🎯 Key Features Implementation

### 1. Coins List Screen
- Displays top cryptocurrencies by market cap
- Shows coin name, symbol, current price, and 24h change
- Pull-to-refresh functionality
- Infinite scroll/pagination

### 2. Coin Detail Screen
- Detailed information about selected cryptocurrency
- Price trend chart (7 days, 30 days, 1 year)
- Market cap, volume, supply data
- Price change percentages

### 3. Network Handling
- **Loading States**: Skeleton loaders and spinners
- **Error States**: Retry mechanisms with user-friendly messages
- **Offline Mode**: Cached data display with offline indicators
- **Poor Connection**: Request timeouts and fallback strategies

### 4. State Management
- React Context for favorites and global state
- Local state for component-specific data
- AsyncStorage for persistent data

## 🧪 Testing

Run the app locally:
```bash
npm start
```

Test different network conditions:
- Enable Airplane mode to test offline functionality
- Use Chrome DevTools to throttle network speed
- Test error scenarios by disconnecting internet mid-request

## 📦 Dependencies

```json
{
  "expo": "~50.0.0",
  "react": "18.2.0",
  "react-native": "0.73.0",
  "@react-navigation/native": "^6.x.x",
  "@react-navigation/stack": "^6.x.x",
  "axios": "^1.x.x",
  "react-native-chart-kit": "^6.x.x",
  "@react-native-async-storage/async-storage": "^1.x.x"
}
```

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ `.env` file excluded from Git
- ✅ No hardcoded API keys in source code
- ✅ Secure API communication over HTTPS

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

This is a HNG Internship Stage 4 project. Feedback and suggestions are welcome!

## 📄 License

This project is created for educational purposes as part of the HNG Internship program.

## 👨‍💻 Developer

- GitHub: [@allcodez](https://github.com/allcodez)
- LinkedIn: [Fahd Adebayo](https://linkedin.com/in/fahd-adebayo-514301250/)
- Email: fahdadebayo02@gmail.com

## 🙏 Acknowledgments

- [HNG Internship](https://hng.tech) - For this amazing learning opportunity
- [CoinGecko](https://www.coingecko.com) - For providing the free crypto API
- React Native & Expo communities

---

**Built with ❤️ for HNG Internship Stage 4**

## 📝 Additional Notes

### For Reviewers

1. **APK Download**: [Direct APK Link](https://drive.google.com/file/d/1GVKZNgfYDWWnTNiMAZVG6H0Wo6d5Rcy0/view?usp=sharing)
2. **Demo Video**: [Watch Full Demo](https://drive.google.com/file/d/1MRDZ43riqNKJ5dXgdWG_B0VOMFD8Ezqm/view?usp=sharing)
3. **Setup Time**: ~5 minutes
4. **API Limits**: CoinGecko free tier allows 10-50 calls/minute


*This project is part of the HNG Internship Mobile Track Stage 4. Learn more about [HNG Internship](https://hng.tech) and [how to hire talented developers](https://hng.tech/hire).*
