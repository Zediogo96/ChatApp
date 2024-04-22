import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback } from "react";
import Colors from "@/constants/Colors";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import { User, fakeData2 } from "@/constants/FakeData";

const { width } = Dimensions.get("window");

const MainFrame = () => {
    const renderItem = useCallback(({ item: user }: { item: User }) => {
        return (
            <View
                style={{
                    height: 75,
                    width: width - 20,
                    borderRadius: 20,

                    alignSelf: "center",

                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",

                    paddingHorizontal: 15,

                    marginTop: 10,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={{ uri: user.avatar }}
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 20,
                            borderWidth: 1,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            color: Colors.mainTheme.oliveGreen,
                            fontWeight: "bold",
                            marginLeft: 10,
                        }}
                    >
                        {user.name}
                    </Text>
                </View>

                <View style={{ width: 20, height: 20 }} />
            </View>
        );
    }, []);

    return (
        <ShadowedView
            style={[
                styles.container,
                shadowStyle({
                    opacity: 0.1,
                    radius: 20,
                    offset: [0, -2],
                }),
            ]}
        >
            <Text style={styles.title}>Most Recent</Text>

            <FlashList
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                estimatedItemSize={25}
                data={fakeData2}
                keyExtractor={(item) => item.name}
                numColumns={1}
            />
        </ShadowedView>
    );
};

export default MainFrame;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

        backgroundColor: "white",

        paddingTop: 15,
    },

    title: {
        fontSize: 20,
        color: Colors.mainTheme.oliveGreen,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginHorizontal: 15,
    },
});
