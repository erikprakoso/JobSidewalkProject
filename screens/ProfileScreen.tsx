import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Alert,
    ImageBackground,
    useWindowDimensions,
} from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Font from "../constants/Font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <Text style={styles.tabText}>Personal Summary</Text>
    </View>
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <Text style={styles.tabText}>Career History</Text>
    </View>
);

const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <Text style={styles.tabText}>Education</Text>
    </View>
);

const FourthRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <Text style={styles.tabText}>License & Certification</Text>
    </View>
);

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [index, setIndex] = useState(0);

    const routes = [
        { key: 'first', title: 'Personal Summary' },
        { key: 'second', title: 'Career History' },
        { key: 'third', title: 'Education' },
        { key: 'fourth', title: 'License & Certification' },
    ];

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute
    });

    useEffect(() => {
        const fetchAccountId = async () => {
            try {
                const id = await AsyncStorage.getItem("account-key");
                const response = await fetch(
                    `http://192.168.100.39:1337/api/v1/accounts/${id}?populate=*`
                );
                if (response.ok) {
                    const data = await response.json();
                    setFullName(data.data.attributes.name);
                    setEmail(data.data.attributes.email);
                    setThumbnail(
                        data.data.attributes.thumbnail.data.attributes.url
                    );
                } else {
                    console.error("Failed to fetch job vacancy");
                }
            } catch (error) {
                console.error(
                    "Error retrieving account key from AsyncStorage:",
                    error
                );
            }
        };

        fetchAccountId();
    }, []);

    const handleLogout = async () => {
        try {
            Alert.alert(
                "Confirm Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Logout",
                        onPress: async () => {
                            await AsyncStorage.removeItem("account-key");
                            navigation.navigate("Login");
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const layout = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.blueBox}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage}>
                        <ImageBackground
                            source={{
                                uri: `http://192.168.100.39:1337${thumbnail}`,
                            }}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.fullName}>{fullName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => {
                        // Implement navigation to settings screen or perform settings action
                    }}
                >
                    <Ionicons name="settings" size={24} color={Colors.onPrimary} />
                </TouchableOpacity>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.primary, height: 3 }}
                        style={{ backgroundColor: Colors.onPrimary }}
                        labelStyle={{ color: Colors.primary, fontSize: FontSize.xxsmall }}
                        scrollEnabled
                    />
                )}
                lazy={true}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    blueBox: {
        height: 200,
        backgroundColor: Colors.primary,
        marginBottom: 0,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    profileImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.onPrimary,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    profileInfo: {
        alignItems: "center",
    },
    fullName: {
        marginTop: 10,
        fontSize: FontSize.medium,
        color: Colors.onPrimary,
        fontFamily: Font["poppins-regular"],
    },
    email: {
        fontSize: FontSize.small,
        color: Colors.onPrimary,
        fontFamily: Font["poppins-regular"],
    },
    settingsButton: {
        position: "absolute",
        top: 40,
        right: 20,
        padding: 10,
    },
    logoutButton: {
        width: "90%",
        borderColor: Colors.danger,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: Colors.danger,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignSelf: "center",
        position: "absolute",
        bottom: 20,
    },
    logoutText: {
        fontFamily: Font["poppins-bold"],
        color: Colors.danger,
        textAlign: "center",
        fontSize: FontSize.large,
    },
    scene: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: FontSize.large,
        color: Colors.primary,
        fontFamily: Font["poppins-bold"],
    },
});

export default ProfileScreen;
