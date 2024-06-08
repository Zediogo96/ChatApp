import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

// @ts-expect-error: SVG file
import GoogleSVG from "@/assets/images/login/google.svg";
// @ts-expect-error: SVG file
import GithubSVG from "@/assets/images/login/github.svg";
// @ts-expect-error: SVG file
import FacebookSVG from "@/assets/images/login/facebook.svg";

const OAuthSocials = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.innerContainer}>
                <GoogleSVG width={37} height={37} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.innerContainer}>
                <GithubSVG width={37} height={37} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.innerContainer}>
                <FacebookSVG width={37} height={37} />
            </TouchableOpacity>
        </View>
    );
};

export default OAuthSocials;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        flexDirection: "row",
        columnGap: 15,
        marginTop: 10,
    },
    innerContainer: {
        width: 45,
        height: 45,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 5,
        padding: 5,

        justifyContent: "center",
        alignItems: "center",
    },
});
