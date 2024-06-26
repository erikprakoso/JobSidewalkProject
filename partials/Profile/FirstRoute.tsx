import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";

type Props = {
    personalSummaryId: number;
};

const FirstRoute: React.FC<Props> = ({ personalSummaryId }) => {
    const [description, setDescription] = useState<string | null>(null);

    useEffect(() => {
        const fetchPersonalSummary = async () => {
            try {
                const response = await fetch(
                    `http://192.168.100.39:1337/api/v1/personal-summaries/${personalSummaryId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setDescription(data.data.attributes.description);
                } else {
                    console.error("Failed to fetch personal summary");
                }
            } catch (error) {
                console.error("Error retrieving personal summary data:", error);
            }
        };

        fetchPersonalSummary();
    }, [personalSummaryId]); // Re-fetch if personalSummaryId changes

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.summaryText}>Personal Summary</Text>
                <Text style={styles.editText}>Edit</Text>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.cardText} numberOfLines={5} ellipsizeMode="tail">
                    {description || "Loading..."}
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
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
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
        elevation: 3,
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
