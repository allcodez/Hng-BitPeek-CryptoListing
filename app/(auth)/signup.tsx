import { globalStyle } from '@/globalStyle';
import { useUserStore } from '@/store/userStore';
import { theme } from '@/theme';
import { SignUpFormValues } from '@/types/auth';
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

const { width } = Dimensions.get('window');

export default function SignUp() {
    const { setUserInfo } = useUserStore();

    const handleSignUp = (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
        console.log('User Data:', values);

        setUserInfo({
            name: values.name,
            email: values.email,
        });

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
                            <Text style={styles.h1Text}>Sign Up</Text>
                            <Text style={styles.pText}>Let's get you all prepared.</Text>
                        </View>

                        <Formik<SignUpFormValues>
                            initialValues={{
                                name: '',
                                email: '',
                                password: '',
                            }}
                            onSubmit={handleSignUp}
                        >
                            {(props) => (
                                <View style={styles.form}>
                                    <View style={globalStyle.label}>
                                        <Text style={globalStyle.labelText}>Name</Text>
                                        <TextInput
                                            style={globalStyle.input}
                                            placeholder="Enter Full Name"
                                            onChangeText={props.handleChange('name')}
                                            value={props.values.name}
                                        />
                                    </View>

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
                                            placeholder="Create Password"
                                            onChangeText={props.handleChange('password')}
                                            value={props.values.password}
                                            secureTextEntry
                                        />
                                    </View>

                                    <View style={{ gap: 60, marginTop: 20 }}>
                                        <Text style={styles.termsText}>
                                            By signing up, you agree to our app's Terms and Conditions.
                                        </Text>

                                        <TouchableOpacity
                                            style={globalStyle.solidButton}
                                            onPress={() => props.handleSubmit()}
                                        >
                                            <Text style={globalStyle.solidButtonText}>
                                                CREATE AN ACCOUNT
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>

                        <Link href="/(auth)/login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.loginText}>I have an account. Log in</Text>
                            </TouchableOpacity>
                        </Link>
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
    termsText: {
        textAlign: 'center',
        fontSize: 12,
        paddingHorizontal: 30,
        fontFamily: theme.font.regular,
        opacity: 0.5,
    },
    loginText: {
        fontFamily: theme.font.regular,
        textAlign: 'center',
        opacity: 0.5,
        marginTop: 15,
    },
});