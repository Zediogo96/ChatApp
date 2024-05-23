import { Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";

import Colors from "@/constants/Colors";

import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import Animated, { FadeIn } from "react-native-reanimated";
import SearchBar from "../General/SearchBar";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

const AnimatedShadowedView = Animated.createAnimatedComponent(ShadowedView);

const Header = () => {
    return (
        <AnimatedShadowedView
            sharedTransitionTag="headerTransition"
            style={[
                shadowStyle({
                    opacity: 0.3,
                    radius: 8,
                    offset: [0, 3],
                }),
                s.container,
            ]}
        >
            <Animated.Text
                sharedTransitionTag="titleTransition"
                entering={FadeIn.duration(1000)}
                style={s.title}
            >
                Messages
            </Animated.Text>
            <SearchBar onFocus={() => router.push("/home/SearchPage")} />
        </AnimatedShadowedView>
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

        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    title: {
        paddingBottom: 20,
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "SpaceMono",
        color: Colors.mainTheme.darkOlive,
    },
});
