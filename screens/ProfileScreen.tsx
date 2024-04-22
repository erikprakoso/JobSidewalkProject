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
import * as ImagePicker from "expo-image-picker";
import FirstRoute from "../partials/Profile/FirstRoute";
import SecondRoute from "../partials/Profile/SecondRoute";
import ThirdRoute from "../partials/Profile/ThirdRoute";
import FourthRoute from "../partials/Profile/FourthRoute";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    const [fullName, setFullName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [index, setIndex] = useState<number>(0);
    const [thumbnailId, setThumbnailId] = useState<number>(0);
    const [personalSummaryId, setPersonalSummaryId] = useState<number>(0);

    const routes = [
        { key: 'first', title: 'Personal Summary' },
        { key: 'second', title: 'Career History' },
        { key: 'third', title: 'Education' },
        { key: 'fourth', title: 'License & Certification' },
    ];

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
                    setThumbnailId(data.data.attributes.thumbnail.data.id);
                    setPersonalSummaryId(data.data.attributes.personal_summary.data.id);
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

    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) { // Note: Use `cancelled` instead of `canceled`
            const selectedUri = result?.assets[0].uri; // Access URI from assets array
            setThumbnail(selectedUri);

            // Upload the selected image to the server
            uploadImage(selectedUri);
        }
    };

    const uploadImage = async (uri: string | undefined) => {
        if (!uri) return;

        try {
            const formData = new FormData();
            const fileName = uri.split("/").pop(); // Mendapatkan nama file dari URI
            formData.append("files", {
                uri,
                name: fileName,
            });

            const response = await fetch(`http://192.168.100.39:1337/api/upload?id=${thumbnailId}`, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.ok) {
                // Handle success response (e.g., show success message)
                Alert.alert("Image uploaded successfully!");
            } else {
                // Handle error response (e.g., show error message)
                Alert.alert("Failed to upload image. Please try again.");
            }

        } catch (error) {
            console.error("Error uploading image:", error);
            Alert.alert("An error occurred while uploading image. Please try again.");
        }
    };


    const layout = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.blueBox}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImageContainer}>
                        <TouchableOpacity onPress={openImagePicker}>
                            <View style={styles.profileImage}>
                                <ImageBackground
                                    source={{
                                        uri: thumbnail?.startsWith("file://") ? thumbnail : `http://192.168.100.39:1337${thumbnail}`,
                                    }}
                                    style={styles.profileImage}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.pencilIconContainer}>
                                <Ionicons name="pencil" style={styles.pencilIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.fullName}>{fullName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case 'first':
                            return <FirstRoute personalSummaryId={personalSummaryId} />;
                        case 'second':
                            return <SecondRoute />;
                        case 'third':
                            return <ThirdRoute />;
                        case 'fourth':
                            return <FourthRoute />;
                        default:
                            return null;
                    }
                }}
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
        marginTop: 10,
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
    pencilIconContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 25, // Adjust the width and height as needed
        height: 25, // Adjust the width and height as needed
        borderRadius: 15, // Make the container a circle
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background with some opacity
        justifyContent: "center",
        alignItems: "center",
    },
    pencilIcon: {
        color: Colors.onPrimary,
        fontSize: 15,
    },
});

export default ProfileScreen;
