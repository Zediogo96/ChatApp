import { Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");

type Props = {
    containerStyle?: ViewStyle | ViewStyle[];
};

const Slashed_Or: React.FC<Props> = ({ containerStyle }) => {
    return (
        <View style={[s.container, containerStyle]}>
            <View style={s.slash} />
            <Text style={s.text}>OR</Text>
            <View style={s.slash} />
        </View>
    );
};

export default Slashed_Or;

const s = StyleSheet.create({
    container: {
        height: 50,
        width: width * 0.75,

        flexDirection: "row",
        alignItems: "center",
    },

    slash: {
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        flex: 1,
    },

    text: {
        marginHorizontal: 10,
    },
});
