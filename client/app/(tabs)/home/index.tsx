import Header from "@/components/Home/Header";
import MainFrame from "@/components/Home/MainFrame";
import NewMessage from "@/components/Home/NewMessage";
import SubHeader from "@/components/Home/SubHeader";
import Colors from "@/constants/Colors";
import { View, StyleSheet } from "react-native";

export default function HomePage() {
    return (
        <View style={s.container}>
            <Header />
            <SubHeader />
            <MainFrame />

            <NewMessage />
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainTheme.offWhite,
    },
});
