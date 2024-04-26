import useAuthStore from "@/store/authStore";
import { Redirect, Stack, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { storage } from "@/utils/localStorage";

export default function AppLayout() {
    const token = storage.getString("jwt_token");

    console.log("token", token);

    if (token === null) {
        return <Redirect href="/Login" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ChatRooms"
                options={{
                    title: "Chat_Rooms",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="comments" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
