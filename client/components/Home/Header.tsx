import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import Animated, { FadeIn } from "react-native-reanimated";

const { height } = Dimensions.get("window");

const Header = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <ShadowedView
            style={[
                shadowStyle({
                    opacity: 0.3,
                    radius: 8,
                    offset: [0, 3],
                }),
                s.container,
            ]}
        >
            <Animated.Text entering={FadeIn.duration(1000)} style={s.title}>
                Messages
            </Animated.Text>
            <ShadowedView
                style={[
                    s.inputContainer,
                    isFocused
                        ? shadowStyle({
                              opacity: 1,
                              radius: 1,
                              offset: [1, 1],
                              color: "black",
                          })
                        : shadowStyle({
                              opacity: 0.5,
                              radius: 1,
                              offset: [1, 1],
                              color: "black",
                          }),
                ]}
            >
                <Ionicons name="search" size={24} color={Colors.mainTheme.oliveGreen} />
                <TextInput
                    placeholderTextColor={Colors.mainTheme.oliveGreen}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={s.input}
                    placeholder="Search for messages"
                />
            </ShadowedView>
        </ShadowedView>
    );
};

export default Header;

const s = StyleSheet.create({
    container: {
        backgroundColor: Colors.mainTheme.tan,
        width: "100%",
        height: height / 4.5,
        padding: 20,
        justifyContent: "flex-end",
        rowGap: 20,

        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "SpaceMono",
        color: Colors.mainTheme.darkOlive,
    },
    inputContainer: {
        flexDirection: "row",

        backgroundColor: Colors.mainTheme.offWhite,
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        columnGap: 10,
    },
    input: {
        flex: 1,
        color: Colors.mainTheme.darkOlive,
    },
});
