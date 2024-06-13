import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import Header from "@/components/PrivateConversationPage/Header";
import { useMessagesBySenderID } from "@/api/react-query/messages";

import { GiftedChat } from "react-native-gifted-chat";

type RouterParams = {
  id: string;
  name: string;
  avatar: string;
};

const PrivateConversationPage: React.FC = () => {
  const { id, name, avatar } = useLocalSearchParams<RouterParams>();

  const { data: messages, isLoading } = useMessagesBySenderID(id);

  const formattedMessages = useMemo(() => {
    if (!messages) return [];
    // todo: remove any
    return messages.map((message: any) => ({
      _id: message.id,
      text: message.content,
      createdAt: new Date(message.created_at),
      user: {
        _id: message.sender_id,
        name: name,
        avatar: avatar,
      },
    }));
  }, [messages]);

  console.log("formattedMessages %j", JSON.stringify(formattedMessages));

  return (
    <View style={[styles.container]}>
      <Header name={name} avatar={avatar} />
      <GiftedChat
        messages={formattedMessages}
        // onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
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
