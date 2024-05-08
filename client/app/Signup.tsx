import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
} from "react-native";

import { router } from "expo-router";
import React, { memo } from "react";

import { Controller, useForm } from "react-hook-form";

import Colors from "@/constants/Colors";
import showFeedbackToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import ErrorText from "@/components/ErrorText";
import api from "@/api";

interface FormData {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const Signup: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<FormData>();

    const signUpMutation = useMutation({
        mutationKey: ["signup"],
        mutationFn: async (): Promise<any> => {
            const { username, email, password } = getValues();

            const response = api.post("/signup", {
                username,
                email,
                password,
            });
        },

        onError: (error: Error) => {
            showFeedbackToast({
                title: "Authentication Error",
                message: error.message,
                type: "error",
            });
        },
        onSuccess: () => {
            showFeedbackToast({
                title: "Authentication Success",
                message: "You have successfully signed up.",
                type: "success",
            });
            router.replace("Login" as never);
        },
    });

    const onSubmit = async () => {
        signUpMutation.mutateAsync();
    };

    return (
        <View style={s.container}>
            <Controller
                control={control}
                name="username"
                rules={{
                    required: {
                        value: true,
                        message: "Username is required",
                    },
                    minLength: {
                        value: 6,
                        message: "Username must be at least 6 characters",
                    },
                    maxLength: {
                        value: 16,
                        message: "Username must not exceed 20 characters",
                    },
                    pattern: {
                        value: /^[A-Z][a-z0-9_-]{5,15}$/,
                        message:
                            "Username must start with an uppercase letter and contain only letters, numbers, underscores, and hyphens",
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <View style={s.inputContainer}>
                        <TextInput
                            style={s.textInput}
                            onChangeText={onChange}
                            value={value}
                            placeholder="username"
                            autoComplete="username"
                        />
                        {errors.username && (
                            <Text style={s.errorText}>{errors.username.message}</Text>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="email"
                rules={{
                    required: {
                        value: true,
                        message: "Email is required",
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <View style={s.inputContainer}>
                        <TextInput
                            style={s.textInput}
                            onChangeText={onChange}
                            value={value}
                            placeholder="email"
                            autoComplete="email"
                            autoCapitalize="none"
                        />
                        {errors.email && (
                            <Text style={s.errorText}>{errors.email.message}</Text>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{
                    required: {
                        value: true,
                        message: "Password is required",
                    },
                    minLength: {
                        value: __DEV__ ? 1 : 8, // For development purposes, set to 1
                        message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                        value: 20,
                        message: "Password must not exceed 20 characters",
                    },
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/,
                        message:
                            "Password must include a number, a lowercase letter, an uppercase letter, and a special character",
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <View style={s.inputContainer}>
                        <TextInput
                            style={s.textInput}
                            onChangeText={onChange}
                            value={value}
                            placeholder="password"
                            autoComplete="password"
                            autoCapitalize="none"
                            secureTextEntry
                        />
                        {errors.password && (
                            <ErrorText errorMessage={errors.password.message} />
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="passwordConfirmation"
                rules={{
                    required: {
                        value: true,
                        message: "Password confirmation is required",
                    },
                    minLength: {
                        value: __DEV__ ? 1 : 8, // For development purposes, set to 1
                        message: "Password confirmation must be at least 8 characters",
                    },
                    maxLength: {
                        value: 20,
                        message: "Password confirmation must not exceed 20 characters",
                    },
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/,
                        message:
                            "Password confirmation must include a number, a lowercase letter, an uppercase letter, and a special character",
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <View style={s.inputContainer}>
                        <TextInput
                            style={s.textInput}
                            onChangeText={onChange}
                            value={value}
                            placeholder="password confirmation"
                            autoComplete="password"
                            autoCapitalize="none"
                            secureTextEntry
                        />
                        {errors.passwordConfirmation && (
                            <ErrorText
                                errorMessage={errors.passwordConfirmation.message}
                            />
                        )}
                    </View>
                )}
            />

            <TouchableOpacity style={s.btn} onPress={handleSubmit(onSubmit)}>
                {signUpMutation.isPending ? (
                    <ActivityIndicator color="white" size={"small"} />
                ) : (
                    <Text style={{ color: "white" }}>Sign Up</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default memo(Signup);

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    textInput: {
        height: 40,
        color: "black",
        borderColor: "gray",
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 11,
        padding: 10,
    },
    btn: {
        backgroundColor: "dodgerblue",
        width: "40%",
        alignItems: "center",
        marginTop: 10,
        padding: 10,
        borderRadius: 11,
    },
    errorText: {
        color: Colors.common.error_red,
        fontSize: 12,
        alignSelf: "flex-start",
        marginLeft: 10,
        opacity: 0.6,
    },
});
