import { StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import Header from "@/components/PrivateConversationPage/Header";
import MessagesContainer from "@/components/PrivateConversationPage/MessagesContainer";

type RouterParams = {
    id: string;
    name: string;
    avatar: string;
};

const PrivateConversationPage: React.FC = () => {
    const { id, name, avatar } = useLocalSearchParams<RouterParams>();

    console.log("PrivateConversationPage", id, name, avatar);

    return (
        <View style={[styles.container]}>
            <Header name={name} avatar={avatar} />
            <MessagesContainer />
        </View>
    );
};

export default PrivateConversationPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainTheme.offWhite,
    },
});
