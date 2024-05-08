import { Dimensions, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type SearchBarProps = {
    onFocus?: () => void;
};

const { width } = Dimensions.get("window");

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { onFocus } = props;

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
                    onFocus={onFocus}
                    style={s.input}
                    placeholder="Search for messages"
                />
            </ShadowedView>
        </Animated.View>
    );
};

export default SearchBar;

const s = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        width: width * 0.9,
        height: 50,
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