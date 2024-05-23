import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import { useMessagesBySenderID } from "@/api/react-query/messages";
import { WebSocketContext } from "@/context/WebSocketContext";
import useAuthStore from "@/store/authStore";

type MessagesContainerProps = {
    id: string;
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({ id }) => {
    const user = useAuthStore((state) => state.user);

    const { data: messages, isLoading } = useMessagesBySenderID(id);

    const wsContext = useContext(WebSocketContext);

    const [messageInputValue, setMessageInputValue] = useState("");

    const handleSendMessage = useCallback(() => {
        // if (!user) return;
        // else if (!messageInputValue || messageInputValue.trim() === "") return;

        // console.log("Sending message to " + id + " > " + messageInputValue);

        const message: Omit<Message, "id" | "created_at" | "updated_at"> = {
            sender_id: Number(user?.id),
            receiver_id: Number(id),
            content: "boas",
            content_type: "text",
        };

        wsContext?.sendMessage(JSON.stringify(message));
    }, [id, user]);

    useEffect(() => {
        console.log(
            "User " + user?.username + " received message: ",
            wsContext?.lastMessage?.data
        );
    }, [wsContext?.lastMessage]);

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
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setMessageInputValue(text)}
                    value={messageInputValue}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={handleSendMessage}>
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
