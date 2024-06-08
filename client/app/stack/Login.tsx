import React, { memo } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import Colors from "@/constants/Colors";
import Animated, { BounceInLeft, Easing, FadeInDown, FadeInLeft, FadeInRight } from "react-native-reanimated";
import BackgroundAnimation from "@/components/Authentication/Login/AnimatedBackground";
import TypeAnimation from "@/components/Animated/TypewritterEffect";
import useAuthStore from "@/store/authStore";
import api from "@/api";
import showFeedbackToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedFormField from "@/components/Animated/FormField";
import Slashed_Or from "@/components/Authentication/Login/Slashed_Or";
import OAuthSocials from "@/components/Authentication/Login/OAuthSocials";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height, width } = Dimensions.get("screen");

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface FormData {
    username: string;
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
    const onSubmit = async () => {
        await loginMutation.mutateAsync();
    };

    return (
        <>
            <Animated.Text
                entering={BounceInLeft.easing(Easing.out(Easing.ease)).duration(500).delay(1000)}
                style={s.title}
            >
                Hey!
            </Animated.Text>
            <TypeAnimation
                sequence={[
                    {
                        text: "We're glad too have you back!",
                        typeSpeed: 50,
                    },
                    {
                        text: "Please sign in to continue.",
                        typeSpeed: 100,
                    },
                ]}
                style={{
                    position: "absolute",
                    top: height / 6 + 75,
                    left: 20,

                    fontSize: 20,
                    color: Colors.mainTheme.darkOlive,
                }}
                delayBetweenSequence={5000}
                initialDelay={1500}
                blinkSpeed={200}
                loop
            />
            <BackgroundAnimation imagePath={require("@/assets/images/login/teste.png")} />

            <LinearGradient
                colors={["transparent", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.7)", "rgba(255,255,255, 1)"]}
                locations={[0, 0.05, 0.5, 1]}
                style={s.container}
            >
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flex: 1 }}
                    style={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View
                        entering={FadeInRight.easing(Easing.out(Easing.ease)).duration(500).delay(1000)}
                        style={[s.inputsContainer]}
                    >
                        <>
                            <Controller
                                control={control}
                                name="username"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please enter your email",
                                    },
                                }}
                                defaultValue=""
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AnimatedFormField
                                        placeholder="Email"
                                        iconLeftName="user"
                                        onChangeText={onChange}
                                        value={value}
                                        containerStyle={{ marginTop: 100, width: width * 0.8 }}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please enter your password",
                                    },
                                }}
                                defaultValue=""
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AnimatedFormField
                                        placeholder="Password"
                                        iconLeftName="lock"
                                        onChangeText={onChange}
                                        value={value}
                                        hideableInput
                                        containerStyle={{ marginTop: 20, width: width * 0.8 }}
                                    />
                                )}
                            />

                            <Slashed_Or containerStyle={{ marginTop: 20 }} />

                            <OAuthSocials />
                        </>
                        <AnimatedTouchableOpacity
                            entering={FadeInDown.easing(Easing.out(Easing.ease)).duration(500).delay(1000)}
                            style={{ alignSelf: "center", marginBottom: 30 }}
                        >
                            <LinearGradient
                                colors={[Colors.mainTheme.oliveGreen, Colors.mainTheme.darkOlive, "rgba(0,0,0,0.5)"]}
                                locations={[0.1, 0.8, 0.95]}
                                style={s.loginBtn}
                            >
                                <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>Login</Text>
                            </LinearGradient>
                        </AnimatedTouchableOpacity>
                    </Animated.View>
                </KeyboardAwareScrollView>
            </LinearGradient>
        </>
    );
};

export default memo(Login);
const s = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        marginTop: height / 3,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: Colors.mainTheme.darkOlive,

        position: "absolute",

        top: height / 5.5,
        left: 20,
    },
    inputsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    loginBtn: {
        height: 50,
        width: width * 0.8,
        borderRadius: 10,

        alignSelf: "center",

        justifyContent: "center",
        alignItems: "center",
    },
});
