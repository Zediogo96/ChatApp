import React, { useEffect } from "react";
import { StyleSheet, ImageBackground, ImageSourcePropType } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
    interpolate,
} from "react-native-reanimated";

const INPUT_RANGE_START = 0;
const INPUT_RANGE_END = 1;
const OUTPUT_RANGE_START = -281;
const OUTPUT_RANGE_END = 0;
const ANIMATION_TO_VALUE = 1;
const ANIMATION_DURATION = 25000;

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

type Props = {
    imagePath: ImageSourcePropType;
};

const AnimatedBackground: React.FC<Props> = ({ imagePath }) => {
    const translateValue = useSharedValue(0);

    useEffect(() => {
        translateValue.value = withRepeat(
            withTiming(ANIMATION_TO_VALUE, {
                duration: ANIMATION_DURATION,
                easing: Easing.linear,
            }),
            -1, // repeat indefinitely
            true, // reverse direction
        );
    }, [translateValue]);

    const animatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            translateValue.value,
            [INPUT_RANGE_START, INPUT_RANGE_END],
            [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
        );

        return {
            transform: [
                { translateX: translateX },
                { translateY: translateX }, // Assuming the same interpolation for Y-axis
            ],
        };
    });

    return (
        <AnimatedImageBackground resizeMode="repeat" style={[styles.background, animatedStyle]} source={imagePath} />
    );
};

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        width: 1200,
        height: 1200,
        top: 0,
        opacity: 0.2,
        transform: [{ translateX: 0 }, { translateY: 0 }],
    },
});

export default AnimatedBackground;
