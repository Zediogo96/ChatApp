import React, { useContext } from "react";
import { Stack, useRouter } from "expo-router";
import WebSocketProvider from "@/context/WebSocketContext";

const StackLayout = () => {
    const router = useRouter();

    return (
        <WebSocketProvider>
            <Stack screenOptions={{ headerShown: false, statusBarAnimation: "fade" }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="PrivateConversationPage" />
                <Stack.Screen name="SearchPage" />
            </Stack>
        </WebSocketProvider>
    );
};

export default StackLayout;
