import { Formik } from 'formik'
import React from 'react'
import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyle } from '../globalStyle'
import { theme } from '../theme'

const { width, height } = Dimensions.get('window')

export default function ForgotPassword({ navigation }) {

    const handleForgetPassword = () => {

    }

    const submitCode = () => {
        navigation.push('Otp')
    }

    return (
        <SafeAreaView style={globalStyle.screenContainer}>
            <KeyboardAvoidingView style={styles.formContainer} behavior="padding" enabled>
                <ScrollView>
                    <View style={styles.screenContent}>
                        <View style={styles.formHead}>
                            <Text style={styles.h1Text}>Forgot Password</Text>
                            <Text style={globalStyle.pText}>Let’s help you swiftly create another one.</Text>
                        </View>

                        <Formik
                            initialValues={{ email: '' }}
                            onSubmit={(values) => {
                                console.log(values)
                                submitCode()
                            }}
                        >
                            {(props) => (
                                <View style={styles.form}>
                                    <View style={globalStyle.label}>
                                        <Text style={globalStyle.labelText}>User ID</Text>
                                        <TextInput
                                            style={globalStyle.input}
                                            placeholder='Enter Phone number or Username'
                                            onChangeText={props.handleChange('email')}
                                            value={props.values.email}
                                        />
                                    </View>

                                    <View style={{ gap: 30, marginTop: 20 }}>
                                        <TouchableOpacity style={globalStyle.solidButton} onPress={props.handleSubmit}>
                                            <Text style={globalStyle.solidButtonText}>GET CODE</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.moreText}>Code to be sent to your mailbox</Text>
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
    input: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: '#E6E6E6',
        borderRadius: 50,
    },
    forgetPassword: {
        alignSelf: 'flex-end',
    },
    moreText: {
        alignSelf: 'center',
        fontSize: width * 0.03,
        color: theme.color.lightText
    }
})
