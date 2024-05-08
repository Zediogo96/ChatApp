import { StyleSheet, View } from "react-native";
import React from "react";
import SearchBar from "@/components/General/SearchBar";
import Colors from "@/constants/Colors";
import Animated, { FadeIn } from "react-native-reanimated";

const SearchPage: React.FC = () => {
    return (
        <Animated.View
            sharedTransitionTag="headerTransition"
            style={[s.container, { flex: 1, paddingTop: 60 }]}
        >
            <Animated.Text sharedTransitionTag="titleTransition" style={s.title}>
                Messages
            </Animated.Text>

            <SearchBar />
        </Animated.View>
    );
};

export default SearchPage;

const s = StyleSheet.create({
    container: {
        backgroundColor: Colors.mainTheme.tan,
        width: "100%",
        height: "100%",
        padding: 20,
        justifyContent: "flex-start",
    },
    title: {
        paddingBottom: 20,
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "SpaceMono",
        color: Colors.mainTheme.darkOlive,
    },
});
