import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";

type ButtonProps = {
    onPress: () => void;
    text: string;

    buttonContainerStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
};

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <ShadowedView
                style={[
                    styles.button,
                    props.buttonContainerStyle,
                    shadowStyle({
                        color: Colors.mainTheme.oliveGreen,
                        offset: [2, 2],
                        radius: 20,
                        opacity: 1,
                    }),
                ]}
            >
                <Text style={[{ fontSize: 18 }, props.textStyle]}>
                    {props.text}
                </Text>
            </ShadowedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,

        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default Button;
