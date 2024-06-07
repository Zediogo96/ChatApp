import type { ReactElement } from "react";
import React from "react";

import { Stack } from "expo-router";

function Navigator(): ReactElement {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Login"
                options={{
                    animation: "none",
                }}
            />
            <Stack.Screen name="Welcome" />
            <Stack.Screen name="Signup" />
        </Stack>
    );
}

export default Navigator;
