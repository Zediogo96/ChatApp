import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const SearchPage = () => {
    return (
        <Animated.View sharedTransitionTag="searchInput">
            <ShadowedView
                style={[
                    s.inputContainer,

                    shadowStyle({
                        opacity: 1,
                        radius: 1,
                        offset: [1, 1],
                        color: "black",
                    }),
                ]}
            >
                <Ionicons name="search" size={24} color={Colors.mainTheme.oliveGreen} />
                <TextInput
                    placeholderTextColor={Colors.mainTheme.oliveGreen}
                    style={s.input}
                    placeholder="Search for messages"
                />
            </ShadowedView>
        </Animated.View>
    );
};

export default SearchPage;

const s = StyleSheet.create({
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
