import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";

const MessagesContainer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.messagesListContainer} />
            <ShadowedView
                style={[
                    styles.inputContainer,
                    shadowStyle({
                        color: "black",
                        opacity: 0.2,
                        offset: [0, -2],
                        radius: 5,
                    }),
                ]}
            >
                <TextInput style={styles.textInput} placeholder="Type a message..." />

                <Text style={styles.sendText}>Send</Text>
            </ShadowedView>
        </View>
    );
};

export default MessagesContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesListContainer: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 11,
        padding: 10,
    },
    sendText: {
        color: "dodgerblue",
        marginLeft: 10,
    },
});
