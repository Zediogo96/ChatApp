import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import Animated, { FadeIn, FadeInDown, FadeInLeft } from "react-native-reanimated";
import { fakeData } from "@/constants/FakeData";
import useFavouriteContacts from "@/api/react-query/contacts";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

type ContactAvatarProps = {
    index: number;
    id: string;
    name: string;
    avatar: string;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ContactAvatar: React.FC<ContactAvatarProps> = ({ index, id, name, avatar }) => {
    return (
        <AnimatedTouchableOpacity
            entering={FadeInLeft.duration(250).delay(750 + index * 150)}
            onPress={() => {
                router.push({
                    pathname: "home/PrivateConversationPage",
                    params: {
                        id: id,
                        name: name,
                        avatar: avatar,
                    },
                } as never);
            }}
            style={sc.container}
        >
            <ShadowedView
                style={[
                    { width: 50, height: 50, borderRadius: 30 },
                    shadowStyle({
                        color: Colors.mainTheme.darkOlive,
                        opacity: 0.6,
                        offset: [2, 2],
                        radius: 5,
                    }),
                ]}
            >
                <Animated.Image
                    src={avatar}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                    }}
                />
                <Animated.Text
                    entering={FadeIn.duration(1000).delay(1250 + index * 150)}
                    style={sc.textName}
                >
                    {name}
                </Animated.Text>
            </ShadowedView>
        </AnimatedTouchableOpacity>
    );
};

const SubHeader = () => {
    const favContactsQuery = useFavouriteContacts();

    const renderFavContacts = useCallback(() => {
        if (favContactsQuery.isLoading || favContactsQuery.isError) {
            <SkeletonPlaceholder speed={1000}>
                <View style={s.row}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <View key={index} style={sc.container} />
                    ))}
                </View>
            </SkeletonPlaceholder>;
        } else if (favContactsQuery.data) {
            return (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.row}
                >
                    {favContactsQuery.data.map(
                        (contact: (typeof favContactsQuery.data)[0], index: number) => (
                            <ContactAvatar
                                index={index}
                                key={contact.user.id}
                                id={contact.user.id}
                                name={contact.user.username}
                                avatar={contact.user.avatar_url}
                            />
                        )
                    )}
                </ScrollView>
            );
        }
    }, [favContactsQuery.data]);

    return (
        <View style={s.container}>
            <Animated.Text
                entering={FadeIn.duration(1000).delay(300)}
                style={s.subHeaderTitle}
            >
                Favourite Contacts
            </Animated.Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.row}
            >
                {renderFavContacts()}
            </ScrollView>
        </View>
    );
};

export default SubHeader;

const s = StyleSheet.create({
    container: {
        height: height / 5.8,
        width: width,
    },
    subHeaderTitle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "SpaceMono",
        paddingHorizontal: 20,
        color: Colors.mainTheme.darkOlive,
    },
    row: {
        flexGrow: 1,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        columnGap: 20,
        paddingTop: 5,
    },
});

const sc = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 10,
    },
    textName: {
        marginTop: 7,
        marginLeft: 5,
        fontSize: 9.5,
        textAlign: "center",
        alignSelf: "flex-start",
        fontWeight: "bold",
        color: Colors.mainTheme.gray,
    },
});
