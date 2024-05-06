import React from "react";
import { Stack, useRouter } from "expo-router";

export default function StackLayout() {
    const router = useRouter();

    return (
        <Stack
            initialRouteName="index"
            screenOptions={{ headerShown: false, statusBarAnimation: "fade" }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="SearchPage" />
        </Stack>
    );
}
