import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Button from "@/components/Authentication/Welcome/Button";
import { useNavigation } from "expo-router";

import Colors from "@/constants/Colors";

import Animated, {
    BounceInLeft,
    Easing,
    ZoomIn,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import TypeAnimation from "@/components/Animated/TypewritterEffect";

// @ts-expect-error: SVG file
import OnBoardSVG from "@/assets/images/welcome/onBoard.svg";

const { width, height } = Dimensions.get("window");

const Welcome: React.FC = () => {
    const navigation = useNavigation();

    const opacityValue = useSharedValue(0);

    useEffect(() => {
        opacityValue.value = withTiming(1, {
            duration: 1500,
            easing: Easing.ease,
        });
    }, []);

    const SVGanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value,
        };
    }, []);

    return (
        <LinearGradient
            style={s.container}
            colors={["transparent", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.7)", "rgba(255,255,255, 1)"]}
            locations={[0, 0.05, 0.5, 1]}
        >
            <Animated.View style={[{ marginTop: "25%", alignSelf: "center" }, SVGanimatedStyle]}>
                <OnBoardSVG width={275} height={275} />
            </Animated.View>

            <View style={{ paddingBottom: "10%" }}>
                <Animated.Text
                    entering={ZoomIn.easing(Easing.out(Easing.ease)).duration(500).delay(100)}
                    style={s.mainText1}
                >
                    Let's Get
                </Animated.Text>
                <Animated.Text
                    entering={BounceInLeft.easing(Easing.out(Easing.ease)).duration(500).delay(500)}
                    style={s.mainText2}
                >
                    Started
                </Animated.Text>
            </View>

            <TypeAnimation
                sequence={[
                    {
                        text: "Connect with your friends and family.",
                        typeSpeed: 50,
                    },
                    {
                        text: "Share your moments with the world.",
                        typeSpeed: 50,
                    },
                    {
                        text: "Join us now, we have puppies!",
                        typeSpeed: 50,
                    },
                ]}
                style={s.typewritterText}
                delayBetweenSequence={2000}
                blinkSpeed={200}
                loop
            />

            <View style={{ marginBottom: "10%" }}>
                <Button
                    text="Join Now"
                    onPress={() => navigation.navigate("Signup" as never)}
                    buttonContainerStyle={s.btnContainer}
                    textStyle={{
                        color: Colors.mainTheme.offWhite,
                    }}
                />

                <View style={s.lowerBtnContainer}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: "gray",
                        }}
                    >
                        Already have an account ?
                    </Text>
                    <Pressable onPress={() => navigation.navigate("Login" as never)}>
                        <Text style={s.loginText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Welcome;

const s = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    mainText1: {
        fontSize: 50,
        fontWeight: "800",
        color: Colors.mainTheme.oliveGreen,
        marginTop: "10%",
    },
    mainText2: {
        fontSize: 46,
        fontWeight: "800",
        color: Colors.mainTheme.darkOlive,
    },
    typewritterText: {
        fontSize: 20,
        color: Colors.mainTheme.oliveGreen,
    },
    btnContainer: {
        backgroundColor: Colors.mainTheme.darkOlive,
        marginTop: "30%",
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.mainTheme.oliveGreen,
    },
    lowerBtnContainer: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "center",
    },
    loginText: {
        fontSize: 16,
        color: Colors.mainTheme.oliveGreen,
        fontWeight: "bold",
        marginLeft: 4,
    },
});
