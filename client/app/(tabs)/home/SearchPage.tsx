import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import SearchBar from "@/components/General/SearchBar";
import Colors from "@/constants/Colors";
import Animated, { Easing, FadeIn, FadeInLeft } from "react-native-reanimated";
import useAuthStore from "@/store/authStore";
import { useMessagesBySearchQuery } from "@/api/react-query/messages";
import { FlashList } from "@shopify/flash-list";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";

const AnimatedShadowedView = Animated.createAnimatedComponent(ShadowedView);

const SearchItem = ({ item, index }: { item: Message; index: number }) => {
    return (
        <AnimatedShadowedView
            entering={FadeInLeft.duration(200)
                .delay(100 * index)
                .easing(Easing.out(Easing.poly(6)))}
            style={[
                s.searchItemContainer,
                shadowStyle({
                    color: Colors.mainTheme.darkOlive,
                    radius: 1,
                    opacity: 0.5,
                    offset: [1, 3],
                }),
            ]}
        >
            <Image source={{ uri: item.sender.avatar_url }} style={s.avatar} />
            <View style={s.messageContainer}>
                <Text style={s.sender}>{item.sender.username}</Text>
                <Text style={s.message}>{item.content}</Text>
            </View>
        </AnimatedShadowedView>
    );
};

const SearchPage: React.FC = () => {
    const [searchStringValue, setSearchStringValue] = React.useState("");

    const { data: queryMessages, isLoading } =
        useMessagesBySearchQuery(searchStringValue);

    return (
        <Animated.View
            sharedTransitionTag="headerTransition"
            style={[s.container, { flex: 1, paddingTop: 60 }]}
        >
            <Animated.Text sharedTransitionTag="titleTransition" style={s.title}>
                Messages
            </Animated.Text>

            <SearchBar
                isQueryLoading={isLoading}
                value={searchStringValue}
                onChangeText={setSearchStringValue}
            />

            <View
                style={{
                    marginTop: 20,
                    height: 20,
                    width: "70%",
                    alignSelf: "center",
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.mainTheme.darkOlive,
                }}
            />

            <FlashList
                scrollEnabled
                style={{ flex: 1, marginTop: 20 }}
                ListHeaderComponentStyle={{ marginTop: 20 }}
                data={queryMessages || []}
                renderItem={({ item, index }: { item: Message; index: number }) => (
                    <SearchItem item={item} index={index} />
                )}
                estimatedItemSize={100}
            />
        </Animated.View>
    );
};

export default SearchPage;

const s = StyleSheet.create({
    // SearchPage styles
    container: {
        backgroundColor: Colors.mainTheme.tan,
        width: "100%",
        height: "100%",
        padding: 20,
        justifyContent: "flex-start",
    },
    title: {
        paddingBottom: 20,
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "SpaceMono",
        color: Colors.mainTheme.darkOlive,
    },

    // SearchItem styles
    searchItemContainer: {
        flexDirection: "row",

        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,

        backgroundColor: Colors.mainTheme.tan,
        borderRadius: 15,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    messageContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: "center",
    },

    sender: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.mainTheme.darkOlive,
    },

    message: {
        fontSize: 14,
        color: Colors.mainTheme.darkOlive,
    },
});
