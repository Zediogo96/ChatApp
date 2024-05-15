import { StyleSheet, View } from "react-native";
import React from "react";
import SearchBar from "@/components/General/SearchBar";
import Colors from "@/constants/Colors";
import Animated, { FadeIn } from "react-native-reanimated";
import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";

const SearchPage: React.FC = () => {
    const user = useAuthStore((state) => state.user);

    const [searchStringValue, setSearchStringValue] = React.useState("");

    const { data: queryMessages, isLoading } = useQuery({
        queryKey: ["messages", searchStringValue],
        queryFn: async () => {
            const messages = await api.get(`messages/search/${user?.id}`, {
                params: {
                    query: searchStringValue,
                },
            });
            return messages;
        },
        enabled: Boolean(searchStringValue),
    });

    console.log(queryMessages?.data);

    return (
        <Animated.View
            sharedTransitionTag="headerTransition"
            style={[s.container, { flex: 1, paddingTop: 60 }]}
        >
            <Animated.Text sharedTransitionTag="titleTransition" style={s.title}>
                Messages
            </Animated.Text>

            <SearchBar value={searchStringValue} onChangeText={setSearchStringValue} />
        </Animated.View>
    );
};

export default SearchPage;

const s = StyleSheet.create({
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
});
