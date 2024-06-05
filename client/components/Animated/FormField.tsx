import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get("window");

const FOCUSED_WIDTH = width * 0.65;
const UNFOCUSED_WIDTH = width * 0.8;

const AnimatedFontAwsome = Animated.createAnimatedComponent(FontAwesome);

const AnimatedFormField = () => {
    const isFocused = useSharedValue(0);

    // Change width with an interpolation
    const inputStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(interpolate(isFocused.value, [0, 1], [UNFOCUSED_WIDTH, FOCUSED_WIDTH]), {
                damping: 20,
                stiffness: 90,
                mass: 1,
            }),
            transform: [
                {
                    scale: withSpring(interpolate(isFocused.value, [0, 1], [1, 1.1])),
                },
                {
                    translateX: withTiming(interpolate(isFocused.value, [0, 1], [0, 20]), {
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
                    translateX: withSpring(interpolate(isFocused.value, [0, 1], [0, -55])),
                },
                {
                    scale: withSpring(interpolate(isFocused.value, [0, 1], [1, 1.2])),
                },
            ],
        };
    });

    const placeHolderAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(interpolate(isFocused.value, [0, 1], [0, 130]), {
                        duration: 300,
                    }),
                },
            ],
        };
    });

    return (
        <Animated.View style={[s.mainContainer, inputStyle]}>
            <AnimatedFontAwsome
                name="user"
                size={24}
                color="black"
                style={[iconAnimatedStyle, { position: "absolute", zIndex: 1, left: 20 }]}
            />
            <TextInput
                style={{
                    flex: 1,
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: "white",
                    paddingLeft: 15,
                    width: "100%",
                }}
                onFocus={() => (isFocused.value = 1)}
                onBlur={() => (isFocused.value = 0)}
            />
            <Animated.Text style={[s.placeholder, placeHolderAnimatedStyle]}>Username</Animated.Text>
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
