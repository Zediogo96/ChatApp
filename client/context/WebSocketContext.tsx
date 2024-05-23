import { createContext, useState, useEffect, useMemo } from "react";
import useWebSocket, { ReadyState, SendMessage } from "react-native-use-websocket";
import useAuthStore from "@/store/authStore";
import { localhost } from "@/constants";

type WebSocketContextType = {
    sendMessage: SendMessage;
    lastMessage: WebSocketMessageEvent | null; // Change the type of lastMessage
    readyState: ReadyState;
};

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
    undefined
);

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore((state) => state.user);

    const [socketUrl] = useState(`ws://${localhost}:8080/ws/${user?.id}/`);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        shouldReconnect: () => true, // Auto-reconnect on disconnect
    });

    const value = useMemo(
        () => ({
            sendMessage,
            lastMessage,
            readyState,
        }),
        [sendMessage, lastMessage, readyState]
    );

    return (
        <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
