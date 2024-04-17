import { StyleSheet } from "react-native";
import React, { memo } from "react";
import Animated, { LightSpeedInLeft } from "react-native-reanimated";
import Colors from "@/constants/Colors";

type ErrorTextProps = {
    errorMessage: string | undefined;
};

const ErrorText: React.FC<ErrorTextProps> = ({ errorMessage }) => {
    return (
        <Animated.Text
            entering={LightSpeedInLeft.duration(250)}
            style={s.errorText}
        >
            {errorMessage}
        </Animated.Text>
    );
};

export default memo(ErrorText);

const s = StyleSheet.create({
    errorText: {
        color: Colors.common.error_red,
        fontSize: 12,
        alignSelf: "flex-start",
        marginLeft: 10,
        opacity: 0.6,
    },
});
