import React from "react";
import { Redirect } from "expo-router";
import useAuthStore from "@/store/authStore";

export default function StartPage() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/stack/Welcome"} />;
}
