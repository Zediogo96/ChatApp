import { Dimensions, Easing, Pressable, StyleSheet, TextInput, TouchableOpacity, ViewStyle } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Animated, {
    ZoomIn,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { AnimatedShadowedView } from ".";
import { shadowStyle } from "react-native-fast-shadow";

const { width } = Dimensions.get("window");

const FOCUSED_WIDTH = width * 0.65;
const UNFOCUSED_WIDTH = width * 0.8;

const AnimatedFontAwsome = Animated.createAnimatedComponent(FontAwesome);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = {
    containerStyle?: ViewStyle | ViewStyle[];
    placeholder?: string;
    iconLeftName: keyof typeof FontAwesome.glyphMap;
    hideableInput?: boolean;

    onChangeText: (text: string) => void;
    value: string;
};

const AnimatedFormField: FC<Props> = ({
    containerStyle,
    placeholder,
    iconLeftName,
    hideableInput,
    onChangeText,
    value,
}) => {
    const isFocused = useSharedValue(0);

    const [isHidden, setIsHidden] = useState(hideableInput);

    const currentIconRightName = useSharedValue<keyof typeof FontAwesome.glyphMap>("eye-slash");
    // Change width with an interpolation
    const inputStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(interpolate(isFocused.value, [0, 1], [UNFOCUSED_WIDTH, FOCUSED_WIDTH]), {
                duration: 300,
            }),
            transform: [
                {
                    scale: withSpring(interpolate(isFocused.value, [0, 1], [1, 1.1])),
                },
                {
                    translateX: withTiming(interpolate(isFocused.value, [0, 1], [0, 25]), {
                        duration: 100,
                    }),
                },
            ],
        };
    });

    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(interpolate(isFocused.value, [0, 1], [0, -55]), {
                        duration: 300,
                    }),
                },
                {
                    scale: withSpring(interpolate(isFocused.value, [0, 1], [1, 1.2])),
                },
            ],
            color: withTiming(
                interpolateColor(isFocused.value, [0, 1], [Colors.mainTheme.oliveGreen, Colors.mainTheme.darkOlive]),
                {
                    duration: 300,
                },
            ),
        };
    });

    const placeHolderAnimatedStyle = useAnimatedStyle(() => {
        if (hideableInput) {
            return {
                opacity: withTiming(interpolate(isFocused.value, [0, 1], [1, 0]), {
                    duration: 300,
                }),
            };
        }

        return {
            transform: [
                {
                    translateX: withTiming(interpolate(isFocused.value, [0, 1], [0, 150]), {
                        duration: 300,
                    }),
                },
            ],

            borderColor: withTiming(
                interpolateColor(isFocused.value, [0, 1], [Colors.mainTheme.oliveGreen, Colors.mainTheme.darkOlive]),
                {
                    duration: 300,
                },
            ),
        };
    });

    const rightIconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(interpolate(Number(isHidden), [0, 1], [1, 1.2])),
                },
            ],
            color: withTiming(
                interpolateColor(Number(isHidden), [0, 1], [Colors.mainTheme.oliveGreen, Colors.mainTheme.darkOlive]),
                {
                    duration: 300,
                },
            ),
        };
    }, [isHidden]);

    const inputContainerStyle = useAnimatedStyle(() => {
        return {
            borderColor: withTiming(
                interpolateColor(isFocused.value, [0, 1], [Colors.mainTheme.oliveGreen, Colors.mainTheme.darkOlive]),
                {
                    duration: 300,
                },
            ),
            borderWidth: withTiming(interpolate(isFocused.value, [0, 1], [0.5, 2]), {
                duration: 300,
            }),
            paddingLeft: withTiming(interpolate(isFocused.value, [0, 1], [60, 15]), {
                duration: 300,
            }),
        };
    }, []);

    return (
        <Animated.View
            style={[s.mainContainer, containerStyle, inputStyle]}
        >
            <AnimatedFontAwsome
                name={iconLeftName}
                size={24}
                color="black"
                style={[iconAnimatedStyle, { position: "absolute", zIndex: 1, left: 20 }]}
            />

            <AnimatedTextInput
                style={[
                    {
                        flex: 1,
                        height: 50,
                        borderRadius: 15,
                        backgroundColor: "white",
                        paddingLeft: 15,
                        width: "100%",

                        elevation: 5,
                    },
                    inputContainerStyle,
                ]}
                secureTextEntry={isHidden}
                onFocus={() => (isFocused.value = 1)}
                onBlur={() => (isFocused.value = 0)}
                onChangeText={onChangeText}
                value={value}
            />

            {/* Render placeholder if value is not empty */}
            {value.length === 0 && (
                <Animated.Text style={[s.placeholder, placeHolderAnimatedStyle]}>{placeholder}</Animated.Text>
            )}

            {/* Render right icon if it exists */}
            {hideableInput && (
                <Pressable
                    // make this touchable opacity not affect the text input
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={() => {
                        setIsHidden((prev) => !prev);
                    }}
                    style={{ position: "absolute", right: 20 }}
                >
                    <AnimatedFontAwsome
                        name={isHidden ? "eye" : "eye-slash"}
                        size={24}
                        color="black"
                        style={rightIconAnimatedStyle}
                    />
                </Pressable>
            )}
        </Animated.View>
    );
};

export default AnimatedFormField;

const s = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholder: {
        position: "absolute",
        left: 60, // Adjust position to match paddingLeft of TextInput
        color: Colors.mainTheme.darkOlive,
    },
});
