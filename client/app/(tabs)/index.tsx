import Header from "@/components/Home/Header";
import MainFrame from "@/components/Home/MainFrame";
import SubHeader from "@/components/Home/SubHeader";
import Colors from "@/constants/Colors";
import { View, StyleSheet } from "react-native";

export default function Index() {
    return (
        <View style={s.container}>
            <Header />
            <SubHeader />
            <MainFrame />
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainTheme.offWhite,
    },
});
