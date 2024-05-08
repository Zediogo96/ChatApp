import Colors from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

export default function Settings() {
    return (
        <View style={s.container}>
            <Text style={s.title}>Messages</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.mainTheme.offWhite,
    },
    title: {
        paddingBottom: 20,
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "SpaceMono",
        color: Colors.mainTheme.darkOlive,
    },
});
