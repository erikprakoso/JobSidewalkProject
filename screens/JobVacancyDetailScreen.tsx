import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import Font from "../constants/Font";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../constants/Spacing";

type Props = NativeStackScreenProps<RootStackParamList, "JobVacancyDetail">;

const JobVacancyDetailScreen: React.FC<Props> = ({ route }) => {
    const { id } = route.params;
    const [jobVacancy, setJobVacancy] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://192.168.100.39:1337/api/v1/job-vacancies/${id}?populate=*`
            );
            if (response.ok) {
                const data = await response.json();
                setJobVacancy(data.data);
            } else {
                console.error("Failed to fetch job vacancy");
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPostedTime = (createdAt: string) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Perbedaan dalam hari
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); // Perbedaan dalam jam
        const diffMinutes = Math.floor(diffTime / (1000 * 60)); // Perbedaan dalam menit

        if (diffDays > 0) {
            return `${diffDays} ${diffDays > 1 ? "days" : "day"} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} ${diffHours > 1 ? "hours" : "hour"} ago`;
        } else {
            return `${diffMinutes} ${diffMinutes > 1 ? "minutes" : "minute"} ago`;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView
                style={styles.scrollContentContainer}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.blueBox}>
                    <View style={styles.header}>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="white"
                            onPress={() => navigation.goBack()}
                        />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerPositionText}>
                                {jobVacancy?.attributes?.position}
                            </Text>
                            <Text style={styles.headerCompanyText}>
                                {jobVacancy?.attributes?.company}
                            </Text>
                        </View>
                    </View>
                </View>

                <ImageBackground
                    style={styles.imageBackgroundThumbnail}
                    source={{
                        uri: `http://192.168.100.39:1337${jobVacancy?.attributes?.thumbnail.data.attributes.url}`,
                    }}
                />

                <View style={styles.contentContainer}>
                    <Text style={styles.positionText}>
                        {jobVacancy?.attributes?.position}
                    </Text>
                    <Text style={styles.companyText}>
                        {jobVacancy?.attributes?.company}
                    </Text>
                    <Text style={styles.timeText}>
                        {getPostedTime(jobVacancy?.attributes?.createdAt)}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.contentContainer}>
                    <View style={styles.headerIcon}>
                        <Ionicons name="location" size={24} color={Colors.primary} />
                        <Text style={styles.generalText}>
                            {jobVacancy?.attributes?.location}
                        </Text>
                    </View>
                    <View style={styles.headerIcon}>
                        <Ionicons name="business" size={24} color={Colors.primary} />
                        <Text style={styles.generalText}>
                            {jobVacancy?.attributes?.type}
                        </Text>
                    </View>
                    <View style={styles.headerIcon}>
                        <Ionicons name="time" size={24} color={Colors.primary} />
                        <Text style={styles.generalText}>
                            {jobVacancy?.attributes?.job_type}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.aboutText}>
                            About {jobVacancy?.attributes?.company}
                        </Text>
                    </View>
                    <Text>{jobVacancy?.attributes?.description}</Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.onPrimary,
    },
    scrollContentContainer: {
        flexGrow: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Jarak bawah agar konten tidak tertutup oleh tombol "Apply"
    },
    blueBox: {
        height: 100,
        backgroundColor: Colors.primary,
        marginBottom: 20,
        padding: 20,
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
    },
    headerIcon: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    headerTextContainer: {
        marginLeft: 10,
    },
    headerPositionText: {
        fontSize: FontSize.small,
        color: Colors.onPrimary,
        fontFamily: Font["poppins-regular"],
        marginLeft: 10,
    },
    headerCompanyText: {
        fontSize: FontSize.xxsmall,
        color: Colors.gray,
        fontFamily: Font["poppins-regular"],
    },
    imageBackgroundThumbnail: {
        width: "100%",
        height: 400,
        marginTop: -20,
    },
    contentContainer: {
        padding: 20,
        marginTop: -20,
    },
    positionText: {
        fontSize: FontSize.small,
        color: Colors.text,
        fontFamily: Font["poppins-semiBold"],
        marginTop: 20,
    },
    companyText: {
        fontSize: FontSize.xsmall,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
        marginTop: 5,
    },
    generalText: {
        fontSize: FontSize.xsmall,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
        marginTop: 5,
        marginLeft: 10,
        textTransform: "capitalize",
    },
    timeText: {
        fontSize: FontSize.xxsmall,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
        marginTop: 5,
    },
    applyButton: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: Spacing * 2,
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
    },
    applyText: {
        fontFamily: Font["poppins-bold"],
        color: Colors.onPrimary,
        textAlign: "center",
        fontSize: FontSize.large,
    },
    divider: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        marginVertical: 10,
        width: "90%",
        alignSelf: "center",
    },
    aboutText: {
        fontSize: FontSize.small,
        color: Colors.text,
        fontFamily: Font["poppins-semiBold"],
        marginTop: 20,
    },
});

export default JobVacancyDetailScreen;
