import { globalStyle } from '@/globalStyle'
import { theme } from '@/theme'
import { Link } from 'expo-router'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width, height } = Dimensions.get('window')


export default function OnboardingTwo() {

    return (
        <>
            {/* <StatusBar style="light" /> */}
            <ImageBackground source={require('../../assets/images/onb2.jpg')} style={styles.backgroundImage}>
                <View style={styles.screenContainer}>
                    <Link href={'/(auth)/signup'} asChild>
                        <Text style={styles.skip}>Skip</Text>
                    </Link>
                    <View style={styles.containerBoard}>
                        <View style={styles.boardText}>
                            <Text style={styles.h1Text}>Analyze Coins</Text>
                            <Text style={styles.pText}>View detailed stats and charts to understand each coin’s performance.</Text>
                        </View>

                        <View style={styles.slider}>
                            <View style={styles.sliderObject}></View>
                            <View style={styles.sliderActiveObject}></View>
                            <View style={styles.sliderObject}></View>
                        </View>

                        <Link href={'/onboarding3'} asChild>
                            <TouchableOpacity style={globalStyle.solidButton}>
                                <Text style={globalStyle.solidButtonText}>NEXT</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ImageBackground>
        </>

    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // height: '100%',
        resizeMode: 'cover',
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        // marginTop: 200
        // backgroundColor: 'red',
    },
    skip: {
        // alignSelf: 'flex-start',
        paddingTop: 70,
        paddingRight: 30,
        color: '#fff',
        alignSelf: 'flex-end',
        // backgroundColor: 'red',
        fontSize: theme.fontSize.medium,
        fontFamily: theme.font.medium

    },
    containerBoard: {
        flex: 0.44,
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        paddingBottom: 50,
        // borderColor: 'gray',
        // borderWidth: 1,
        // alignItems: 'f'
    },
    boardText: {
        paddingHorizontal: 40,

    },
    h1Text: {
        fontFamily: theme.font.medium,
        fontSize: width * 0.07,
    },
    pText: {
        fontFamily: theme.font.regular,
        fontSize: width * 0.037,
        opacity: 0.5,
        lineHeight: 20,
        marginTop: 10,
    },
    slider: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        // backgroundColor: 'red',
    },
    sliderActiveObject: {
        backgroundColor: theme.color.primary,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    sliderObject: {
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    boardButton: {
        backgroundColor: theme.color.primary,
        fontFamily: 'Circular-Std-Medium',
        alignSelf: 'center',
        paddingHorizontal: 55,
        paddingVertical: 20,
        borderRadius: 40,
        color: 'white'
    },
    buttonText: {
        fontFamily: theme.font.medium,
        fontSize: width * 0.04,
        color: 'white',
        paddingHorizontal: 40,
    }
})