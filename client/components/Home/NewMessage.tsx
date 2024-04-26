import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const NewMessage = () => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withDelay(1000, withTiming(1, { duration: 500 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <AnimatedTouchableOpacity style={[styles.container, animatedStyle]}>
            <View style={styles.innerContainer}>
                <Entypo name="plus" size={30} color={Colors.mainTheme.darkOlive} />
            </View>
        </AnimatedTouchableOpacity>
    );
};

export default NewMessage;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 15,
        right: 15,

        borderRadius: 50,

        width: 65,
        aspectRatio: 1,

        padding: 2,

        borderColor: Colors.mainTheme.darkOlive,
        borderWidth: 2,

        backgroundColor: Colors.mainTheme.offWhite,
    },

    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 50,

        borderWidth: 1.1,
        borderColor: Colors.mainTheme.darkOlive,

        backgroundColor: Colors.mainTheme.tan,
    },
});
