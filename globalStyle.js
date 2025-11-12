import { Dimensions, StyleSheet } from 'react-native';
// import { theme as defaultTheme } from './theme';
import { theme } from './theme';

const { width, height } = Dimensions.get('window')

export const createGlobalStyles = (theme) => {
    return StyleSheet.create({
        screenContainer: {
            backgroundColor: '#ffffff',
            flex: 1,
            marginTop: 50,
        },
        screenContent: {
            // paddingHorizontal: 25,
            // height: height,
            // flex: 1,
            paddingVertical: 10,
            // height: height,
        },
        input: {
            padding: 20,
            borderWidth: 1,
            borderColor: '#E6E6E6',
            backgroundColor: '#F2F2F2',
            borderRadius: 50
        },
        inputCustom: {
            padding: 20,
            borderWidth: 1,
            borderColor: theme.color.grey2,
            backgroundColor: theme.color.white,
            borderRadius: 15,
            color: theme.color.black,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        label: {
            gap: 15
        },
        labelText: {
            fontFamily: theme.font.regular,
            fontSize: width * 0.034,
            color: theme.color.labelText,
        },
        solidButton: {
            backgroundColor: theme.color.brand,
            fontFamily: theme.font.regular,
            alignSelf: 'center',
            width: width / 1.25,
            paddingVertical: 25,
            borderRadius: 40,
            alignItems: 'center',
            // borderColor: theme.color.primary,
            // borderWidth: 1,
        },
        solidDefaultButton: {
            backgroundColor: theme.color.brand,
            fontFamily: theme.font.regular,
            alignSelf: 'center',
            borderRadius: 40,
            alignItems: 'center',
        },
        solidButtonText: {
            fontFamily: theme.font.medium,
            color: theme.color.primary,
            fontSize: width * 0.034,
        },
        solidDefaultButtonText: {
            fontFamily: theme.font.medium,
            color: 'white',
            // fontSize: width * 0.034,
        },
        outlineButton: {
            alignSelf: 'center',
            backgroundColor: '#ffffff',
            // borderColor: theme.color.primary,
            fontFamily: theme.font.regular,
            borderWidth: 1,
            width: width / 1.25,
            paddingVertical: 25,
            borderRadius: 40,
            alignItems: 'center',
        },
        outlineDefaultButton: {
            alignSelf: 'center',
            // borderColor: theme.color.primary,
            fontFamily: theme.font.regular,
            borderWidth: 1,
            borderRadius: 40,
            alignItems: 'center',
        },
        outlineButtonText: {
            fontFamily: theme.font.medium,
            fontSize: width * 0.034,
            color: theme.color.primary
        },
        outlineDefaultButtonText: {
            fontFamily: theme.font.medium,
            fontSize: width * 0.034,
            color: theme.color.primary
        },
        grid2: {
            // width: width,
            // backgroundColor: theme.color.white,
            flexDirection: 'row',
            gap: 5,
        },
        gridTemp2: {
            backgroundColor: "#262724",
            fontFamily: theme.font.regular,
            alignSelf: 'center',
            // width: "100%",
            flex: 1,
            padding: 20,
            // paddingVertical: 25,
            borderRadius: 40,
            // alignItems: 'center',
            gap: 20,
        },
        pText: {
            fontFamily: theme.font.semiBold,
            fontSize: width * 0.08,
            color: theme.color.primary,
        },
        h1Text: {
            fontFamily: theme.font.medium,
            fontSize: width * 0.07,
        },
        contentText: {
            fontFamily: theme.font.medium,
            fontSize: theme.fontSize.medium,
            color: '#2b2b2b'
        },
        offerPrice: {
            fontFamily: theme.font.regular,
            fontSize: theme.fontSize.medium,
            color: theme.color.black
        },
        hText: {
            fontFamily: theme.font.medium,
            fontSize: theme.fontSize.large,
        },
        href: {
            alignSelf: 'center'
        },
        screenPlaceholder: {
            height: height / 1.4,
            // flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            // backgroundColor: 'red'
        },
        placeholderImage: {
            width: '50%',
            height: height * 0.17,
        },
        placeholderImage3: {
            width: '50%',
            height: height * 0.2,
        },
        placeholderText: {
            alignItems: 'center',
            gap: 5
        },
        placeholderBigText: {
            fontFamily: theme.font.medium,
            fontSize: width * 0.038
        },
        placeholderSmallText: {
            fontFamily: theme.font.regular,
            color: 'grey'
        },
        shadow: {
            shadowColor: '#171717',
            shadowOffset: { width: -4, height: 1 },
            shadowOpacity: 0.13,
            shadowRadius: 10,
        },
        resturantHeader: {
            height: height * 0.24,
            backgroundColor: 'red',
            paddingVertical: 50,
            paddingHorizontal: 25,
        },
        headerIcon: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        headerIconButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F6F6F680',
            borderRadius: 100,
            padding: 5,
        },
        userCartContainer: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            width: width,
            borderTopWidth: 1,
            borderTopColor: '#f4f4f4',
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 35
        },
        userCartText: {
            fontSize: width * 0.04
        },
        userCheckoutContainer: {
            position: 'absolute',
            bottom: 0,
            width: width,
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 35
        },
        detailsContainer: {
            backgroundColor: 'white',  // Set a light background color
            borderRadius: 40,
            shadowColor: '#171717',
            shadowOffset: { width: -4, height: 1 },
            shadowOpacity: 0.13,
            shadowRadius: 10,
            padding: 30
        },
        detialsTextBig: {
            fontFamily: theme.font.bold,
            fontSize: width * 0.039,
            color: theme.color.black,
        },
        detialsTextSmall: {
            fontFamily: theme.font.regular,
            color: theme.color.labelText,
        }
    })
}

// Legacy export for backward compatibility (uses light theme by default)
export const globalStyle = createGlobalStyles(theme);