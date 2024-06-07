import React, { memo, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";
import Animated, {
    BounceInLeft,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    Easing,
    withDelay,
    FadeIn,
} from "react-native-reanimated";
import BackgroundAnimation from "@/components/Authentication/Login/AnimatedBackground";
import TypeAnimation from "@/components/Animated/TypewritterEffect";
import useAuthStore from "@/store/authStore";
import api from "@/api";
import showFeedbackToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import AnimatedFormField from "@/components/Animated/FormField";

const { height, width } = Dimensions.get("screen");

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

    const translateY = useSharedValue(0);
    const opacity_ic_ = useSharedValue(0);
    const translateY_ic = useSharedValue(60);

    useEffect(() => {
        translateY.value = withSpring(height / 3, {
            damping: 10,
            stiffness: 100,
            mass: 1,
        });
        opacity_ic_.value = withDelay(
            1000,
            withSpring(1, {
                damping: 10,
                stiffness: 100,
                mass: 1,
            }),
        );

        translateY_ic.value = withDelay(
            1000,
            withSpring(0, {
                damping: 10,
                stiffness: 100,
                mass: 1,
            }),
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            borderRadius: withSpring(interpolate(translateY.value, [0, height / 3], [0, 50]), {
                damping: 10,
                stiffness: 100,
                mass: 1,
            }),

            borderWidth: withSpring(interpolate(translateY.value, [0, height / 3], [0, 2]), {
                damping: 10,
                stiffness: 100,
                mass: 1,
            }),
        };
    }, []);

    const animatedStyle_ic = useAnimatedStyle(() => {
        return {
            opacity: opacity_ic_.value,
            transform: [{ translateY: translateY_ic.value }],
        };
    }, []);

    const animatedStyle_btn = useAnimatedStyle(() => {
        return {
            opacity: opacity_ic_.value,
        };
    }, []);

    return (
        <View>
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
            <BackgroundAnimation />
            <Animated.View
                style={[
                    {
                        height: height,
                        zIndex: 2,
                        width: "105%",
                        left: -10,
                        backgroundColor: Colors.mainTheme.tan,
                    },
                    animatedStyle,
                ]}
            >
                <Animated.View style={[s.inputsContainer, animatedStyle_ic]}>
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
                </Animated.View>
                <Animated.View style={[s.btnsContainer, animatedStyle_btn]}>
                    <TouchableOpacity style={s.signInBtn} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
                        {loginMutation.isPending ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={{ color: "white" }}>Sign In</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default memo(Login);
const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: Colors.mainTheme.darkOlive,

        position: "absolute",

        top: height / 5.5,
        left: 20,
    },
    topContainer: {
        height: height / 2,
        width: "102%",
        backgroundColor: Colors.mainTheme.offWhite,

        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: "center",
        alignItems: "center",

        shadowOpacity: 1,
        shadowColor: Colors.mainTheme.darkOlive,
        elevation: 20,
    },

    inputsContainer: {
        alignItems: "center",
    },

    inputContainer: {
        backgroundColor: "white",
        width: "80%",
        marginVertical: 10,
        borderRadius: 10,
    },

    textInput: {
        height: 40,
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
        backgroundColor: Colors.mainTheme.darkOlive,
        padding: 10,
        borderRadius: 7,
        width: "60%",
        alignItems: "center",

        marginTop: 50,
    },

    errorText: {
        color: Colors.common.error_red,
        fontSize: 12,
        alignSelf: "flex-start",
        marginLeft: 10,
        opacity: 0.6,
    },
});
