export interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface ForgotPasswordFormValues {
    email: string;
}

export interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

export interface OtpFormValues {
    otp: string;
}