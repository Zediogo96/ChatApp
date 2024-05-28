import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
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
} from "react-native-reanimated";
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
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View
                    entering={FadeIn.easing(Easing.out(Easing.ease))
                        .duration(1000)
                        .delay(100)}
                >
                    <Image
                        source={require("../assets/images/welcome/hero1.jpg")}
                        style={[s.img1, s.commonSmallerImg]}
                    />

                    <Image
                        source={require("../assets/images/welcome/hero3.jpg")}
                        style={[s.img2, s.commonSmallerImg]}
                    />

                    <Image
                        source={require("../assets/images/welcome/hero3.jpg")}
                        style={[s.img3, s.commonSmallerImg]}
                    />

                    <Image
                        source={require("../assets/images/welcome/hero2.jpg")}
                        style={[s.img4]}
                    />
                </Animated.View>

                <View
                    style={{
                        paddingHorizontal: 22,
                        position: "absolute",
                        top: 470,
                        width: "100%",
                    }}
                >
                    <Animated.Text
                        entering={ZoomIn.easing(Easing.out(Easing.ease))
                            .duration(500)
                            .delay(100)}
                        style={{
                            fontSize: 50,
                            fontWeight: "800",
                            color: Colors.mainTheme.offWhite,
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
