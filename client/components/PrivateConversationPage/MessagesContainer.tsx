import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import { useMessagesBySenderID } from "@/api/react-query/messages";
import { WebSocketContext } from "@/context/WebSocketContext";

type MessagesContainerProps = {
    id: string;
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({ id }) => {
    const { data: messages, isLoading } = useMessagesBySenderID(id);

    const wsContext = useContext(WebSocketContext);

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
                <TouchableOpacity onPress={() => wsContext?.sendMessage("Hello!")}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
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
