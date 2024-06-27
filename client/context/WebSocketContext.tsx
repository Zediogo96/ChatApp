import { createContext, useState, useEffect, useMemo } from "react";
import useWebSocket, {
  ReadyState,
  SendMessage,
} from "react-native-use-websocket";
import useAuthStore from "@/store/authStore";
import { localhost } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";

type WebSocketContextType = {
  sendMessage: SendMessage;
  lastMessage: WebSocketMessageEvent | null; // Change the type of lastMessage
  readyState: ReadyState;
};

export const WebSocketContext = createContext<WebSocketContextType>(
  {} as WebSocketContextType
);

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  // ws://localhost:8080/ws/5
  const url = `ws://${localhost}:8080/ws/${user?.id}/`;
  const [socketUrl] = useState(url);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true, // Auto-reconnect on disconnect
  });

  const queryClient = useQueryClient();

  // when a message is received, invalidate the last messages query
  useEffect(() => {
    if (lastMessage) {
      console.log(queryClient.getQueryData(["lastMessages"])),
        queryClient.invalidateQueries({ queryKey: ["lastMessages"] });
      console.log(queryClient.getQueryData(["lastMessages"]));
    }
  }, [lastMessage, queryClient]);

  const value = useMemo(
    () => ({
      sendMessage,
      lastMessage,
      readyState,
    }),
    [sendMessage, lastMessage, readyState]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
