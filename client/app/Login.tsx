import React, { memo, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";

import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { shadowStyle } from "react-native-fast-shadow";

// @ts-expect-error: SVG file
import LoginSvg from "@/assets/images/welcome/login.svg";

interface FormData {
    username: string;
    password: string;
}

const { height } = Dimensions.get("window");

const Login: React.FC = () => {
    const rna_translateY = useSharedValue(-450);
    const rna_borderRadius = useSharedValue(0);

    const opacityValue = useSharedValue(0);

    useEffect(() => {
        rna_translateY.value = withDelay(
            500,
            withSpring(-75, {
                damping: 10,
                stiffness: 75,
            }),
        );
        rna_borderRadius.value = withDelay(
            1000,
            withSpring(50, {
                damping: 10,
                stiffness: 100,
            }),
        );

        opacityValue.value = withDelay(
            1000,
            withTiming(1, {
                duration: 1000,
                easing: Easing.ease,
            }),
        );
    }, []);

    const topContainerAnimStyle = useAnimatedStyle(() => {
        return {
            borderBottomLeftRadius: rna_borderRadius.value,
            borderBottomRightRadius: rna_borderRadius.value,

            transform: [
                {
                    translateY: rna_translateY.value,
                },
            ],
        };
    });

    const SVGanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value,
        };
    }, []);

    return (
        <LinearGradient
            style={[s.container]}
            colors={[Colors.mainTheme.warmBeige, Colors.mainTheme.tan]}
        >
            <Animated.View
                style={[
                    s.topContainer,
                    topContainerAnimStyle,
                    shadowStyle({
                        color: Colors.mainTheme.darkOlive,
                        offset: [0, 2],
                        radius: 5,
                        opacity: 0.7,
                    }),
                ]}
            >
                <Animated.View style={[{ marginTop: "15%" }, SVGanimatedStyle]}>
                    <LoginSvg width={150} height={150} />
                    <Animated.Text
                        style={{
                            fontSize: 22,
                            fontWeight: "800",
                            color: Colors.mainTheme.darkOlive,
                            marginTop: "10%",
                            textAlign: "center",
                        }}
                    >
                        Login
                    </Animated.Text>
                </Animated.View>
            </Animated.View>
        </LinearGradient>
    );
};

export default memo(Login);

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        height: height / 2,
        width: "100%",
        backgroundColor: "white",

        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,

        justifyContent: "center",
        alignItems: "center",

        // shadows
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
