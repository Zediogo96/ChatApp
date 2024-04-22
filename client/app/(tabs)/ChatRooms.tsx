import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatRooms = () => {
    return (
        <View style={styles.container}>
            <Text>ChatRooms</Text>
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
