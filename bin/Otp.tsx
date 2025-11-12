import { Formik } from 'formik'
import React from 'react'
import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyle } from '../globalStyle'
import { theme } from '../theme'

const { width, height } = Dimensions.get('window')

export default function Otp({ navigation }) {

    const handleForgetPassword = () => {

    }

    const handleDone = () => {
        navigation.push('ResetPassword')
    }

    return (
        <SafeAreaView style={globalStyle.screenContainer}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <View style={styles.screenContent}>
                        <View style={styles.formHead}>
                            <Text style={styles.h1Text}>Enter OTP</Text>
                            <Text style={globalStyle.pText}>I have not received the code</Text>
                        </View>

                        <Formik
                            initialValues={{ otpInput1: '', otpInput2: '', otpInput3: '', otpInput4: '', otpInput5: '', }}
                            onSubmit={(values) => {
                                console.log(values)
                                handleDone()
                            }}
                        >
                            {(props) => (
                                <View style={styles.form}>
                                    <View style={styles.otpInput}>
                                        <TextInput
                                            style={styles.roundInput}
                                            onChangeText={props.handleChange('otpInput1')}
                                            value={props.values.otpInput1}
                                            keyboardType='numeric'
                                        />

                                        <TextInput
                                            style={styles.roundInput}
                                            onChangeText={props.handleChange('otpInput2')}
                                            value={props.values.otpInput2}
                                            keyboardType='numeric'
                                        />

                                        <TextInput
                                            style={styles.roundInput}
                                            onChangeText={props.handleChange('otpInput3')}
                                            value={props.values.otpInput3}
                                            keyboardType='numeric'
                                        />

                                        <TextInput
                                            style={styles.roundInput}
                                            onChangeText={props.handleChange('otpInput4')}
                                            value={props.values.otpInput4}
                                            keyboardType='numeric'
                                        />

                                        <TextInput
                                            style={styles.roundInput}
                                            onChangeText={props.handleChange('otpInput5')}
                                            value={props.values.otpInput5}
                                            keyboardType='numeric'
                                        />
                                    </View>

                                    <View style={{ gap: 30, marginTop: 20 }}>
                                        <View style={{ gap: 10 }}>
                                            <Text style={styles.moreText}>I have not received the code</Text>
                                            <Text style={styles.codeDuration}>Tap here to resend code in 00:33</Text>
                                        </View>

                                        <TouchableOpacity style={globalStyle.solidButton} onPress={props.handleSubmit}>
                                            <Text style={globalStyle.solidButtonText}>DONE</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )}
                        </Formik>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
    },
    screenContent: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        gap: 35,
        flex: 1,
    },
    formHead: {
        gap: 8,
    },
    h1Text: {
        fontFamily: theme.font.styleBold,
        fontSize: width * 0.07,
    },
    form: {
        gap: 50,
        height: height / 2.4,
    },
    otpInput: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    roundInput: {
        borderWidth: 1,
        borderColor: '#E6E6E6',
        backgroundColor: '#F2F2F2',
        borderRadius: 50,
        paddingHorizontal: 26,
        paddingVertical: 20,
    },
    forgetPassword: {
        alignSelf: 'flex-end',
    },
    moreText: {
        alignSelf: 'center',
        fontSize: width * 0.039,
        color: theme.color.TextInput,
        fontFamily: theme.font.minimal,
    },
    codeDuration: {
        fontFamily: theme.font.minimal,
        alignSelf: 'center',
        fontSize: width * 0.029,
        color: theme.color.lightText,
        textDecorationLine: 'underline',
        textDecorationColor: '#c4c4c4',
    }
})