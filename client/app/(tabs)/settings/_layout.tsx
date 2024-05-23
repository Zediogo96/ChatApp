import React from "react";
import { Stack, useRouter } from "expo-router";

export default function StackLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, statusBarAnimation: "fade" }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
