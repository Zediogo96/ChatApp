import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { FC } from "react";
import Colors from "@/constants/Colors";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";

import useLastMessages from "@/api/react-query/messages";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const Item: FC<{ item: MessageWithSender; isLoading: boolean }> = (props) => {
  const { item, isLoading } = props;

  if (isLoading) {
    return (
      <SkeletonPlaceholder highlightColor="#f0f0f0">
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={45} height={45} borderRadius={20} />
          <SkeletonPlaceholder.Item marginLeft={10}>
            <SkeletonPlaceholder.Item
              width={100}
              height={12}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width={150}
              height={12}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  }

  const formatUnreadCount = (count: number) => {
    return count > 9 ? "9+" : count.toString();
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    if (hours === 0) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${hours / 24}d ago`;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "home/PrivateConversationPage",
          params: {
            id: String(item.sender.id),
            name: item.sender.username,
            avatar: item.sender.avatar_url,
          },
        } as never);
      }}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.sender.avatar_url }} style={styles.avatar} />

      <View style={styles.lastMessageContentContainer}>
        <View style={[styles.spaceBetweenRow, styles.lastMessageContentTopRow]}>
          <Text style={styles.senderName}>{item.sender.username}</Text>
          <View style={styles.messageCountContainer}>
            <Text style={styles.messageCount}>
              {formatUnreadCount(item.unread_count)}
            </Text>
          </View>
        </View>
        {/* Last Message  */}
        <View style={styles.spaceBetweenRow}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={styles.lastMessageContent}
          >
            {item.content}
          </Text>

          <Text style={styles.lastMessageDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainFrame = () => {
  const { data: messages, isLoading } = useLastMessages();

  // const state = useAuthStore((state) => state);

  return (
    <ShadowedView
      style={[
        styles.container,
        shadowStyle({
          opacity: 0.1,
          radius: 20,
          offset: [0, -2],
        }),
      ]}
    >
      <Text style={styles.title}>Most Recent</Text>

      <FlashList
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: MessageWithSender }) => (
          <Item item={item} isLoading={isLoading} />
        )}
        contentContainerStyle={{ paddingTop: 10 }}
        estimatedItemSize={10}
        data={messages || []}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        numColumns={1}
      />
    </ShadowedView>
  );
};

export default MainFrame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    backgroundColor: "white",

    paddingTop: 15,
  },

  title: {
    fontSize: 20,
    color: Colors.mainTheme.darkOlive,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 15,
  },

  itemContainer: {
    height: 75,
    width: width - 20,
    borderRadius: 20,

    alignSelf: "center",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 15,

    marginTop: 10,
  },

  lastMessageContentContainer: { flex: 1, marginLeft: 15 },

  spaceBetweenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  lastMessageContentTopRow: {
    marginBottom: 3,
  },

  messageCountContainer: {
    backgroundColor: Colors.mainTheme.warmBeige,
    borderRadius: 10,
    height: 15,
    width: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  messageCount: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },

  avatar: {
    height: 45,
    width: 45,
    borderRadius: 20,
    borderWidth: 1,
  },
  senderName: {
    fontSize: 18,
    color: Colors.mainTheme.oliveGreen,
    fontWeight: "bold",
  },
  lastMessageContent: {
    fontSize: 12,
    color: "gray",
    fontWeight: "400",
    marginTop: 1.5,
    maxWidth: 225,
  },

  lastMessageDate: {
    fontSize: 10,
    color: "gray",

    fontWeight: "400",
  },
});
