import { ActivityIndicator, Dimensions, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useRef } from "react";
import Animated from "react-native-reanimated";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;

    isQueryLoading: boolean;
    onFocus?: () => void;
};

const { width } = Dimensions.get("window");

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { value, onChangeText, isQueryLoading, onFocus } = props;
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const focusTimeout = setTimeout(() => {
            inputRef?.current?.focus();
        }, 100); // Adjust delay as needed
        return () => clearTimeout(focusTimeout);
    }, []);

    return (
        <Animated.View>
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
                    ref={inputRef}
                    placeholderTextColor={Colors.mainTheme.oliveGreen}
                    onFocus={onFocus}
                    style={s.input}
                    placeholder="Search for messages"
                    value={value}
                    onChangeText={onChangeText}
                />

                {isQueryLoading && (
                    <ActivityIndicator size="small" color={Colors.mainTheme.oliveGreen} />
                )}
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
