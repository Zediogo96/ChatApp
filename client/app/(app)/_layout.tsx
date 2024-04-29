import { Stack } from "expo-router";
import { TransitionPresets } from "@react-navigation/stack";
import { Platform } from "react-native";

export const unstable_settings = {
    initialRouteName: "(root)",
};

export default function AppLayout() {
    return (
        <Stack
            initialRouteName="(tabs)"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
        >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="NewMessage"
                options={{
                    presentation: "card",
                    animation: Platform.OS == "android" ? "slide_from_bottom" : "default",
                    animationDuration: 500,
                }}
            />{" "}
        </Stack>
    );
}
