import Colors from "@/constants/Colors";
import { View, StyleSheet } from "react-native";

export default function Index() {
    return <View style={s.container}></View>;
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainTheme.offWhite,
    },
});
