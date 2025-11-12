import { globalStyle } from '@/globalStyle';
import { theme } from '@/theme';
import { LoginFormValues } from '@/types/auth';
import { Link, router } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Login() {
    const handleLogin = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        console.log('Login Data:', values);
        router.replace('/(tabs)');
        actions.setSubmitting(false);
    };

    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44;

    return (
        <View style={styles.container}>
            <ExpoStatusBar style="dark" backgroundColor="#ffffff" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: statusBarHeight,
                    }}
                >
                    <View style={styles.screenContent}>
                        <View style={styles.formHead}>
                            <Text style={styles.h1Text}>Welcome Back</Text>
                            <Text style={styles.pText}>We missed you while you were away.</Text>
                        </View>

                        <Formik<LoginFormValues>
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            onSubmit={handleLogin}
                        >
                            {(props) => (
                                <View style={styles.form}>
                                    <View style={globalStyle.label}>
                                        <Text style={globalStyle.labelText}>Email</Text>
                                        <TextInput
                                            style={globalStyle.input}
                                            placeholder="Enter Email Address"
                                            onChangeText={props.handleChange('email')}
                                            value={props.values.email}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>

                                    <View style={globalStyle.label}>
                                        <Text style={globalStyle.labelText}>Password</Text>
                                        <TextInput
                                            style={globalStyle.input}
                                            placeholder="Enter Password"
                                            onChangeText={props.handleChange('password')}
                                            value={props.values.password}
                                            secureTextEntry
                                        />

                                        <Link href="/(auth)/forgot-password" asChild>
                                            <TouchableOpacity style={styles.forgetPassword}>
                                                <Text style={styles.pText}>Forgotten Password</Text>
                                            </TouchableOpacity>
                                        </Link>
                                    </View>

                                    <View style={{ gap: 30, marginTop: 20 }}>
                                        <TouchableOpacity
                                            style={globalStyle.solidButton}
                                            onPress={() => props.handleSubmit()}
                                        >
                                            <Text style={globalStyle.solidButtonText}>SIGN IN</Text>
                                        </TouchableOpacity>

                                        <Link href="/(auth)/signup" asChild>
                                            <TouchableOpacity>
                                                <Text style={styles.signupText}>
                                                    I don't have an account. Sign up
                                                </Text>
                                            </TouchableOpacity>
                                        </Link>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    screenContent: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        gap: 25,
    },
    formHead: {
        gap: 8,
    },
    h1Text: {
        fontFamily: theme.font.styleBold,
        fontSize: width * 0.07,
    },
    pText: {
        fontFamily: theme.font.regular,
        fontSize: width * 0.04,
        opacity: 0.5,
    },
    form: {
        gap: 20,
    },
    forgetPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    signupText: {
        fontFamily: theme.font.regular,
        textAlign: 'center',
        opacity: 0.5,
    },
});