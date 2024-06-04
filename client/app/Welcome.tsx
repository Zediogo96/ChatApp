import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Button from "@/components/Authentication/Welcome/Button";
import { useNavigation } from "expo-router";

import Colors from "@/constants/Colors";

import Animated, {
    BounceIn,
    BounceInLeft,
    Easing,
    FadeIn,
    RollInLeft,
    ZoomIn,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import TypeAnimation from "@/components/Animated/TypewritterEffect";

import {
    Circle,
    ClipPath,
    Defs,
    Polyline,
    Rect,
    Svg,
    Image as SvgImage,
} from "react-native-svg";

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
            style={{
                flex: 1,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
            }}
            colors={[Colors.mainTheme.warmBeige, Colors.mainTheme.tan]}
        >
            <Animated.View
                style={[
                    { marginTop: "25%", alignSelf: "center" },
                    SVGanimatedStyle,
                ]}
            >
                <OnBoardSVG width={275} height={275} />
            </Animated.View>

            <Animated.Text
                entering={ZoomIn.easing(Easing.out(Easing.ease))
                    .duration(500)
                    .delay(100)}
                style={{
                    fontSize: 50,
                    fontWeight: "800",
                    color: Colors.mainTheme.offWhite,
                    marginTop: "10%",
                }}
            >
                Let's Get
            </Animated.Text>
            <Animated.Text
                entering={BounceInLeft.easing(Easing.out(Easing.ease))
                    .duration(500)
                    .delay(500)}
                style={{
                    fontSize: 46,
                    fontWeight: "800",
                    color: Colors.mainTheme.darkOlive,
                }}
            >
                Started
            </Animated.Text>

            <TypeAnimation
                sequence={[
                    {
                        text: "Connect with each other with chatting",
                        typeSpeed: 50,
                    },
                    {
                        text: "Calling, enjoy Safe and private texting",
                        typeSpeed: 50,
                    },
                ]}
                style={{
                    fontSize: 20,
                    color: Colors.mainTheme.offWhite,
                    marginTop: 45,
                }}
                delayBetweenSequence={2000}
                blinkSpeed={200}
                loop
            />

            <Button
                text="Join Now"
                onPress={() => navigation.navigate("Signup" as never)}
                buttonContainerStyle={{
                    backgroundColor: Colors.mainTheme.darkOlive,
                    marginTop: "30%",
                    width: "100%",
                    borderWidth: 1,
                    borderColor: Colors.mainTheme.oliveGreen,
                }}
                textStyle={{
                    color: Colors.mainTheme.offWhite,
                }}
            />

            <View
                style={{
                    flexDirection: "row",
                    marginTop: 12,
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        color: Colors.mainTheme.offWhite,
                    }}
                >
                    Already have an account ?
                </Text>
                <Pressable
                    onPress={() => navigation.navigate("Login" as never)}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: Colors.mainTheme.oliveGreen,
                            fontWeight: "bold",
                            marginLeft: 4,
                        }}
                    >
                        Login
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default Welcome;

const s = StyleSheet.create({
    commonSmallerImg: {
        height: 100,
        width: 100,
        borderRadius: 20,
        position: "absolute",
    },

    img1: {
        top: 20,
        transform: [
            { translateX: 20 },
            { translateY: 50 },
            { rotate: "-15deg" },
        ],
    },

    img2: {
        top: -30,
        left: 110,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "-5deg" },
        ],
    },

    img3: {
        top: 170,
        left: -20,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "15deg" },
        ],
    },

    img4: {
        height: 200,
        width: 200,
        borderRadius: 20,
        position: "absolute",
        top: 120,
        left: 130,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "-15deg" },
        ],
    },
});
