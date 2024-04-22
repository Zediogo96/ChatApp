import React from "react";
import { StyleSheet, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import Animated, { FadeIn, FadeInDown, FadeInLeft } from "react-native-reanimated";
import { fakeData } from "@/constants/FakeData";

const { width, height } = Dimensions.get("window");

type ContactAvatarProps = {
    index: number;
    name: string;
    avatar: string;
};

const ContactAvatar: React.FC<ContactAvatarProps> = ({ index, name, avatar }) => {
    return (
        <TouchableOpacity style={sc.container}>
            <Animated.Image
                entering={FadeInLeft.duration(350).delay(1000 + index * 150)}
                src={avatar}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    borderWidth: 0.8,
                    borderColor: Colors.mainTheme.oliveGreen,
                }}
            />
            <Animated.Text
                entering={FadeIn.duration(1000).delay(1250 + index * 150)}
                style={sc.textName}
            >
                {name}
            </Animated.Text>
        </TouchableOpacity>
    );
};

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
        fontSize: 10,
        textAlign: "center",
        alignSelf: "flex-start",
        fontWeight: "bold",
    },
});

const SubHeader = () => {
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
                {fakeData.map((contact, index) => (
                    <ContactAvatar
                        key={contact.id}
                        index={index}
                        name={contact.name}
                        avatar={contact.avatar}
                    />
                ))}
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
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        columnGap: 20,
        paddingTop: 5,
    },
});
