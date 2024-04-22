import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const FirstRoute: React.FC<Props> = ({ personalSummaryId }) => {
    const [description, setDescription] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccountId = async () => {
            try {
                const response = await fetch(
                    `http://192.168.100.39:1337/api/v1/personal-summaries/${personalSummaryId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setDescription(data.data.attributes.description); // Set description state with fetched data
                } else {
                    console.error("Failed to fetch personal summary");
                }
            } catch (error) {
                console.error(
                    "Error retrieving personal summary data:",
                    error
                );
            }
        };

        fetchAccountId();
    }, []); // Make sure to add dependencies if needed

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.summaryText}>Personal Summary</Text>
                <Text style={styles.editText}>Edit</Text>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.cardText} numberOfLines={5} ellipsizeMode="tail">
                    {description || "Loading..."} {/* Display description or loading text */}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between", // Menyisipkan ruang antara elemen di header
        alignItems: "center",
        marginBottom: 10, // Jarak bawah dari header
    },
    cardContainer: {
        backgroundColor: Colors.onPrimary,
        borderRadius: 10,
        padding: 20,
        shadowColor: Colors.gray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Elevation untuk bayangan di Android
    },
    cardText: {
        fontSize: FontSize.small,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
    },
    summaryText: {
        fontSize: FontSize.small,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
    },
    editText: {
        fontSize: FontSize.xsmall,
        color: Colors.primary,
        fontFamily: Font["poppins-regular"],
    },
});

export default FirstRoute;
