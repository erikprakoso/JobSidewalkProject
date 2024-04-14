import React from "react";
import { SafeAreaView, Text, View, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    // Contoh data profil (nama lengkap dan email)
    const fullName = "John Doe";
    const email = "johndoe@example.com";

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.blueBox}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage}>
                        {/* Ganti dengan gambar profil */}
                        <Text style={styles.profileInitials}>JD</Text>
                    </View>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.fullName}>{fullName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logoutButton}>
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
