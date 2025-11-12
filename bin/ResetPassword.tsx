import { Formik } from 'formik'
import React from 'react'
import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyle } from '../globalStyle'
import { theme } from '../theme'


const { width, height } = Dimensions.get('window')

export default function ResetPassword({ navigation }) {

    // const cratetPassword = () => {
    //     navigation.navigate('Home');
    // }

    const handleLogin = () => {

    }


    const cratetPassword = () => {
        navigation.push('Login')
    }

    return (
        <SafeAreaView style={globalStyle.screenContainer}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <View style={styles.screenContent}>
                        <View style={styles.formHead}>
                            <Text style={styles.h1Text}>Reset Password</Text>
                            <Text style={globalStyle.pText}>Wasn’t that fast? Create a new password.</Text>
                        </View>

                        <Formik
                            initialValues={{ password1: '', password2: '' }}
                            onSubmit={(values) => {
                                console.log(values)
                                cratetPassword()
                            }}
                        >
                            {(props) => (
                                <View style={styles.form}>
                                    <View style={globalStyle.label}>
                                        <Text style={globalStyle.labelText}>New password</Text>
                                        <TextInput
                                            style={globalStyle.input}
                                            placeholder='Enter New Password'
                                            onChangeText={props.handleChange('password1')}
                                            value={props.values.password1}
                                        />
                                    </View>

                                    <View style={globalStyle.label}>
                                        <Text style={globalStyle.labelText}>Confirm Password</Text>
                                        <TextInput
                                            style={globalStyle.input}
                                            placeholder='Enter Password'
                                            onChangeText={props.handleChange('password2')}
                                            value={props.values.password12}
                                        />
                                    </View>

                                    <View style={{ gap: 30, marginTop: 20 }}>
                                        <TouchableOpacity style={globalStyle.solidButton} onPress={props.handleSubmit}>
                                            <Text style={globalStyle.solidButtonText}>CREATE PASSWORD</Text>
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
        gap: 25,
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
        gap: 20,
        height: height / 2,
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
    }
})