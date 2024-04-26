import React, { memo } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from "react-native";

import useAuthStore from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import showFeedbackToast from "@/utils/toast";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import Colors from "@/constants/Colors";
import ErrorText from "@/components/ErrorText";
import api from "@/api";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const setAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<FormData>();

    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: async () => {
            const { email, password } = getValues();

            const response = await api.post("/login", {
                username: "zediogo96",
                password: "123",
            });

            return response.data;
        },
        onError: (error) => {

            showFeedbackToast({
                title: "Authentication Error",
                message: error.message,
                type: "error",
            });
        },
        onSuccess: async (data) => {
            setAuthenticated();
            router.replace("/" as never);

            showFeedbackToast({
                title: "Authentication Success",
                message: "You have successfully logged in.",
                type: "success",
            });
        },
    });

    return (
        <View style={s.container}>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: {
                        value: true,
                        message: "Please enter your email",
                    },
                }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={s.inputContainer}>
                        <TextInput
                            style={s.textInput}
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.email && (
                            <ErrorText errorMessage={errors.email.message} />
                        )}
                    </View>
                )}
            />
            <Controller
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: "Please enter your password",
                    },
                }}
                name="password"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={s.inputContainer}>
                        <TextInput
                            style={s.textInput}
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                        {errors.password && (
                            <ErrorText errorMessage={errors.password.message} />
                        )}
                    </View>
                )}
            />
            <View style={s.btnsContainer}>
                <TouchableOpacity
                    style={s.signInBtn}
                    onPress={handleSubmit(() => {
                        loginMutation.mutate();
                    })}
                >
                    {loginMutation.isPending ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={{ color: "white" }}>Sign In</Text>
                    )}
                </TouchableOpacity>

                <Link href={"/Signup"} style={{ marginTop: 10, fontSize: 12 }}>
                    <Text style={{ color: "dodgerblue" }}>Don't have an account?</Text>
                </Link>
            </View>
        </View>
    );
};

export default memo(Login);

const s = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        height: 40,

        borderColor: "gray",
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 11,
        padding: 10,
    },
    btnsContainer: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        marginTop: 20,
    },
    signInBtn: {
        backgroundColor: "dodgerblue",
        padding: 10,
        borderRadius: 7,
        width: "40%",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    errorText: {
        color: Colors.common.error_red,
        fontSize: 12,
        alignSelf: "flex-start",
        marginLeft: 10,
        opacity: 0.6,
    },
});
