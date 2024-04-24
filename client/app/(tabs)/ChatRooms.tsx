import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

import useWebSocket, { ReadyState } from "react-native-use-websocket";
import { localhost } from "@/constants";

const ChatRooms = () => {
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        `ws://${localhost}:8080/ws/zediogo96`,
        {
            shouldReconnect: (closeEvent) => true,
        }
    );

    useEffect(() => {
        console.log("Last message: ", lastMessage?.data);
    }, [lastMessage]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => sendMessage("Hello")}>
                <Text>Send Message</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatRooms;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
