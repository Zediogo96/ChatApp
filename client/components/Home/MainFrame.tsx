import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback } from "react";
import Colors from "@/constants/Colors";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";

import useLastMessages from "@/api/react-query/messages";
import useAuthStore from "@/store/authStore";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("window");

const MainFrame = () => {
    const { data: messages, isLoading } = useLastMessages();

    const state = useAuthStore((state) => state);

    // console.log("Messages: ", messages);

    const renderItem = useCallback(
        // TODO: Type User Properly
        ({ item }: { item: MessageWithSender }) => {
            console.log("User: ", item);
            if (!isLoading)
                return (
                    <SkeletonPlaceholder highlightColor="#f0f0f0">
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                            <SkeletonPlaceholder.Item
                                width={45}
                                height={45}
                                borderRadius={20}
                            />
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

            return (
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={{ uri: item.sender.avatar_url }}
                            style={{
                                height: 45,
                                width: 45,
                                borderRadius: 20,
                                borderWidth: 1,
                            }}
                        />

                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: Colors.mainTheme.oliveGreen,
                                    fontWeight: "bold",
                                    marginLeft: 10,
                                }}
                            >
                                {item.sender.username}
                            </Text>
                            {/* Last Message  */}
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: Colors.mainTheme.oliveGreen,
                                    marginLeft: 10,
                                }}
                            >
                                {item.content}
                            </Text>
                        </View>
                    </View>

                    <View style={{ width: 20, height: 20 }} />
                </View>
            );
        },
        [isLoading, messages]
    );

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
                renderItem={renderItem}
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
        color: Colors.mainTheme.oliveGreen,
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
});
