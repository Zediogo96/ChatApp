import React, { memo } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Dimensions,
} from "react-native";

import Svg, { Image } from "react-native-svg";

import useAuthStore from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import showFeedbackToast from "@/utils/toast";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import Colors from "@/constants/Colors";
import ErrorText from "@/components/ErrorText";
import api from "@/api";

import { useStore } from "zustand";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
} from "react-native-reanimated";

interface FormData {
    username: string;
    password: string;
}

const { width, height } = Dimensions.get("window");

const Login: React.FC = () => {
    const { width, height } = Dimensions.get("window");

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
            const { username, password } = getValues();

            const response = await api.post("/login", {
                username: username,
                password: password,
            });

            return response.data;
        },
        onError: async (error) => {
            showFeedbackToast({
                title: "Authentication Error",
                message: error.message,
                type: "error",
            });
        },
        onSuccess: async (data: LoginResponse) => {
            setAuthenticated(data);
            router.replace("home/index" as never);

            showFeedbackToast({
                title: "Authentication Success",
                message: "You have successfully logged in.",
                type: "success",
            });
        },
    });

    const imagePosition = useSharedValue(1);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [-height / 2, 0],
        );

        return {
            transform: [
                { translateY: withTiming(interpolation, { duration: 1000 }) },
            ],
        };
    }, []);

    const handleLoginButtonPress = () => {
        imagePosition.value = 0;
    };

    return (
        <View style={s.container}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    imageAnimatedStyle,
                    { backgroundColor: "dodgerblue" },
                ]}
            />

            <View style={s.bottomContainer}>
                <TouchableOpacity
                    style={s.btn}
                    onPressIn={handleLoginButtonPress}
                >
                    <Text style={s.btnText}>Sign In</Text>
                </TouchableOpacity>

                <View style={s.btn}>
                    <Text style={s.btnText}>Register</Text>
                </View>

                {/* <View style={s.formContainer}>
                    <TextInput
                        style={s.textInput}
                        placeholder="Email"
                        placeholderTextColor={"#000"}
                    />
                    <TextInput style={s.textInput} placeholder="Password" />
                    <TextInput
                        style={s.textInput}
                        placeholder="Confirm Password"
                    />

                    <ShadowedView
                        style={[
                            s.btn,
                            shadowStyle({
                                color: "black",
                                opacity: 0.2,
                                offset: [0, 2],
                                radius: 5,
                            }),
                        ]}
                    >
                        <Text style={s.btnText}>Sign In</Text>
                    </ShadowedView>
                </View> */}
            </View>
        </View>
    );
};

export default memo(Login);

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    bottomContainer: {
        width: width,
        justifyContent: "center",
        height: height / 3,
    },

    btn: {
        backgroundColor: "coral",

        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "white",
    },

    btnText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0.5,
    },

    formContainer: {
        width: width,
        backgroundColor: "white",
        marginHorizontal: 20,
    },

    textInput: {
        backgroundColor: "white",

        height: 50,
        borderWidth: 1,
        borderColor: "coral",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 10,
    },
});
