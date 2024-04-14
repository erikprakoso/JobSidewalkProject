import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, StatusBar, TouchableOpacity, Alert, ImageBackground } from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    // Contoh data profil (nama lengkap dan email)
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        const fetchAccountId = async () => {
            try {
                const id = await AsyncStorage.getItem('account-key');
                const response = await fetch(
                    `http://192.168.100.39:1337/api/v1/accounts/${id}?populate=*`
                );
                if (response.ok) {
                    const data = await response.json();
                    setFullName(data.data.attributes.name);
                    setEmail(data.data.attributes.email);
                    setThumbnail(data.data.attributes.thumbnail.data.attributes.url);
                } else {
                    console.error("Failed to fetch job vacancy");
                }
            } catch (error) {
                console.error("Error retrieving account key from AsyncStorage:", error);
            }
        };

        fetchAccountId(); // Call the async function to fetch account key
    }, []); // Execute this effect only once on component mount

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
                            await AsyncStorage.removeItem("account-key"); // Remove the account key from AsyncStorage
                            navigation.navigate("Login"); // Navigate back to the Login screen
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.blueBox}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage}>
                        {/* Ganti dengan gambar profil */}
                        <ImageBackground
                            source={{
                                uri: `http://192.168.100.39:1337${thumbnail}`,
                            }}
                            style={styles.profileImage}
                            resizeMode="cover"
                        >
                            {/* Placeholder or overlay content can be added here */}
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.fullName}>{fullName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
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
        marginBottom: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60, // Menggunakan setengah dari lebar/tinggi untuk membuat lingkaran
        backgroundColor: Colors.gray,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 250,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Menggunakan setengah dari lebar/tinggi untuk membuat lingkaran
        backgroundColor: Colors.onPrimary,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden',
    },
    profileInitials: {
        fontSize: FontSize.large,
        fontWeight: "bold",
        color: Colors.text,
    },
    profileInfo: {
        alignItems: "center",
    },
    fullName: {
        fontSize: FontSize.medium,
        color: Colors.primary,
        fontFamily: Font["poppins-regular"],
    },
    email: {
        fontSize: FontSize.small,
        color: Colors.primary,
        fontFamily: Font["poppins-regular"],
    },
    logoutButton: {
        width: "90%",
        borderColor: Colors.danger,
        borderWidth: 1,
        paddingVertical: Spacing * 1.5,
        paddingHorizontal: Spacing * 2,
        borderRadius: Spacing,
        shadowColor: Colors.danger,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
        alignSelf: "center",
        position: "absolute",
        bottom: Spacing * 2,
    },
    logoutText: {
        fontFamily: Font["poppins-bold"],
        color: Colors.danger,
        textAlign: "center",
        fontSize: FontSize.large,
    },
});

export default ProfileScreen;
