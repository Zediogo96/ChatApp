import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";

const { height } = Dimensions.get("window");

type HeaderProps = {
    name: string;
    avatar: string;
};

const Header: React.FC<HeaderProps> = ({ name, avatar }) => {
    return (
        <ShadowedView
            style={[
                styles.headerContainer,
                shadowStyle({
                    color: "black",
                    opacity: 0.5,
                    offset: [0, 2],
                    radius: 5,
                }),
            ]}
        >
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={25} color="black" />
            </TouchableOpacity>

            <View style={styles.subHeaderContainer}>
                <Animated.Image
                    src={avatar}
                    style={{ width: 45, height: 45, borderRadius: 25 }}
                />

                <Text style={styles.nameText}>{name}</Text>
            </View>
        </ShadowedView>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: height * 0.07,
        paddingBottom: 15,

        borderBottomEndRadius: 10,
        borderBottomStartRadius: 0,
    },

    subHeaderContainer: {
        marginLeft: 10,
        alignItems: "center",
        flexDirection: "row",
    },

    nameText: {
        fontSize: 18,
        marginLeft: 15,
    },
});
