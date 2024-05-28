import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import Button from "@/components/Authentication/Welcome/Button";
import { useNavigation } from "expo-router";

import Colors from "@/constants/Colors";

import Animated, { Easing, FadeIn, RollInLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome: React.FC = () => {
    const navigation = useNavigation();
    return (
        <LinearGradient
            style={{
                flex: 1,
            }}
            colors={[Colors.mainTheme.warmBeige, Colors.mainTheme.tan]}
        >
            <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
                <Animated.Image
                    entering={FadeIn.easing(
                        Easing.bezierFn(0.25, 0.1, 0.25, 1),
                    ).duration(250)}
                    source={require("../assets/images/welcome/hero1.jpg")}
                    style={[s.img1, s.commonSmallerImg]}
                />

                <Animated.Image
                    entering={FadeIn.easing(Easing.bezierFn(0.25, 0.1, 0.25, 1))
                        .duration(250)
                        .delay(250)}
                    source={require("../assets/images/welcome/hero3.jpg")}
                    style={[s.img2, s.commonSmallerImg]}
                />

                <Animated.Image
                    entering={FadeIn.easing(Easing.bezierFn(0.25, 0.1, 0.25, 1))
                        .duration(250)
                        .delay(350)}
                    source={require("../assets/images/welcome/hero3.jpg")}
                    style={[s.img3, s.commonSmallerImg]}
                />

                <Animated.Image
                    entering={FadeIn.easing(Easing.bezierFn(0.25, 0.1, 0.25, 1))
                        .duration(250)
                        .delay(450)}
                    source={require("../assets/images/welcome/hero2.jpg")}
                    style={[s.img4]}
                />

                <View
                    style={{
                        paddingHorizontal: 22,
                        position: "absolute",
                        top: 450,
                        width: "100%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 50,
                            fontWeight: "800",
                            color: Colors.mainTheme.offWhite,
                        }}
                    >
                        Let's Get
                    </Text>
                    <Animated.Text
                        entering={RollInLeft.easing(
                            Easing.bezierFn(0.25, 0.1, 0.25, 1),
                        )}
                        style={{
                            fontSize: 46,
                            fontWeight: "800",
                            color: Colors.mainTheme.darkOlive,
                        }}
                    >
                        Started
                    </Animated.Text>

                    <Text
                        style={{
                            fontSize: 16,
                            color: Colors.mainTheme.oliveGreen,
                            marginVertical: 26,
                        }}
                    >
                        Connect with each other with chatting
                        <Text>
                            {`\nCalling, enjoy Safe and private texting`}
                        </Text>
                    </Text>

                    <Button
                        text="Join Now"
                        onPress={() => navigation.navigate("Signup" as never)}
                        buttonContainerStyle={{
                            backgroundColor: Colors.mainTheme.darkOlive,
                            marginTop: 22,
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
                            onPress={() =>
                                navigation.navigate("Login" as never)
                            }
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
                </View>
            </SafeAreaView>
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
        top: 40,
        transform: [
            { translateX: 20 },
            { translateY: 50 },
            { rotate: "-15deg" },
        ],
    },

    img2: {
        top: 0,
        left: 100,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "-5deg" },
        ],
    },

    img3: {
        top: 190,
        left: -40,
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
        top: 140,
        left: 120,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            { rotate: "-15deg" },
        ],
    },
});
