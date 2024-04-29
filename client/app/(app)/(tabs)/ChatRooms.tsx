import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

import useWebSocket, { ReadyState } from "react-native-use-websocket";
import { localhost } from "@/constants";
import useAuthStore from "@/store/authStore";

const ChatRooms = () => {
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        `ws://${localhost}:8080/ws/zediogo96`,
        {
            shouldReconnect: (closeEvent) => true,
        }
    );

    // Just for now
    const logout = useAuthStore((state) => state.setUnauthenticated);

    useEffect(() => {
        console.log("Last message: ", lastMessage?.data);
    }, [lastMessage]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => sendMessage("Hello")}>
                <Text>Send Message</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => logout()}>
                <Text>Logout</Text>
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